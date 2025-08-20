import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiMysql } from "react-icons/si";

const techStack = [
  { name: "HTML", icon: <FaHtml5 className="text-black text-3xl" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-black text-3xl" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-black text-3xl" /> },
  { name: "React", icon: <FaReact className="text-black text-3xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-black text-3xl" /> },
  { name: "Docker", icon: <FaDocker className="text-black text-3xl" /> },
  { name: "Git", icon: <FaGitAlt className="text-black text-3xl" /> },
  { name: "MySQL", icon: <SiMysql className="text-black text-3xl" /> },
];

export default function LogoCarousel() {
  return (
    <div className="relative md:w-2/4 overflow-hidden  py-6 px-4 md:mx-auto">
      {/* Gradient Fade Edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Scrolling Track */}
      <motion.div
        className="flex gap-16"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // slower scroll for readability
        }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            {tech.icon}
            <span className="text-red-500 text-xl font-medium font-montserrat">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
