import { memo } from 'react';
import { Link } from 'react-router-dom';
import { GithubMark, LinkedinMark } from './BrandIcons';
import { site } from '@/data/site';
import { isFilled } from '@/data/projects';
import { useResumeModal } from './ResumeModal';
import { portraitSizes, portraitSrcSet } from '@/data/portrait';
import CopyEmail from './CopyEmail';

// Right-column card content (desktop). PLACEHOLDERS: swap in real details before shipping.
const currentlyBuilding = { name: '[Side project]', what: '[What it does, 3–5 words]' };
// What a recruiter screens for that the rest of the page doesn't show. An optional third item
// is a quieter second line.
// Hackathon results, from the résumé. The full list stays on the résumé.
const recentWins: [string, string, string][] = [
  ['1st', 'Build for Billions, NITK', 'Led a team of 4 · 100+ teams'],
  ['Winner', 'DEV Hacktoberfest 2026', 'Best Use of Entire · built Viva'],
];

const quickFacts: [string, string, string?][] = [
  ['Studying', 'B.E. CSE, AITM', 'Class of 2027'],
  ['Based in', `${site.location.replace(', IN', '')} · IST`],
  ['Speaks', 'English, Hindi, Urdu, Arabic'],
];

// The portrait is above the fold: fetch it with the first batch of requests (also preloaded in
// pages/Index.tsx) and paint it in the same frame as the text. Both portraits are in the DOM (one
// hidden by CSS) and hidden images still download, so they share one srcset and sizes.
// React 18 doesn't know the camelCase prop yet, so pass the lowercase HTML attribute through.
const avatarPriority = { fetchpriority: 'high', decoding: 'sync' } as Record<string, string>;

