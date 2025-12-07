import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub className="w-6 h-6" />, href: "https://github.com/AbdulWasih05", label: "GitHub" },
    { icon: <FaLinkedin className="w-6 h-6" />, href: "https://linkedin.com/in/iamwasih", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
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
          <div className="lg:col-span-6 flex flex-col md:flex-row justify-between lg:justify-end gap-12 lg:gap-24">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-200">Navigation</h3>
              <ul className="space-y-4">
                {footerLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="relative"
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-lg inline-block hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Socials & Location */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-200">Connect</h3>
              <div className="flex gap-4 mb-8">
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
                    className="relative w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 border border-gray-800 hover:border-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Location</h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Remote / Worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Abdul Wasih. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-gray-600 text-sm">
              Built with React & Tailwind
            </p>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 border border-gray-800"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
