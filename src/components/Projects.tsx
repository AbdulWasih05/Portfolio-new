import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import RealWebP from "../assets/RealestateX-thumbnail.webp";

const projects = [
  {
    title: "Fake Review Detector",
    description:
      "AI-powered Chrome extension that detects fake and AI-generated reviews in real time across 10+ leading e-commerce and review platforms.",
    tech: [
      "React",
      "TypeScript",
      "TensorFlow.js",
      "ONNX Runtime",
      "Vite",
      "DistilBert",
    ],
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    link: "",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://github.com/AbdulWasih05",
    goal: "Developed an AI-driven browser extension that detects and filters fake reviews in real time, integrating seamlessly with major e-commerce platforms to ensure trustworthy online shopping experiences.",
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
      "Full-stack real estate platform with cross-platform mobile apps, admin dashboard, real-time property auctions, and AI-powered price prediction.",
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
    goal: "Architected production-grade real estate platform with cross-platform mobile apps (iOS/Android), web admin dashboard, and 70+ RESTful APIs secured by JWT auth, RBAC, and Docker. Enables real-time property sync across platforms..",
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
      "Full-stack expense tracker with vaporwave retro gaming UI, real-time analytics, and CRUD ops. Built with React, Node.js, MySQL, and Docker for seamless financial management.",
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
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05/Retro-Wallet",
    websiteUrl: "https://github.com/AbdulWasih05",
    goal: "Develop production-ready expense tracker with retro-gaming UI, full-stack CRUD, JWT auth, RESTful APIs, Docker, and real-time analytics.",
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
              <img
                src={project.imageWebP || project.image}
                alt={project.title}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </motion.div>
            {/* Subtle white gradient to ensure black text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 text-gray-900 z-10">
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
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-white custom-scrollbar">
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                Overview
              </h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                The Goal
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {project.goal}
              </p>
            </div>

            <div className="flex-grow">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  <FaGithub size={18} />
                  View Code
                </a>
              )}
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Live Demo
                </a>
              )}
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
        <a
          href="https://github.com/AbdulWasih05?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FaGithub className="text-xl group-hover:rotate-12 transition-transform" />
          <span className="font-medium tracking-wide">View More Projects</span>
        </a>
      </div>
      
      {/* Spacer for the end */}
      <div className="h-[10vh]"></div>
    </section>
  );
}
