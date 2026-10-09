import { useEffect, useRef } from 'react';
import { isEditableTarget } from './secrets';

interface Handlers {
  onTerminalKey: () => void;
  onWasih: () => void;
}

const WORD = 'wasih';

// Any modal other than the terminal (e.g. the résumé preview) pauses the eggs.
const otherModalOpen = () => document.querySelector('[aria-modal="true"]:not([data-wasih-terminal])') !== null;
const terminalOpen = () => document.querySelector('[data-wasih-terminal]') !== null;

/** One keydown listener for the page-level triggers. Tap secrets live on the elements themselves. */
export function useGlobalTriggers(handlers: Handlers) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
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
      if (/^[a-z]$/.test(key)) {
        typed = (typed + key).slice(-WORD.length);
        if (typed === WORD) {
          typed = '';
          ref.current.onWasih();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
