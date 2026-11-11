import { forwardRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  liveUrl,
  projectStats,
  projectTags,
  projectYear,
  repoUrl,
  slugify,
  thumbSrcSet,
  type Project,
} from '../data/projects';

const pad = (n: number) => n.toString().padStart(2, '0');

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "Live" when there's a live site, otherwise the status from impact[] (e.g. "Self-hosted"),
// otherwise "Open source" when there's a repo, else "Shipped".
const statusOf = (project: Project) => {
  if (liveUrl(project)) return 'Live';
  const fromImpact = project.impact.find((s) => s.label.toLowerCase() === 'status')?.value;
  if (fromImpact) return fromImpact;
  return repoUrl(project) ? 'Open source' : 'Shipped';
};

// Shared look for the framed mono links (Code / Case study) inside "How it works".
const frameLink =
  'inline-flex items-center gap-2 min-h-[44px] px-3 -ml-px first:ml-0 border border-ink font-mono text-xs uppercase tracking-[0.12em] ink-fill transition-colors duration-150';

type WorkEntryProps = {
  project: Project;
  index: number;
  /** Load the screenshot eagerly (the first entry); the rest are lazy. */
  eager?: boolean;
};

// One project on the home page: phone = screenshot, title, outcome, primary action,
// the hard part, the stack, "How it works". md and up = two columns (text left,
// screenshot + stat strip right) with chips, stack and byline in the text column.
const WorkEntry = forwardRef<HTMLLIElement, WorkEntryProps>(({ project, index, eager = false }, ref) => {
  const slug = slugify(project.title);
  const live = liveUrl(project);
  const repo = repoUrl(project);
  const year = projectYear(project);
  const status = statusOf(project);
  const tags = projectTags(project);
  const facts = (project.facts ?? []).slice(0, 2);
  const caseStudy = `/projects/${slug}`;
  const num = pad(index + 1);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Once the reader has scrolled past an open "How it works" (the panel is entirely above the
  // screen), close it without moving anything on screen. Whatever sits mid-screen is measured
  // before and after closing, and any shift is scrolled back. Browser scroll anchoring is
  // paused meanwhile so it can't correct twice; iOS Safari (no anchoring) gets the same result.
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!el.open || el.getBoundingClientRect().bottom > 0) return;
      const anchored = [document.documentElement, document.body];
      const prev = anchored.map((n) => n.style.overflowAnchor);
      anchored.forEach((n) => (n.style.overflowAnchor = 'none'));
      el.classList.add('work-details-instant');
      const probe = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const before = probe?.getBoundingClientRect().top;
      el.open = false;
      if (probe && before !== undefined) {
        const shift = probe.getBoundingClientRect().top - before;
        if (Math.abs(shift) > 0.5) window.scrollBy({ top: shift, behavior: 'instant' as ScrollBehavior });
      }
      requestAnimationFrame(() => {
        anchored.forEach((n, i) => (n.style.overflowAnchor = prev[i]));
        el.classList.remove('work-details-instant');
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // "Close" at the end of the panel: collapse, and keep the panel's heading row in view.
  const collapse = () => {
    const el = detailsRef.current;
    const summary = el?.querySelector('summary');
    if (!el || !summary) return;
    el.open = false;
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const stats = projectStats(project);

  const primaryClass =
    'group flex items-center justify-between gap-3 mt-6 md:self-start md:min-w-[260px] min-h-[56px] px-4 sm:px-5 border border-ink bg-ink text-paper font-mono text-[13px] sm:text-xs uppercase tracking-[0.12em] hover:bg-ink-3 active:translate-y-px transition-colors duration-150';

  return (
    <li
      ref={ref}
      id={`project-${slug}`}
      tabIndex={-1}
      className="scroll-mt-[136px] sm:scroll-mt-[148px] lg:scroll-mt-[108px] border-t border-ink first:border-t-0 pt-12 first:pt-4 md:px-8 md:pt-16 md:first:pt-10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] md:gap-x-10 lg:gap-x-12 focus:outline-none"
    >
      {/* Screenshot (+ stat strip from md; phones show the stack line instead) */}
      <div className="md:col-start-2 md:row-start-1 md:self-start">
        {/* The frame takes the screenshots' own shape (about 2.1:1) so nothing is cropped. */}
        <div className="relative bg-paper-2 border border-ink p-[6px] md:p-[14px] overflow-hidden">
          <span className="md:hidden absolute left-0 top-0 z-[1] bg-ink text-paper font-mono text-[10px] leading-none tracking-[0.12em] uppercase px-2.5 py-2">
            {num} · {status}
          </span>
          <picture>
            {project.imageWebP && (
              <source
                type="image/webp"
                srcSet={thumbSrcSet(project.imageWebP)}
                sizes="(min-width: 768px) 50vw, calc(100vw - 56px)"
              />
            )}
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1280}
              height={610}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="block w-full aspect-[2.1/1] object-contain border border-ink bg-paper"
            />
          </picture>
        </div>
        {stats.length > 0 && (
          <dl
            className="hidden md:grid border border-t-0 border-ink"
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
          >
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 px-3 xl:px-4 py-4 border-l border-ink first:border-l-0 flex flex-col-reverse">
                <dt className="mt-2 font-mono text-[10px] leading-[1.3] uppercase tracking-[0.1em] text-mute">{s.label}</dt>
                <dd className="font-serif text-[22px] lg:text-[24px] xl:text-[28px] leading-none tracking-[-0.02em] tabular-nums whitespace-nowrap">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col md:col-start-1 md:row-start-1">
        <div className="hidden md:flex justify-between items-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          <span>{num}.</span>
          <span className={`inline-flex items-center gap-1.5 ${status === 'Live' ? 'text-ink' : ''}`}>
            <span aria-hidden="true" className={`w-[7px] h-[7px] border ${status === 'Live' ? 'bg-ink border-ink' : 'border-current'}`} />
            {status}
          </span>
        </div>

        <h3 className="mt-6 md:mt-3 font-serif font-normal text-[30px] min-[390px]:text-[34px] md:text-[36px] lg:text-[44px] leading-[1.04] tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="mt-2.5 max-w-[62ch] text-[16px] min-[390px]:text-[17px] md:text-[16px] leading-[1.55] text-ink-2">
          {project.outcome ?? project.description}
        </p>

        {live ? (
          <a href={live} target="_blank" rel="noopener noreferrer" className={primaryClass}>
            <span>
              Try it live<span className="sr-only">: {project.title} (opens in a new tab)</span>
            </span>
            <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        ) : (
          <Link to={caseStudy} className={primaryClass}>
            <span>
              Read case study<span className="sr-only">: {project.title}</span>
            </span>
            <span className="text-base transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        )}

        {project.hardPart && (
          <div className="mt-7 md:mt-8 max-w-[62ch] border-l-4 border-ink py-1 pl-4">
            <p className="font-mono text-[10px] font-medium leading-[1.2] uppercase tracking-[0.16em]">{project.hardPartLabel ?? 'The hard part'}</p>
            <p className="mt-2 font-serif text-[19px] min-[390px]:text-[20px] md:text-[21px] leading-[1.35]">{project.hardPart}</p>
          </div>
        )}

        {/* Phone: the stack as a small line (stats stay in the desktop strip) */}
        {tags.length > 0 && (
          <p className="md:hidden mt-6 pt-3 border-t border-rule font-mono text-[11px] leading-[1.6] uppercase tracking-[0.1em] text-ink-3">
            <span className="sr-only">Built with: </span>
            {tags.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="text-rule px-[0.45em]" aria-hidden="true">/</span>}
                {t}
              </span>
            ))}
          </p>
        )}

        {/* md+: facts, stack, byline */}
        {facts.length > 0 && (
          <ul className="hidden md:flex flex-wrap gap-2 mt-8">
            {facts.map((f) => (
              <li key={f} className="font-mono text-[11px] leading-none uppercase tracking-[0.08em] border border-ink px-2 py-1.5">
                {f}
              </li>
            ))}
          </ul>
        )}
        <p className="hidden md:block mt-3 font-mono text-[11px] leading-[1.6] uppercase tracking-[0.1em] text-ink-3">
          {tags.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="text-rule px-[0.45em]">/</span>}
              {t}
            </span>
          ))}
        </p>
        <p className="hidden md:flex flex-wrap items-center min-h-[44px] mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
          {year && <span>{year}</span>}
          {live && (
            <>
              {year && <span className="px-2.5 text-rule" aria-hidden="true">·</span>}
              <Link to={caseStudy} className="inline-flex items-center min-h-[44px] text-ink hover:underline underline-offset-4">
                Case study →<span className="sr-only">: {project.title}</span>
              </Link>
            </>
          )}
          {repo && (
            <>
              <span className="px-2.5 text-rule" aria-hidden="true">·</span>
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[44px] text-ink hover:underline underline-offset-4"
              >
                Code ↗<span className="sr-only">: {project.title} source (opens in a new tab)</span>
              </a>
            </>
          )}
        </p>
      </div>

      {/* How it works: native disclosure, closed by default */}
      <details ref={detailsRef} className="work-details group md:col-span-2 md:-mx-8 mt-6 md:mt-10 border-t border-rule">
        <summary className="scroll-mt-[148px] sm:scroll-mt-[160px] lg:scroll-mt-[100px] list-none [&::-webkit-details-marker]:hidden cursor-pointer flex justify-between items-center min-h-[52px] md:px-8 font-mono text-xs uppercase tracking-[0.14em] text-ink-2 hover:bg-paper-2 transition-colors duration-150 focus-visible:outline-offset-[-2px]">
          <span>
            How it works<span className="sr-only">: {project.title}</span>
          </span>
          <span aria-hidden="true" className="relative w-3 h-3 shrink-0">
            <span className="absolute left-0 top-[5px] w-3 h-[1.5px] bg-current" />
            <span className="absolute left-0 top-[5px] w-3 h-[1.5px] bg-current rotate-90 transition-transform duration-200 group-open:rotate-0 motion-reduce:transition-none" />
          </span>
        </summary>
        <div className="grid gap-6 pt-2 pb-8 md:px-8 md:pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] md:gap-x-10 lg:gap-x-12">
          <dl className="grid gap-2 text-[15px] leading-[1.6] text-ink-2 max-w-[62ch]">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Challenge</dt>
            <dd>{project.challenge}</dd>
            <dt className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Approach</dt>
            <dd>{project.approach}</dd>
          </dl>
          <ol className="grid gap-4 content-start">
            {project.features.slice(0, 3).map((f, i) => (
              <li key={f} className="grid grid-cols-[32px_1fr] text-[15px] leading-[1.6] text-ink-2">
                <span className="font-mono text-[11px] leading-[1.9] tracking-[0.1em] text-mute">{pad(i + 1)}</span>
                <span>{f}</span>
              </li>
            ))}
          </ol>

          {/* Phone: the facts that sit in the text column on larger screens */}
          <div className="md:hidden grid gap-3">
            {facts.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {facts.map((f) => (
                  <li key={f} className="font-mono text-[11px] leading-none uppercase tracking-[0.08em] border border-ink px-2 py-1.5">
                    {f}
                  </li>
                ))}
              </ul>
            )}
            {year && <p className="font-mono text-[11px] leading-[1.6] uppercase tracking-[0.1em] text-ink-3">{year}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-y-3 md:col-span-2">
            <Link to={caseStudy} className={frameLink}>
              Case study →<span className="sr-only">: {project.title}</span>
            </Link>
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className={frameLink}>
                Code ↗<span className="sr-only">: {project.title} source (opens in a new tab)</span>
              </a>
            )}
            <button
              type="button"
              onClick={collapse}
              className="ml-auto inline-flex items-center gap-2 min-h-[44px] px-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-2 hover:text-ink"
            >
              Close <span aria-hidden="true">↑</span>
              <span className="sr-only">: how {project.title} works</span>
            </button>
          </div>
        </div>
      </details>
    </li>
  );
});

WorkEntry.displayName = 'WorkEntry';

export default WorkEntry;
