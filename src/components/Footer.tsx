import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { useResumeModal } from './ResumeModal';
import CopyEmail from './CopyEmail';

const Footer = () => {
  const { openResume, prefetchResume } = useResumeModal();

  // The sign-off grins once the reader has actually reached the end of the page: the line has
  // to be fully on screen for a moment first, so ":)" gets read before it turns into ":D".
  const endRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const el = endRef.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer);
        if (e.intersectionRatio >= 0.99) timer = window.setTimeout(() => setAtEnd(true), 900);
        else setAtEnd(false);
      },
      { threshold: [0, 0.99] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <footer className="on-ink relative isolate overflow-hidden bg-ink text-paper border-t-4 border-ink">
      {/* Background: a dark mountain photo anchored to the bottom, faded in from the top so it
          melts into the ink. Dimmed so the text above stays readable.
          Photo: from wallpapers.com, kept by the owner's choice. */}
      <picture>
        <source type="image/webp" srcSet="/footer-horizon.webp" />
        <img
          src="/footer-horizon.jpg"
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 bottom-0 -z-10 w-full h-[62%] md:h-[85%] object-cover object-[50%_70%] opacity-55 [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
        />
      </picture>
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] border-b border-[#2a2a2a]/70">
        <div className="px-5 sm:px-8 py-12 md:border-r border-[#2a2a2a] border-b md:border-b-0">
          <h2
            className="font-serif font-normal leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Hiring an <span className="text-rule">engineer?</span>
            <br />
            Let&apos;s talk.
          </h2>
          <p className="text-rule mt-[18px] max-w-[48ch] leading-[1.55]">
            Open to software engineering roles. Remote, or on the ground in Bangalore.
          </p>
          <CopyEmail tone="dark" className="mt-6" emailClassName="font-serif text-[22px] sm:text-[28px]" />
        </div>

        <div className="px-5 sm:px-8 py-12 md:border-r border-[#2a2a2a] border-b md:border-b-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-rule mb-[18px]">Navigation</div>
          <div className="grid gap-3 font-serif text-[20px] sm:text-[24px]">
            {[
              { label: 'Work', num: '01', href: '/#projects' },
              { label: 'Experience', num: '02', href: '/#experience' },
              { label: 'About', num: '03', href: '/#about' },
              { label: 'All projects', num: '04', href: '/projects' },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="flex justify-between items-baseline gap-[10px] min-h-[44px] border-b border-[#2a2a2a] pb-[10px] transition-colors duration-150 hover:text-rule"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[11px] text-rule">{l.num}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-8 py-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-rule mb-[18px]">Connect</div>
          <div className="grid gap-3 font-serif text-[20px] sm:text-[24px]">
            <button
              type="button"
              onClick={openResume}
              onPointerEnter={prefetchResume}
              onFocus={prefetchResume}
              onTouchStart={prefetchResume}
              className="flex w-full justify-between items-baseline gap-[10px] min-h-[44px] border-b border-[#2a2a2a] pb-[10px] text-left transition-colors duration-150 hover:text-rule"
            >
              <span>View Résumé</span>
              <span className="font-mono text-[11px] text-rule">↗</span>
            </button>
            {[
              { label: 'GitHub', sym: '↗', href: site.github },
              { label: 'LinkedIn', sym: '↗', href: site.linkedin },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-baseline gap-[10px] min-h-[44px] border-b border-[#2a2a2a] pb-[10px] transition-colors duration-150 hover:text-rule"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[11px] text-rule">{l.sym}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={endRef}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 px-5 sm:px-8 pt-10 sm:pt-12 pb-4 sm:pb-[10px] font-mono text-[11px] uppercase tracking-[0.18em] text-rule"
      >
        <div>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </div>
        <div className="flex items-center gap-3">
          <span>
            End of page{' '}
            <span
              aria-hidden="true"
              className={`inline-block transition-[transform,color] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${atEnd ? 'scale-125 -rotate-[8deg] text-paper' : ''}`}
            >
              {atEnd ? ':D' : ':)'}
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <button type="button" onClick={toTop} className="inline-flex items-center min-h-[44px] uppercase tracking-[0.18em] hover:text-paper transition-colors duration-150">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
