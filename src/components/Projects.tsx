import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects, projects, slugify } from '../data/projects';
import { useActiveEntry } from '@/hooks/useActiveEntry';
import WorkEntry from './WorkEntry';

const pad = (n: number) => n.toString().padStart(2, '0');

// Jump to an entry without adding a history entry; the hash href keeps it working without JS.
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const jumpTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
};

// Home page "Selected Work". Phones (base): intro, a sticky 01–0N strip under the header,
// stacked entries. md: entries become two columns. lg: a sticky "On this page" index with
// a gliding bar sits in a 220px left column, and the strip goes away.
const Projects = () => {
  const list = featuredProjects;
  const total = pad(projects.length);
  const { refs, active } = useActiveEntry<HTMLLIElement>(list.length);

  // Gliding bar: follows the active index link (position + height).
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
  }, [active]);

  const idOf = (title: string) => `project-${slugify(title)}`;

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-[72px] sm:scroll-mt-[84px] border-b border-ink">
      <div className="px-5 sm:px-8 pt-14 pb-14 md:pt-20 md:pb-20 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-12">
        {/* Intro. DRAFT copy: owner to review (guide line). */}
        <header className="lg:col-span-2">
          <h2
            id="projects-title"
            className="font-serif font-normal text-[48px] min-[390px]:text-[52px] md:text-[64px] lg:text-[84px] leading-none tracking-[-0.03em]"
          >
            Selected Work.
          </h2>
          <p className="mt-4 lg:mt-5 max-w-[40ch] lg:max-w-[64ch] [text-wrap:balance] font-serif text-[20px] min-[390px]:text-[21px] lg:text-[26px] leading-[1.38] text-ink-2">
            Each entry: what it is, whether it shipped, the proof, and the hardest call.
          </p>
        </header>

        {/* Desktop index */}
        <nav aria-label="Projects on this page" className="hidden lg:block lg:col-start-1 lg:row-start-2 mt-16 sticky top-[108px] self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">On this page</p>
          <div className="relative mt-4 border-l border-rule">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 w-[3px] bg-ink transition-[transform,height] duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `translateY(${bar.y}px)`, height: bar.h }}
            />
            <ol>
              {list.map((p, i) => (
                <li key={p.title}>
                  <a
                    ref={(el) => (tocRefs.current[i] = el)}
                    href={`#${idOf(p.title)}`}
                    onClick={(e) => jumpTo(e, idOf(p.title))}
                    aria-current={i === active ? 'location' : undefined}
                    className={`block py-2.5 pl-4 font-serif text-[18px] leading-[1.15] transition-colors duration-200 motion-reduce:transition-none hover:text-ink ${
                      i === active ? 'text-ink' : 'text-mute'
                    }`}
                  >
                    <span className="block mb-0.5 font-mono text-[10px] tracking-[0.12em]">{pad(i + 1)}.</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 mt-8 min-h-[44px] font-mono text-xs uppercase tracking-[0.16em] border-b border-ink hover:text-ink-3"
          >
            All projects ({total})
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </nav>

        {/* Strip (below lg) + entries */}
        <div className="mt-10 lg:mt-16 lg:col-start-2 lg:row-start-2 min-w-0">
          <nav
            aria-label="Projects in this section"
            className="lg:hidden sticky top-[72px] sm:top-[84px] z-10 bg-paper pb-4"
          >
            <div className="grid border border-ink" style={{ gridTemplateColumns: `repeat(${list.length}, minmax(0, 1fr))` }}>
              {list.map((p, i) => (
                <a
                  key={p.title}
                  href={`#${idOf(p.title)}`}
                  onClick={(e) => jumpTo(e, idOf(p.title))}
                  aria-label={`${pad(i + 1)}: ${p.title}`}
                  aria-current={i === active ? 'location' : undefined}
                  className={`grid place-items-center min-h-[44px] border-l border-ink first:border-l-0 font-mono text-xs tracking-[0.12em] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-offset-[-3px] ${
                    i === active ? 'bg-ink text-paper' : 'hover:bg-paper-2'
                  }`}
                >
                  {pad(i + 1)}
                </a>
              ))}
            </div>
          </nav>

          <ol className="md:border md:border-ink">
            {list.map((p, i) => (
              <WorkEntry key={p.title} ref={(el) => (refs.current[i] = el)} project={p} index={i} eager={i === 0} />
            ))}
          </ol>

          <Link
            to="/projects"
            className="lg:hidden group flex justify-between items-center mt-12 min-h-[60px] px-4 sm:px-5 border border-ink font-mono text-[13px] sm:text-xs uppercase tracking-[0.12em] ink-fill transition-colors duration-150"
          >
            <span>All projects ({total})</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
