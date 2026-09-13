import { useState } from 'react';
import { useResumeModal } from './ResumeModal';

type TabId = 'now' | 'toolkit' | 'experience';

const tabs: { id: TabId; num: string; label: string }[] = [
  { id: 'now', num: '01', label: 'Now' },
  { id: 'toolkit', num: '02', label: 'Toolkit' },
  { id: 'experience', num: '03', label: 'Experience' },
];

// usedIn is left empty where no project in data/projects.ts shows the tool yet.
const tools = [
  // Frontend
  { name: 'React', desc: 'Production UIs, component systems.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'Next.js', desc: 'App router, SSR, Edge runtime.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'TypeScript', desc: 'Strict types, generics, narrowing.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'Tailwind', desc: 'Utility-first CSS, styling systems.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'Framer Motion / GSAP', desc: 'Entrance choreography, scroll and layout motion.', cat: 'Frontend', usedIn: '' },
  { name: 'TanStack Query', desc: 'Server state, caching, invalidation.', cat: 'Frontend', usedIn: '' },
  { name: 'Zustand', desc: 'Client state without the Redux weight.', cat: 'Frontend', usedIn: 'To the Moon' },
  // Backend
  { name: 'Node.js', desc: 'Express, streams, worker threads.', cat: 'Backend', usedIn: 'InsForge' },
  { name: 'Express', desc: 'REST APIs, middleware, routing.', cat: 'Backend', usedIn: 'InsForge' },
  { name: 'FastAPI', desc: 'Async APIs, Pydantic, backgrounds.', cat: 'Backend', usedIn: 'SiteSaathi' },
  { name: 'PostgreSQL', desc: 'Schema design, indexing, queries.', cat: 'Backend', usedIn: 'Saarthi' },
  { name: 'WebSockets / Socket.IO', desc: 'Real-time sequencing, reconnection handling.', cat: 'Backend', usedIn: 'IJESTM' },
  { name: 'Prisma / Drizzle', desc: 'Migrations, type-safe queries.', cat: 'Backend', usedIn: 'To the Moon' },
  { name: 'Redis', desc: 'Caching, rate limiting, queues.', cat: 'Backend', usedIn: '' },
  { name: 'Zod', desc: 'Runtime validation at API boundaries.', cat: 'Backend', usedIn: '' },
  // Infra
  { name: 'AWS', desc: 'Cloud services, IAM, storage routing.', cat: 'Infra', usedIn: 'SiteSaathi' },
  { name: 'Docker', desc: 'Multi-stage builds, Compose.', cat: 'Infra', usedIn: 'All projects' },
  { name: 'Git', desc: 'Version control, branching strategies.', cat: 'Infra', usedIn: 'All projects' },
  { name: 'CI/CD', desc: 'Automated pipelines, GitHub Actions.', cat: 'Infra', usedIn: 'Saarthi' },
  { name: 'Vercel', desc: 'Preview deploys, edge config.', cat: 'Infra', usedIn: '' },
  { name: 'Nginx / Cloudflare', desc: 'Reverse proxy, caching, DNS.', cat: 'Infra', usedIn: '' },
  { name: 'Sentry / PostHog', desc: 'Error tracking, product analytics.', cat: 'Infra', usedIn: '' },
  { name: 'Playwright / Vitest', desc: 'E2E and unit coverage.', cat: 'Infra', usedIn: '' },
  // AI & Research
  { name: 'PyTorch', desc: 'Model training, fine-tuning.', cat: 'AI & Research', usedIn: 'Dhara AI' },
  { name: 'Gemini / Groq LLMs', desc: 'Bill extraction and replies checked against deterministic facts.', cat: 'AI & Research', usedIn: 'VidyutMitra' },
  { name: 'AWS Bedrock', desc: 'Voice agent that understands Hindi voice notes.', cat: 'AI & Research', usedIn: 'SiteSaathi' },
  { name: 'DistilBERT', desc: 'Transformer text classification for fake reviews.', cat: 'AI & Research', usedIn: 'Fake Review Detector' },
  { name: 'TensorFlow.js / ONNX', desc: 'In-browser inference, no server round trip.', cat: 'AI & Research', usedIn: 'Fake Review Detector' },
  { name: 'Sarvam AI', desc: 'Kannada text-to-speech voice notes.', cat: 'AI & Research', usedIn: 'VidyutMitra' },
];

// One column per category, in the order categories first appear above.
const toolGroups = tools.reduce<{ cat: string; items: typeof tools }[]>((groups, tool) => {
  const group = groups.find((g) => g.cat === tool.cat);
  if (group) group.items.push(tool);
  else groups.push({ cat: tool.cat, items: [tool] });
  return groups;
}, []);

