import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const RESUME_URL = "/abdul-wasih-resume.pdf";
// Pre-rendered preview image (see scripts/render-resume.mjs) — loads instantly, no PDF engine.
export const RESUME_PREVIEW_URL = "/abdul-wasih-resume-preview.webp";

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

export const ResumeModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const warmed = useRef(false);

  // Prefetch the preview image ahead of the actual click for an instant open.
  const prefetchResume = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = RESUME_PREVIEW_URL;
    document.head.appendChild(link);
  }, []);

  const openResume = useCallback(() => {
    prefetchResume();
    setFailed(false);
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

  // Close on Escape and lock background scroll while the preview is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <ResumeModalContext.Provider value={{ openResume, prefetchResume }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Résumé preview"
        >
          <div
            className="flex w-full max-w-[920px] h-[90vh] sm:h-[88vh] flex-col border-4 border-ink bg-paper shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between bg-ink px-4 sm:px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
              <span>Résumé — Abdul Wasih</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close résumé preview"
                className="text-[18px] leading-none px-2 -mr-2 hover:text-rule transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Preview */}
            <div className="flex-1 min-h-0 overflow-auto bg-paper-2 px-3 py-4">
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
                <img
                  src={RESUME_PREVIEW_URL}
                  alt="Résumé of Abdul Wasih"
                  onError={() => setFailed(true)}
                  className="mx-auto w-full max-w-[820px] border border-ink shadow-[4px_4px_0_0_#000] bg-white"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center justify-end gap-3 border-t-4 border-ink px-4 sm:px-5 py-3">
              <a
                href={RESUME_URL}
                download="Abdul-Wasih-Resume.pdf"
                onClick={downloadResume}
                className="inline-flex items-center gap-2 border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-paper-2 transition-colors"
              >
                Download <span className="text-sm">↓</span>
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink-3 transition-colors"
              >
                Open in new tab <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
};
