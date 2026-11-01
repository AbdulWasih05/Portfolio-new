import Fold from './Fold';
import { useResumeModal } from './ResumeModal';
import { duration, experiences, formatMonth, isoMonth, type ExperienceEntry } from '@/data/experience';
import { usePhone } from '@/hooks/usePhone';

// Dates and duration. Phones: one line above the title. From md: the left column.
const Dates = ({ xp }: { xp: ExperienceEntry }) => (
  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 md:pt-[6px]">
    <span className="text-ink">
      <time dateTime={isoMonth(xp.start)} className="whitespace-nowrap">{formatMonth(xp.start)}</time>
      {' – '}
      {xp.end === 'present' ? 'Present' : <time dateTime={isoMonth(xp.end)} className="whitespace-nowrap">{formatMonth(xp.end)}</time>}
    </span>
    {duration(xp.start, xp.end) && (
      <span className="before:content-['·'] before:px-2 md:before:content-none md:before:px-0 md:block md:mt-2">
        {duration(xp.start, xp.end)}
      </span>
    )}
  </p>
);

// Role, company and the kind of work: the part that is always visible.
const Heading = ({ xp }: { xp: ExperienceEntry }) => (
  <>
    <h3
      className="font-serif font-normal leading-[1.05] tracking-[-0.02em] mb-[6px]"
      style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
    >
      {xp.title}
      {xp.company && (
        <span className="text-ink-3">
          {xp.joiner === ',' ? ', ' : ' @ '}
          {xp.company}
        </span>
      )}
    </h3>
    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">{xp.meta}</div>
  </>
);

// What was actually done, and with what: folded away on phones for every role but the current one.
const Detail = ({ xp }: { xp: ExperienceEntry }) => (
  <>
    <p className="text-ink-2 text-[15px] leading-[1.65] max-w-[62ch]">{xp.body}</p>
    {xp.stack.length > 0 && (
      <ul className="flex flex-wrap gap-[6px] mt-5 sm:mt-4">
        {xp.stack.map((s) => (
          <li key={s} className="font-mono text-[11px] tracking-[0.1em] uppercase border border-ink px-2 py-1">
            {s}
          </li>
        ))}
      </ul>
    )}
  </>
);

const Experience = () => {
  const { openResume, prefetchResume } = useResumeModal();
  const phone = usePhone();

  return (
    <section id="experience" className="scroll-mt-[84px] border-b border-ink">
      <div className="px-5 sm:px-8 pt-14 pb-10 sm:py-12">
        <div className="flex justify-between items-end border-b-4 border-ink pb-[14px] flex-wrap gap-[18px]">
          <h2
            className="font-serif font-normal leading-none tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 7vw, 84px)' }}
          >
            Experience<span className="text-ink-3">.</span>
          </h2>
          <button
            type="button"
            onClick={openResume}
            onPointerEnter={prefetchResume}
            onFocus={prefetchResume}
            onTouchStart={prefetchResume}
            className="relative font-mono text-xs uppercase tracking-[0.16em] border-b border-ink pb-1 transition-colors duration-150 hover:text-ink-3 after:absolute after:inset-x-0 after:-inset-y-3 after:content-['']"
          >
            View Résumé ↗
          </button>
        </div>
      </div>

      <div data-reveal className="border-t border-ink">
        {experiences.map((xp, i) => (
          <article
            key={xp.title + isoMonth(xp.start)}
            className={`px-5 sm:px-8 py-7 sm:py-7 md:hover:bg-paper-2 transition-colors ${
              i < experiences.length - 1 ? 'border-b border-ink' : ''
            }`}
          >
            {phone ? (
              // Phones: only the current role is open; the rest are one tap away.
              <Fold
                open={i === 0}
                label={`${xp.title}${xp.company ? ` at ${xp.company}` : ''}`}
                summaryClassName="py-2 -my-2"
                bodyClassName="pt-4"
                summary={
                  <>
                    <Dates xp={xp} />
                    <div className="mt-4">
                      <Heading xp={xp} />
                    </div>
                  </>
                }
              >
                <Detail xp={xp} />
              </Fold>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-9">
                <Dates xp={xp} />
                <div>
                  <Heading xp={xp} />
                  <div className="mt-3">
                    <Detail xp={xp} />
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
