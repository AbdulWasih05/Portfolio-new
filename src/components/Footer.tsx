import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Expertise', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub className="w-6 h-6" />, href: "https://github.com/AbdulWasih05", label: "GitHub" },
    { icon: <FaLinkedin className="w-6 h-6" />, href: "https://linkedin.com/in/iamwasih", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand & CTA Section */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative text-4xl md:text-6xl font-bold playfair mb-6 leading-tight"
              >
                Let's turn your <br />
                <span className="text-gray-400">ideas into reality.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative text-gray-400 text-lg max-w-md mb-8"
              >
                Specializing in building exceptional digital experiences. Currently available for freelance projects and open to new opportunities.
              </motion.p>
              
              <motion.a
                href="mailto:buildwithwasih@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative inline-flex items-center gap-3 text-2xl md:text-3xl font-semibold hover:text-gray-300 transition-colors group"
              >
                <Mail className="w-8 h-8" />
                <span>buildwithwasih@gmail.com</span>
                <ArrowUp className="w-6 h-6 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" />
              </motion.a>
            </div>
          </div>

          {/* Navigation & Socials */}
          <div className="lg:col-span-6 flex flex-col md:flex-row justify-between lg:justify-end gap-12 lg:gap-20 playfair tracking-widest">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-8">Navigation</h3>
              <ul className="space-y-1">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="py-2 text-gray-400 text-lg block"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Socials & Location */}
            <div>
              <h3 className="text-sm font-medium uppercase text-gray-500 mb-8">Connect</h3>
              <div className="space-y-3 mb-10">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group playfair tracking-wide flex items-center gap-4 py-2 text-gray-400 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <span className="w-10 h-10 rounded-full bg-gray-900/80 border border-gray-800 group-hover:border-gray-600 group-hover:bg-gray-800 flex items-center justify-center transition-all duration-300">
                      {social.icon}
                    </span>
                    <span className="text-lg">{social.label}</span>
                    <ArrowUp className="w-4 h-4 rotate-45 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-800/60">
                <p className="text-gray-500 flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4" />
                  Remote / Worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="flex justify-center mb-10">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <span className="w-12 h-12 rounded-full border border-gray-800 group-hover:border-gray-600 flex items-center justify-center transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase tracking-widest">Back to top</span>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Abdul Wasih. All rights reserved.
          </p>
          <p className="text-gray-700 text-sm">
            Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
