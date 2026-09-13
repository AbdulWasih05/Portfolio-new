import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Pixel404, { type Mood } from '../components/Pixel404';
import { useResumeModal } from '../components/ResumeModal';
import { projects, slugify, type Project } from '../data/projects';

// Hand-picked escape routes for dead links, by project slug. Edit to change what the 404 recommends.
const QUICK_LINK_SLUGS = ['ijestm-journal-platform', 'vidyutmitra', 'real-estate-platform'];

const quickLinks = QUICK_LINK_SLUGS
  .map((slug) => projects.find((p) => slugify(p.title) === slug))
  .filter((p): p is Project => Boolean(p));

const pad = (n: number) => n.toString().padStart(2, '0');

const ctaBase =
  'flex-1 flex items-center justify-between gap-[18px] px-5 py-4 font-mono text-xs tracking-[0.12em] uppercase transition-colors duration-150 min-w-0 sm:min-w-[200px]';
const ctaDivider = 'sm:border-r border-ink border-b sm:border-b-0';

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openResume, prefetchResume } = useResumeModal();
  // React Router stores the history index in history.state; 0 means this tab landed here directly.
  const canGoBack = (window.history.state?.idx ?? 0) > 0;

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

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', pathname);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>404. Page not found | Abdul Wasih</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Header />

        <main id="main-content">
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
                className={`${ctaBase} ${canGoBack ? ctaDivider : ''} hover:bg-ink hover:text-paper`}
              >
                <span>View Résumé</span>
                <span className="text-base">↗</span>
              </button>
              {canGoBack && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className={`${ctaBase} hover:bg-ink hover:text-paper`}
                >
                  <span>Go Back</span>
                  <span className="text-base">←</span>
                </button>
              )}
            </div>
          </section>

          {/* Best work — same cards as the landing page */}
          <section className="px-5 sm:px-8 pt-8 sm:pt-10 pb-0">
            <div className="flex flex-col items-center text-center gap-3 border-b-4 border-ink pb-[14px]">
              <h2
                className="font-serif font-normal leading-none tracking-[-0.02em]"
                style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
              >
                Try <span className="text-ink-3">these</span> instead.
              </h2>
              <Link
                to="/projects"
                className="font-mono text-xs uppercase tracking-[0.16em] border-b border-ink pb-1 hover:text-ink-3"
              >
                All projects ({pad(projects.length)}) →
              </Link>
            </div>
          </section>

          <div {...cheer} className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
            {quickLinks.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                num={pad(projects.indexOf(project) + 1)}
                className={i < quickLinks.length - 1 ? 'md:border-r border-ink border-b md:border-b-0' : ''}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
