import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className=" text-black px-6 py-16 md:px-20 md:py-24"
    >
      {/* Section Title */}
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-widest text-gray-500 mb-6"
      >
        ABOUT ME
      </motion.h3>

      {/* Layout Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Intro & Academic */}
        <div>
          {/* Intro */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold leading-snug mb-6"
          >
            I'm a Enthusiastic Coder who can {" "}
            <span className="text-red-600">Brainstorm ideas,</span>{" "}
            transform them into elegant,{" "}
            {" "}
            <span className="text-red-600">polished product</span>.
            <br />
            From crafting sleek <span className="text-red-600">UI</span> to{" "}
            <span className="text-red-600">integrating APIs.</span>
          </motion.h1>

          {/* Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="resume.pdf" // 
              download="Wasih_Resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <span>Download Resume</span>
              <svg 
                className="w-5 h-5 ml-2" 
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
        </div>

        {/* Right Column - Skills */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col justify-end">

          <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
          <ul className="space-y-2 text-lg text-gray-800">
            <li>
              <span>Frontend:</span> 
              Vanilla JS,
              <span className="text-red-600 font-bold"> React.js ,Next.js</span>
            </li>
            <li>
              <span className="">Backend:</span> 
              <span className="text-red-600 font-bold"> Node.js {" "}</span>Express.js
            </li>
            <li>
              <span className="">Databases:</span> MongoDB, <span className="text-red-600 font-bold">{" "}MySQL</span>
            </li>
            <li>Tools:
              <span className="text-red-600 font-bold">{" "}Docker, Git
                </span>
            </li>
            <li>
              Concepts:
              <span className="text-red-600 font-bold"> {" "}Data Structures,
              Algorithms, OOP, Cloud Computing
              </span>
            </li>
          </ul>
        </div>
        </motion.div>
      </div>

      {/* Closing Line */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="text-2xl md:text-3xl font-bold mt-12"
      >
        My goal is to craft{" "}
        <span className="text-red-600">scalable & innovative solutions</span>{" "}
        that bridge technology with real-world needs
        <span className="text-red-600">●</span>
      </motion.h2>
    </section>
  );
};

export default About;