const Hero = memo(() => {
  const { openResume, prefetchResume } = useResumeModal();

  return (
    <section
      id="hero"
      className="grid grid-cols-1 lg:grid-cols-[1fr_340px] border-b border-ink"
    >
      {/* Main column, in three blocks: status row, intro (headline + paragraph), actions
          (buttons + contact). Phones use fixed gaps (32px between blocks, 16px inside the intro,
          12px between the two action rows) and larger type to fill the screen, so the blocks
          read as one composition. Name and role live in the header only. */}
      <div className="px-5 pt-10 pb-12 sm:py-10 sm:px-8 lg:border-r border-ink flex flex-col justify-center max-sm:gap-8 min-w-0 border-b lg:border-b-0">
        <div className="lg:hidden flex items-center gap-4 sm:mb-8">
          <picture>
            <source type="image/webp" srcSet={portraitSrcSet('webp')} sizes={portraitSizes} />
            <img
              src="/portrait/avatar.jpg"
              srcSet={portraitSrcSet('jpg')}
              sizes={portraitSizes}
              alt="Abdul Wasih"
              width={256}
              height={256}
              className="w-14 h-14 shrink-0 border border-ink object-cover"
              loading="eager"
              {...avatarPriority}
            />
          </picture>
          <div className="min-w-0 font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.16em]">
            <p className="text-ink">
              <span className="inline-block w-[7px] h-[7px] mr-2 mb-[1px] bg-ink rounded-full" />
              Open to SWE roles
            </p>
            <p className="mt-1 text-mute">{site.location}</p>
            <p className="mt-1 text-mute">B.E. CSE · Class of 2027</p>
          </div>
        </div>

        <div>
          <h1 className="font-serif font-normal leading-[1] tracking-[-0.03em] max-w-[20ch] [text-wrap:balance] text-[clamp(42px,12.5vw,50px)] sm:text-[clamp(34px,5.4vw,68px)]">
            {/* Name and role are in the header; kept here for screen readers and search. */}
            <span className="sr-only">
              {site.name}, {site.role}.{' '}
            </span>
            I like taking things apart, then crafting something better.
          </h1>

          <p className="mt-4 sm:mt-5 max-w-[52ch] font-serif text-[21px] sm:text-[23px] leading-[1.42] text-ink-2">
            Two startups in. 6+ months shipping to production at{' '}
            <b className="text-ink font-normal">Saarthi</b>, now building at a{' '}
            <b className="text-ink font-normal">stealth startup</b>. Off the clock, you&apos;ll find me at hackathons, in open-source repos, or tinkering with whatever caught my curiosity that week.
          </p>
        </div>

        <div className="sm:mt-6">
          {/* Phones: one row, the primary action takes the spare width. */}
          <div className="flex flex-wrap border border-ink">
            <button
              type="button"
              onClick={openResume}
              onPointerEnter={prefetchResume}
              onFocus={prefetchResume}
              onTouchStart={prefetchResume}
              className="group flex-1 flex items-center justify-between gap-3 sm:gap-[18px] px-4 sm:px-5 py-5 sm:py-4 border-r border-ink font-mono text-[13px] sm:text-xs tracking-[0.12em] uppercase bg-ink text-paper hover:bg-ink-3 active:translate-y-px transition-colors duration-150 min-w-0 sm:min-w-[200px]"
            >
              <span>View Résumé</span>
              <span className="text-base transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </button>
            <Link
              to="/#projects"
              className="group flex-none sm:flex-1 flex items-center justify-between gap-3 sm:gap-[18px] px-4 sm:px-5 py-5 sm:py-4 font-mono text-[13px] sm:text-xs tracking-[0.12em] uppercase ink-fill active:translate-y-px transition-colors duration-150 min-w-0 sm:min-w-[200px]"
            >
              <span>See Work</span>
              <span className="text-base transition-transform duration-150 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Phones: email and icons share one framed bar (like the buttons above), each cell 44px tall. */}
          <div className="mt-3 sm:mt-5 flex flex-wrap max-sm:flex-nowrap items-stretch gap-2 max-sm:gap-0 max-sm:border max-sm:border-ink font-mono text-[12px] tracking-[0.04em] text-ink-2">
            <CopyEmail className="max-sm:flex-1 max-sm:min-w-0 max-sm:min-h-[52px] max-sm:justify-between max-sm:gap-2 max-sm:border-0 max-sm:tracking-normal" />
            {[
              { label: 'GitHub', href: site.github, Icon: GithubMark },
              { label: 'LinkedIn', href: site.linkedin, Icon: LinkedinMark },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                title={label}
                className="w-[52px] min-h-[52px] sm:w-9 sm:min-h-9 shrink-0 flex items-center justify-center border border-ink max-sm:border-0 max-sm:border-l text-ink ink-fill active:translate-y-px transition-colors duration-150"
              >
                <Icon className="h-[18px] w-[18px] sm:h-4 sm:w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Side column (desktop): the photo and status, what's being built right now, then quick facts. */}
      <aside className="hidden lg:flex flex-col px-8 py-10">
        <div className="flex items-start gap-5">
          <picture>
            <source type="image/webp" srcSet={portraitSrcSet('webp')} sizes={portraitSizes} />
            <img
              src="/portrait/avatar.jpg"
              srcSet={portraitSrcSet('jpg')}
              sizes={portraitSizes}
              alt="Abdul Wasih"
              width={256}
              height={256}
              className="w-[88px] h-[88px] shrink-0 border border-ink object-cover"
              loading="eager"
              {...avatarPriority}
            />
          </picture>
          <div className="min-w-0">
            <p className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-ink">{site.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{site.role}</p>
            <p className="mt-3 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.14em] text-ink">
              <span className="inline-block w-[7px] h-[7px] mr-2 mb-[1px] bg-ink rounded-full" />
              Open to SWE roles
            </p>
          </div>
        </div>
        {isFilled(currentlyBuilding.name) && (
          <div className="mt-8 border-t border-ink pt-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Currently building</div>
            <p className="mt-2 font-serif text-[24px] leading-tight tracking-[-0.01em]">{currentlyBuilding.name}</p>
            {isFilled(currentlyBuilding.what) && (
              <p className="mt-1 text-[14px] leading-[1.5] text-ink-2">{currentlyBuilding.what}</p>
            )}
          </div>
        )}
        <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Quick facts</h2>
        <dl className="mt-3 border-t border-rule">
          {quickFacts.map(([k, v, sub]) => (
            <div key={k} className="grid grid-cols-[84px_1fr] gap-3 py-3 border-b border-rule">
              <dt className="pt-[3px] font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{k}</dt>
              <dd className="text-[14px] leading-[1.5] text-ink">
                {v}
                {sub && <span className="block text-ink-3">{sub}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Recent wins</h2>
        <dl className="mt-3 border-t border-rule">
          {recentWins.map(([place, event, detail]) => (
            <div key={event} className="grid grid-cols-[84px_1fr] gap-3 py-3 border-b border-rule">
              <dt className="pt-[3px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink">{place}</dt>
              <dd className="text-[14px] leading-[1.5] text-ink">
                {event}
                <span className="block text-ink-3">{detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
