import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="p-8">
          {/* Project Title & Short Description */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 w-[95%]">
              {project.title}
            </h3>
            <p className="text-gray-600 text-md leading-relaxed">
              {project.description}
            </p>
          </div>

          {/*goal */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-900 ">Goal:</h4>
            <div>
              <p className="text-gray-700 leading-relaxed">
                {project.goal}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-2">
            <h4 className="text-xl font-semibold text-gray-900">Technologies Used</h4>
            <div className="flex flex-wrap gap-2 p-4 rounded-xl" >
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-gray-200 to-gray-100 px-3 py-1.5  backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium border border-gray-200"
                  >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Unique Features */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Unique Features</h4>
            <div>
              <ul className="text-gray-700 leading-relaxed space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 font-semibold mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors font-medium"
              >
                <FaGithub className="text-lg" />
                <span>View Code</span>
              </a>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#757575] hover:bg-[#858585]] text-white rounded-xl transition-colors font-medium"
              >
                <FaExternalLinkAlt className="text-lg" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailModal;