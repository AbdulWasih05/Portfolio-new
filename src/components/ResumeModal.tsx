import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";

export const RESUME_URL = "/abdul-wasih-resume.pdf";
// Pre-rendered preview images (see scripts/render-resume.mjs) — load instantly, no PDF engine.
export const RESUME_PREVIEW_URL = "/abdul-wasih-resume-preview.webp";
// Only fetched when a phone reader is zoomed in, where the small render would go soft.
export const RESUME_PREVIEW_2X_URL = "/abdul-wasih-resume-preview-2x.webp";

// Below this the page is drawn at ZOOM_WIDTH and panned; above it, it fits on screen.
const PHONE_WIDTH = 768;
// Wide enough that the résumé's body text lands around 14px — the point of the whole thing.
const ZOOM_WIDTH = 900;
// Both renders are the same page, so the box can be reserved before either one loads.
const PAGE_W = 1530;
const PAGE_H = 1980;

interface ResumeModalContextValue {
  openResume: () => void;
  /** Warm the preview image once a user shows intent (hover/focus/touch). */
  prefetchResume: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

/** Trigger the shared résumé preview from anywhere under <ResumeModalProvider>. */
export const useResumeModal = () => {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) throw new Error("useResumeModal must be used within ResumeModalProvider");
  return ctx;
};

/**
 * Pinch-zoom survives the modal closing, which leaves the landing page blown up. There is no
 * API to set the page's zoom, but briefly pinning `maximum-scale` snaps it back to 1; the
 * original value goes back two frames later so the reader can still zoom the page themselves.
 */
const resetPageZoom = () => {
  if ((window.visualViewport?.scale ?? 1) <= 1) return;
  const meta = document.querySelector('meta[name="viewport"]');
  const original = meta?.getAttribute("content");
  if (!meta || !original) return;
  meta.setAttribute("content", `${original}, maximum-scale=1`);
  requestAnimationFrame(() => requestAnimationFrame(() => meta.setAttribute("content", original)));
};

/** The page itself: a plain image on wide screens, a zoom/pan surface on phones. */
const PreviewPage = ({
  compact,
  zoomed,
  scrollRef,
  onToggle,
  onError,
}: {
  compact: boolean;
  zoomed: boolean;
  scrollRef: RefObject<HTMLDivElement>;
  onToggle: () => void;
  onError: () => void;
}) => {
  const pageRef = useRef<HTMLButtonElement>(null);
  // Where the reader tapped: as a fraction of the page, and as a point in the panel. The
  // zoom then grows around that spot instead of jumping to a corner.
  const anchor = useRef<{ fx: number; fy: number; px: number; py: number } | null>(null);

  useLayoutEffect(() => {
    const at = anchor.current;
    anchor.current = null;
    const box = pageRef.current;
    const scroller = scrollRef.current;
    if (!at || !box || !scroller) return;
    // Put the same bit of the résumé back under the same bit of the panel.
    const page = box.getBoundingClientRect();
    const view = scroller.getBoundingClientRect();
    scroller.scrollLeft += page.left + at.fx * page.width - (view.left + at.px);
    scroller.scrollTop += page.top + at.fy * page.height - (view.top + at.py);
  }, [zoomed, scrollRef]);

  const toggleAt = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const view = scrollRef.current?.getBoundingClientRect();
    if (view) {
      const page = event.currentTarget.getBoundingClientRect();
      // detail 0 means the keyboard activated it, and there is no point to zoom around.
      const keyboard = event.detail === 0;
      const x = keyboard ? page.left + page.width / 2 : event.clientX;
      const y = keyboard ? view.top + view.height / 2 : event.clientY;
      anchor.current = {
        fx: (x - page.left) / page.width,
        fy: (y - page.top) / page.height,
        px: x - view.left,
        py: y - view.top,
      };
    }
    onToggle();
  };

  const page = (
    <img
      src={zoomed ? RESUME_PREVIEW_2X_URL : RESUME_PREVIEW_URL}
      alt="Résumé of Abdul Wasih"
      width={PAGE_W}
      height={PAGE_H}
      onError={onError}
      className="block h-auto w-full border border-ink shadow-[4px_4px_0_0_#000] bg-white"
    />
  );

  if (!compact) return <div className="mx-auto w-full max-w-[820px]">{page}</div>;

  return (
    <button
      ref={pageRef}
      type="button"
      onClick={toggleAt}
      aria-label={zoomed ? "Fit the whole résumé on screen" : "Zoom in on the résumé"}
      className={zoomed ? "block max-w-none" : "block w-full"}
      style={zoomed ? { width: ZOOM_WIDTH } : undefined}
    >
      {page}
    </button>
  );
};

