import { useEffect, useRef, useState } from 'react';

// Tracks which of a list of elements the reader is on: the last one whose top has
// passed `line` (a fraction of the viewport height, measured from the top).
// Used by the Selected Work index (desktop rail) and the phone number strip.
export function useActiveEntry<T extends HTMLElement>(count: number, line = 0.3) {
  const refs = useRef<(T | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.innerHeight * line;
      let next = 0;
      refs.current.slice(0, count).forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= y) next = i;
      });
      setActive(next);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [count, line]);

  return { refs, active };
}
