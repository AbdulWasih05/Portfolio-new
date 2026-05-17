import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ink text-paper border-t-4 border-ink">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] border-b border-[#2a2a2a]">
        <div className="px-5 sm:px-8 py-8 sm:py-12 md:border-r border-[#2a2a2a] border-b md:border-b-0">
          <h2
            className="font-serif font-normal leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Want to build <span className="italic text-rule">something?</span>
            <br />
            Let&apos;s talk.
          </h2>
          <p className="text-rule mt-[18px] max-w-[48ch] leading-[1.55]">
            Open to internship and freelance work. Reach out at the address below.
          </p>
          <a
            href="mailto:buildwithwasih@gmail.com"
            className="inline-flex items-center gap-3 mt-6 font-serif text-[22px] sm:text-[28px] border-b border-paper pb-[6px]"
          >
            buildwithwasih@gmail.com
          </a>
        </div>

        <div className="px-5 sm:px-8 py-8 sm:py-12 md:border-r border-[#2a2a2a] border-b md:border-b-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute mb-[18px]">Navigation</div>
          <div className="grid gap-3 font-serif text-[20px] sm:text-[24px]">
            {[
              { label: 'Home', num: '01', href: '/' },
              { label: 'Work', num: '02', href: '/projects' },
              { label: 'About', num: '03', href: '/#about' },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="flex justify-between items-baseline gap-[10px] border-b border-[#2a2a2a] pb-[10px] hover:text-rule"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] text-mute">{l.num}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-8 py-8 sm:py-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute mb-[18px]">Connect</div>
          <div className="grid gap-3 font-serif text-[20px] sm:text-[24px]">
            {[
              { label: 'Résumé', sym: '↓', href: '/abdul-wasih-resume.pdf', external: true },
              { label: 'GitHub', sym: '↗', href: 'https://github.com/AbdulWasih05', external: true },
              { label: 'LinkedIn', sym: '↗', href: 'https://linkedin.com/in/iamwasih', external: true },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-baseline gap-[10px] border-b border-[#2a2a2a] pb-[10px] hover:text-rule"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] text-mute">{l.sym}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-[6px] sm:gap-0 px-5 sm:px-8 py-[18px] font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        <div>© 2025. Abdul Wasih</div>
        <div>KARNATAKA, IN. BUILT BY WASIH</div>
        <div>End of page :)</div>
      </div>
    </footer>
  );
};

export default Footer;
