import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { num: '01', label: 'Home', target: 'hero', route: '/' },
  { num: '02', label: 'Work', target: 'projects', route: '/projects' },
  { num: '03', label: 'About', target: 'about', route: '/' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveSection('projects');
      return;
    }

    const handleScroll = () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If about section comes into the top half of the screen, mark as active
        if (rect.top <= window.innerHeight * 0.5) {
          setActiveSection('about');
        } else {
          setActiveSection('hero');
        }
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100; // Account for the sticky header height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.state && (location.state as any).targetId) {
      const id = (location.state as any).targetId;
      setTimeout(() => scrollToSection(id), 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleClick = (item: typeof navItems[number]) => {
    setMenuOpen(false);
    if (item.target === 'projects' && item.route === '/projects') {
      navigate('/projects');
      return;
    }
    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: item.target } });
      return;
    }
    scrollToSection(item.target);
  };

  const isCurrent = (item: typeof navItems[number]) => {
    if (location.pathname === '/projects') return item.target === 'projects';
    if (location.pathname === '/') return item.target === activeSection;
    return false;
  };

  return (
    <>
      {/* Meta strip */}
      <div className="grid grid-cols-2 border-b border-ink font-mono text-[11px] uppercase tracking-[0.06em]">
        <div className="px-[18px] py-[10px] border-r border-ink">
          <span className="inline-block w-[7px] h-[7px] bg-ink rounded-full mr-2 align-middle blink-dot" />
          Karnataka, IN
        </div>
        <div className="px-[18px] py-[10px] text-right">UTC+5:30</div>
      </div>

      {/* Nav */}
      <header className="flex items-stretch justify-between lg:grid lg:grid-cols-[1fr_340px] border-b-4 border-ink bg-paper sticky top-0 z-50">
        <div className="flex items-stretch justify-between flex-1 min-w-0">
          <button
            type="button"
            onClick={() => handleClick(navItems[0])}
            className="flex items-center gap-[14px] px-[28px] py-[18px] border-r border-ink text-left min-w-0"
            aria-label="Home"
          >
            <span className="w-11 h-11 bg-ink text-paper flex items-center justify-center font-serif italic text-2xl leading-none shrink-0">W</span>
            <span className="font-serif text-[22px] leading-none truncate">
              Abdul Wasih
              <small className="block font-mono text-[10px] tracking-[0.15em] uppercase text-ink-3 mt-1 not-italic truncate">
                Engineer · Builder
              </small>
            </span>
          </button>

          <button
            type="button"
            className="md:hidden bg-ink text-paper px-[22px] font-mono tracking-[0.14em] uppercase text-xs border-l border-ink shrink-0"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '× Close' : '☰ Menu'}
          </button>
        </div>

        <nav className="hidden md:flex items-stretch lg:w-full">
          {navItems.map((item) => {
            const current = isCurrent(item);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item)}
                aria-current={current ? 'page' : undefined}
                className={`flex-1 flex justify-center px-6 items-center gap-[10px] border-l border-ink font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 hover:bg-ink hover:text-paper ${
                  current ? 'bg-ink text-paper' : ''
                }`}
              >
                <span className="text-[10px] opacity-60">{item.num}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-paper z-[60] flex flex-col border-t-4 border-ink transition-transform duration-200 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-stretch border-b-4 border-ink">
          <div className="flex items-center px-[28px] py-[18px] border-r border-ink flex-1">
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
        <nav className="flex-1 flex flex-col pt-[18px]">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item)}
              className="border-b border-ink px-[28px] py-9 text-left flex justify-between items-end group active:bg-paper-2 transition-colors"
            >
              <span className="font-serif font-normal text-[56px] leading-[0.85] tracking-[-0.02em] uppercase">
                {item.label}
              </span>
              <span className="font-mono text-sm opacity-60 mb-1 uppercase tracking-[0.1em]">{item.num}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <a
            href="mailto:buildwithwasih@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="flex justify-between items-center w-full bg-ink text-paper px-[28px] py-[28px] font-mono uppercase tracking-[0.16em] text-[13px] active:bg-ink-3 transition-colors"
          >
            <span>Get in touch</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
