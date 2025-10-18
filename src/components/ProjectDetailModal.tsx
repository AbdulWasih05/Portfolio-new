import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useEffect, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';

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

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailModal = memo(({ project, onClose }: ProjectDetailModalProps) => {
  const gradients = useMemo(() => [
    'bg-gradient-to-r from-gray-900 to-gray-700',
    'bg-gradient-to-r from-black to-gray-800',
    'bg-gradient-to-r from-gray-800 to-gray-600',
    'bg-gradient-to-r from-slate-900 to-slate-700',
    'bg-gradient-to-r from-neutral-900 to-neutral-700',
    'bg-gradient-to-r from-zinc-900 to-zinc-700',
    'bg-gradient-to-r from-stone-900 to-stone-700',
    'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700',
  ], []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999] p-6"
      onClick={onClose}
    >
      <motion.div
        className="glass-morphism rounded-3xl w-[96%] md:w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto relative shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-black hover:from-black hover:to-gray-900 backdrop-blur-md border border-gray-600/50 hover:border-gray-500 transition-all duration-300 z-10 text-white hover:scale-110 hover:rotate-90 shadow-lg hover:shadow-2xl group"
          aria-label="Close modal"
        >
          <FaTimes className="text-lg group-hover:text-white" />
        </button>

        <div className="p-8">
          {/* Project Title & Short Description */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 w-[85%] md:w-[95%]">
              {project.title}
            </h3>
            <p className="text-gray-600 text-md leading-relaxed">
              {project.description}
            </p>
          </div>

          {/*goal */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Goal</h4>
            <div>
              <p className="text-gray-700 leading-relaxed">
                {project.goal}
              </p>
            </div>
          </div>

          {/* Section Divider */}
          <div className="section-divider"></div>

          {/* Technologies Used */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-3 p-4 rounded-xl" >
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className={`${gradients[i % gradients.length]} px-4 py-2 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-default border border-gray-600/30`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section Divider */}
          <div className="section-divider"></div>

          {/* Unique Features */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Unique Features</h4>
            <div>
              <ul className="space-y-3">
                {project.features.map((feature, index) => {
                  return (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 mt-0.5">
                        <FaCheckCircle className="text-gray-800 text-lg group-hover:scale-110 group-hover:text-black transition-all duration-300" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-black hover:via-gray-900 hover:to-gray-800 text-white rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-gray-700/50 hover:border-gray-600 group"
              >
                <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">View Code</span>
              </a>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] border-2 border-gray-900 hover:border-gray-700 group"
              >
                <FaExternalLinkAlt className="text-xl group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';

export default ProjectDetailModal;