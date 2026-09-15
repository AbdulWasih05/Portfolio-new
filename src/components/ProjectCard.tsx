import { Link } from 'react-router-dom';
import { slugify, type Project } from '../data/projects';

const initialsOf = (title: string) =>
  title
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase, e.g. VidyutMitra -> Vidyut Mitra
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

type ProjectCardProps = {
  project: Project;
  num: string;
  className?: string;
};

// Featured project card, shared by the home page Projects section and the 404 page.
const ProjectCard = ({ project, num, className = '' }: ProjectCardProps) => (
  <Link
    to={`/projects/${slugify(project.title)}`}
    className={`flex flex-col text-inherit no-underline transition-colors duration-150 hover:bg-ink hover:text-paper group ${className}`}
  >
    <div className="relative aspect-[4/3] border-b border-ink overflow-hidden">
      {/* Premium studio backdrop — layered warm radials matching the theme */}
      <div
        className="night-backdrop absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% -12%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 55%), radial-gradient(110% 110% at 50% 120%, rgba(184,181,173,0.4) 0%, rgba(184,181,173,0) 60%), linear-gradient(158deg, #F5F2EC 0%, #EAE6DD 55%, #E1DCD2 100%)',
        }}
      />
      {/* Soft vignette + top sheen for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 90px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.55)',
        }}
      />
      {/* Dark wash on hover to match the card's ink invert */}
      <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {project.image ? (
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
          <picture className="contents">
            {project.imageWebP && <source type="image/webp" srcSet={project.imageWebP} />}
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-[8px] border border-ink/10 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1"
            />
          </picture>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif leading-none tracking-[-0.02em] select-none text-ink-3/45 group-hover:text-paper/40 transition-colors"
            style={{ fontSize: 'clamp(48px, 12vw, 96px)' }}
          >
            {initialsOf(project.title)}
          </span>
        </div>
      )}
    </div>
    <div className="px-[22px] pt-[22px] pb-[26px]">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute group-hover:text-rule mb-2">
        {num} · {project.year ?? '2025'}
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

export default ProjectCard;
