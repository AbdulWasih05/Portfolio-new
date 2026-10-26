import { useEffect, useRef, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { site } from '@/data/site';

type CopyEmailProps = {
  /** 'dark' when it sits on an ink background (footer). */
  tone?: 'light' | 'dark';
  emailClassName?: string;
  className?: string;
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The Clipboard API is missing on insecure origins and in some in-app browsers.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
};

type CopyState = 'idle' | 'copied' | 'again' | 'failed';

// What the frame says in each state. All of them are laid out in the same grid cell, so the
// frame is always as wide as the longest line and never jumps when the text swaps.
const LINES: Record<CopyState, string> = {
  idle: site.email,
  copied: 'Copied. What’s cooking?',
  again: 'Too excited, huh?',
  failed: site.email,
};

// The email address in a frame; clicking anywhere on it copies the address. Two more taps
// while it still says "What's cooking?" get a different line.
const CopyEmail = ({ tone = 'light', emailClassName = '', className = '' }: CopyEmailProps) => {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number>();
  const extraTaps = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const showing = state === 'copied' || state === 'again';
    extraTaps.current = showing ? extraTaps.current + 1 : 0;
    const ok = await copyText(site.email);
    if (ok) navigator.vibrate?.(10);
    setState(!ok ? 'failed' : extraTaps.current >= 2 ? 'again' : 'copied');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setState('idle');
      extraTaps.current = 0;
    }, 2000);
  };

  const done = state === 'copied' || state === 'again';
  const Icon = done ? Check : state === 'failed' ? X : Copy;
  const frameTone =
    tone === 'dark'
      ? done
        ? 'border-paper bg-paper text-ink'
        : 'border-rule text-paper ink-fill [--fill:#F2F0EB] [--fill-text:#000] hover:border-paper'
      : done
        ? 'border-ink bg-ink text-paper'
        : 'border-ink text-ink ink-fill';

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        title="Copy email address"
        aria-label={`Copy email address ${site.email}`}
        className={`inline-flex max-w-full items-center gap-3 border px-3 py-2 text-left transition-[background-color,color,border-color,background-size,transform] duration-300 ease-out active:translate-y-px ${frameTone} ${className}`}
      >
        <span className={`grid min-w-0 [overflow-wrap:anywhere] ${emailClassName}`}>
          {(['idle', 'copied', 'again'] as const).map((key) => (
            <span
              key={key}
              aria-hidden={key !== 'idle' || undefined}
              className={`[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                LINES[state] === LINES[key] && (key !== 'idle' || !done)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              }`}
            >
              {LINES[key]}
            </span>
          ))}
        </span>
        <Icon aria-hidden="true" className="h-[1em] w-[1em] min-h-[14px] min-w-[14px] shrink-0" strokeWidth={1.75} />
      </button>
      <span aria-live="polite" className="sr-only">
        {done ? 'Email address copied' : state === 'failed' ? 'Could not copy the email address' : ''}
      </span>
    </>
  );
};

export default CopyEmail;
