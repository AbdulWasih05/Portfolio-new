import { useEffect, useRef } from 'react';
import { isEditableTarget } from './secrets';

interface Handlers {
  onTerminalKey: () => void;
  onKonami: () => void;
  onWasih: () => void;
}

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
// Thumbs have no B or A: swipe the arrows, then tap twice.
const SWIPE_KONAMI = [...KONAMI.slice(0, 8), 'tap', 'tap'];
const WORD = 'wasih';
const SWIPE_IDLE_MS = 3000;

const endsWith = (buffer: string[], seq: string[]) =>
  buffer.length >= seq.length && seq.every((k, i) => buffer[buffer.length - seq.length + i] === k);

// Any modal other than the terminal (e.g. the résumé preview) pauses the eggs.
const otherModalOpen = () => document.querySelector('[aria-modal="true"]:not([data-wasih-terminal])') !== null;
const terminalOpen = () => document.querySelector('[data-wasih-terminal]') !== null;

/** One keydown listener plus passive touch listeners for every page-level trigger. */
export function useGlobalTriggers(handlers: Handlers) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    let keys: string[] = [];
    let typed = '';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      if (isEditableTarget(e.target) || otherModalOpen()) return;

      if (e.key === '`' || e.key === '~' || e.code === 'Backquote') {
        e.preventDefault();
        ref.current.onTerminalKey();
        return;
      }
      if (terminalOpen()) return;

      const key = e.key.toLowerCase();
      keys = [...keys, key].slice(-KONAMI.length);
      if (endsWith(keys, KONAMI)) {
        keys = [];
        ref.current.onKonami();
      }
      if (/^[a-z]$/.test(key)) {
        typed = (typed + key).slice(-WORD.length);
        if (typed === WORD) {
          typed = '';
          ref.current.onWasih();
        }
      }
    };

    let gestures: string[] = [];
    let start: { x: number; y: number; t: number } | null = null;
    let lastGesture = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      start = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, t: Date.now() } : null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!start || otherModalOpen() || terminalOpen()) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const dt = Date.now() - start.t;
      start = null;

      let gesture: string | null = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 300) gesture = 'tap';
      else if (dt < 700 && Math.max(Math.abs(dx), Math.abs(dy)) > 40) {
        gesture = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'arrowright' : 'arrowleft') : dy > 0 ? 'arrowdown' : 'arrowup';
      }
      if (!gesture) return;

      const now = Date.now();
      if (now - lastGesture > SWIPE_IDLE_MS) gestures = [];
      lastGesture = now;
      gestures = [...gestures, gesture].slice(-SWIPE_KONAMI.length);
      if (endsWith(gestures, SWIPE_KONAMI)) {
        gestures = [];
        ref.current.onKonami();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
}
