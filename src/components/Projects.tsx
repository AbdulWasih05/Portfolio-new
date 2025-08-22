import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa'; // Add this import

const projects = [
  {
    title: "GenAI SmartLister",
    subtitle: "AI-powered product listing generator",
    description:
      "An AI tool that automates product listing creation for Amazon using sentiment analysis, LLMs, and diffusion models. Scrapes social data, generates optimized copy and images, and exports listing assets.",
    tech: ["Python", "Gemini API", "Stable Diffusion", "Streamlit"],
    highlights: [
      "Scraped product data and customer sentiment from social platforms",
      "Used LLMs (Gemini API) for SEO-optimized titles, descriptions, and bullet points",
      "Integrated Stable Diffusion for visual assets",
      "Packaged in a Streamlit interface, tested with real product prompts",
    ],
    link: "#",
    image: "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    websiteUrl: "https://www.amazon.com/",
    githubUrl: "https://github.com/AbdulWasih05",
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Full-stack online shopping platform",
    description:
      "A modern e-commerce platform built with Next.js and Node.js, featuring real-time inventory management, secure payments, and an admin dashboard.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    highlights: [
      "Implemented secure authentication and authorization",
      "Integrated Stripe payment gateway",
      "Built responsive UI with Tailwind CSS",
      "Created admin dashboard for inventory management",
    ],
    link: "#",
    image: "https://w0.peakpx.com/wallpaper/200/131/HD-wallpaper-aesthetic-dark-darker.jpg",
    websiteUrl: "https://www.amazon.com/",
    githubUrl: "https://github.com/AbdulWasih05",
  },
  {
    title: "Task Management App",
    subtitle: "Collaborative project management tool",
    description:
      "A real-time task management application with team collaboration features, notifications, and progress tracking.",
    tech: ["React", "Firebase", "TypeScript", "Material-UI"],
    highlights: [
      "Real-time updates using Firebase",
      "Drag-and-drop task organization",
      "Team chat and file sharing",
      "Advanced filtering and sorting",
    ],
    link: "#",
    image: "https://wallpapers.com/images/hd/geometric-tubes-dark-and-blue-aesthetic-laptop-5j01klh3glpvwaeq.jpg",
    websiteUrl: "https://www.amazon.com/",
    githubUrl: "https://github.com/AbdulWasih05",
  },
];

// Update project type if needed
interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  link: string;
  image: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="Projects" className="bg-[#FDFCFB]] py-20 ">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-4xl font-black text-center mb-2 text-gray-900 oswald">
          Featured Projects
        </h2>
        <h4 className="text-xl  text-center mb-8 text-black/20 oswald ">
          Checkout some of my recent work in Modern Web Development
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="relative h-[400px] rounded-xl bg-white shadow-lg overflow-hidden perspective cursor-pointer"
              whileHover={{
                rotateY: 15,
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 15
                }
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Front Content */}
              <div
                className="absolute inset-0 bg-cover bg-center transform-gpu"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-white oswald">
                    {project.title}
                  </h3>

                  <div className="space-y-4">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {project.description.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              </div>

              {/* Side Content - Revealed on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 p-6 flex flex-col justify-between opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-bold text-white">Tech Stack</h4>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}

                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm border border-white/10"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm transition-colors text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Website
                    </a>
                  )}
                  <span className="text-white/70 text-sm text-center">
                    Click to view details
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View Other Projects Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/AbdulWasih05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-black/80 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 hover:shadow-xl"
          >
            <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-2">
            <span className="brand-name flex-shrink-0">View Other Projects</span>
                <div className='h-0.5 w-full bg-white/10'></div>
            </div>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Enhanced Responsive Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-white via-white to-gray-50 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 pr-8">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-200 to-gray-50 rounded-full text-gray-700 text-sm shadow-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Highlights */}
                <div className="space-y-2 text-sm md:text-base mb-6">
                  {selectedProject.highlights.map((highlight, i) => (
                    <p key={i} className="text-gray-700">
                      • {highlight}
                    </p>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                    >
                      <FaGithub className="text-xl" />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.websiteUrl && (
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
        <hr className="border-t border-black my-8 w-3/4 mx-auto" />

    </section>
  );
}
