import { useRef, useState, type MouseEvent, type ReactNode } from 'react';

type FoldProps = {
  /** Always visible; tapping it opens the rest. */
  summary: ReactNode;
  /** Hidden until the reader opens the fold. */
  children: ReactNode;
  /** What the toggle is called, for screen readers. */
  label: string;
  /** Open on first paint (the current role). */
  open?: boolean;
  className?: string;
  summaryClassName?: string;
  bodyClassName?: string;
  /** Vertical offset of the +/− mark, to sit on the first line of the summary. */
  markClassName?: string;
};

const DURATION = 320;
const EASING = 'cubic-bezier(0.32, 0.72, 0, 1)';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A phone-only disclosure: it keeps the landing page short by folding the detail of a section
 * away behind its heading. Render it only below md (see `usePhone`); wider screens get the
 * full layout with nothing to tap.
 *
 * The native toggle is intercepted and the panel's height is transitioned by hand, because
 * `::details-content` only animates in the newest browsers and would otherwise snap open.
 * Two elements: the outer one is the shutter whose height moves, the inner one keeps its
 * natural height so there is always an exact number to animate to. The starting frame is
 * committed with a forced reflow, so the panel never flashes at full height first, and an
 * interrupted open or close carries on from wherever it is on screen.
 */
const Fold = ({
  summary,
  children,
  label,
  open = false,
  className = '',
  summaryClassName = '',
  bodyClassName = '',
  markClassName = 'mt-[7px]',
}: FoldProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const running = useRef<(() => void) | null>(null);
  const [expanded, setExpanded] = useState(open);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const shutter = shutterRef.current;
    const inner = innerRef.current;
    if (!details || !shutter || !inner) return;

    event.preventDefault();
    running.current?.();
    running.current = null;

    const opening = !expanded;
    setExpanded(opening);

    if (reduced()) {
      shutter.removeAttribute('style');
      details.open = opening;
      return;
    }

    // Measure before anything moves, so an interrupted animation resumes from what is on screen.
    // Only while the panel is open: a closed <details> keeps its last layout cached, so its
    // box would report the full height it is about to animate to.
    const from = details.open ? shutter.getBoundingClientRect().height : 0;
    const fromOpacity = details.open ? getComputedStyle(shutter).opacity : '0';

    if (opening) details.open = true;
    const to = opening ? inner.offsetHeight : 0;

    shutter.style.transition = 'none';
    shutter.style.height = `${from}px`;
    shutter.style.opacity = fromOpacity;
    void shutter.offsetHeight; // commit the starting frame before the transition begins

    shutter.style.transition = `height ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`;
    shutter.style.height = `${to}px`;
    shutter.style.opacity = opening ? '1' : '0';

    function settle() {
      stop();
      shutter!.removeAttribute('style');
      if (!opening) details!.open = false;
    }
    function onEnd(e: TransitionEvent) {
      if (e.target === shutter && e.propertyName === 'height') settle();
    }
    function stop() {
      shutter!.removeEventListener('transitionend', onEnd);
      window.clearTimeout(timer);
      running.current = null;
    }

    // A transition that covers no distance never fires transitionend; the timer finishes the job.
    const timer = window.setTimeout(settle, DURATION + 80);
    shutter.addEventListener('transitionend', onEnd);
    running.current = stop;
  };

  return (
    <details ref={detailsRef} className={className} open={open}>
      <summary
        onClick={toggle}
        className={`list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-start justify-between gap-4 min-h-[44px] focus-visible:outline-offset-[-2px] ${summaryClassName}`}
      >
        <span className="min-w-0">
          {summary}
          <span className="sr-only">: {label}</span>
        </span>
        <span aria-hidden="true" className={`relative shrink-0 w-3 h-3 ${markClassName}`}>
          <span className="absolute left-0 top-[5px] w-3 h-[1.5px] bg-current" />
          <span
            className={`absolute left-0 top-[5px] w-3 h-[1.5px] bg-current transition-transform duration-300 motion-reduce:transition-none ${
              expanded ? 'rotate-0' : 'rotate-90'
            }`}
          />
        </span>
      </summary>
      <div ref={shutterRef} className="overflow-hidden">
        <div ref={innerRef} className={bodyClassName}>
          {children}
        </div>
      </div>
    </details>
  );
};

export default Fold;
