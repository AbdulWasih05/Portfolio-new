import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
  }

  return (
    <footer className="footer text-gray-300 py-8 relative">
      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 95%, rgba(255, 255, 255, 0.03) 100%)',
          boxShadow: '0 -20px 40px -10px rgba(255, 255, 255, 0.05) inset, 0 20px 40px -10px rgba(255, 255, 255, 0.08)'
        }}>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section - */}
        <motion.div
          className="flex justify-between items-start mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo and Year */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-full"></div>
              </div>
              <span className="text-xl font-semibold playfair text-gray-300">Abdul Wasih</span>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="text-sm hover:text-white transition-colors px-4 py-2 rounded border border-gray-600 hover:border-gray-400"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            Back to Top ↑
          </motion.button>
        </motion.div>

        {/* Middle Section - Navigation Links */}
        <motion.div
          className="flex flex-wrap justify-center space-x-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <a className="hover:text-white transition-colors" onClick={() => scrollToSection('about')}>About</a>
          <a className="hover:text-white transition-colors" onClick={() => scrollToSection('Projects')}>Projects</a>
          <a className="hover:text-white transition-colors" onClick={() => scrollToSection('Skills')}>Expertise</a>
          <a className="hover:text-white transition-colors" onClick={() => scrollToSection('contact')}>Contact</a>
        </motion.div>

        {/* Separator Line */}
        <div className="border-t border-gray-600 mb-6"></div>

        {/* Bottom Section - Copyright and Contact */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >


          <div className="flex md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-sm">
            <span>@{currentYear} Abdul Wasih</span>

            </div>
            <div className='flex justify-end'>Crafted with Modern Web Technologies</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;