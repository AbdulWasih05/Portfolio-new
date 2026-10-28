import { Link } from 'react-router-dom';
import { liveUrl, projects, projectYear, repoUrl, slugify, type Project } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { site } from '@/data/site';

// Up to four stack items: the curated tags first, else the start of the full tech list.
const stackOf = (p: Project) => (p.tags?.length ? p.tags : p.tech).slice(0, 4);

const linkClass =
  'relative z-[1] inline-flex items-center min-h-[44px] font-mono text-[11px] uppercase tracking-[0.12em] border-b border-transparent hover:border-current';

// Live, Code and Case study, only where each one exists. Sits above the row's stretched link.
// The index rows already link the title to the case study, so they leave that one out.
const ProjectLinks = ({ project, slug, caseStudy = true }: { project: Project; slug: string; caseStudy?: boolean }) => {
  const live = liveUrl(project);
  const repo = repoUrl(project);
  if (!live && !repo && !caseStudy) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-5">
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live ↗<span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Code ↗<span className="sr-only">: {project.title} source (opens in a new tab)</span>
        </a>
      )}
      {caseStudy && (
        <Link to={`/projects/${slug}`} className={linkClass}>
          Case study →<span className="sr-only">: {project.title}</span>
        </Link>
      )}
    </p>
  );
};

const Stack = ({ project }: { project: Project }) => (
  <ul className="flex flex-wrap font-mono text-[11px] leading-[1.7] uppercase tracking-[0.1em] text-ink-3">
    {stackOf(project).map((t, i, all) => (
      <li key={t}>
        {t}
        {i < all.length - 1 && (
          <span className="text-rule px-[0.45em]" aria-hidden="true">
            ·
          </span>
        )}
      </li>
    ))}
  </ul>
);

// Newest first; projects without a year keep their data-file order at the end.
const byNewest = [...projects].sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));

// /projects: every build as one equal, compact row (thumbnail, title, outcome, stack, links).
// The home page tells the story of three; this page is the full list to scan and compare.
// Each row opens its case study (stretched title link); Live and Code sit above it.
// DRAFT copy: owner to review (intro line).
const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SEO
        title="Projects by Abdul Wasih"
        description="Every project Abdul Wasih has built: full-stack apps, payments, realtime systems and AI features, each with a short case study."
        path="/projects"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Projects by ${site.name}`,
          url: `${site.url}/projects`,
          author: { '@id': `${site.url}/#person` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: byNewest.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              url: `${site.url}/projects/${slugify(p.title)}`,
            })),
          },
        }}
      />
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <header className="px-5 sm:px-8 pt-14 pb-10 sm:pt-16 sm:pb-12 border-b border-ink">
          <h1 className="font-serif font-normal text-[56px] min-[390px]:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.9] tracking-[-0.04em]">
            Work.
          </h1>
          <p className="mt-5 max-w-[40ch] lg:max-w-[52ch] font-serif text-[20px] min-[390px]:text-[21px] lg:text-[26px] leading-[1.38] text-ink-2">
            Everything I&apos;ve built, newest first. Each one opens a case study.
          </p>
        </header>

        <ol className="border-b border-ink">
          {byNewest.map((project, i) => {
            const slug = slugify(project.title);
            const year = projectYear(project);
            const live = liveUrl(project);
            return (
              <li
                key={project.title}
                id={slug}
                className="group relative grid grid-cols-[112px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)_72px] gap-x-4 md:gap-x-8 gap-y-4 px-5 sm:px-8 py-7 md:py-8 border-b border-ink last:border-b-0 transition-colors duration-150 hover:bg-paper-2"
              >
                {/* Thumbnail: decorative here, the title carries the link. */}
                <div className="md:row-span-3 self-start bg-paper-2 border border-ink p-[3px] md:p-[6px]">
                  {!project.image && (
                    <div className="flex items-center justify-center aspect-[2.1/1] border border-ink bg-paper font-serif text-[20px] md:text-[28px] tracking-[-0.02em] text-ink-3">
                      {project.title}
                    </div>
                  )}
                  {project.image && (
                    <picture>
                      {project.imageWebP && <source type="image/webp" srcSet={project.imageWebP} />}
                      <img
                        src={project.image}
                        alt=""
                        width={1280}
                        height={610}
                        loading={i < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="block w-full aspect-[2.1/1] object-contain border border-ink bg-paper"
                      />
                    </picture>
                  )}
                </div>

                <div className="min-w-0 self-center md:self-start">
                  <h2 className="font-serif font-normal text-[24px] min-[390px]:text-[26px] md:text-[34px] leading-[1.05] tracking-[-0.02em]">
                    {/* Stretched link: the whole row opens the case study. */}
                    <Link
                      to={`/projects/${slug}`}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:underline decoration-1 underline-offset-[5px]"
                    >
                      {/* The arrow stays on the line with the last word. */}
                      {project.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="whitespace-nowrap">
                        {project.title.split(' ').slice(-1)}
                        <span
                          className="ml-2 inline-block text-[0.7em] text-ink-3 transition-transform duration-150 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </h2>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                    {year && <span className="md:hidden">{year}</span>}
                    {year && live && <span className="md:hidden"> · </span>}
                    {live && (
                      <span className="text-ink">
                        <span className="inline-block w-[6px] h-[6px] mb-[1px] mr-1 bg-ink" aria-hidden="true" />
                        Live
                      </span>
                    )}
                  </p>
                </div>

                <div className="col-span-2 md:col-span-1 md:col-start-2 min-w-0">
                  <p className="font-serif text-[18px] md:text-[20px] leading-[1.4] text-ink-2 max-w-[56ch]">
                    {project.outcome ?? project.description}
                  </p>
                  <div className="mt-3">
                    <Stack project={project} />
                  </div>
                  <ProjectLinks project={project} slug={slug} caseStudy={false} />
                </div>

                <span className="hidden md:block md:col-start-3 md:row-start-1 pt-[10px] text-right font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  {year ?? ''}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="px-5 sm:px-8 py-9 sm:py-7 flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between items-start sm:items-center border-b border-ink font-mono text-xs tracking-[0.16em] uppercase">
          <Link to="/" className="relative border-b border-current pb-1 after:absolute after:inset-x-0 after:-inset-y-3 after:content-['']">
            ← Back to Home
          </Link>
          <a
            href="https://github.com/AbdulWasih05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="relative border-b border-current pb-1 after:absolute after:inset-x-0 after:-inset-y-3 after:content-['']"
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
