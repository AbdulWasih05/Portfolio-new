import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects, slugify } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NotFound from './NotFound';

const SITE = 'https://wasih.tech';

const hasUrl = (u?: string) => !!u && u !== '#';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => slugify(p.title) === slug);
  const project = index >= 0 ? projects[index] : undefined;

  // Scroll to top whenever the case study changes (incl. prev/next navigation).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!project) return <NotFound />;

  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  const liveUrl = hasUrl(project.websiteUrl)
    ? project.websiteUrl!
    : hasUrl(project.link)
      ? project.link
      : '';
  const codeUrl = hasUrl(project.githubUrl) ? project.githubUrl! : '';
  const year = project.year ?? '2025';
  const status = liveUrl ? 'Live' : 'Shipped';

  const initials = project.title
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase, e.g. VidyutMitra -> Vidyut Mitra
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const canonical = `${SITE}/projects/${slugify(project.title)}`;
  const ogImage = project.image ? `${SITE}${project.image}` : `${SITE}/og-image.jpg`;

  // Per-project structured data for richer search results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: `${project.title} - Case Study`,
    description: project.description,
    url: canonical,
    image: ogImage,
    dateCreated: year,
    keywords: project.tech.join(', '),
    author: { '@type': 'Person', name: 'Abdul Wasih', url: SITE },
    creator: { '@type': 'Person', name: 'Abdul Wasih', url: SITE },
  };

  return (
    <>
      <SEO
        title={`${project.title} - Case Study | Abdul Wasih`}
        description={project.description}
        url={canonical}
        image={ogImage}
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Header />

        <main>
          {/* Breadcrumb strip */}
          <section className="px-5 sm:px-8 pt-9 sm:pt-12 pb-0">
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              <span className="bg-ink text-paper px-[10px] py-[3px]">Case Study</span>
              <Link to="/projects" className="hover:text-ink transition-colors">
                Work
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">{project.title}</span>
              <span aria-hidden>·</span>
              <span>{year}</span>
              <span aria-hidden>·</span>
              <span>{status}</span>
            </div>
          </section>

          {/* Title + lead + CTAs */}
          <section className="px-5 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14 border-b border-ink">
            <h1
              className="font-serif font-normal leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(48px, 9vw, 132px)' }}
            >
              {project.title
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .split(' ')
                .map((word, idx, arr) => (
                  <span key={idx} className={idx === arr.length - 1 && arr.length > 1 ? 'italic text-ink-3' : ''}>
                    {idx > 0 ? ' ' : ''}
                    {word}
                  </span>
                ))}
            </h1>

            <p className="mt-6 sm:mt-8 max-w-[62ch] text-ink-2 text-[18px] sm:text-[20px] leading-[1.6]">
              {project.description}
            </p>

            {/* Meta row */}
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5 font-mono text-[11px] uppercase tracking-[0.16em]">
              <div>
                <dt className="text-mute mb-[6px]">Year</dt>
                <dd className="text-ink text-[13px]">{year}</dd>
              </div>
              <div>
                <dt className="text-mute mb-[6px]">Status</dt>
                <dd className="text-ink text-[13px]">{status}</dd>
              </div>
              <div>
                <dt className="text-mute mb-[6px]">Stack</dt>
                <dd className="text-ink text-[13px]">{project.tech.slice(0, 3).join(' · ')}</dd>
              </div>
            </dl>

            {/* CTAs */}
            {(liveUrl || codeUrl) && (
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-[18px] px-5 py-4 font-mono text-xs tracking-[0.12em] uppercase bg-ink text-paper hover:bg-ink-3 transition-colors duration-150 sm:min-w-[220px]"
                  >
                    <span>Visit Live</span>
                    <span className="text-base">→</span>
                  </a>
                )}
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-[18px] px-5 py-4 font-mono text-xs tracking-[0.12em] uppercase border border-ink hover:bg-ink hover:text-paper transition-colors duration-150 sm:min-w-[220px]"
                  >
                    <span>View Code</span>
                    <span className="text-base">↗</span>
                  </a>
                )}
              </div>
            )}
          </section>

          {/* Cover image — floating product shot on an aesthetic backdrop */}
          <section className="border-b border-ink">
            <div className="relative aspect-[16/9] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 55%), radial-gradient(100% 110% at 50% 120%, rgba(184,181,173,0.4) 0%, rgba(184,181,173,0) 60%), linear-gradient(160deg, #F5F2EC 0%, #EAE6DD 55%, #DFDACF 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 120px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.55)',
                }}
              />
              {project.image ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 lg:p-16">
                  <picture className="contents">
                    {project.imageWebP && <source type="image/webp" srcSet={project.imageWebP} />}
                    <img
                      src={project.image}
                      alt={`${project.title} - product screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-[10px] border border-ink/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
                    />
                  </picture>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-ink-3/55 leading-none tracking-[-0.02em] select-none"
                    style={{ fontSize: 'clamp(72px, 16vw, 220px)' }}
                  >
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* The Goal */}
          <section className="px-5 sm:px-8 py-12 sm:py-16 lg:py-20 border-b border-ink">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-6">The Goal</h2>
            <p className="max-w-[68ch] font-serif text-[24px] sm:text-[30px] leading-[1.4] tracking-[-0.01em] text-ink">
              {project.goal}
            </p>
          </section>

          {/* Impact band */}
          {project.impact.length > 0 && (
            <section className="border-b border-ink">
              <h2 className="sr-only">Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {project.impact.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-5 sm:px-8 py-10 sm:py-14 ${
                      i < project.impact.length - 1
                        ? 'border-b sm:border-b-0 sm:border-r border-ink'
                        : ''
                    }`}
                  >
                    <div className="font-serif font-normal tracking-[-0.02em] leading-none text-ink"
                      style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenge → Approach */}
          <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
            <div className="px-5 sm:px-8 py-12 sm:py-16 border-b md:border-b-0 md:border-r border-ink">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-6">The Challenge</h2>
              <p className="max-w-[52ch] text-ink-2 text-[17px] sm:text-[18px] leading-[1.7]">
                {project.challenge}
              </p>
            </div>
            <div className="px-5 sm:px-8 py-12 sm:py-16">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-6">The Approach</h2>
              <p className="max-w-[52ch] text-ink-2 text-[17px] sm:text-[18px] leading-[1.7]">
                {project.approach}
              </p>
            </div>
          </section>

          {/* Features */}
          {project.features.length > 0 && (
            <section className="px-5 sm:px-8 py-12 sm:py-16 lg:py-20 border-b border-ink">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-8 sm:mb-10">
                Key Features
              </h2>
              <ol className="max-w-[72ch]">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[44px_1fr] sm:grid-cols-[64px_1fr] gap-3 sm:gap-6 items-baseline py-5 sm:py-6 border-t border-dashed border-rule first:border-t-0"
                  >
                    <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.1em] text-mute pt-1">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-ink text-[16px] sm:text-[18px] leading-[1.6]">{feature}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Tech stack */}
          <section className="px-5 sm:px-8 py-12 sm:py-16 border-b border-ink">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-8">Built With</h2>
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[11px] tracking-[0.1em] uppercase border border-ink px-3 py-[6px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Prev / Next + back */}
          <nav className="grid grid-cols-1 md:grid-cols-3 border-b border-ink font-mono text-[11px] uppercase tracking-[0.16em]">
            <div className="px-5 sm:px-8 py-7 border-b md:border-b-0 md:border-r border-ink">
              {prev ? (
                <Link to={`/projects/${slugify(prev.title)}`} className="group block hover:text-ink-3 transition-colors">
                  <span className="text-mute">← Previous</span>
                  <span className="block mt-2 font-serif text-[20px] tracking-[-0.01em] normal-case text-ink group-hover:text-ink-3">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span className="text-rule">← Previous</span>
              )}
            </div>

            <div className="px-5 sm:px-8 py-7 flex items-center justify-center border-b md:border-b-0 md:border-r border-ink">
              <Link to="/projects" className="border-b border-current pb-1 hover:text-ink-3 transition-colors">
                All Projects
              </Link>
            </div>

            <div className="px-5 sm:px-8 py-7 md:text-right">
              {next ? (
                <Link to={`/projects/${slugify(next.title)}`} className="group block hover:text-ink-3 transition-colors">
                  <span className="text-mute">Next →</span>
                  <span className="block mt-2 font-serif text-[20px] tracking-[-0.01em] normal-case text-ink group-hover:text-ink-3">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span className="text-rule">Next →</span>
              )}
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;
