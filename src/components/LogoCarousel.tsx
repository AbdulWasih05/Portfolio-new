import { memo } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiMysql } from "react-icons/si";

// Define tech stack with categories for color coding
const techStack = [
  { name: "HTML", icon: <FaHtml5 className="text-black/80 flex-shrink-0" />, category: "frontend" },
  { name: "CSS", icon: <FaCss3Alt className="text-black/80 flex-shrink-0" />, category: "frontend" },
  { name: "JavaScript", icon: <FaJsSquare className="text-black/80 flex-shrink-0" />, category: "frontend" },
  { name: "React", icon: <FaReact className="text-black/80 flex-shrink-0" />, category: "frontend" },
  { name: "Node.js", icon: <FaNodeJs className="text-black/80 flex-shrink-0" />, category: "backend" },
  { name: "Docker", icon: <FaDocker className="text-black/80 flex-shrink-0" />, category: "devops" },
  { name: "Git", icon: <FaGitAlt className="text-black/80 flex-shrink-0" />, category: "tools" },
  { name: "MySQL", icon: <SiMysql className="text-black/80 flex-shrink-0" />, category: "database" },
];

const LogoCarousel = memo(() => {
  return (
    <div className="relative w-full py-8 bg-gradient-to-b from-gray-50 to-white ">
      <div className="carousel-mask relative md:w-2/4 mx-auto overflow-hidden">
        {/* Scrolling Track - Tripled for truly seamless infinite scroll */}
        <div className="carousel-track p-2 shadow-lg ">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div
              key={i}
              className={`carousel-card tech-${tech.category}`}
              aria-label={`${tech.name} technology`}
            >
              {tech.icon}
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

LogoCarousel.displayName = 'LogoCarousel';

export default LogoCarousel;
