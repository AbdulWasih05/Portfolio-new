import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/projects";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProjectsPage = () => {
    const container = useRef(null);
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    const headerOffset = 150;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 100);
            }
        } else {
            // Scroll to top when no hash is present
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
    }, [hash]);

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-gray-900 selection:text-white">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-24 cursor-default">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 playfair mb-8 tracking-tight">
                            Crafted <span className="italic font-light">Digital</span> Experiences.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                            A curated collection of full-stack applications, AI integrations, and technical challenges solved with modern architecture.
                        </p>
                    </motion.div>
                </section>

                {/* Projects Grid */}
                <section className="container mx-auto px-4">
                    <div className="flex flex-col gap-32">
                        {projects.map((project, index) => {
                            const isOdd = index % 2 !== 0;
                            return (
                                <motion.div
                                    key={index}
                                    id={`project-${index}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`flex flex-col ${isOdd ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center group`}
                                >
                                    {/* Image Section - Large & Interactive */}
                                    <div className="w-full lg:w-3/5">
                                        <a 
                                            href={project.link && project.link !== "#" ? project.link : project.githubUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block overflow-hidden rounded-2xl shadow-2xl relative"
                                        >
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ duration: 0.5 }}
                                                className="aspect-video overflow-hidden bg-gray-200"
                                            >
                                                <picture>
                                                    {project.imageWebP && (
                                                        <source type="image/webp" srcSet={project.imageWebP} />
                                                    )}
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                                        loading="lazy"
                                                        decoding="async"
                                                        width={1200}
                                                        height={675}
                                                    />
                                                </picture>
                                            </motion.div>
                                        </a>
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full lg:w-2/5 flex flex-col justify-center">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
                                                0{index + 1}
                                            </span>
                                            <div className="h-px w-12 bg-gray-300" />
                                        </div>

                                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 playfair mb-4 leading-tight group-hover:underline decoration-1 underline-offset-8 decoration-gray-300 transition-all">
                                            {project.title}
                                        </h2>

                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">The Challenge</h3>
                                                <p className="text-base text-gray-600 leading-relaxed">
                                                    {project.challenge || project.description}
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">The Approach</h3>
                                                <p className="text-base text-gray-600 leading-relaxed">
                                                    {project.approach || project.goal}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-gray-100 py-4">
                                            {project.impact && project.impact.map((stat, i) => (
                                                <div key={i} className="text-center">
                                                    <span className="block text-xl md:text-2xl font-bold text-gray-900 playfair mb-1">{stat.value}</span>
                                                    <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-widest">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Stack - Horizontal Scrollable on mobile, flex wrap on desktop */}
                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-6">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-600 transition-colors group/link"
                                                >
                                                    <FaGithub className="text-xl" />
                                                    <span className="border-b border-gray-900 group-hover/link:border-gray-600 transition-colors">View Source</span>
                                                </a>
                                            )}
                                            {project.link && project.link !== "#" && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-600 transition-colors group/link"
                                                >
                                                    <FaExternalLinkAlt className="text-lg" />
                                                    <span className="border-b border-gray-900 group-hover/link:border-gray-600 transition-colors">Live Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
                
                {/* Visual Separator */}
                <div className="container mx-auto px-4 py-32 flex justify-center">
                    <div className="h-24 w-px bg-gray-300" />
                </div>

                {/* GitHub Call to Action */}
                <section className="container mx-auto px-4 mb-20">
                    <div className="bg-gray-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay animate-float-slow" />
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl mix-blend-overlay animate-float-reverse" />
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white playfair mb-6">
                                More on GitHub
                            </h2>
                            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                                Explore my repositories for more experimental projects, contributions, and coding challenges.
                            </p>
                            <a
                                href="https://github.com/AbdulWasih05?tab=repositories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all font-medium hover:scale-105 shadow-xl hover:shadow-2xl"
                            >
                                <FaGithub className="text-xl" />
                                View All Repositories
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
