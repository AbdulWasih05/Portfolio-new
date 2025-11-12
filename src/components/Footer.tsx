import { motion } from 'framer-motion';
import { memo, useMemo, useCallback } from 'react';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }), []);

  const navLinks = useMemo(() => [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Expertise', id: 'Skills' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ], []);

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] via-[#151515] to-[#1a1a1a] text-gray-300 py-16 overflow-hidden">
      {/* Dot pattern overlay for subtle texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none footer-dot-pattern" />

      {/* Subtle gradient glow effect */}
      <div className="absolute inset-0 pointer-events-none footer-glow" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Logo/Brand Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <div className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full"></div>
              </div>
              <span className="text-2xl md:text-3xl font-bold playfair text-white tracking-wide">
                Abdul Wasih
              </span>
            </div>
            <p className="text-sm text-gray-400 tracking-wide">Full-Stack Developer</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
            aria-label="Footer navigation"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.nav>

          {/* Animated Divider Line */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-md h-px relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Social Media & Email Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            {/* GitHub */}
            <motion.a
              href="https://github.com/AbdulWasih05"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/iamwasih"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:buildwithwasih@gmail.com"
              className="group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email contact"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </motion.a>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            className="group px-6 py-2.5 rounded-full border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white transition-all duration-300 font-medium hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <span className="flex items-center gap-2">
              Back to Top
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </span>
          </motion.button>

          {/* Copyright & Tech Stack */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-2 text-sm text-gray-400 pt-4"
          >
            <p className="text-center">
              © {currentYear} Abdul Wasih. All rights reserved.
            </p>
            <p className="text-center text-gray-500">
              Built with <span className="text-gray-300 font-medium">React</span> &{' '}
              <span className="text-gray-300 font-medium">TypeScript</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
