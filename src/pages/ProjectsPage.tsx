import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const yearOf = (project: (typeof projects)[number], i: number) => {
  if (project.year) return project.year;
  if (i === 0) return '2025';
  if (i === 1) return '2025';
  return '2024';
};

const ProjectsPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 120;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        <section className="px-5 sm:px-8 py-10 sm:py-12 border-b border-ink">
          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 mb-[14px]">
            <span className="bg-ink text-paper px-[10px] py-[3px]">Work</span>
            <span>{projects.length} builds</span>
            <span>2024 — Present</span>
          </div>
          <h1
            className="font-serif font-normal leading-[0.86] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}
          >
            Work.
          </h1>
          <p className="mt-[18px] max-w-[60ch] text-ink-2 text-[17px] leading-[1.55]">
            Selected work. Full-stack apps, AI integrations, and shipped tools, each one solved a real problem with
            modern architecture.
          </p>
        </section>

        {projects.map((project, i) => {
          const num = (i + 1).toString().padStart(2, '0');
          const slug = slugify(project.title);
          const href =
            project.websiteUrl && project.websiteUrl !== '#'
              ? project.websiteUrl
              : project.link && project.link !== '#'
                ? project.link
                : project.githubUrl || '#';
          return (
            <a
              key={project.title}
              id={slug}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-[80px_1fr_200px_160px_60px] items-center gap-4 md:gap-6 px-5 sm:px-7 py-7 sm:py-9 border-b border-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              <div className="font-mono text-[14px] font-bold tracking-[0.1em]">{num}</div>
              <div>
                <h2
                  className="font-serif font-normal leading-none tracking-[-0.03em] mb-2"
                  style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}
                >
                  {project.title.split(' ').map((word, idx, arr) => (
                    <span key={idx} className={idx === arr.length - 1 ? 'italic text-ink-3 group-hover:text-rule' : ''}>
                      {idx > 0 ? ' ' : ''}
                      {word}
                    </span>
                  ))}
                </h2>
                <p className="text-[15px] leading-[1.55] max-w-[60ch] text-ink-2 group-hover:text-rule">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-[6px] md:justify-end justify-start">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-[0.1em] uppercase border border-current px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase md:text-right text-left">
                <b className="block font-serif font-normal text-[24px] tracking-[-0.02em] normal-case mb-1">
                  {yearOf(project, i)}
                </b>
                <span>{project.link && project.link !== '#' ? 'Live' : 'Shipped'}</span>
              </div>
              <div className="font-serif text-[28px] md:text-right text-left tracking-[-0.02em]">→</div>
            </a>
          );
        })}

        <div className="px-5 sm:px-8 py-7 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center border-b border-ink font-mono text-xs tracking-[0.16em] uppercase">
          <Link to="/" className="border-b border-current pb-1">
            ← Back to Home
          </Link>
          <a
            href="https://github.com/AbdulWasih05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-current pb-1"
          >
            All repositories on GitHub →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
