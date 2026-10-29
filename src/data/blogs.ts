import { renderMarkdown } from '@/lib/markdown';
import githubMd from '@/content/blogs/cognee-github.md?raw';
import shopifyMd from '@/content/blogs/cognee-shopify.md?raw';

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** One line for the listing and meta description. */
  summary: string;
  tags: string[];
  /** Rendered body (title removed). */
  html: string;
  minutes: number;
  /** The pull request the post is about. */
  prUrl: string;
}

const make = (
  slug: string,
  source: string,
  meta: Pick<BlogPost, 'date' | 'summary' | 'tags' | 'prUrl'>,
): BlogPost => {
  const { title, html } = renderMarkdown(source);
  const words = source.split(/\s+/).filter(Boolean).length;
  return { slug, title, html, minutes: Math.max(1, Math.round(words / 200)), ...meta };
};

// In display order.
export const blogs: BlogPost[] = [
  make('github-connector-for-cognee', githubMd, {
    date: '2026-10-31',
    summary: 'My third Mergetober connector brings GitHub issues, pull requests and releases into cognee.',
    tags: ['cognee', 'Mergetober', 'open source', 'GitHub'],
    prUrl: 'https://github.com/topoteretes/cognee-community/pull/411',
  }),
  make('shopify-connector-for-cognee', shopifyMd, {
    date: '2026-10-31',
    summary: 'My last Mergetober connector brings a Shopify store into cognee.',
    tags: ['cognee', 'Mergetober', 'open source', 'Shopify'],
    prUrl: 'https://github.com/topoteretes/cognee-community/pull/418',
  }),
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-31" -> "31 Oct 2026", without timezone surprises. */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
