import { motion } from 'framer-motion';
import profilePhoto from '@/assets/profile-photo.jpg';
import { useState, useEffect } from 'react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const roles = [
    "Hi",
    "नमस्ते",
    "Hallo",
    "Hola",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const handleTyping = () => {
    const current = roles[index];
    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
      setSpeed(50); // faster when deleting
    } else {
      setText(current.substring(0, text.length + 1));
      setSpeed(100);
    }

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);


  const stats = [
    { number: '5+', label: 'Years Exp' },
    { number: '200+', label: 'Projects' },
    { number: '50+', label: 'Clients' }
  ];

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Text Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >


            <motion.h1
              className="hero-title brand-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {text}{" "},I'm <span className='text-red-600'>Wasih</span>
              <span className="blinking-cursor"></span>
              <h4 className="hero-subtitle leading-tight">A <span className='text-red-600 font-bold'>Full Stack</span> Developer</h4>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              My craft includes turning vague ideas into slightly less vague realities, debugging issues that mysteriously appear when I code at 3 AM, and occasionally converting caffeine into code.

              Intrigued? Good. My inbox is surprisingly well-behaved.
            </motion.p>

            <motion.button
              onClick={scrollToContact}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-6 py-3 mt-6 transition-colors duration-200 brand-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contact me"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Right: Portrait Photo with Stats */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.img
              src="penguin-img.jpeg"
              alt="Abdul Wasih - Full Stack Developer"
              className="hero-portrait"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />

            {/* Stats Overlay
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;