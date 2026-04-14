import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

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
        {featured.map((project, i) => {
          const num = (i + 1).toString().padStart(2, '0');
          return (
            <Link
              key={project.title}
              to={`/projects#${slugify(project.title)}`}
              className={`flex flex-col text-inherit no-underline transition-colors duration-150 hover:bg-ink hover:text-paper group ${
                i < featured.length - 1 ? 'md:border-r border-ink border-b md:border-b-0' : ''
              }`}
            >
              <div
                className="aspect-[4/3] border-b border-ink bg-paper-2 group-hover:bg-ink-2 transition-colors"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 14px)',
                }}
              >
                {project.image && (
                  <picture className="block w-full h-full">
                    {project.imageWebP && <source type="image/webp" srcSet={project.imageWebP} />}
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:mix-blend-normal group-hover:opacity-100 transition-opacity"
                    />
                  </picture>
                )}
              </div>
              <div className="px-[22px] pt-[22px] pb-[26px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute group-hover:text-rule mb-2">
                  {num} · 2025
                </div>
                <h3 className="font-serif font-normal text-[28px] sm:text-[36px] tracking-[-0.02em] leading-[1.04] mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] leading-[1.5] text-ink-2 group-hover:text-rule max-w-[38ch]">
                  {project.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Projects;
