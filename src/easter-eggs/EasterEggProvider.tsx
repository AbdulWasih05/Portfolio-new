import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { EasterEggContext, type EasterEggs, type OpenMode } from './context';
import {
  NIGHT_BG,
  SECRETS,
  TOTAL,
  isSecretId,
  loadFound,
  loadNight,
  pad2,
  prefersReducedMotion,
  saveFound,
  saveNight,
  type SecretId,
} from './secrets';
import { useGlobalTriggers } from './useGlobalTriggers';
import { EggBoundary, GlitchOverlay, NightBanner, Note, type NoteKind } from './Overlays';

// The terminal is the heavy part; it loads on first open (or on counter hover).
const loadTerminal = () => import('./Terminal');
const Terminal = lazy(loadTerminal);

const TAP_GAP_MS = 2000;
const GLITCH_MS = 500;

const TOAST_CLASS = 'rounded-none border-4 border-ink bg-paper text-ink p-4 pr-8 shadow-[6px_6px_0_0_#000]';

// Both lines go in `description`: the toast's `title` prop is typed as a plain string attribute.
const eggToast = (title: string, line: string) =>
  toast({
    className: TOAST_CLASS,
    description: (
      <span className="grid gap-1 font-mono">
        <span className="text-[11px] uppercase tracking-[0.18em]">{title}</span>
        <span className="text-xs">{line}</span>
      </span>
    ),
  });

/** Layout route: wraps every page so Header/Footer and the global triggers share one hunt. */
export const EasterEggRoot = () => {
  const { pathname } = useLocation();
  const [found, setFound] = useState<ReadonlySet<SecretId>>(loadFound);
  const foundRef = useRef(found);
  const [terminalMode, setTerminalMode] = useState<OpenMode | null>(null);
  const [note, setNote] = useState<NoteKind | null>(null);
  const [glitching, setGlitching] = useState(false);
  const [night, setNight] = useState(loadNight);
  const history = useRef<string[]>([]);
  const taps = useRef({ logo: { n: 0, last: 0 }, ping: { n: 0, last: 0 } });
  const lastGlitch = useRef(0);
  const glitchTimer = useRef<number>();

  const find = useCallback((id: SecretId) => {
    if (foundRef.current.has(id)) return;
    const next = new Set(foundRef.current).add(id);
    foundRef.current = next;
    saveFound(next);
    setFound(next);
    const secret = SECRETS.find((s) => s.id === id);
    if (next.size >= TOTAL) {
      eggToast(`${pad2(TOTAL)}/${pad2(TOTAL)} — Certified curious`, "that's all of them. thanks for poking around.");
    } else if (secret) {
      eggToast(`Secret ${pad2(next.size)}/${pad2(TOTAL)} found`, secret.toast);
    }
  }, []);

  const resetSecrets = useCallback(() => {
    foundRef.current = new Set();
    saveFound(foundRef.current);
    setFound(foundRef.current);
  }, []);

  const openTerminal = useCallback((mode: OpenMode) => setTerminalMode(mode), []);
  const closeTerminal = useCallback(() => setTerminalMode(null), []);
  const prefetchTerminal = useCallback(() => {
    loadTerminal().catch(() => {});
  }, []);

  // Tap counts live here, not in Header: the first logo tap can navigate and remount it.
  const tap = useCallback(
    (kind: NoteKind, needed: number) => {
      const t = taps.current[kind];
      const now = Date.now();
      t.n = now - t.last > TAP_GAP_MS ? 1 : t.n + 1;
      t.last = now;
      if (t.n < needed) return;
      t.n = 0;
      setNote(kind);
      find(kind);
    },
    [find]
  );
  const logoTap = useCallback(() => tap('logo', 7), [tap]);
  const dotTap = useCallback(() => tap('ping', 5), [tap]);

  const glitch = useCallback(() => {
    const now = Date.now();
    if (prefersReducedMotion() || now - lastGlitch.current < 2000) return;
    lastGlitch.current = now;
    setGlitching(true);
    window.clearTimeout(glitchTimer.current);
    glitchTimer.current = window.setTimeout(() => setGlitching(false), GLITCH_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(glitchTimer.current), []);

  const toggleNight = useCallback(() => setNight((on) => !on), []);

  // Night Edition: the class on <html> drives the CSS (see index.css); theme-color follows.
  useEffect(() => {
    document.documentElement.classList.toggle('night-edition', night);
    saveNight(night);
    if (night) find('night');
    // Helmet rewrites its theme-color tag on navigation, so re-sync per route, after Helmet commits.
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
        if (meta.dataset.day === undefined) meta.dataset.day = meta.content;
        meta.content = night ? NIGHT_BG : meta.dataset.day;
      });
    }, 0);
    return () => window.clearTimeout(t);
  }, [night, pathname, find]);

  useGlobalTriggers({
    onTerminalKey: () => setTerminalMode((m) => (m ? null : 'keyboard')),
    onKonami: toggleNight,
    onWasih: glitch,
  });

  // Navigating away closes the terminal.
  useEffect(() => {
    setTerminalMode(null);
  }, [pathname]);

  // Console riddle bridge: index.html queues solved secrets (possibly before React mounted).
  useEffect(() => {
    const drain = () => {
      const queue = window.__wasihQ;
      if (!queue?.length) return;
      queue.splice(0).forEach((id) => {
        if (isSecretId(id)) find(id);
      });
    };
    drain();
    window.addEventListener('wasih:found', drain);
    return () => window.removeEventListener('wasih:found', drain);
  }, [find]);

  const value = useMemo<EasterEggs>(
    () => ({
      found,
      find,
      resetSecrets,
      night,
      toggleNight,
      terminalOpen: terminalMode !== null,
      openTerminal,
      closeTerminal,
      prefetchTerminal,
      logoTap,
      dotTap,
      glitch,
      history,
    }),
    [found, find, resetSecrets, night, toggleNight, terminalMode, openTerminal, closeTerminal, prefetchTerminal, logoTap, dotTap, glitch]
  );

  return (
    <EasterEggContext.Provider value={value}>
      <Outlet />
      {terminalMode && (
        <EggBoundary onError={closeTerminal}>
          <Suspense fallback={null}>
            <Terminal autoFocus={terminalMode === 'keyboard'} />
          </Suspense>
        </EggBoundary>
      )}
      {night && <NightBanner onExit={toggleNight} />}
      {glitching && <GlitchOverlay />}
      {note && <Note kind={note} onClose={() => setNote(null)} />}
    </EasterEggContext.Provider>
  );
};
