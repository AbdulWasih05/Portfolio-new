import { Component, useEffect, useRef, type ReactNode } from 'react';

export type NoteKind = 'logo' | 'ping';

const NOTES: Record<NoteKind, { title: string; body: string }> = {
  logo: {
    title: 'Note — found under the logo',
    body: [
      'You clicked a logo seven times. On a portfolio.',
      "That's either QA instinct or a sticky mouse. Both welcome.",
      'Fun fact: the W is a <span>. Not an SVG. Shipped anyway.',
      '— W.',
    ].join('\n'),
  },
  ping: {
    title: 'PING wasih.tech',
    // TODO(wasih): personalize the uptime line.
    body: [
      'PING wasih.tech (127.0.0.1): 56 data bytes',
      '64 bytes from wasih.tech: icmp_seq=0..4 ttl=64 time=0.42 ms',
      '--- 5 packets transmitted, 5 received, 0% packet loss',
      'status: shipping',
      'uptime: since the first commit',
      'incidents: 0 (reported)',
    ].join('\n'),
  },
};

export const Note = ({ kind, onClose }: { kind: NoteKind; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { title, body } = NOTES[kind];

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [kind, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={title}
      // Bottom-left on desktop: toasts own the bottom-right corner there.
      className="wasih-drop fixed bottom-4 left-4 right-4 z-[94] border-4 border-ink bg-paper text-ink shadow-[8px_8px_0_0_#000] sm:right-auto sm:w-[380px]"
    >
      <div className="flex items-center justify-between bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
        <span>{title}</span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close note" className="-mr-2 px-2 hover:text-rule">
          ✕
        </button>
      </div>
      <p className="whitespace-pre-wrap px-4 py-3 font-mono text-[12px] leading-[1.6]">{body}</p>
    </div>
  );
};

const GLITCH_BARS = [
  { top: '18%', height: 6, jump: '28px' },
  { top: '41%', height: 3, jump: '-36px' },
  { top: '63%', height: 9, jump: '18px' },
  { top: '82%', height: 4, jump: '-22px' },
];

/** A few thin inverted bars that jump once and vanish. Never shown under reduced motion. */
export const GlitchOverlay = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[96] overflow-hidden">
    {GLITCH_BARS.map((bar) => (
      <span
        key={bar.top}
        className="wasih-glitch-bar"
        style={{ top: bar.top, height: bar.height, ['--wasih-jump' as string]: bar.jump }}
      />
    ))}
  </div>
);

/** If the terminal chunk fails (stale deploy, offline), close quietly instead of taking the page down. */
export class EggBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
