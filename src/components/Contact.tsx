import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: FiMail,
      url: 'mailto:abdlwasih4life@gmail.com',
      label: 'Send me an email'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: 'https://www.linkedin.com/in/abdul-wasih-977a702b9/',
      label: 'Connect on LinkedIn'
    },
    {
      name: 'Github',
      icon: FiGithub,
      url: 'https://github.com/AbdulWasih05',
      label: 'View my Github profile'
    }
  ];

  return (
    <section id="contact" className="bg-white py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-semibold text-gray-900 text-center mb-4 brand-name"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Create Something Amazing
        </motion.h2>
        
        <motion.p 
          className="text-base md:text-lg text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to bring your vision to life? Let's discuss your project and 
          explore how great design can elevate your brand.
        </motion.p>

        {/* Contact Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full transition-colors duration-200 outline-none"
                aria-label="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full transition-colors duration-200 outline-none"
                aria-label="Your email address"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project..."
              rows={6}
              required
              className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full resize-none transition-colors duration-200 outline-none"
              aria-label="Your message"
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none brand-name"
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-70 transition-opacity p-2 focus:outline-none focus:ring-2 focus:ring-black rounded"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              viewport={{ once: true }}
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;