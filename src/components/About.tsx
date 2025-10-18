import React, { useMemo } from "react";
import { motion } from "framer-motion";

const About: React.FC = React.memo(() => {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }), []);

  return (
    <section
      id="about"
      className="bg-white text-black px-6 py-16 md:px-20 md:py-24 scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle gradient accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-60 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500 mb-8 font-light"
        >
          About Me
        </motion.h2>

        {/* Layout Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Professional Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main Heading with SEO Keywords */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              Full-Stack Developer{" "}
              <span className="block mt-2 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
                Specializing in React & Next.js
              </span>
            </motion.h1>

            {/* Professional Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6"
            >
              I build <span className="font-semibold text-black">scalable web applications</span> from
              concept to deployment, transforming ideas into elegant,
              <span className="font-semibold text-black"> user-centric digital experiences</span>.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-500 leading-relaxed mb-8"
            >
              From crafting pixel-perfect, <span className="font-medium text-gray-700">responsive user interfaces</span> to
              architecting robust backend systems and <span className="font-medium text-gray-700">RESTful APIs</span>,
              I deliver end-to-end solutions with a focus on performance and maintainability.
            </motion.p>

            {/* Personal Values Section */}
            <motion.div
              variants={itemVariants}
              className="border-l-4 border-gray-900 pl-6 py-2 mb-8"
            >
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium">
                Development Philosophy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I believe in writing <span className="font-semibold">clean, maintainable code</span> that
                prioritizes user experience and performance. Continuous learning and staying
                current with modern web technologies drive my approach to development.
              </p>
            </motion.div>

            {/* Download Resume Button */}
            <motion.div variants={itemVariants}>
              <a
                href="resume.pdf"
                download="Wasih_Resume.pdf"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-br from-black to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <span>Download Resume</span>
                <svg
                  className="w-5 h-5 ml-3 transition-transform group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-start"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
              Technical Expertise
            </h2>

            {/* Skills organized by category with gradient accents */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Frontend Development */}
              <motion.div
                variants={itemVariants}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Frontend Development
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg text-sm font-semibold shadow-md">
                    React.js
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg text-sm font-semibold shadow-md">
                    Next.js
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    TypeScript
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    JavaScript ES6+
                  </span>
                </div>
              </motion.div>

              {/* Backend Development */}
              <motion.div
                variants={itemVariants}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Backend & APIs
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-semibold shadow-md">
                    Node.js
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Express.js
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    REST APIs
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Authentication
                  </span>
                </div>
              </motion.div>

              {/* Database & Tools */}
              <motion.div
                variants={itemVariants}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Database & DevOps
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-semibold shadow-md">
                    MySQL
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    MongoDB
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Docker
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Git & GitHub
                  </span>
                </div>
              </motion.div>

              {/* Core Concepts */}
              <motion.div
                variants={itemVariants}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Data Structures & Algorithms
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    OOP
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Cloud Computing
                  </span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    Responsive Design
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
