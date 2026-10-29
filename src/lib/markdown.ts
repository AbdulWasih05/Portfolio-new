// A tiny, synchronous markdown renderer for the blog posts in src/content/blogs.
// Supports only what the posts use: ## headings, paragraphs, - and 1. lists, `inline code`,
// fenced code blocks and bare URLs (auto-linked). All text is HTML-escaped first.

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Bare URLs, minus trailing sentence punctuation.
const URL_RE = /https?:\/\/[^\s<]+[^\s<.,;:!?)'"]/g;

const linkify = (escaped: string) =>
  escaped.replace(
    URL_RE,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  );

// Inline: `code` spans are left alone (escaped only); everything else is escaped and linkified.
const inline = (text: string) =>
  text
    .split(/(`[^`]+`)/g)
    .map((part) =>
      part.startsWith('`') && part.endsWith('`') && part.length > 1
        ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
        : linkify(escapeHtml(part)),
    )
    .join('');

export interface ParsedPost {
  title: string;
  html: string;
}

/** Splits off the first `# ` line as the title and renders the rest. */
export function renderMarkdown(source: string): ParsedPost {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  let title = '';
  const out: string[] = [];
  let para: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`);
    list = null;
  };
  const flush = () => {
    flushPara();
    flushList();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i]);
      const lang = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : '';
      out.push(`<pre><code${lang}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1 && !title) {
        title = text;
        continue;
      }
      out.push(`<h${level} id="${headingId(text)}">${inline(text)}</h${level}>`);
      continue;
    }

    const ul = line.match(/^[-*]\s+(.*)$/);
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const tag = ul ? 'ul' : 'ol';
      if (list && list.tag !== tag) flushList();
      if (!list) list = { tag, items: [] };
      list.items.push((ul ?? ol)![1]);
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }

    // A non-blank line right after a list item continues that item.
    if (list) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    para.push(line.trim());
  }
  flush();

  return { title, html: out.join('\n') };
}
