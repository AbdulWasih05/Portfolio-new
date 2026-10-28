import { useResumeModal } from './ResumeModal';
import CopyEmail from './CopyEmail';

// What I can own: each capability, the tools behind it, and where it was proven (projects and
// roles on this page). Tools without a proof point were dropped. DRAFT copy: owner to review.
const capabilities = [
  {
    name: 'Product UIs',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Zustand'],
    proof: 'To the Moon, IJESTM, SlotSwapper',
  },
  {
    name: 'APIs and databases',
    tools: ['Node.js / Express', 'FastAPI', 'PostgreSQL', 'MySQL', 'Prisma', 'WhatsApp APIs'],
    proof: 'Saarthi, IJESTM, VidyutMitra',
  },
  {
    name: 'Payments',
    tools: ['Dodo Payments', 'Idempotent webhooks', 'License assignment'],
    proof: 'Saarthi: the whole payments system',
  },
  {
    name: 'Realtime and auth',
    tools: ['Socket.IO', 'WebSockets', 'JWT', 'Role- and record-level permissions'],
    proof: 'IJESTM: live notifications, five roles enforced per paper. Live auction bids. InsForge: realtime presence for channels (merged PR)',
  },
  {
    name: 'AI features',
    tools: ['Gemini', 'Groq', 'Sarvam AI', 'AWS Bedrock', 'DistilBERT / TensorFlow.js'],
    proof: 'VidyutMitra, SiteSaathi, Fake Review Detector',
  },
  // Hidden to save space; the stealth-startup entry in Experience covers it.
  // {
  //   name: 'Data pipelines',
  //   tools: ['Python', 'RSS ingestion (100+ feeds)'],
  //   proof: 'Stealth startup',
  // },
  {
    name: 'Ship and test',
    tools: ['Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Playwright / Vitest'],
    proof: 'To the Moon, SlotSwapper, Real Estate Platform',
  },
];

// The other half of the origin story: how that curiosity builds now, with AI in the loop.
// DRAFT copy: owner to review.
const howIWork = [
  {
    habit: 'Spec before prompt.',
    proof: "I write the plan, schema, and edge cases first. Claude Code works from a CLAUDE.md I maintain: stack, conventions, and what it shouldn't touch.",
  },
  {
    habit: 'I review. It attacks.',
    proof: 'AI writes a lot of my first drafts. I read every diff, then have it hunt edge cases and run the code until something breaks.',
  },
  {
    habit: 'Some things stay hand-designed.',
    proof: "Payments, auth, and data models I design myself. Nothing ships that I can't explain line by line.",
  },
];

