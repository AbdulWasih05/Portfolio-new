import { useState, useEffect } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
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
    { name: 'Project', id: 'Projects' }, 
    { name: 'Expertise', id: 'Skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#EDEDED]
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? ' backdrop-blur-sm' : 'bg-[#EDEDED]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Header */}
        <div className="md:hidden  flex  justify-between items-center mb-6">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center text-xl font-semibold focus:outline-none"
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
            className="flex flex-col items-end gap-1.5 p-1 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'w-6' : 'w-6'
              }`} />
            <span className={`h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'w-2' : 'w-4'
              }`} />
            <span className={`h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'w-6' : 'w-6'
              }`} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col items-center space-y-2">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-xl font-semibold focus:outline-none brand-name"
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


          <nav className="border border-white/30 rounded-lg px-6 py-2 bg-black/05">
            <div className="flex items-center justify-center space-x-12">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className=" text-sm transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden fixed top-20 right-4 bg-white rounded-lg shadow-xl p-6 z-40">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-left px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;