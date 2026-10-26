import { useEffect } from 'react';

// Fades in every [data-reveal] element the first time it scrolls into view.
// Elements already on screen are left alone, and nothing is hidden when the
// visitor prefers reduced motion. Styles: .reveal / .reveal-in in index.css.
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      targets.forEach((el) => el.classList.remove('reveal', 'reveal-in'));
    };
  }, []);
}