type Experience = {
  yearTop: string;
  yearSub: string;
  title: string;
  company: string;
  role: string;
  body: string;
  stack: string[];
};

const experiences: Experience[] = [
  {
    yearTop: '2026.',
    yearSub: 'Present. Stealth',
    title: 'Full-Stack Intern,',
    company: 'Stealth Startup',
    role: 'Second startup. Full-stack.',
    body: 'Second startup internship. Building full-stack features at an early-stage company in stealth.',
    stack: [],
  },
  {
    yearTop: '2025.',
    yearSub: '6+ months. Karnataka',
    title: 'Full-Stack Intern,',
    company: 'Saarthi',
    role: 'Engineer. End to end.',
    body: 'Full-stack intern shipping production features end to end. Code in prod from week one, owning features without hand-holding, across React, FastAPI, and Postgres. 6+ months alongside the founding engineers, and trusted with payments.',
    stack: ['React', 'FastAPI', 'PostgreSQL'],
  },
  {
    yearTop: '2025.',
    yearSub: 'Live. Client',
    title: 'Full-Stack Developer,',
    company: 'IJESTM',
    role: 'Built for AITM college. Live in production.',
    body: "Built AITM college's academic journal and peer-review platform, running the full manuscript lifecycle: submission, double-blind review, editorial decisions, and DOI publication. 55+ REST endpoints, five-role access control, and real-time notifications.",
    stack: ['React', 'Node.js', 'MySQL'],
  },
  {
    yearTop: '2025.',
    yearSub: 'Present. OSS',
    title: 'Open Source Contributor,',
    company: 'InsForge (YC P26)',
    role: 'One feature PR. Consistency fixes.',
    body: 'Shipping PRs to a YC-backed open-source backend platform. One feature merged. Plus consistency fixes across the codebase.',
    stack: ['TypeScript', 'Node.js'],
  },
  {
    yearTop: '2024.',
    yearSub: 'Present. Freelance',
    title: 'Freelance Web Developer,',
    company: 'Pearl Modern School',
    role: 'Solo build. Client work.',
    body: "Built and maintains the school's full website.",
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
  },
];

