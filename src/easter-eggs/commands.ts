import { projects, slugify } from '@/data/projects';
import { profile } from '@/data/profile';
import { SECRETS, TOTAL, progressBar, type SecretId } from './secrets';

/** Output is text, or a link the terminal renders only if it passes its allowlist. */
export type Segment = string | { href: string; label: string };
export type LineKind = 'in' | 'out' | 'err';

export interface Ctx {
  print: (text: string, kind?: LineKind) => void;
  printParts: (parts: Segment[]) => void;
  clear: () => void;
  close: () => void;
  navigate: (to: string) => void;
  openResume: () => void;
  find: (id: SecretId) => void;
  found: ReadonlySet<SecretId>;
  glitch: () => void;
  resetSecrets: () => void;
  history: string[];
}

interface Command {
  names: string[];
  run: (args: string[], ctx: Ctx) => void | Promise<void>;
}

export const WELCOME = [
  'wasih.sh v1.0 — last login: just now on ttys001',
  'type `help` to look around. `exit` or [esc] to leave.',
].join('\n');

const RIDDLE = [
  'riddle: engineers do me on purpose. users do me by accident.',
  '        i sit between making it and shipping it. what am i?',
].join('\n');

const PROJECTS = projects.map((p) => ({ slug: slugify(p.title), year: p.year ?? '----' }));
const FILES = ['now.md', 'resume.pdf'];

const HELP: [string, string][] = [
  ['whoami', "who's asking"],
  ['ls', 'look around'],
  ['open <name>', 'open a project'],
  ['cat <file>', 'now.md · resume.pdf'],
  ['history', 'what you typed'],
  ['secrets', 'progress + a nudge'],
  ['clear', 'wipe the slate'],
  ['exit', 'leave (the terminal, not the site)'],
];

// TODO(wasih): personalize. Every line here comes from facts already on the site.
const NOW_MD = [
  '# now.md',
  "- interning full-stack at a stealth startup. (what is it? it's stealth.)",
  '- 6+ months shipping to prod at Saarthi, alongside the founding engineers. trusted with payments.',
  '- PRs into InsForge (YC P26) when the build is green.',
  '- weekends: side projects. some of them answer on WhatsApp.',
].join('\n');