export const ResumeModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  // Phones open the preview already zoomed to a readable size and pan it; a tap drops back
  // to the whole page. No pinch handling: a tap target works the same everywhere.
  const [compact, setCompact] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const warmed = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Whatever opened the preview gets focus back when it closes.
  const returnFocus = useRef<HTMLElement | null>(null);

  // Prefetch the preview image ahead of the actual click for an instant open.
  const prefetchResume = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    // The fit view is what opens; the zoomed render is fetched only if the reader zooms.
    link.href = RESUME_PREVIEW_URL;
    document.head.appendChild(link);
  }, []);

  const openResume = useCallback(() => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    prefetchResume();
    setFailed(false);
    // Open on the whole page, so the reader sees what they are looking at; one tap blows it
    // up to a readable size and the panel pans.
    setCompact(window.innerWidth < PHONE_WIDTH);
    setZoomed(false);
    setOpen(true);
  }, [prefetchResume]);
  const close = useCallback(() => setOpen(false), []);

  // Force a real download instead of letting the browser navigate to the PDF
  // (the `download` attribute is ignored for PDFs by many browsers). Fetching
  // as a blob makes the save reliable on desktop and most of Android.
  const downloadResume = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(RESUME_URL);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Abdul-Wasih-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    }
  }, []);

  // Fetch the sharp render in the background once a phone has the preview open, so the first
  // zoom is instant rather than a blank frame while 500KB arrives.
  useEffect(() => {
    if (!open || !compact) return;
    new Image().src = RESUME_PREVIEW_2X_URL;
  }, [open, compact]);

  // While the preview is open: close on Escape, keep Tab inside it, lock background scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!panelRef.current?.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Lock the background where it is. Plain `overflow: hidden` on <body> does not hold on
    // iOS, so the page is pinned with `position: fixed` and put back on exactly the same
    // pixel afterwards.
    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      overflow: "hidden",
    });

    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      Object.assign(body.style, prev);
      // `html { scroll-behavior: smooth }` would otherwise animate this: the page lands at
      // the top when `position: fixed` comes off, then visibly scrolls back down.
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" as ScrollBehavior });
      resetPageZoom();
      // preventScroll, or restoring focus drags the page to the trigger all over again.
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <ResumeModalContext.Provider value={{ openResume, prefetchResume }}>
      {children}
      {open && (
        <div
          className="modal-fade fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-3 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Résumé preview"
        >
          <div
            ref={panelRef}
            className="modal-pop flex w-full max-w-none max-h-[92dvh] flex-col border-2 border-ink bg-paper shadow-[6px_6px_0_0_#000] sm:max-h-[88vh] sm:max-w-[920px] sm:border-4 sm:shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="on-ink flex shrink-0 items-center justify-between gap-3 bg-ink pl-4 pr-1 sm:pl-5 sm:pr-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
              <span className="truncate">
                Résumé — Abdul Wasih
                {compact && (
                  <span className="ml-2 text-rule normal-case tracking-normal">
                    {zoomed ? '· tap to fit' : '· tap to zoom'}
                  </span>
                )}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close résumé preview"
                className="grid h-11 w-11 shrink-0 place-items-center text-[20px] leading-none hover:text-rule transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Preview */}
            <div ref={previewRef} className="min-h-0 flex-1 overflow-auto bg-paper-2 px-3 py-3 sm:py-4">
              {failed ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    Couldn’t load the preview.
                  </p>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink-3 transition-colors"
                  >
                    Open résumé <span className="text-sm">↗</span>
                  </a>
                </div>
              ) : (
                <PreviewPage
                  compact={compact}
                  zoomed={zoomed}
                  scrollRef={previewRef}
                  onToggle={() => setZoomed((z) => !z)}
                  onError={() => setFailed(true)}
                />
              )}
            </div>

            {/* Actions */}
            <div
              className="flex shrink-0 items-stretch justify-end gap-0 sm:gap-3 border-t-4 border-ink px-0 sm:px-5 py-0 sm:py-3"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-none min-h-[52px] sm:min-h-0 items-center justify-center gap-2 border-r border-ink sm:border sm:px-4 sm:py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-paper-2 active:translate-y-px transition-colors"
              >
                Open<span className="hidden sm:inline">&nbsp;in new tab</span> <span className="text-sm">↗</span>
              </a>
              <a
                href={RESUME_URL}
                download="Abdul-Wasih-Resume.pdf"
                onClick={downloadResume}
                className="flex flex-1 sm:flex-none min-h-[52px] sm:min-h-0 items-center justify-center gap-2 border-ink bg-ink sm:border sm:px-4 sm:py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink-3 active:translate-y-px transition-colors"
              >
                Download <span className="text-sm">↓</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
};
