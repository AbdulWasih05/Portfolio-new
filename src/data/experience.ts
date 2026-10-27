// Work history shown in the Experience section and in /llms-full.txt.

// A month is 1-12. Leave it out while the exact month isn't known: the range shows a
// placeholder and no duration is computed.
export type YearMonth = { year: number; month?: number };

export type ExperienceEntry = {
  title: string;
  /** Left out when the role isn't at one company (open source). */
  company?: string;
  /** Words between role and company: "@" for employers, a comma for a product (IJESTM is a journal). */
  joiner?: ',' | 'at';
  /** Plain facts only: kind of work and where. */
  meta: string;
  start: YearMonth;
  end: YearMonth | 'present';
  body: string;
  stack: string[];
};

// Newest first, by start date. DRAFT copy: owner to review.
export const experiences: ExperienceEntry[] = [
  {
    title: 'Software Engineering Intern',
    // Named on the résumé only; the public site keeps the company anonymous.
    company: 'Stealth Startup',
    meta: 'Internship · Remote',
    start: { year: 2026, month: 8 },
    end: 'present',
    body: 'Own the news ingestion pipeline for a supply-chain intelligence platform: 100+ RSS sources polled hourly into structured events, grouped across outlets into 200+ evolving situations. A triage pass that scores every candidate before selection raised published output per model call 2.3x, from 18% to 42%.',
    stack: ['TypeScript', 'Node.js', 'MongoDB', 'Gemini'],
  },
  {
    // Merged PRs checked on GitHub (Oct 2026): InsForge 8 (core, CLI, JS SDK, skills), Kestra 1,
    // Apicurio Registry 1, Sugar Labs Music Blocks 1, cognee-community 1. First merge Mar 2026.
    title: 'Open Source Contributor',
    meta: 'Open source · 12 merged PRs · 5 orgs',
    start: { year: 2026, month: 3 },
    end: 'present',
    body: "Merged PRs across InsForge, Kestra, Apicurio Registry, cognee and Sugar Labs' Music Blocks. Highlights: realtime presence for InsForge channels, terminal-width-aware tables in the Apicurio CLI, and an Asana connector for cognee.",
    stack: ['TypeScript', 'Python', 'JavaScript'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Saarthi',
    meta: 'Internship · Karnataka',
    start: { year: 2026, month: 1 },
    end: { year: 2026, month: 6 },
    body: 'Owned payments as a founding-team intern: the whole system on Dodo Payments, from an idempotent webhook pipeline to licence assignment, so a retried webhook cannot double-charge anyone. Cut a hot-path lookup from 77ms to 0.4ms, benchmarked on 500k rows.',
    stack: ['React', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'IJESTM',
    joiner: ',',
    meta: 'Client · Live · Maintaining',
    // Built Nov 2025 to Feb 2026, maintained since.
    start: { year: 2025, month: 11 },
    end: 'present',
    body: "Built my college's academic journal and peer-review platform, running the full manuscript lifecycle: submission, double-blind review, editorial decisions, and DOI publication. 55+ REST endpoints, five-role access control, and real-time notifications. Built from Nov 2025 to Feb 2026, iterating on feedback from editors and authors; maintaining it since.",
    stack: ['React', 'Node.js', 'MySQL'],
  },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = new Date();
const resolve = (d: YearMonth | 'present'): YearMonth =>
  d === 'present' ? { year: now.getFullYear(), month: now.getMonth() + 1 } : d;

export const formatMonth = (d: YearMonth | 'present') =>
  d === 'present' ? 'Present' : `${d.month ? MONTHS[d.month - 1] : '[Mon]'} ${d.year}`;

// For <time dateTime>: "2025-03", or just "2025" when the month isn't known.
export const isoMonth = (d: YearMonth) => (d.month ? `${d.year}-${String(d.month).padStart(2, '0')}` : `${d.year}`);

// Both ends count, so Mar to Sep is 7 months. Unknown months give no duration.
export const duration = (start: YearMonth, end: YearMonth | 'present') => {
  const e = resolve(end);
  if (!start.month || !e.month) return null;
  const total = (e.year - start.year) * 12 + (e.month - start.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} yr${years > 1 ? 's' : ''}`, months && `${months} mo${months > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' ');
};
