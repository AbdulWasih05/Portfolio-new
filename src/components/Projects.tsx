import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';
import ProjectDetailModal from "./ProjectDetailModal";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern full-stack e-commerce platform built with Next.js and Node.js.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://www.amazon.com/",
    goal: "The goal was to create a seamless shopping experience with secure payments, inventory management, and an intuitive admin interface.",
    features: [
      "Smart Inventory Management with real-time stock tracking and automatic alerts",
      "AI-Powered Product Recommendations based on user behavior",
      "Advanced Analytics Dashboard with predictive insights",
      "Multi-Vendor Support with individual storefronts"
    ]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, team chat, and file sharing.",
    tech: ["React", "Firebase", "TypeScript", "Material-UI", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://task-manager-demo.vercel.app",
    goal: "Built a collaborative task management system to solve team coordination challenges. The goal was to create a real-time platform where teams could organize tasks, track progress, and communicate effectively in one centralized location.",
    processAndLearning: "Working with real-time data was a significant learning experience. I gained deep understanding of Firebase's real-time capabilities and learned to handle concurrent user interactions. The challenge of maintaining data consistency across multiple users was solved by implementing proper conflict resolution strategies.",
    features: [
      "Intelligent Task Prioritization with AI-driven ranking",
      "Voice Command Integration for hands-free task management",
      "Time Tracking with detailed productivity analytics",
      "Smart Notifications that adapt to user behavior"
    ]
  },
  {
    title: "AI Chat Application",
    description: "An intelligent chat application powered by OpenAI's GPT-4. Features include conversation history, multiple AI personalities, code generation, and real-time responses with streaming.",
    tech: ["React", "OpenAI API", "Node.js", "Socket.io", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://ai-chat-demo.vercel.app",
    goal: "Created an intelligent chat interface to demonstrate AI integration capabilities. The goal was to build a conversational AI platform that could assist users with various tasks, from answering questions to generating code and content.",
    processAndLearning: "This project expanded my knowledge of API integration and asynchronous programming. I learned to handle streaming responses, manage conversation context, and implement proper error handling for AI services. The challenge of managing API rate limits was solved by implementing request queuing and caching.",
    features: [
      "Multi-Modal AI Responses supporting text, code, and images",
      "Custom AI Personality Builder for specialized knowledge domains",
      "Real-Time Code Execution with live debugging capabilities",
      "Conversation Memory & Context across multiple sessions"
    ]
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Framer Motion. Features smooth animations, dark/light mode, contact form, and SEO optimization for better visibility.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "EmailJS", "Vercel"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://portfolio-demo.vercel.app",
    goal: "Designed a modern portfolio website to showcase professional work and skills effectively. The goal was to create an engaging, responsive platform that highlights projects and provides easy contact methods for potential clients.",
    processAndLearning: "This project reinforced my understanding of modern React patterns and performance optimization. I learned to implement smooth animations without compromising performance, optimize images and assets, and create accessible user interfaces. The challenge of creating engaging animations was solved by using Framer Motion's optimized animation system.",
    features: [
      "Interactive Project Showcase with 3D gallery and live previews",
      "Dynamic Skill Visualization with animated skill tree",
      "AI-Powered Contact Assistant for visitor engagement",
      "Real-Time Portfolio Analytics with engagement metrics"
    ]
  },
  {
    title: "Weather Dashboard",
    description: "A comprehensive weather dashboard with real-time data, 7-day forecasts, interactive maps, and location-based weather alerts. Integrates with multiple weather APIs for accurate data.",
    tech: ["React", "OpenWeather API", "Chart.js", "Leaflet Maps", "PWA"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://weather-dashboard.vercel.app",
    goal: "Developed a comprehensive weather application to provide users with detailed weather information and forecasts. The goal was to create an intuitive dashboard that displays weather data in an easily digestible format with interactive maps.",
    processAndLearning: "Working with external APIs and data visualization was incredibly educational. I learned to handle API failures gracefully, implement proper error boundaries, and create meaningful data visualizations. The challenge of managing multiple API calls was solved by implementing request caching and debouncing.",
    features: [
      "Predictive Weather Modeling with 95% accuracy algorithms",
      "Personalized Weather Alerts based on user preferences",
      "Climate Change Tracking with historical trend analysis",
      "Weather-Based Recommendations for activities and travel"
    ]
  },
  {
    title: "Social Media Clone",
    description: "A social media platform clone with features like user profiles, posts, comments, likes, real-time notifications, and direct messaging. Built with modern web technologies.",
    tech: ["React", "Node.js", "Socket.io", "AWS S3", "Redis"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#",
    githubUrl: "https://github.com/AbdulWasih05",
    websiteUrl: "https://social-media-demo.vercel.app",
    goal: "Built a social media platform to demonstrate full-stack development skills and real-time features. The goal was to create a feature-rich social network with user profiles, content sharing, and real-time interactions.",
    processAndLearning: "Building a real-time social platform taught me about WebSocket connections, real-time data synchronization, and handling high-frequency updates. I learned to implement proper user authentication, manage file uploads, and create responsive social features. The challenge of real-time notifications was solved by implementing efficient event-driven architecture.",
    features: [
      "Content Moderation AI with automated filtering system",
      "Real-Time Live Streaming with interactive features",
      "Advanced Privacy Controls with granular settings",
      "Social Commerce Integration with seamless shopping"
    ]
  },
];

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
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
          <h2 className="text-3xl font-semibold text-left mb-2 text-gray-900 brand-name flex-shrink-0">
            Projects
          </h2>
          <div className="bg-gray-300 w-full h-0.5"></div>
        </div>
        <h4 className="text-base md:text-lg text-left mb-12 text-gray-700 leading-relaxed oswald">
          Explore some of my recent projects and see how I bring ideas to life
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white group cursor-pointer relative overflow-hidden"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 max-w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
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
            <span className="brand-name font-semibold">View All Projects</span>
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
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}