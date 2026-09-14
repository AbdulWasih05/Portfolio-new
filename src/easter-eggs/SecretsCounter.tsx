import { useEasterEggs } from './context';
import { SECRETS, TOTAL, progressBar } from './secrets';

/** Footer scorekeeper: progress at rest, a clue on hover, the terminal on click. */
const SecretsCounter = () => {
  const { found, openTerminal, prefetchTerminal } = useEasterEggs();
  const n = found.size;

  if (n >= TOTAL) {
    return (
      <div className="flex flex-col items-start gap-[6px] sm:items-end">
        <span className="inline-block -rotate-2 border-2 border-paper px-2 py-[2px] text-paper">★ Certified curious ★</span>
        <span className="normal-case tracking-[0.04em]">you found them all. thanks for poking around. — W</span>
      </div>
    );
  }

  const clue = SECRETS.find((s) => !found.has(s.id))?.clue;

  return (
    <button
      type="button"
      // detail === 0 means the click came from the keyboard (Enter/Space).
      onClick={(e) => openTerminal(e.detail === 0 ? 'keyboard' : 'pointer')}
      onPointerEnter={prefetchTerminal}
      onFocus={prefetchTerminal}
      onTouchStart={prefetchTerminal}
      aria-label={`Secrets found: ${n} of ${TOTAL}. Opens terminal.`}
      className="group text-left uppercase tracking-[0.18em] transition-colors hover:text-paper focus-visible:text-paper"
    >
      <span className="[@media(hover:hover)]:group-hover:hidden group-focus-visible:hidden">
        Secrets <span aria-hidden="true">{progressBar(n)}</span> {n}/{TOTAL}
      </span>
      <span className="hidden normal-case tracking-[0.06em] [@media(hover:hover)]:group-hover:inline group-focus-visible:inline">
        {clue}
      </span>
    </button>
  );
};

export default SecretsCounter;