const pathFor = (target: string): string | null => {
  let t = target.replace(/^https?:\/\//, '');
  if (/^(www\.)?wasih\.tech(\/|$)/.test(t)) t = t.replace(/^(www\.)?wasih\.tech/, '') || '/';
  else if (!/^(\/|api\/|me\.json$)/.test(t)) return null;
  if (t === 'me.json') return '/api/me.json';
  return t.startsWith('/') ? t : `/${t}`;
};

const COMMANDS: Command[] = [
  {
    names: ['help'],
    run: (_args, ctx) => {
      const width = Math.max(...HELP.map(([c]) => c.length)) + 3;
      ctx.print(
        [
          'available commands:',
          ...HELP.map(([c, d]) => `  ${c.padEnd(width)}${d}`),
          "some commands aren't listed. that's what makes them fun.",
        ].join('\n')
      );
    },
  },
  {
    names: ['whoami'],
    run: (_args, ctx) =>
      ctx.print(
        [
          'guest  uid=1001(guest) gid=1001(visitors)',
          'the owner, for the record:',
          `  ${profile.name} — ${profile.role.toLowerCase()} @ ${profile.company}`,
          `  prev: ${profile.previously.join(' · ')}`,
          `  motto: ${profile.motto}`,
        ].join('\n')
      ),
  },
  {
    names: ['ls', 'dir'],
    run: (args, ctx) => {
      const flags = args.filter((a) => a.startsWith('-')).join('');
      const target = args.find((a) => !a.startsWith('-'))?.replace(/\/$/, '');
      const width = Math.max(...PROJECTS.map((p) => p.slug.length)) + 3;
      const projectList = PROJECTS.map((p) => `  ${p.slug.padEnd(width)}${p.year}`).join('\n');
      if (target === 'api') return ctx.print('me.json');
      if (target === 'projects') return ctx.print(`${projectList}\nopen one with: open <name>`);
      if (target) return ctx.print(`ls: cannot access '${target}': No such file or directory`, 'err');
      const top = flags.includes('a') ? '.  ..  .riddle  now.md  resume.pdf  api/  projects/' : 'now.md  resume.pdf  api/  projects/';
      ctx.print(`${top}\n\nprojects/\n${projectList}\n\nopen one with: open <name>`);
    },
  },
  {
    names: ['open'],
    run: (args, ctx) => {
      const query = args[0]?.toLowerCase().replace(/^projects\//, '');
      if (!query) return ctx.print('usage: open <name>. try `ls` for names.');
      const exact = PROJECTS.find((p) => p.slug === query);
      const prefixed = PROJECTS.filter((p) => p.slug.startsWith(query));
      const match = exact ?? (prefixed.length === 1 ? prefixed[0] : undefined);
      if (!match) {
        return ctx.print(
          prefixed.length > 1
            ? `open: '${query}' is ambiguous: ${prefixed.map((p) => p.slug).join(', ')}`
            : `open: no such project: ${query}. try 'ls'.`,
          'err'
        );
      }
      ctx.print(`opening /projects/${match.slug} …`);
      ctx.navigate(`/projects/${match.slug}`);
    },
  },
  {
    names: ['cat', 'less', 'more'],
    run: (args, ctx) => {
      const file = args[0];
      if (!file) return ctx.print('usage: cat <file>');
      if (file === 'now.md') return ctx.print(NOW_MD);
      if (/^resume(\.pdf)?$/.test(file)) {
        ctx.print('binary file. launching viewer…');
        return ctx.openResume();
      }
      if (file === '.riddle') return ctx.print(`${RIDDLE}\n\nanswer with: unlock <word>`);
      if (/^(\/?api\/)?me\.json$/.test(file)) {
        return ctx.print('cat: api/me.json: this one is served over http. try: curl wasih.tech/api/me.json');
      }
      ctx.print(`cat: ${file}: No such file or directory`, 'err');
    },
  },
  {
    names: ['curl', 'wget'],
    run: async (args, ctx) => {
      const target = args.find((a) => !a.startsWith('-'));
      if (!target) return ctx.print('usage: curl wasih.tech/api/me.json');
      const path = pathFor(target);
      if (path === null) return ctx.print('curl: this sandbox only talks to wasih.tech. CORS sends its regards.', 'err');
      ctx.print(`> GET ${path} HTTP/1.1\n> Host: wasih.tech\n>`);
      if (path !== '/api/me.json') {
        return ctx.print('< HTTP/1.1 404 Not Found\ncurl: (22) nothing lives there. the api has one endpoint. it is enough.', 'err');
      }
      try {
        const res = await fetch(path, { headers: { Accept: 'application/json' } });
        // The SPA fallback answers unknown paths with 200 text/html, so check the type too.
        if (!res.ok || !res.headers.get('content-type')?.includes('json')) throw new Error('not json');
        const body = await res.json();
        ctx.print(`< HTTP/1.1 ${res.status} OK\n< content-type: application/json\n<\n${JSON.stringify(body, null, 2)}`);
        ctx.find('api');
      } catch {
        ctx.print('curl: (7) failed to connect. even my api is shy.', 'err');
      }
    },
  },
  {
    names: ['sudo'],
    run: (args, ctx) => {
      if (args[0] === 'hire-me') {
        ctx.print(
          [
            '[sudo] password for guest: ········',
            'guest is not in the sudoers file. This incident will be reported.',
            '...report filed with wasih. his response: "just email me."',
          ].join('\n')
        );
        ctx.printParts(['→ ', { href: `mailto:${profile.email}`, label: profile.email }]);
        return ctx.find('sudo');
      }
      if (!args.length) return ctx.print('usage: sudo <command>. what would you even want root for?');
      ctx.print(
        [
          '[sudo] password for guest:',
          'Sorry, try again.',
          '[sudo] password for guest:',
          'Sorry, try again.',
          '[sudo] password for guest:',
          'sudo: 3 incorrect password attempts. (root is busy.)',
        ].join('\n'),
        'err'
      );
    },
  },
  {
    names: ['unlock'],
    run: (args, ctx) => {
      const answer = args[0]?.toLowerCase().replace(/[^a-z]/g, '');
      if (!answer) return ctx.print('usage: unlock <word>');
      if (answer !== 'break') return ctx.print('unlock: access denied. read the riddle again.', 'err');
      ctx.print('access granted. build. break. ship. you found the middle one.');
      ctx.find('riddle');
    },
  },
  {
    names: ['rm'],
    run: (args, ctx) => {
      const recursive = args.some((a) => /^-[a-z]*r[a-z]*$/i.test(a));
      const target = args.find((a) => !a.startsWith('-'));
      if (!recursive || !target || !['/', '/*', '~', '*', '.'].includes(target)) {
        return ctx.print("rm: permission denied. it's a portfolio. nothing here is yours to delete.", 'err');
      }
      ctx.print(
        [
          `rm: descending into '${target}'…`,
          "rm: removed '/node_modules' (freed 1.2 TB)",
          "rm: removed '/projects/slotswapper'",
          "rm: cannot remove '/wasih': Operation not permitted",
          'restoring from git… done. nice try.',
        ].join('\n')
      );
      ctx.glitch();
    },
  },
  {
    names: ['secrets', 'hint'],
    run: (args, ctx) => {
      if (args[0] === '--reset') {
        ctx.resetSecrets();
        return ctx.print('secrets wiped. the hunt begins again.');
      }
      const n = ctx.found.size;
      const bar = `secrets ${progressBar(n)} ${n}/${TOTAL}`;
      const next = SECRETS.find((s) => !ctx.found.has(s.id));
      ctx.print(next ? `${bar}\nnext clue: ${next.clue}` : `${bar}\ncertified curious. nothing left to find. go ship something.`);
    },
  },
  {
    names: ['history'],
    run: (_args, ctx) => ctx.print(ctx.history.map((c, i) => `${(i + 1).toString().padStart(4)}  ${c}`).join('\n')),
  },
  { names: ['clear', 'cls'], run: (_args, ctx) => ctx.clear() },
  {
    names: ['exit', 'logout', 'quit'],
    run: (_args, ctx) => {
      ctx.print('logout\n[process completed]');
      ctx.close();
    },
  },
  {
    names: ['wasih'],
    run: (_args, ctx) => {
      ctx.print('signal received.');
      ctx.glitch();
    },
  },
  {
    names: ['vim', 'vi', 'nano', 'emacs'],
    run: (_args, ctx) => ctx.print("you can check in, but you can't :q. closing it for you."),
  },
  { names: ['cd'], run: (_args, ctx) => ctx.print("cd: it's a portfolio, not a filesystem. everything's already in ~.") },
  { names: ['pwd'], run: (_args, ctx) => ctx.print('/home/guest') },
  { names: ['echo'], run: (args, ctx) => ctx.print(args.join(' ')) },
];

const BY_NAME = new Map(COMMANDS.flatMap((c) => c.names.map((n) => [n, c] as const)));
const NAMES = [...BY_NAME.keys()];

const distance = (a: string, b: string) => {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const up = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = up;
    }
  }
  return row[b.length];
};

