// The hunt: which secrets exist, what they say, and where progress is kept.
// Counter, toasts, and the `secrets` command all derive from SECRETS/TOTAL.

export type SecretId = 'terminal' | 'sudo' | 'api' | 'riddle' | 'night' | 'logo' | 'ping';

export interface Secret {
  id: SecretId;
  clue: string;
  toast: string;
}

export const SECRETS: readonly Secret[] = [
  { id: 'terminal', clue: 'engineers start with ~', toast: 'wasih.sh: guest shell granted.' },
  { id: 'sudo', clue: 'some commands need root.', toast: 'sudo: incident reported. to no one.' },
  { id: 'api', clue: 'every startup ships an api. even this one. try curl.', toast: "api: 200 OK. no rate limits. please don't check." },
  { id: 'riddle', clue: 'devtools are open. so is the riddle. (mobile: ls -a)', toast: 'riddle: solved. you read the tagline.' },
  { id: 'night', clue: '↑↑↓↓←→←→BA. thumbs work too.', toast: 'night edition: same news, less glare.' },
  { id: 'logo', clue: 'the W answers after seven knocks.', toast: 'the W: seven knocks. it answered.' },
  { id: 'ping', clue: 'the dot up top is alive. poke it.', toast: 'ping: 0% packet loss. still alive.' },
];

export const TOTAL = SECRETS.length;

export const isSecretId = (v: unknown): v is SecretId => SECRETS.some((s) => s.id === v);

const STORAGE_KEY = 'wasih:secrets:v1';

export const loadFound = (): Set<SecretId> => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return new Set(Array.isArray(parsed) ? parsed.filter(isSecretId) : []);
  } catch {
    return new Set();
  }
};

export const saveFound = (found: ReadonlySet<SecretId>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
  } catch {
    // Storage blocked (private mode): progress lasts for the session only.
  }
};

// Night Edition. Key and color are mirrored in the pre-paint script in index.html.
const NIGHT_KEY = 'wasih:night';
export const NIGHT_BG = '#0D0F14';

export const loadNight = () => {
  try {
    return localStorage.getItem(NIGHT_KEY) === '1';
  } catch {
    return false;
  }
};

export const saveNight = (on: boolean) => {
  try {
    if (on) localStorage.setItem(NIGHT_KEY, '1');
    else localStorage.removeItem(NIGHT_KEY);
  } catch {
    // Storage blocked: Night Edition lasts until reload.
  }
};

export const pad2 = (n: number) => n.toString().padStart(2, '0');

export const progressBar = (n: number) => '■'.repeat(n) + '□'.repeat(Math.max(0, TOTAL - n));

export const isEditableTarget = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el?.tagName) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
