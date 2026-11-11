import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '@/data/site';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useResumeModal } from './ResumeModal';
import CopyEmail from './CopyEmail';

// Each item is a section of the home page.
const navItems = [
  { num: '01', label: 'Work', id: 'projects' },
  { num: '02', label: 'Experience', id: 'experience' },
  { num: '03', label: 'About', id: 'about' },
];

const Header = () => {
  const { pathname } = useLocation();
  const { openResume, prefetchResume } = useResumeModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useHashScroll();

  // On the home page, the section crossing the middle of the viewport is the current one.
  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setActiveSection((cur) => (entry.isIntersecting ? id : cur === id ? '' : cur));
        });
      },
      { rootMargin: '-45% 0px -55% 0px' },
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isCurrent = (item: typeof navItems[number]) => {
    if (pathname.startsWith('/projects')) return item.id === 'projects';
    if (pathname === '/') return item.id === activeSection;
    return false;
  };

  const resumeHandlers = {
    onPointerEnter: prefetchResume,
    onFocus: prefetchResume,
    onTouchStart: prefetchResume,
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-ink focus:text-paper focus:px-4 focus:py-3 font-mono text-xs uppercase tracking-[0.12em]"
      >
        Skip to content
      </a>

      {/* Nav. The home link's accessible name is its visible text plus a screen-reader-only
          ", home", so voice-control users can say what they see. */}
      <header className="flex items-stretch justify-between border-b-4 border-ink bg-paper sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-[14px] px-5 sm:px-[28px] py-3 sm:py-[18px] text-left min-w-0"
        >
          {/* Same mark as the favicon (public/icon.svg). */}
          <img src="/icon.svg" alt="" width={44} height={44} className="w-11 h-11 shrink-0" />

          <span className="font-serif text-[22px] leading-none truncate">
            {site.name}
            <small className="block font-mono text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 not-italic truncate">
              {site.role}
            </small>
          </span>
          <span className="sr-only">, home</span>
        </Link>

        <button
          type="button"
          className="md:hidden bg-ink text-paper px-[22px] font-mono tracking-[0.14em] uppercase text-xs shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? '× Close' : '☰ Menu'}
        </button>

        <nav className="hidden md:flex items-stretch" aria-label="Main">
          {navItems.map((item) => {
            const current = isCurrent(item);
            return (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={`flex px-5 lg:px-7 items-center gap-[10px] border-l border-ink font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 ink-fill ${
                  current ? 'bg-ink text-paper' : ''
                }`}
              >
                <span className="hidden lg:inline text-[11px] opacity-60">{item.num}</span>
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openResume}
            {...resumeHandlers}
            className="group flex px-5 lg:px-7 items-center gap-[10px] border-l border-ink bg-ink text-paper font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 hover:bg-ink-3"
          >
            Résumé
            <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </button>
        </nav>
      </header>

      {/* Mobile menu drawer. `inert` keeps it out of the tab order while it's off-screen
          (spread in because React 18's types don't know the attribute). */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        {...(menuOpen ? {} : { inert: '' })}
        className={`md:hidden fixed inset-0 bg-paper z-[60] flex flex-col border-t-4 border-ink transition-transform duration-200 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-stretch border-b-4 border-ink">
          <div className="flex items-center px-5 py-[18px] flex-1">
            <div aria-hidden="true" className="h-11 w-11"></div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="bg-ink text-paper px-[22px] font-mono tracking-[0.14em] uppercase text-xs shrink-0"
          >
            × Close
          </button>
        </div>
        <nav className="flex-1 flex flex-col overflow-y-auto" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="border-b border-ink px-5 py-7 text-left flex justify-between items-end active:bg-paper-2 transition-colors"
            >
              <span className="font-serif font-normal text-[48px] leading-[0.85] tracking-[-0.02em] uppercase">
                {item.label}
              </span>
              <span className="font-mono text-sm opacity-60 mb-1 uppercase tracking-[0.1em]">{item.num}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-ink">
          <div className="px-5 py-5">
            <CopyEmail emailClassName="font-serif text-[20px]" />
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openResume();
            }}
            {...resumeHandlers}
            className="flex justify-between items-center w-full bg-ink text-paper px-5 py-[26px] font-mono uppercase tracking-[0.16em] text-[13px] active:bg-ink-3 transition-colors"
          >
            <span>View Résumé</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
