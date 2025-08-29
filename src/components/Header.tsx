import { useState, useEffect } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');


  let timeoutId: NodeJS.Timeout;

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

    // Track active section
    const trackActiveSection = () => {
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

    const handleScroll = () => {
      controlNavbar();
      trackActiveSection();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

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
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black rounded playfair tracking-wide"
              aria-label="Go to top"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="30" fill="black" />
              </svg>
              Abdul Wasih
            </button>

            <button
              className="flex flex-col items-end gap-1.5 p-1 focus:outline-none focus:ring-2 focus:ring-black rounded"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
              <span className={`h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'
                }`} />
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex flex-col items-center space-y-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-black rounded playfair tracking-wider"
              aria-label="Go to top"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="30" fill="black" />
              </svg>
              <span>Abdul Wasih</span>
            </button>

            <nav className="border border-gray-200 rounded-lg px-6 py-2 bg-gray-50/50">
              <div className="flex items-center justify-center space-x-12">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
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

        {/* Mobile Navigation Menu */}
        <nav className={`md:hidden fixed top-20 right-4 bg-white rounded-lg shadow-xl p-6 z-40 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-black ${activeSection === item.id
                    ? 'text-black bg-gray-100 border-l-2 border-black'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;