export async function run(input: string, ctx: Ctx) {
  const [rawName, ...args] = input.trim().split(/\s+/);
  const command = BY_NAME.get(rawName.toLowerCase());
  if (command) return command.run(args, ctx);
  const guess = NAMES.map((n) => [n, distance(rawName.toLowerCase(), n)] as const)
    .filter(([, d]) => d <= 2)
    .sort((a, b) => a[1] - b[1])[0];
  ctx.print(`wasih.sh: command not found: ${rawName}${guess ? `\ndid you mean '${guess[0]}'?` : ''}`, 'err');
}

const commonPrefix = (items: string[]) =>
  items.reduce((prefix, item) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === item[i]) i++;
    return prefix.slice(0, i);
  });

/** Tab completion: command names first, then per-command arguments. */
export function complete(input: string): { value?: string; options?: string[] } {
  const parts = input.trimStart().split(/\s+/);
  const lead = input.slice(0, input.length - input.trimStart().length);
  const word = parts[parts.length - 1].toLowerCase();
  let pool: string[];
  if (parts.length === 1) {
    pool = NAMES;
  } else {
    const cmd = parts[0].toLowerCase();
    if (cmd === 'open') pool = PROJECTS.map((p) => p.slug);
    else if (cmd === 'cat') pool = word.startsWith('.') ? ['.riddle'] : FILES;
    else if (cmd === 'curl') pool = ['wasih.tech/api/me.json'];
    else if (cmd === 'ls') pool = ['api/', 'projects/'];
    else pool = [];
  }
  const matches = pool.filter((p) => p.startsWith(word));
  if (!matches.length) return {};
  const before = lead + parts.slice(0, -1).map((p) => `${p} `).join('');
  if (matches.length === 1) return { value: `${before}${matches[0]}${parts.length === 1 ? ' ' : ''}` };
  return { value: before + commonPrefix(matches), options: matches };
}
