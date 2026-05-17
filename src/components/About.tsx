import { useState } from 'react';

type TabId = 'now' | 'toolkit' | 'experience';

const tabs: { id: TabId; num: string; label: string }[] = [
  { id: 'now', num: '01', label: 'Now' },
  { id: 'toolkit', num: '02', label: 'Toolkit' },
  { id: 'experience', num: '03', label: 'Experience' },
];

const tools = [
  // Frontend
  { name: 'React', desc: 'Production UIs, component systems.', cat: 'Frontend', usedIn: 'Saarthi' },
  { name: 'Next.js', desc: 'App router, SSR, Edge runtime.', cat: 'Frontend', usedIn: 'Pearl Modern School' },
  { name: 'TypeScript', desc: 'Strict types, generics, narrowing.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'Tailwind', desc: 'Utility-first CSS, styling systems.', cat: 'Frontend', usedIn: 'Core stack' },
  { name: 'Redux', desc: 'State management, predictable mutation.', cat: 'Frontend', usedIn: 'Saarthi' },
  // Backend
  { name: 'Node.js', desc: 'Express, streams, worker threads.', cat: 'Backend', usedIn: 'InsForge' },
  { name: 'Express', desc: 'REST APIs, middleware, routing.', cat: 'Backend', usedIn: 'InsForge' },
  { name: 'FastAPI', desc: 'Async APIs, Pydantic, backgrounds.', cat: 'Backend', usedIn: 'Nirman Mitra' },
  { name: 'PostgreSQL', desc: 'Schema design, indexing, queries.', cat: 'Backend', usedIn: 'Saarthi' },
  // Infra
  { name: 'AWS', desc: 'Cloud services, IAM, storage routing.', cat: 'Infra', usedIn: 'Nirman Mitra' },
  { name: 'Docker', desc: 'Multi-stage builds, Compose.', cat: 'Infra', usedIn: 'All projects' },
  { name: 'Git', desc: 'Version control, branching strategies.', cat: 'Infra', usedIn: 'All projects' },
  { name: 'CI/CD', desc: 'Automated pipelines, GitHub Actions.', cat: 'Infra', usedIn: 'Saarthi' },
  // AI & Agents
  { name: 'PyTorch', desc: 'Training, fine-tuning, RL agents.', cat: 'AI & Agents', usedIn: 'Dhara AI' },
];

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
    yearTop: '2025.',
    yearSub: 'Present. Karnataka',
    title: 'Full-Stack Intern,',
    company: 'Saarthi',
    role: 'Engineer. End to end.',
    body: 'Full-stack intern shipping production features end to end. Code in prod from week one, owning features without hand-holding, across React, FastAPI, and Postgres.',
    stack: ['React', 'FastAPI', 'PostgreSQL'],
  },
  {
    yearTop: '2025.',
    yearSub: 'Present. Side',
    title: 'Builder,',
    company: 'Nirman Mitra',
    role: 'Solo build. Live in production.',
    body: 'WhatsApp voice agent for Indian construction workers. Helps foremen track materials, log labour, and answer site queries in Hindi. Live on AWS Bedrock. Real users, real outcomes.',
    stack: ['AWS Bedrock', 'FastAPI', 'WhatsApp Cloud API'],
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
          <span>Full-Stack Intern @ Saarthi</span>
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
              Currently interning full-stack at <b className="italic text-ink font-normal">Saarthi</b>, shipping features to production across React, FastAPI, and Postgres. Side projects on the weekends.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              I move fast and iterate in the open. I don&apos;t leave a mess behind.
            </p>
            <p className="font-serif text-[20px] sm:text-[24px] leading-[1.45] text-ink-2 mb-5 max-w-[30ch]">
              If a problem looks unsolvable or unsexy, that&apos;s the kind I want.
            </p>
            <a
              href="/abdul-wasih-resume.pdf"
              target="_blank"
              rel="noopener"
              className="mt-[14px] inline-flex items-center gap-[14px] px-6 py-4 bg-ink text-paper font-mono text-xs uppercase tracking-[0.16em] hover:bg-ink-3 transition-colors"
            >
              Download Résumé (PDF) <span className="text-base">↓</span>
            </a>
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
              href="#contact"
              className="mt-auto inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:text-ink-3 transition-colors border-b border-ink/30 hover:border-ink pb-1"
            >
              Get in touch →
            </a>
          </aside>
        </section>
      )}

      {/* Toolkit panel */}
      {tab === 'toolkit' && (
        <section className="border-b-4 border-ink" aria-label="Stack">
          <div className="hidden md:grid grid-cols-[60px_1fr_140px_180px] gap-6 px-7 py-[14px] border-b border-ink font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 items-center">
            <div>№</div>
            <div>Tool. Description</div>
            <div className="text-left">Category</div>
            <div className="text-right">Used In</div>
          </div>
          {tools.map((t, i) => {
            const num = (i + 1).toString().padStart(2, '0');
            return (
              <div
                key={t.name}
                className={`group grid md:grid-cols-[60px_1fr_140px_180px] grid-cols-2 gap-4 md:gap-6 px-5 sm:px-7 py-[18px] sm:py-[22px] items-center transition-colors duration-150 hover:bg-ink hover:text-paper ${
                  i < tools.length - 1 ? 'border-b border-ink' : ''
                }`}
              >
                <div className="font-mono text-[11px] text-mute group-hover:text-rule">{num}</div>
                <div className="md:col-auto col-span-2 flex flex-col gap-1">
                  <h4 className="font-serif font-normal text-[24px] sm:text-[28px] tracking-[-0.02em] leading-none">
                    {t.name}
                  </h4>
                  <span className="text-[13px] text-mute group-hover:text-rule leading-[1.4]">
                    {t.desc}
                  </span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase bg-ink text-paper group-hover:bg-paper group-hover:text-ink px-[10px] py-[5px] justify-self-start md:justify-self-end">
                  {t.cat}
                </div>
                <div className="font-mono text-[12px] sm:text-[13px] font-bold text-right md:col-auto col-span-2 md:text-right text-left">
                  {t.usedIn}
                </div>
              </div>
            );
          })}
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
