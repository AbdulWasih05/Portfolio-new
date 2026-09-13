import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const featured = projects.slice(0, 3);

  return (
    <>
      <section id="projects" className="px-5 sm:px-8 py-10 sm:py-12 border-b border-ink">
        <div className="flex justify-between items-end border-b-4 border-ink pb-[14px] flex-wrap gap-[18px]">
          <h2
            className="font-serif font-normal leading-none tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 7vw, 84px)' }}
          >
            Selected <span className="italic text-ink-3">Work</span>.
          </h2>
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-[0.16em] border-b border-ink pb-1 hover:text-ink-3"
          >
            All projects ({projects.length.toString().padStart(2, '0')}) →
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            num={(i + 1).toString().padStart(2, '0')}
            className={i < featured.length - 1 ? 'md:border-r border-ink border-b md:border-b-0' : ''}
          />
        ))}
      </div>
    </>
  );
};

export default Projects;
