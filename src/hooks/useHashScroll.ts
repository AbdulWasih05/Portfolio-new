import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scrolls to the element named by the URL hash (e.g. /#about) after each navigation,
// and to the top for a hash-less link. Sections set their own offset for the sticky
// header with scroll-margin-top. Called from Header, which every page renders.
export function useHashScroll() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const mounted = useRef(false);

  useEffect(() => {
    // Jump on arrival at a page; within a page, follow the CSS scroll-behavior (smooth).
    const behavior = (mounted.current ? 'auto' : 'instant') as ScrollBehavior;
    mounted.current = true;

    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior });
      return;
    }
    // Back/forward keeps the position the browser restores.
    if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior });
  }, [pathname, hash, key, navigationType]);
}
