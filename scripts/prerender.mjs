// Runs after `vite build` and the SSR build (see the "build" script in package.json).
// 1. Renders every route to static HTML in dist/, each with its own <head> (title,
//    description, canonical, social tags, JSON-LD), so crawlers that don't run JavaScript
//    (AI assistants, link previews) see the real page. The browser bundle then takes over.
// 2. Writes dist/404.html, served with a real 404 status for unknown URLs (netlify.toml).
// 3. Generates sitemap.xml, llms.txt and llms-full.txt from the same data the site uses.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssr = join(root, 'dist-ssr');

const { render, projects, blogs, slugify, site, experiences, formatMonth } = await import(
  pathToFileURL(join(ssr, 'entry-server.js')).href
);

const template = readFileSync(join(dist, 'index.html'), 'utf-8');

// The template's fallback head tags (data-rh) and <title> are replaced by each page's own.
const baseHead = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<(meta|link)\b[^>]*\bdata-rh="true"[^>]*>\s*/g, '');

const page = (head, html) =>
  baseHead.replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`);

const write = (file, contents) => {
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, contents);
};

const routes = ['/', '/projects', ...projects.map((p) => `/projects/${slugify(p.title)}`)];

// Temporary: the blog URLs were shared with the submissions, so they must exist as real pages
// (anything not prerendered is a 404 in production). Nothing links to them and they stay out of
// the sitemap, since they come down once the results are in.
const unlisted = ['/blogs', ...blogs.map((b) => `/blogs/${b.slug}`)];

for (const url of [...routes, ...unlisted]) {
  const { html, head } = await render(url);
  write(url === '/' ? 'index.html' : join(url.slice(1), 'index.html'), page(head, html));
  console.log(`prerendered ${url}`);
}

const notFound = await render('/__not-found__');
write('404.html', page(notFound.head, notFound.html));
console.log('prerendered 404.html');

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (u) => `  <url>
    <loc>${site.url}${u}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u === '/' ? '1.0' : u === '/projects' ? '0.8' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);

// llms.txt (https://llmstxt.org): a short, plain-text profile with links, for AI assistants.
const projectUrl = (p) => `${site.url}/projects/${slugify(p.title)}`;
const range = (x) => `${formatMonth(x.start)} – ${x.end === 'present' ? 'Present' : formatMonth(x.end)}`;
const role = (x) => `${x.title}${x.company ? ` at ${x.company}` : ''}`;

const llms = `# ${site.name}

> ${site.summary}

${site.name} is a ${site.role.toLowerCase()} based in Bangalore, India, studying ${site.education.degree} at ${site.education.school} (class of ${site.education.graduation}). Open to software engineering roles.

- Website: ${site.url}/
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- X: ${site.x}
- Email: ${site.email}
- Résumé (PDF): ${site.url}/abdul-wasih-resume.pdf
- How he works with coding agents (a sample of the CLAUDE.md he hands them): ${site.claudeMd}

## Experience

${experiences.map((x) => `- ${role(x)} (${range(x)}): ${x.body}`).join('\n')}

## Projects

${projects.map((p) => `- [${p.title}](${projectUrl(p)}): ${p.outcome ?? p.description}`).join('\n')}

## Optional

- [Full profile in plain text](${site.url}/llms-full.txt)
- [All projects](${site.url}/projects)
`;
write('llms.txt', llms);

// llms-full.txt: the same, plus each case study in full.
const full = `${llms}
## Case studies

${projects
  .map(
    (p) => `### ${p.title}

URL: ${projectUrl(p)}${p.year ? `\nYear: ${p.year}` : ''}
Stack: ${p.tech.join(', ')}

${p.description}

Problem: ${p.challenge}

Approach: ${p.approach}
${p.hardPart ? `\n${p.hardPartLabel ?? 'The hard part'}: ${p.hardPart}\n` : ''}
Features:
${p.features.map((f) => `- ${f}`).join('\n')}
${p.impact.length ? `\nResults: ${p.impact.map((s) => `${s.value} ${s.label.toLowerCase()}`).join('; ')}\n` : ''}`,
  )
  .join('\n')}`;
write('llms-full.txt', full);

console.log('wrote sitemap.xml, llms.txt, llms-full.txt');

// The SSR bundle is only needed for this step.
rmSync(ssr, { recursive: true, force: true });
