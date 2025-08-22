import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiMysql } from "react-icons/si";

const techStack = [
  { name: "HTML", icon: <FaHtml5 className="text-black text-2xl" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-black text-2xl" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-black text-2xl" /> },
  { name: "React", icon: <FaReact className="text-black text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-black text-2xl" /> },
  { name: "Docker", icon: <FaDocker className="text-black text-2xl" /> },
  { name: "Git", icon: <FaGitAlt className="text-black text-2xl" /> },
  { name: "MySQL", icon: <SiMysql className="text-black text-2xl" /> },
];

export default function LogoCarousel() {
  return (
    <div className="relative md:w-2/4 overflow-hidden  py-6 px-4 md:mx-auto" 
    style={{
      WebkitMaskImage:
        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 87.5%, rgba(255, 255, 255, 0) 100%)",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskImage:
        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 87.5%, rgba(255, 255, 255, 0) 100%)",
      maskRepeat: "no-repeat",
      maskSize: "100% 100%",
    }}
    >

      {/* Scrolling Track */}
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // slower scroll for readability
        }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0 rounded-2xl  border-2 border-bg-black p-1 px-2 ">
            {tech.icon}
            <span className="text-black/80 text-md font-medium">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
