import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';
import { Link, useParams } from 'react-router-dom';
import { liveUrl as liveUrlOf, projects, projectYear, repoUrl, slugify, thumbSrcSet } from '../data/projects';
import { useActiveEntry } from '@/hooks/useActiveEntry';
import { useResumeModal } from '../components/ResumeModal';
import { site } from '@/data/site';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NotFound from './NotFound';

const pad = (n: number) => n.toString().padStart(2, '0');
const firstSentence = (text: string) => text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// How far the reader is through the article, 0 to 1.
function useReadingProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref]);
  return progress;
}

// Case study, built to be read on a phone: a short header (outcome, links, screenshot), a TL;DR
// that answers everything in one screen, then short numbered sections. Phones get a sticky
// section strip; from lg, an "On this page" index with a gliding bar. Ends on the next case
// study and the résumé.
const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => slugify(p.title) === slug);
  const project = index >= 0 ? projects[index] : undefined;

  const { openResume, prefetchResume } = useResumeModal();
  const articleRef = useRef<HTMLElement>(null);
  const progress = useReadingProgress(articleRef);

  // The numbered sections; "The hard part" and "Results" only when the project has them.
  const sections = project
    ? [
        { id: 'problem', label: 'The problem', short: 'Problem' },
        { id: 'built', label: 'What I built', short: 'Built' },
        ...(project.hardPart
          ? [
              {
                id: 'hard-part',
                label: project.hardPartLabel ?? 'The hard part',
                short: project.hardPartLabel ?? 'Hard part',
              },
            ]
          : []),
        ...(project.impact.length ? [{ id: 'results', label: 'Results', short: 'Results' }] : []),
        { id: 'stack', label: 'Stack', short: 'Stack' },
      ]
    : [];
  const { refs, active } = useActiveEntry<HTMLElement>(sections.length);

  // Gliding bar beside the desktop index.
  const tocRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [bar, setBar] = useState({ y: 0, h: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const link = tocRefs.current[active];
      if (link) setBar({ y: link.offsetTop, h: link.offsetHeight });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, slug]);

  // Scroll to top whenever the case study changes (incl. next-project navigation).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!project) return <NotFound />;

  // Wraps around, so every case study ends with somewhere to go.
  const next = projects[(index + 1) % projects.length];

  const liveUrl = liveUrlOf(project);
  const codeUrl = repoUrl(project);
  const year = projectYear(project);
  const features = project.features;
  const words = [project.goal, project.challenge, project.approach, project.hardPart ?? '', ...features]
    .join(' ')
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  // TL;DR: the whole case in three lines, for readers who stop here.
  const tldr: [string, string][] = [
    ['Problem', firstSentence(project.challenge)],
    ['Built', firstSentence(project.approach)],
  ];
  if (project.impact.length) {
    tldr.push(['Result', project.impact.slice(0, 2).map((s) => `${s.value} ${s.label.toLowerCase()}`).join(' · ')]);
  }

  const path = `/projects/${slugify(project.title)}`;
  const canonical = `${site.url}${path}`;
  const ogImage = project.image ? `${site.url}${project.image}` : `${site.url}/og-image.jpg`;
  const author = { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: `${site.url}/` };

  // Per-project structured data: the case study, plus breadcrumbs back to the projects list.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.title,
        headline: `${project.title}: case study`,
        description: project.outcome ?? project.description,
        url: canonical,
        image: ogImage,
        ...(year ? { dateCreated: year } : {}),
        keywords: project.tech.join(', '),
        author,
        creator: author,
        ...(liveUrl ? { sameAs: [liveUrl] } : {}),
        ...(codeUrl ? { codeRepository: codeUrl } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
        ],
      },
    ],
  };

  const jumpTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };

  const at = (id: string) => sections.findIndex((s) => s.id === id);
  const sectionProps = (i: number) => ({
    id: sections[i].id,
    ref: (el: HTMLElement | null) => {
      refs.current[i] = el;
    },
    tabIndex: -1,
    'aria-labelledby': `${sections[i].id}-title`,
    className: 'scroll-mt-[140px] sm:scroll-mt-[152px] lg:scroll-mt-[108px] pt-12 first:pt-0 focus:outline-none',
  });
  const sectionHead = (i: number) => (
    <h2 id={`${sections[i].id}-title`} className="font-serif font-normal text-[28px] sm:text-[32px] leading-[1.1] tracking-[-0.02em]">
      <span className="mr-3 font-mono text-[12px] tracking-[0.1em] text-mute align-middle">{pad(i + 1)}</span>
      {sections[i].label}
    </h2>
  );
  const body = 'text-[17px] sm:text-[18px] leading-[1.7] text-ink-2 max-w-[64ch]';
  const lead = 'font-serif text-[21px] sm:text-[23px] leading-[1.45] text-ink max-w-[44ch]';

  return (
    <>
      <SEO
        title={`${project.title}: case study by ${site.name}`}
        description={`${project.outcome ?? firstSentence(project.description)} A case study by ${site.name}.`}
        path={path}
        image={ogImage}
        type="article"
        jsonLd={jsonLd}
      />

      {/* Reading progress, along the top edge. */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-ink"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="min-h-screen bg-paper text-ink">
        <Header />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {/* Header: where you are, the title, the one-line outcome, the links, the screenshot. */}
          {/* lg: text and screenshot side by side, so the TL;DR stays near the top. */}
          <header className="px-5 sm:px-8 pt-6 sm:pt-10 pb-10 sm:pb-12 border-b border-ink lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-12 lg:items-center">
            <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              <Link to="/projects" className="inline-flex items-center min-h-[44px] pr-1 hover:text-ink">
                ← Work
              </Link>
              {year && <span>· {year}</span>}
              {liveUrl && (
                <span className="text-ink">
                  · <span className="inline-block w-[6px] h-[6px] mb-[1px] mr-1 bg-ink" aria-hidden="true" />
                  Live
                </span>
              )}
              <span>· {minutes} min read</span>
            </p>
            <h1 className="mt-1 font-serif font-normal text-[44px] min-[390px]:text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="mt-4 max-w-[40ch] lg:max-w-[48ch] font-serif text-[21px] min-[390px]:text-[22px] lg:text-[26px] leading-[1.38] text-ink-2">
              {project.outcome ?? firstSentence(project.description)}
            </p>

            {(liveUrl || codeUrl) && (
              <div className="mt-6 flex border border-ink sm:w-max">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 flex items-center justify-between gap-4 px-4 sm:px-5 py-4 font-mono text-[13px] sm:text-xs tracking-[0.12em] uppercase bg-ink text-paper hover:bg-ink-3 active:translate-y-px transition-colors duration-150 sm:min-w-[200px]"
                  >
                    Try it live
                    <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex-1 flex items-center justify-between gap-4 px-4 sm:px-5 py-4 font-mono text-[13px] sm:text-xs tracking-[0.12em] uppercase ink-fill active:translate-y-px transition-colors duration-150 sm:min-w-[200px] ${
                      liveUrl ? 'border-l border-ink' : ''
                    }`}
                  >
                    Code
                    <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}

            </div>

            {project.image && (
              <div className="mt-8 sm:mt-10 lg:mt-0 max-w-[1000px] bg-paper-2 border border-ink p-[6px] md:p-[14px]">
                <picture>
                  {project.imageWebP && (
                    <source
                      type="image/webp"
                      srcSet={thumbSrcSet(project.imageWebP)}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  )}
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={1280}
                    height={610}
                    decoding="async"
                    className="block w-full aspect-[2.1/1] object-contain border border-ink bg-paper"
                  />
                </picture>
              </div>
            )}
          </header>

          <div className="px-5 sm:px-8 pt-10 sm:pt-12 pb-14 sm:pb-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-12">
            {/* Desktop: "On this page" with a gliding bar. */}
            <nav aria-label="On this page" className="hidden lg:block sticky top-[108px] self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">On this page</p>
              <div className="relative mt-4 border-l border-rule">
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 w-[3px] bg-ink transition-[transform,height] duration-300 ease-out motion-reduce:transition-none"
                  style={{ transform: `translateY(${bar.y}px)`, height: bar.h }}
                />
                <ol>
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        ref={(el) => (tocRefs.current[i] = el)}
                        href={`#${s.id}`}
                        onClick={(e) => jumpTo(e, s.id)}
                        aria-current={i === active ? 'location' : undefined}
                        className={`flex gap-3 py-2 pl-4 font-serif text-[18px] leading-[1.2] transition-colors duration-200 motion-reduce:transition-none hover:text-ink ${
                          i === active ? 'text-ink' : 'text-mute'
                        }`}
                      >
                        <span className="pt-[4px] font-mono text-[10px] tracking-[0.12em]">{pad(i + 1)}</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article ref={articleRef} className="min-w-0">
              {/* TL;DR: everything in one phone screen. */}
              <section aria-label="TL;DR" className="max-w-[760px] border border-ink bg-paper-2 px-4 sm:px-6 py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">TL;DR</p>
                <dl className="mt-2">
                  {tldr.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 py-3 border-t border-rule first:border-t-0">
                      <dt className="pt-[4px] font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{k}</dt>
                      <dd className="text-[16px] sm:text-[17px] leading-[1.55] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Phones and tablets: a sticky strip of the sections. */}
              <nav aria-label="Sections" className="lg:hidden sticky top-[72px] sm:top-[84px] z-10 bg-paper pt-6 pb-4">
                <div className="flex border border-ink overflow-x-auto">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => jumpTo(e, s.id)}
                      aria-current={i === active ? 'location' : undefined}
                      className={`flex-1 grid place-items-center min-h-[44px] px-2 border-l border-ink first:border-l-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-offset-[-3px] ${
                        i === active ? 'bg-ink text-paper' : 'hover:bg-paper-2'
                      }`}
                    >
                      {s.short}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="mt-6 lg:mt-14 max-w-[760px]">
                <section {...sectionProps(at('problem'))}>
                  {sectionHead(at('problem'))}
                  <p className={`mt-4 ${lead}`}>{project.goal}</p>
                  <p className={`mt-4 ${body}`}>{project.challenge}</p>
                </section>

                <section {...sectionProps(at('built'))}>
                  {sectionHead(at('built'))}
                  <p className={`mt-4 ${body}`}>{project.approach}</p>
                  {features.length > 0 && (
                    <ul className="mt-5 max-w-[64ch] border-t border-rule">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 py-3 border-b border-rule text-[16px] sm:text-[17px] leading-[1.6] text-ink"
                        >
                          <span className="mt-[10px] w-[6px] h-[6px] bg-ink" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {project.hardPart && (
                  <section {...sectionProps(at('hard-part'))}>
                    {sectionHead(at('hard-part'))}
                    <p className={`mt-4 pl-4 border-l-2 border-ink ${lead}`}>{project.hardPart}</p>
                  </section>
                )}

                {project.impact.length > 0 && (
                  <section {...sectionProps(at('results'))}>
                    {sectionHead(at('results'))}
                    <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 border-t border-l border-ink">
                      {project.impact.map((stat) => (
                        <div key={stat.label} className="min-w-0 px-4 py-4 border-r border-b border-ink flex flex-col-reverse">
                          <dt className="mt-2 font-mono text-[10px] leading-[1.3] uppercase tracking-[0.1em] text-mute">{stat.label}</dt>
                          <dd className="font-serif text-[26px] sm:text-[30px] leading-none tracking-[-0.02em] tabular-nums break-words">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}

                <section {...sectionProps(at('stack'))}>
                  {sectionHead(at('stack'))}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t} className="font-mono text-[11px] tracking-[0.1em] uppercase border border-ink px-2.5 py-1.5">
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          </div>

          {/* Ending: the next case study, and the résumé. */}
          <nav aria-label="Keep reading" className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] border-t border-b border-ink">
            <Link
              to={`/projects/${slugify(next.title)}`}
              className="group block px-5 sm:px-8 py-7 sm:py-8 border-b md:border-b-0 md:border-r border-ink hover:bg-paper-2 transition-colors duration-150"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Next case study</span>
              <span className="mt-2 flex items-baseline gap-3 font-serif text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.02em]">
                {next.title}
                <span className="text-[0.7em] text-ink-3 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
              {next.outcome && <span className="mt-2 block max-w-[56ch] text-[15px] leading-[1.55] text-ink-2">{next.outcome}</span>}
            </Link>
            <div className="px-5 sm:px-8 py-7 sm:py-8 flex flex-col justify-center gap-2">
              <button
                type="button"
                onClick={openResume}
                onPointerEnter={prefetchResume}
                onFocus={prefetchResume}
                onTouchStart={prefetchResume}
                className="group w-full md:w-auto inline-flex items-center justify-between gap-[14px] px-6 py-4 bg-ink text-paper font-mono text-xs uppercase tracking-[0.16em] hover:bg-ink-3 active:translate-y-px transition-colors duration-150"
              >
                View Résumé
                <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </button>
              <Link
                to="/projects"
                className="inline-flex items-center w-max min-h-[44px] font-mono text-[11px] uppercase tracking-[0.16em] border-b border-transparent hover:border-current"
              >
                All projects →
              </Link>
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;
