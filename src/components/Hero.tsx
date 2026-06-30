import { memo, useState, useEffect } from 'react';
import { useResumeModal } from './ResumeModal';

const Hero = memo(() => {
  const { openResume, prefetchResume } = useResumeModal();

  // Smooth-scroll to the featured Projects section on the home page.
  // Falls back to the native #projects jump if the section isn't present.
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('projects');
    if (!el) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const roles = [
    "Hi",
    "नमस्ते",
    "Hallo",
    "Hola",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  const handleTyping = () => {
    const current = roles[index];
    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
      setSpeed(50); // faster when deleting
    } else {
      setText(current.substring(0, text.length + 1));
      setSpeed(100);
    }

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      setSpeed(500); // pause before starting next word
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);

  return (
    <section
      id="hero"
      className="grid grid-cols-1 lg:grid-cols-[1fr_340px] border-b border-ink"
    >
      {/* Main column */}
      <div className="px-5 py-7 sm:px-8 sm:py-8 lg:border-r border-ink flex flex-col min-w-0 border-b lg:border-b-0">
        <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 mb-3">
          <span className="bg-ink text-paper px-[10px] py-[6px]">Home</span>
          <span>Open to internships</span>
          <span>Karnataka, IN</span>
        </div>

        <h1
          className="font-serif leading-[0.94] tracking-[-0.03em] uppercase"
          style={{ fontSize: 'clamp(72px, 18vw, 108px)' }}
        >
          <span className="block font-black">Build.</span>
          <span className="block font-light text-ink-3 ">Break.</span>
          <span className="block font-black">Ship.</span>
        </h1>

        <div className="mt-[14px] max-w-[80ch] font-mono text-sm sm:text-base leading-[1.6] text-ink-3">
          <p className="block mb-4">
            {text || '\u00A0'}, I&apos;m <b className="text-ink font-semibold">Wasih</b>.
          </p>
          <p className="block">
            I can build full-stack products and ship them to production. Currently shipping <b className="text-ink font-semibold">SiteSaathi</b> and full-stack features at <b className="text-ink font-semibold">Saarthi</b>. Early in my career, but <b className="text-ink font-semibold">I build like I&apos;m not.</b>
          </p>
        </div>

        <div className="mt-[22px] flex flex-col sm:flex-row flex-wrap border-t border-b border-ink">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="flex-1 flex items-center justify-between gap-[18px] px-5 py-4 sm:border-r border-ink font-mono text-xs tracking-[0.12em] uppercase bg-ink text-paper hover:bg-ink-3 transition-colors duration-150 min-w-0 sm:min-w-[200px] border-b sm:border-b-0 border-ink"
          >
            <span>View My Work</span>
            <span className="text-base">→</span>
          </a>
          <button
            type="button"
            onClick={openResume}
            onPointerEnter={prefetchResume}
            onFocus={prefetchResume}
            onTouchStart={prefetchResume}
            className="flex-1 flex items-center justify-between gap-[18px] px-5 py-4 font-mono text-xs tracking-[0.12em] uppercase hover:bg-ink hover:text-paper transition-colors duration-150 min-w-0 sm:min-w-[200px]"
          >
            <span>Quick Look</span>
            <span className="text-base">↗</span>
          </button>
        </div>
      </div>

      {/* Side column: portrait + meta */}
      <aside className="flex flex-col">
        <div className="relative flex-1 min-h-[220px] bg-ink overflow-hidden">
          <picture>
            <source
              type="image/webp"
              srcSet="/wasih-img-400w.webp 400w, /wasih-img-800w.webp 800w, /wasih-img-1200w.webp 1200w"
              sizes="(max-width: 980px) 100vw, 340px"
            />
            <img
              src="/wasih-img.webp"
              alt="Abdul Wasih portrait"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="relative z-10 flex flex-col justify-between h-full p-[18px] text-paper">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-90 drop-shadow">Portrait</div>
            <div className="font-serif tracking-wide text-[84px] leading-[0.9] text-paper drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">A.W.</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-90 text-right drop-shadow">
              Karnataka, IN
            </div>
          </div>
        </div>
        <div className="px-5 py-[14px] border-t border-ink font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
          {[
            ['Role', 'Full-Stack Intern'],
            ['Based', 'Karnataka, IN'],
            ['Timezone', 'UTC+5:30'],
            ['Status', 'Open. Internships'],
          ].map(([k, v], i, arr) => (
            <div
              key={k}
              className={`flex justify-between py-[5px] ${i < arr.length - 1 ? 'border-b border-dashed border-rule' : ''}`}
            >
              <span>{k}</span>
              <b className="text-ink font-bold">{v}</b>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
