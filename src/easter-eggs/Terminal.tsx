import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeModal } from '@/components/ResumeModal';
import { useEasterEggs } from './context';
import { WELCOME, complete, run, type LineKind, type Segment } from './commands';

interface Line {
  id: number;
  kind: LineKind;
  parts: Segment[];
}

const MAX_LINES = 400;
const MAX_HISTORY = 50;
const CHIPS = ['help', 'whoami', 'ls', 'cat now.md', 'secrets', 'clear', 'exit'];
// The only links the terminal will ever render. Command output can't smuggle in anything else.
const SAFE_HREF = /^mailto:[^\s<>"']+$/;

const Terminal = ({ autoFocus }: { autoFocus: boolean }) => {
  const { find, found, closeTerminal, history, resetSecrets, glitch } = useEasterEggs();
  const { openResume } = useResumeModal();
  const navigate = useNavigate();

  const [lines, setLines] = useState<Line[]>([{ id: 0, kind: 'out', parts: [WELCOME] }]);
  const [value, setValue] = useState('');
  const [viewport, setViewport] = useState<{ height: number; top: number } | null>(null);
  const nextId = useRef(1);
  const historyIndex = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((kind: LineKind, parts: Segment[]) => {
    const id = nextId.current++;
    setLines((current) => [...current.slice(-(MAX_LINES - 1)), { id, kind, parts }]);
  }, []);

  useEffect(() => {
    find('terminal');
  }, [find]);

  // Focus the prompt only for keyboard opens, so touch opens don't throw up the soft keyboard.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
    else panelRef.current?.focus({ preventScroll: true });
    return () => {
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [autoFocus]);

  // Escape to close and a background scroll lock, as in ResumeModal.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') closeTerminal();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [closeTerminal]);

  // Keep the panel inside the visible area when a mobile keyboard shrinks the viewport.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setViewport({ height: vv.height, top: vv.offsetTop });
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  const execute = async (raw: string) => {
    const input = raw.trim();
    push('in', [input]);
    historyIndex.current = null;
    if (!input) return;
    const h = history.current;
    if (h[h.length - 1] !== input) {
      h.push(input);
      if (h.length > MAX_HISTORY) h.shift();
    }
    await run(input, {
      print: (text, kind = 'out') => push(kind, [text]),
      printParts: (parts) => push('out', parts),
      clear: () => setLines([]),
      close: () => window.setTimeout(closeTerminal, 150),
      navigate: (to) =>
        window.setTimeout(() => {
          navigate(to);
          closeTerminal();
        }, 200),
      openResume: () => {
        closeTerminal();
        // Let the terminal release its scroll lock before the résumé modal takes its own.
        window.setTimeout(openResume, 0);
      },
      find,
      found,
      glitch,
      resetSecrets,
      history: [...h],
    });
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const h = history.current;
      if (!h.length) return;
      e.preventDefault();
      const from = historyIndex.current ?? h.length;
      const to = e.key === 'ArrowUp' ? Math.max(0, from - 1) : from + 1;
      historyIndex.current = to >= h.length ? null : to;
      setValue(to >= h.length ? '' : h[to]);
    } else if (e.key === 'Tab' && !e.shiftKey && value.trim()) {
      // Empty prompt: Tab keeps moving focus, so keyboard users are never stuck.
      e.preventDefault();
      const result = complete(value);
      if (result.options) {
        push('in', [value]);
        push('out', [result.options.join('   ')]);
      }
      if (result.value) setValue(result.value);
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !window.getSelection()?.toString()) {
      e.preventDefault();
      push('in', [`${value}^C`]);
      setValue('');
    }
  };

  // Focus cycles inside the dialog.
  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || e.defaultPrevented) return;
    const items = panelRef.current?.querySelectorAll<HTMLElement>('button, input');
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      data-wasih-terminal=""
      role="dialog"
      aria-modal="true"
      aria-label="wasih.sh terminal"
      className="fixed inset-0 z-[95]"
      style={viewport ? { top: viewport.top, height: viewport.height, bottom: 'auto' } : undefined}
    >
      <div className="absolute inset-0 bg-ink/40" onClick={closeTerminal} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className="wasih-drop relative mx-auto flex h-[min(70vh,560px)] max-h-[calc(100%-12px)] w-full max-w-[960px] flex-col border-4 border-ink bg-paper font-mono text-ink shadow-[8px_8px_0_0_#000] outline-none sm:mt-3 sm:w-[calc(100%-2rem)]"
      >
        <div className="flex shrink-0 items-center justify-between bg-ink px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-paper">
          <span>wasih.sh — v1.0</span>
          <button type="button" onClick={closeTerminal} className="-mr-2 px-2 hover:text-rule">
            [esc] close
          </button>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          data-clarity-mask="true"
          onPointerUp={(e) => {
            if (e.pointerType === 'mouse' && !window.getSelection()?.toString()) inputRef.current?.focus();
          }}
          className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words px-4 py-3 text-[12px] leading-[1.6] sm:text-[13px]"
        >
          {lines.map((line) => (
            // Typed commands: bold full ink with space above; output a step softer; errors softer still.
            <div
              key={line.id}
              className={
                line.kind === 'in' ? 'mt-3 text-ink first:mt-0' : line.kind === 'err' ? 'text-ink-3' : 'text-ink-2'
              }
            >
              {line.kind === 'in' && <span className="text-mute">guest@wasih.tech:~$ </span>}
              {line.parts.map((part, i) =>
                typeof part === 'string' ? (
                  <span key={i} className={line.kind === 'in' ? 'font-bold' : undefined}>
                    {part}
                  </span>
                ) : SAFE_HREF.test(part.href) ? (
                  <a
                    key={i}
                    href={part.href}
                    className="underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper"
                  >
                    {part.label}
                  </a>
                ) : (
                  <span key={i}>{part.label}</span>
                )
              )}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-ink px-4 py-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => execute(chip)}
              className="shrink-0 border border-ink px-2 py-1 text-[11px] tracking-[0.04em] transition-colors hover:bg-ink hover:text-paper"
            >
              {chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = value;
            setValue('');
            execute(input);
          }}
          className="flex shrink-0 items-center gap-2 border-t-4 border-ink px-4 py-3"
        >
          <span aria-hidden="true" className="shrink-0 text-[13px] text-ink-3">
            <span className="hidden sm:inline">guest@wasih.tech:</span>~$
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKeyDown}
            aria-label="Command"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            data-clarity-mask="true"
            className="min-w-0 flex-1 bg-transparent text-base caret-ink outline-none sm:text-[13px]"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
