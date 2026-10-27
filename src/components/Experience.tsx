import { useResumeModal } from './ResumeModal';
import { duration, experiences, formatMonth, isoMonth } from '@/data/experience';

const Experience = () => {
  const { openResume, prefetchResume } = useResumeModal();

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
            className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-9 px-5 sm:px-8 py-9 sm:py-7 hover:bg-paper-2 transition-colors ${
              i < experiences.length - 1 ? 'border-b border-ink' : ''
            }`}
          >
            {/* Phones: one line above the title. From md: the left column. */}
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
            <div>
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
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute mb-4 sm:mb-3">
                {xp.meta}
              </div>
              <p className="text-ink-2 text-[15px] leading-[1.65] max-w-[62ch]">{xp.body}</p>
              {xp.stack.length > 0 && (
                <ul className="flex flex-wrap gap-[6px] mt-5 sm:mt-4">
                  {xp.stack.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-[11px] tracking-[0.1em] uppercase border border-ink px-2 py-1"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
