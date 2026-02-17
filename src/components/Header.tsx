import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ forceHidden = false }: { forceHidden?: boolean }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we navigated here with a state carrying a targetId, scroll to it
    if (location.state && location.state.targetId) {
      const element = document.getElementById(location.state.targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensuring DOM is ready
      }
      // Clear state so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Determine if user has scrolled more than 50px
      setIsScrolled(currentScrollY > 50);

      // Hide/Show based on scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    // Set active section based on route
    if (location.pathname === '/projects') {
      setActiveSection('projects');
    } else if (location.pathname === '/' && activeSection === 'projects' && window.scrollY < 100) {
      setActiveSection('hero');
    }

    // Track active section only on home page
    const trackActiveSection = () => {
      if (location.pathname !== '/') return;

      const sections = ['hero', 'about', 'projects', 'Skills', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          controlNavbar();
          trackActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, location.pathname]);

  const handleNavigation = (id: string) => {
    if (location.pathname !== '/') {
        navigate('/', { state: { targetId: id } });
    } else {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Project', id: 'projects' },
    { name: 'Expertise', id: 'Skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          ${isVisible && !forceHidden ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => handleNavigation('hero')}
              className="flex items-center gap-2 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black rounded playfair tracking-wide"
              aria-label="Go to top"
            >
              <img
                src="/favicon.ico"
                alt="AK Logo"
                width="28"
                height="28"
                className="rounded-full"
              />
              Abdul Wasih
            </button>

            <button
              className="relative w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black rounded"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="absolute w-6 h-0.5 bg-black -translate-y-[7px]" />
              <span className="absolute w-4 h-0.5 bg-black translate-x-[4px]" />
              <span className="absolute w-6 h-0.5 bg-black translate-y-[7px]" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex flex-col items-center space-y-2">
            <button
              onClick={() => handleNavigation('hero')}
              className="flex items-center gap-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-black rounded playfair tracking-wider"
              aria-label="Go to top"
            >
              <img
                src="/favicon.ico"
                alt="AK Logo"
                width="28"
                height="28"
                className="rounded-full"
              />
              <span>Abdul Wasih</span>
            </button>

            <nav className="border border-gray-200 rounded-lg px-8 py-2 bg-gray-50/50 w-full max-w-3xl">
              <div className="flex items-center justify-between w-full playfair">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.id)}
                    className={`text-sm transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-black rounded px-2 py-1 ${activeSection === item.id
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-700 hover:text-black'
                      }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-black transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

      </header>

      {/* Mobile Navigation Overlay - Outside header so it's not affected by header transforms */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-[60] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Mobile Overlay Header — matches main header padding exactly */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleNavigation('hero')}
              className="flex items-center gap-2 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black rounded playfair tracking-wide"
              aria-label="Go to top"
            >
              <img
                src="/favicon.ico"
                alt="AK Logo"
                width="28"
                height="28"
                className="rounded-full"
              />
              Abdul Wasih
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Close menu"
            >
              <span className="absolute w-6 h-0.5 bg-black rotate-45" />
              <span className="absolute w-6 h-0.5 bg-black -rotate-45" />
            </button>
          </div>
        </div>

        {/* Mobile Overlay Content */}
        <div className="flex flex-col items-center pt-16">
          <nav className="flex flex-col items-center space-y-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.id)}
                className={`text-3xl font-semibold playfair transition-all duration-500 focus:outline-none ${
                  activeSection === item.id
                    ? 'text-black'
                    : 'text-gray-400 hover:text-black'
                } ${
                  isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + index * 75}ms` : '0ms',
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div
            className={`mt-12 transition-all duration-500 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${150 + navigationItems.length * 75}ms` : '0ms',
            }}
          >
            <button
              onClick={() => handleNavigation('contact')}
              className="inline-flex items-center gap-3 px-10 py-3.5 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Let's Talk
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;