import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaHistory, FaUser } from "react-icons/fa";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "My Story", icon: FaUser },
    { id: "toolkit", label: "Toolkit", icon: FaCode },
    { id: "experience", label: "Experience", icon: FaHistory },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden min-h-[80vh] flex flex-col justify-center"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 playfair">
            About Me
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 playfair">
            More than just <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
              code.
            </span>
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 z-10 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gray-900 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="text-xs" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl mx-auto text-center"
              >
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-6 font-light w-full max-w-4xl mx-auto">
                  "I bridge the gap between{" "}
                  <span className="text-gray-900 font-medium">design</span> and{" "}
                  <span className="text-gray-900 font-medium">engineering</span>
                  . My journey started with a curiosity for how things work,
                  which evolved into a passion for building scalable
                  applications that solve real-world problems."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 w-full max-w-2xl mx-auto">
                  With a background in full-stack development, I specialize in
                  creating seamless digital experiences.
                </p>
                <p className="text-gray-500 leading-relaxed mb-12 w-full max-w-lg mx-auto">
                  I believe that great software is not just about clean code,
                  but about empathy for the user and attention to the smallest
                  details.
                </p>
                <a
                  href="resume.pdf"
                  download="Wasih_Resume.pdf"
                  className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Download Resume
                </a>
              </motion.div>
            )}

            {activeTab === "toolkit" && (
              <motion.div
                key="toolkit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <SkillGroup
                  title="Frontend"
                  skills={[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Redux",
                  ]}
                />
                <SkillGroup
                  title="Backend"
                  skills={[
                    "Node.js",
                    "Express",
                    "MySQL",
                    "MongoDB",
                    "Redis",
                    "REST APIs",
                  ]}
                />
                <SkillGroup
                  title="DevOps"
                  skills={["Docker", "AWS", "CI/CD", "Git", "Nginx", "Linux"]}
                />
                <SkillGroup
                  title="AI & Machine Learning"
                  skills={[
                    "TensorFlow",
                    "Keras",
                    "PyTorch",
                    "scikit-learn",
                    "Jupyter Notebook",
                  ]}
                />{" "}
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                
                <ExperienceItem
                  role="Web Developer"
                  company="Pearl Modern"
                  period="2025 - Present"
                  description="Redesigned and developed the School website using React and Tailwind CSS according to latest design trends, improving user engagement by 25%."
                />
                <ExperienceItem
                  role="Freelance Web Developer"
                  company="Self-Employed"
                  period="2024 - Present"
                  description="Built responsive user interfaces for local startups. Digitalized client businesses, enhancing their online presence and customer reach."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SkillGroup = ({ title, skills }: { title: string; skills: string[] }) => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 playfair">
      {title}
    </h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem = ({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) => (
  <div className="relative pl-8 border-l-2 border-gray-100 hover:border-gray-300 transition-colors duration-300">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300" />
    <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h4 className="text-lg font-bold text-gray-900 playfair">{role}</h4>
      <span className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full">
        {period}
      </span>
    </div>
    <p className="text-gray-800 font-medium mb-2">{company}</p>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default About;