const About = () => {
  const { openResume, prefetchResume } = useResumeModal();

  // Email + résumé. Desktop: under the story, so both columns end level. Below lg: after the list.
  const followUp = (
    <div className="flex flex-col items-start">
      <CopyEmail className="mt-8" emailClassName="font-serif text-[20px]" />
      <button
        type="button"
        onClick={openResume}
        onPointerEnter={prefetchResume}
        onFocus={prefetchResume}
        onTouchStart={prefetchResume}
        className="group mt-3 w-full sm:w-auto justify-between sm:justify-start inline-flex items-center gap-[14px] px-6 py-4 bg-ink text-paper font-mono text-xs uppercase tracking-[0.16em] hover:bg-ink-3 active:translate-y-px transition-colors duration-150"
      >
        View Résumé
        <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
      </button>
    </div>
  );

  return (
    <section id="about" className="scroll-mt-[84px] border-b-4 border-ink">
      <div className="px-5 sm:px-8 pt-14 pb-10 sm:py-12">
        <div className="border-b-4 border-ink pb-[14px]">
          <h2
            className="font-serif font-normal leading-none tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 7vw, 84px)' }}
          >
            About me.
          </h2>
        </div>
      </div>

      <div data-reveal className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border-t border-ink">
        {/* DRAFT copy: owner to review. The origin story; work and dates live in Experience. */}
        <div className="px-5 sm:px-8 py-12 sm:py-10 lg:border-r border-ink border-b lg:border-b-0 lg:flex lg:flex-col">
          <p className="font-serif text-[24px] sm:text-[30px] lg:text-[42px] leading-[1.3] lg:leading-[1.15] text-ink mb-6 sm:mb-5 lg:mb-6 max-w-[32ch] lg:max-w-[24ch] tracking-[-0.005em]">
            I found the inspect console as a kid and never really left.
          </p>
          <p className="font-serif text-[19px] sm:text-[21px] lg:text-[24px] leading-[1.5] text-ink-2 max-w-[52ch] lg:max-w-[46ch]">
            I got into computers early. Minecraft servers, Discord rooms, and once, a lecture video forced to 4x
            through the console the night before an exam. I&apos;m still that kid: curious, full of ideas, taking
            things apart and building the version I wish had existed. Just with better tools now, and better
            things to build.
          </p>
          <div className="hidden lg:block mt-auto pt-2">{followUp}</div>
        </div>
        {/* Right side: how the curiosity on the left builds today, then the two ways to follow up. */}
        <aside className="px-5 sm:px-8 py-12 sm:py-10 bg-paper-2 flex flex-col items-start">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute mb-6 sm:mb-5 flex items-center gap-[10px]">
            <span className="w-6 h-px bg-ink" />
            How I build with AI
          </h3>
          <ol className="w-full border-t border-rule">
            {howIWork.map((item, i) => (
              <li key={item.habit} className="grid grid-cols-[28px_1fr] gap-2 py-4 lg:py-3 border-b border-rule">
                <span className="pt-[6px] font-mono text-[11px] tracking-[0.1em] text-mute" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-serif text-[21px] sm:text-[22px] leading-[1.2] text-ink">{item.habit}</p>
                  <p className="mt-1 text-[14px] leading-[1.55] text-ink-2">{item.proof}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-serif text-[20px] sm:text-[21px] leading-[1.4] text-ink max-w-[34ch]">
            AI speeds up the writing. Owning the design and the flow is still my job.
          </p>
          {/* Phones and tablets: the follow-up closes the column. */}
          <div className="lg:hidden w-full">{followUp}</div>
        </aside>
      </div>

      {/* What I can own: capability, tools, where it was proven. */}
      <div data-reveal className="border-t border-ink">
        <h3 className="px-5 sm:px-8 pt-12 pb-4 sm:pt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute flex items-center gap-[10px]">
          <span className="w-6 h-px bg-ink" />
          What I can own
        </h3>
        <ol>
          {capabilities.map((cap, i) => (
            <li
              key={cap.name}
              className={`grid grid-cols-[32px_minmax(0,1fr)] md:grid-cols-[48px_240px_minmax(0,1fr)] gap-x-2 md:gap-x-4 gap-y-2 px-5 sm:px-8 py-6 sm:py-5 ${
                i < capabilities.length - 1 ? 'border-b border-dashed border-rule' : ''
              }`}
            >
              <span className="pt-[7px] font-mono text-[11px] tracking-[0.1em] text-mute" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-serif text-[22px] sm:text-[24px] leading-[1.2] tracking-[-0.01em]">{cap.name}</h4>
              <div className="col-start-2 md:col-start-3 md:row-start-1 min-w-0">
                {/* Each tool wraps as a unit; the dot trails it so no line starts with one. */}
                <ul className="flex flex-wrap font-mono text-[12px] leading-[1.7] uppercase tracking-[0.08em] text-ink">
                  {cap.tools.map((t, ti) => (
                    <li key={t}>
                      {t}
                      {ti < cap.tools.length - 1 && (
                        <span className="text-rule px-[0.45em]" aria-hidden="true">·</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-[14px] leading-[1.5] text-ink-3">
                  <span className="sr-only">Proven in: </span>
                  <span aria-hidden="true">↳ </span>
                  {cap.proof}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
