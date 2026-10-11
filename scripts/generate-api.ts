// Builds the payload for /api/me.json from src/data, so the site and the API
// can never disagree. Consumed by the `wasih-api` plugin in vite.config.ts:
// emitted as dist/api/me.json on build, served by middleware in dev.
// Relative imports only: this runs inside the Vite config bundle, where the @ alias doesn't exist.
import { projects, slugify } from '../src/data/projects';
import { profile, FEATURED_PROJECT_SLUGS } from '../src/data/profile';

const SITE = 'https://wasih.tech';

export function buildMe() {
    // email stays out of the API; sudo hire-me is the one place it's offered.
    const { email: _email, joke, _meta, ...rest } = profile;

    const bySlug = new Map(projects.map((p) => [slugify(p.title), p]));
    const featured_projects = FEATURED_PROJECT_SLUGS.flatMap((slug) => {
        const p = bySlug.get(slug);
        return p ? [{ name: p.title, year: p.year ?? null, tech: p.tech, url: `${SITE}/projects/${slug}` }] : [];
    });

    return {
        ...rest,
        featured_projects,
        all_projects: `${SITE}/projects`,
        project_count: projects.length,
        joke,
        _meta,
    };
}
