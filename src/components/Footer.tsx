import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {currentYear} Abdul Wasih. All rights reserved.
            </p>
            <p className="text-xs mt-1 opacity-70">
              Designed with passion and built with React ✨
            </p>
          </div>
          
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
      </div>
    </footer>
  );
};

export default Footer;