import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { projects, Project } from "../data/projects";

const Card = ({
  project,
  i,
  progress,
  range,
  targetScale,
}: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen sticky top-0">
      <div
        ref={container}
        className="relative h-full flex items-center justify-center"
      >
        <motion.div
          style={{
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className="flex flex-col relative h-[80vh] md:h-[60vh] w-[90vw] md:w-[90vw] rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden origin-top"
        >
        <div className="flex h-full flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-[60%] h-[40%] md:h-full relative overflow-hidden bg-gray-100">
            <motion.div style={{ scale: imageScale }} className="h-full w-full">
              <picture>
                {project.imageWebP && (
                  <source type="image/webp" srcSet={project.imageWebP} />
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={675}
                />
              </picture>
            </motion.div>
            {/* Subtle white gradient to ensure black text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-60"></div>
            {/* <div className="absolute bottom-6 left-6 text-gray-900 z-10">
              <h2 className="text-3xl font-bold playfair mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/20 backdrop-blur-md text-xs rounded-full border border-white/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div> */}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-white custom-scrollbar">
            <div className="mb-6 flex-grow">
               <Link to={`/projects#project-${i}`} className="group/title block mb-4">
                  <h2 className="text-3xl font-bold playfair text-gray-900 group-hover/title:underline decoration-1 underline-offset-4 transition-all">
                    {project.title}
                  </h2>
               </Link>
              
              <p className="text-gray-600 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <Link
                  to={`/projects#project-${i}`}
                  className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 group"
                >
                  <span className="font-medium">View Project Details</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} id="projects" className="bg-gray-50 relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className="w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-20 pt-20">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 playfair">
            Selected Works
          </h2>
          <div className="h-1 w-20 bg-gray-900 ml-4"></div>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl playfair">
          A showcase of my recent technical projects, featuring full-stack applications and AI integrations.
        </p>
      </div>

      <div className="w-full relative">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* View More Projects Button */}
      <div className="flex justify-center py-20 relative z-10 bg-gray-50">
        <Link
          to="/projects"
          className="inline-flex items-center px-8 py-3 text-lg font-medium text-black border-2 border-gray-200 rounded hover:border-black hover:bg-black hover:text-white transition-all duration-300 group"
        >
          <span className="font-medium tracking-wide mr-2">View All Projects</span>
          <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Spacer for the end */}
      <div className="h-[8vh]"></div>
    </section>
  );
}
