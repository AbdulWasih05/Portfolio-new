import { createContext, useContext, type MutableRefObject } from 'react';
import type { SecretId } from './secrets';

export type OpenMode = 'keyboard' | 'pointer';

export interface EasterEggs {
  found: ReadonlySet<SecretId>;
  find: (id: SecretId) => void;
  resetSecrets: () => void;
  night: boolean;
  toggleNight: () => void;
  terminalOpen: boolean;
  openTerminal: (mode: OpenMode) => void;
  closeTerminal: () => void;
  prefetchTerminal: () => void;
  logoTap: () => void;
  dotTap: () => void;
  glitch: () => void;
  history: MutableRefObject<string[]>;
}

const noop = () => {};

// No-op default instead of throwing: an easter egg must never break the page.
export const EasterEggContext = createContext<EasterEggs>({
  found: new Set(),
  find: noop,
  resetSecrets: noop,
  night: false,
  toggleNight: noop,
  terminalOpen: false,
  openTerminal: noop,
  closeTerminal: noop,
  prefetchTerminal: noop,
  logoTap: noop,
  dotTap: noop,
  glitch: noop,
  history: { current: [] },
});

export const useEasterEggs = () => useContext(EasterEggContext);