const About = () => {
  const [tab, setTab] = useState<TabId>('now');
  const [activeToolName, setActiveToolName] = useState(tools[0].name);
  const activeTool = tools.find((t) => t.name === activeToolName) ?? tools[0];
  const { openResume, prefetchResume } = useResumeModal();

  return (
    <>
      {/* About head */}
      <section
        id="about"
        className="px-5 sm:px-8 pt-12 sm:pt-14 pb-7 border-b-4 border-ink grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end"
      >
        <h2
          className="font-serif font-normal leading-[0.9] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(48px, 9vw, 120px)' }}
        >
          About <span className="italic text-ink-3">me</span>.
        </h2>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 md:text-right">
          <b className="block text-ink">Karnataka, IN</b>
          <span>Full-Stack Intern @ Stealth Startup</span>
        </div>
      </section>

      {/* Tabs */}
      <div role="tablist" className="flex border-b border-ink bg-paper overflow-x-auto">
        {tabs.map((t, i) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-[120px] px-5 py-[18px] text-left flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
                i < tabs.length - 1 ? 'border-r border-ink' : ''
              } ${active ? 'bg-ink text-paper' : 'text-ink-3 hover:bg-paper-2'}`}
            >
              <span className={`font-serif italic text-[18px] ${active ? 'text-rule' : 'text-mute'} normal-case tracking-normal`}>
                {t.num}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Now panel */}
      {tab === 'now' && (
        <section className="border-b-4 border-ink grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
          <div className="px-5 sm:px-8 py-10 sm:py-12 lg:border-r border-ink border-b lg:border-b-0">
            <p className="font-serif text-[24px] sm:text-[32px] leading-[1.45] text-ink mb-5 max-w-[24ch] tracking-[-0.005em]">
              I build full-stack products and own them end to end. Database to deploy.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              Currently interning full-stack at a <b className="italic text-ink font-normal">stealth startup</b>, after 6+ months shipping to production at <b className="italic text-ink font-normal">Saarthi</b> across React, FastAPI, and Postgres. Side projects on the weekends.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              I move fast and iterate in the open. I don&apos;t leave a mess behind.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              If a problem looks unsolvable or unsexy, that&apos;s the kind I want.
            </p>
            <button
              type="button"
              onClick={openResume}
              onPointerEnter={prefetchResume}
              onFocus={prefetchResume}
              onTouchStart={prefetchResume}
              className="mt-[14px] inline-flex items-center gap-[14px] px-6 py-4 bg-ink text-paper font-mono text-xs uppercase tracking-[0.16em] hover:bg-ink-3 transition-colors"
            >
              View Résumé (PDF) <span className="text-base">↗</span>
            </button>
          </div>
          <aside className="px-5 sm:px-8 py-10 sm:py-12 bg-paper-2 flex flex-col items-start">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute mb-8 flex items-center gap-[10px]">
              <span className="w-6 h-px bg-ink" />
              Open To
            </div>

            <p className="font-serif text-[24px] sm:text-[32px] leading-[1.45] text-ink mb-5 max-w-[24ch] tracking-[-0.005em]">
              Full-stack internships.
            </p>

            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              The pull for me is real ownership. Features I own end to end, shipped to people who actually use them.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              Startup or big tech, that&apos;s the kind of team I want.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-8 max-w-[30ch]">
              Remote, or on the ground in Bangalore.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=buildwithwasih@gmail.com&su=Hello%20Wasih"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:text-ink-3 transition-colors border-b border-ink/30 hover:border-ink pb-1"
            >
              Get in touch →
            </a>
          </aside>
        </section>
      )}

      {/* Toolkit panel — tools batched as tags per category; hovering or focusing one fills the detail panel */}
      {tab === 'toolkit' && (
        <section className="border-b-4 border-ink grid grid-cols-1 lg:grid-cols-[1fr_340px]" aria-label="Stack">
          <div className="lg:border-r border-ink">
            {toolGroups.map((group, gi) => (
              <div
                key={group.cat}
                className={`grid grid-cols-1 md:grid-cols-[170px_1fr] ${gi < toolGroups.length - 1 ? 'border-b border-ink' : ''}`}
              >
                <div className="px-5 sm:px-8 md:pl-8 md:pr-4 pt-5 md:pb-5 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="bg-ink text-paper px-[10px] py-[5px]">{group.cat}</span>
                  <span className="text-mute">{group.items.length.toString().padStart(2, '0')} tools</span>
                </div>
                <div className="px-5 sm:px-8 md:pl-0 pt-3 pb-5 md:pt-5 flex flex-wrap gap-2">
                  {group.items.map((t) => {
                    const isActive = t.name === activeTool.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveToolName(t.name)}
                        onFocus={() => setActiveToolName(t.name)}
                        onClick={() => setActiveToolName(t.name)}
                        className={`font-serif text-[18px] sm:text-[20px] leading-none tracking-[-0.01em] border border-ink px-3 py-[7px] transition-colors duration-150 ${
                          isActive ? 'bg-ink text-paper' : 'hover:bg-paper-2'
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside
            aria-live="polite"
            className="order-first lg:order-none border-b lg:border-b-0 border-ink bg-paper-2 px-5 sm:px-8 py-6 sm:py-8 flex flex-col gap-3"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute flex items-center gap-[10px]">
              <span className="w-6 h-px bg-ink" />
              {activeTool.cat}
            </div>
            <h4 className="font-serif font-normal text-[36px] sm:text-[44px] leading-[0.95] tracking-[-0.02em]">
              {activeTool.name}
            </h4>
            <p className="font-serif text-[20px] leading-[1.4] text-ink-2 max-w-[30ch]">{activeTool.desc}</p>
            <div className="mt-auto pt-4 border-t border-dashed border-rule flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.12em]">
              <span className="text-mute">Used in</span>
              <b className="text-ink font-bold text-right">{activeTool.usedIn || '—'}</b>
            </div>
          </aside>
        </section>
      )}

      {/* Experience panel */}
      {tab === 'experience' && (
        <section className="border-b-4 border-ink">
          {experiences.map((xp, i) => (
            <article
              key={xp.company}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-9 px-5 sm:px-8 py-7 sm:py-8 hover:bg-paper-2 transition-colors ${
                i < experiences.length - 1 ? 'border-b border-ink' : ''
              }`}
            >
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
                <b className="block text-ink font-serif font-normal text-[36px] tracking-[-0.02em] leading-none normal-case mb-2">
                  {xp.yearTop}
                </b>
                {xp.yearSub}
              </div>
              <div>
                <h3
                  className="font-serif font-normal leading-[1.05] tracking-[-0.02em] mb-[6px]"
                  style={{ fontSize: 'clamp(24px, 3.4vw, 48px)' }}
                >
                  {xp.title} <span className="italic text-ink-3">{xp.company}</span>
                </h3>
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute mb-[14px]">
                  {xp.role}
                </div>
                <p className="text-ink-2 text-[15px] leading-[1.65] max-w-[60ch]">{xp.body}</p>
                <div className="flex flex-wrap gap-[6px] mt-[18px]">
                  {xp.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase border border-ink px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
};

export default About;
