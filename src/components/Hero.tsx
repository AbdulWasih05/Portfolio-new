import { motion } from 'framer-motion';
import profilePhoto from '@/assets/profile-photo.jpg';
import { useState, useEffect } from 'react';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('Projects');
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
      setTimeout(() => setIsDeleting(true), 1000); 
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);


  return (
    <section id="hero" className="hero ">
      <div className="container">
        <div className="hero-grid ">
          {/* Left: Text Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >


            <motion.h1
              className="hero-title brand-name  text-[#757575]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {text}{" "},I'm <span className='text-black font-bold '>Wasih</span>
              <span className="blinking-cursor"></span>
              <h4 className="hero-subtitle leading-tight text-2xl text-[#757575]">A <span className='text-black '>Full Stack</span> Developer</h4>
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
              onClick={scrollToProjects}
              className="bg-[#757575] hover:bg-black hover:scale-105 text-white font-medium rounded-lg px-6 py-3 mt-6 transition-colors duration-200 brand-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contact me"
            >
              See my works
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

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;