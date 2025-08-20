import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiDribbble, FiInstagram } from 'react-icons/fi';
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
      url: 'mailto:Wasih@example.com',
      label: 'Send me an email'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: 'https://linkedin.com/in/Abdul Wasih',
      label: 'Connect on LinkedIn'
    },
    {
      name: 'Dribbble',
      icon: FiDribbble,
      url: 'https://dribbble.com/Abdul Wasih',
      label: 'View my Dribbble profile'
    },
    {
      name: 'Instagram',
      icon: FiInstagram,
      url: 'https://instagram.com/Abdul Wasih',
      label: 'Follow me on Instagram'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2 
          className="section-heading text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Create Something Amazing
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-12 max-w-2xl mx-auto opacity-90 text-center"
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
          className="contact-form space-y-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full"
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
                className="w-full"
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
              className="w-full resize-none"
              aria-label="Your message"
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="hero-cta disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="text-white/70 hover:text-white transition-colors p-2"
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