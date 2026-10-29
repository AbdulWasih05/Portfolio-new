import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pixel404, { type Mood } from '../components/Pixel404';
import { useResumeModal } from '../components/ResumeModal';
import { featuredProjects as quickLinks, projects, slugify } from '../data/projects';

const pad = (n: number) => n.toString().padStart(2, '0');

const ctaBase =
  'flex-1 flex items-center justify-between gap-[18px] px-5 py-4 font-mono text-xs tracking-[0.12em] uppercase transition-colors duration-150 min-w-0 sm:min-w-[200px]';
const ctaDivider = 'sm:border-r border-ink border-b sm:border-b-0';

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openResume, prefetchResume } = useResumeModal();
  // React Router stores the history index in history.state; 0 means this tab landed here directly.
  const canGoBack = typeof window !== 'undefined' && (window.history.state?.idx ?? 0) > 0;

  // The face looks surprised when the page opens, then settles; it smiles while a way out is hovered or focused.
  const [mood, setMood] = useState<Mood>('surprised');
  const cheer = {
    onPointerOver: () => setMood('happy'),
    onPointerLeave: () => setMood('neutral'),
    onFocus: () => setMood('happy'),
    onBlur: () => setMood('neutral'),
  };

  useEffect(() => {
    const t = window.setTimeout(() => setMood((m) => (m === 'surprised' ? 'neutral' : m)), 900);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>404. Page not found | Abdul Wasih</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Header />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <section className="px-5 sm:px-8 py-10 sm:py-14 border-b border-ink flex flex-col items-center text-center bg-[radial-gradient(#B8B5AD_1px,transparent_1px)] [background-size:18px_18px]">
            <div className="w-full max-w-[440px] text-ink">
              <Pixel404 mood={mood} />
            </div>

            <h1 className="sr-only">404. Page not found</h1>

            <p className="mt-6 max-w-[56ch] [text-wrap:balance] font-mono text-sm sm:text-base leading-[1.6] text-ink-3">
              Nothing lives at <b className="text-ink font-semibold [overflow-wrap:anywhere]">{pathname}</b>. The link may be old or
              mistyped, but the good stuff is one click away.
            </p>

            <div
              {...cheer}
              className="mt-7 w-full max-w-[720px] flex flex-col sm:flex-row flex-wrap border-t border-b border-ink text-left bg-paper"
            >
              <Link to="/" className={`${ctaBase} ${ctaDivider} bg-ink text-paper hover:bg-ink-3`}>
                <span>Back to Home</span>
                <span className="text-base">→</span>
              </Link>
              <button
                type="button"
                onClick={openResume}
                onPointerEnter={prefetchResume}
                onFocus={prefetchResume}
                onTouchStart={prefetchResume}
                className={`${ctaBase} ${canGoBack ? ctaDivider : ''} ink-fill`}
              >
                <span>View Résumé</span>
                <span className="text-base">↗</span>
              </button>
              {canGoBack && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className={`${ctaBase} ink-fill`}
                >
                  <span>Go Back</span>
                  <span className="text-base">←</span>
                </button>
              )}
            </div>
          </section>

          {/* A way back in: the top projects as compact rows (same look as /projects). */}
          <section aria-labelledby="try-title" className="px-5 sm:px-8 pt-10 sm:pt-12 pb-10 sm:pb-12 border-b border-ink">
            <div className="max-w-[760px] mx-auto">
              <h2
                id="try-title"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute flex items-center gap-[10px]"
              >
                <span className="w-6 h-px bg-ink" />
                Or start with one of these
              </h2>
              <ol {...cheer} className="mt-4 border-t border-ink">
                {quickLinks.map((project) => (
                  <li key={project.title} className="border-b border-ink">
                    <Link
                      to={`/projects/${slugify(project.title)}`}
                      className="group grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)] gap-4 sm:gap-6 items-center py-4 transition-colors duration-150 hover:bg-paper-2"
                    >
                      <span className="block bg-paper-2 border border-ink p-[3px]">
                        {project.image && (
                          <picture>
                            {project.imageWebP && <source type="image/webp" srcSet={project.imageWebP} />}
                            <img
                              src={project.image}
                              alt=""
                              width={1280}
                              height={610}
                              loading="lazy"
                              decoding="async"
                              className="block w-full aspect-[2.1/1] object-contain border border-ink bg-paper"
                            />
                          </picture>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] group-hover:underline decoration-1 underline-offset-[5px]">
                          {project.title}
                          <span
                            className="ml-2 inline-block text-[0.7em] text-ink-3 transition-transform duration-150 group-hover:translate-x-1"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-1 text-[14px] sm:text-[15px] leading-[1.5] text-ink-2 line-clamp-2">
                          {project.outcome ?? project.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                to="/projects"
                className="group mt-2 inline-flex items-center gap-2 min-h-[44px] font-mono text-xs uppercase tracking-[0.16em] border-b border-ink hover:text-ink-3"
              >
                All projects ({pad(projects.length)})
                <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
