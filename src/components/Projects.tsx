import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import PortWebP from "../assets/Portfolio-thumbnail.webp";
import RealWebP from "../assets/RealestateX-thumbnail.webp";

const ProjectDetailModal = lazy(() => import("./ProjectDetailModal"));
const projects = [
  {
    title: "Fake Review Detector",
    description:
      "An intelligent Chrome extension that leverages cutting-edge machine learning to instantly expose fake and AI-generated reviews across 10+ major e-commerce and review platforms.",
    tech: [
      "React",
      "TypeScript",
      "TensorFlow.js",
      "ONNX Runtime",
      "Vite",
      "DistilBert",
    ],
    imageWebP: PortWebP,
    link: "",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://github.com/AbdulWasih05",
    goal: "Engineered a breakthrough browser extension to combat the growing epidemic of fake reviews in online shopping. The mission was to create an intelligent, real-time detection system that seamlessly integrates with popular e-commerce platforms, helping millions of shoppers distinguish authentic feedback from fraudulent content with blazing-fast AI analysis.",
    features: [
      "Dual-Engine AI Detection: Hybrid local (TensorFlow.js/ONNX) and backend analysis for maximum accuracy and speed",
      "Lightning-Fast Performance: Optimized with Vite bundling, lazy loading, and efficient DOM manipulation for zero lag",
      "Customizable Experience: Dark/light themes, adjustable highlight colors, auto-analyze mode, and granular privacy settings",
      "Enterprise-Grade Security: Client-side processing option for privacy-conscious users with optional backend enhancement",
    ],
  },
  {
    title: "Real Estate Platform",
    description:
      "A comprehensive full-stack real estate ecosystem with cross-platform mobile apps (iOS/Android), admin dashboard, and intelligent property management featuring real-time auctions, AI price predictions.",
    tech: [
      "React.js",
      "React Native",
      "Node.js",
      "MySQL",
      "Express.js",
      "Socket.IO",
      "Docker",
      "Tailwind CSS",
      "JWT",
    ],
    imageWebP: RealWebP,
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://github.com/AbdulWasih05",
    goal: "Architected a production-grade real estate platform with cross-platform mobile applications, web-based admin dashboard, and RESTful backend. Built 70+ API endpoints with JWT authentication, role-based access control, and Docker containerization, serving properties with real-time synchronization across iOS, Android, and web platforms.",
    features: [
      "Real-Time Auction Bidding System using Socket.IO with live countdown timers and WebSocket connections for instant bid updates",
      "AI/ML-Powered Price Prediction generating 10-year market forecasts with confidence scoring and trend analysis",
      "Natural Language Search Processing for intelligent property queries and advanced multi-criteria filtering",
      "10+ Business-Critical Modules including property management, NOC verification, favorites system, geolocation services, and persistent chat messaging",
      "Cross-Platform Synchronization with real-time data updates across iOS, Android, and web applications",
      "Enterprise Security with JWT authentication, role-based access control, and comprehensive input validation",
      "Dockerized Architecture ensuring scalable deployment and seamless container orchestration",
    ],
  },
  {
    title: "Retro Wallet - Expense Tracker",
    description:
      "A full-stack expense management platform that transforms mundane financial tracking into an electrifying retro gaming experience! Featuring vaporwave aesthetics, real-time analytics, and seamless CRUD operations - all powered by React, Node.js, and MySQL running on Docker.",
    tech: [
      "React",
      "MySQL",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Docker",
      "Sequelize ORM",
      "JWT",
      "Tailwind CSS",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05/Retro-Wallet",
    websiteUrl: "https://github.com/AbdulWasih05",
    goal: "Built a production-ready expense tracking application with a stunning retro-gaming interface. Mastered full-stack CRUD operations, JWT authentication, RESTful API design, and Docker containerization while implementing real-time financial analytics.",
    features: [
      "Immersive Retro Gaming UI with vaporwave neon aesthetics and pixel-perfect animations",
      "Complete Expense Management with real-time CRUD operations and instant total calculations",
      "Secure JWT Authentication with bcrypt password hashing and Guest Mode for demos",
      "Advanced Analytics with category-based filtering, date range selection, and visual expense breakdown",
      "Containerized Deployment with Docker Compose for MySQL, backend, and frontend services",
      "Lightning-Fast Performance using React 18, Vite bundling, and Sequelize ORM optimization",
      "Fully Responsive Design with mobile-first Tailwind CSS and seamless cross-device experience",
      "State Management with React Context API for global expense and authentication states",
    ],
  },
];

interface Project {
  title: string;
  description: string;
  tech: string[];
  imageWebP?: string;
  imageFallback?: string;
  image?: string;
  link: string;
  githubUrl?: string;
  websiteUrl?: string;
  goal: string;
  features: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="bg-gray-50 py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-semibold text-left mb-2 text-gray-900 playfair flex-shrink-0">
            Projects
          </h2>
          <div className="bg-gray-300 w-full h-0.5"></div>
        </div>
        <h4 className="text-base md:text-lg text-left mb-12 text-gray-700 leading-relaxed playfair">
          Explore some of my recent projects and see how I bring ideas to life
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white group cursor-pointer relative overflow-hidden"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageWebP || project.image}
                  alt={project.title}
                  loading="lazy"
                  width="800"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold tracking-wide text-gray-900 mb-3 playfair">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub size={12} />
                      Code
                    </a>
                  )}
                  <button className="px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Other Projects Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/AbdulWasih05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
            <span className="playfair tracking-wider font-semibold">
              View All Projects
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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

        {/* Render the modal component only if a project is selected */}
        {selectedProject && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="text-white">Loading...</div>
              </div>
            }
          >
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}
