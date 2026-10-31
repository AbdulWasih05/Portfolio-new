import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs, formatDate } from '../data/blogs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NotFound from './NotFound';

const SITE = 'https://www.wasihh.tech';

// Typography for the rendered markdown (src/lib/markdown.ts output).
const prose = [
  'max-w-[68ch] text-[17px] sm:text-[18px] leading-[1.7] text-ink-2',
  '[&_h2]:font-serif [&_h2]:font-normal [&_h2]:text-ink [&_h2]:text-[30px] sm:[&_h2]:text-[38px] [&_h2]:leading-[1.08] [&_h2]:tracking-[-0.02em] [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-28',
  '[&_h3]:font-serif [&_h3]:text-ink [&_h3]:text-[24px] [&_h3]:mt-10 [&_h3]:mb-3',
  '[&_p]:my-5',
  '[&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:my-2 [&_li]:pl-1 [&_li::marker]:text-ink',
  '[&_a]:text-ink [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[3px] hover:[&_a]:text-ink-3 [&_a]:[overflow-wrap:anywhere]',
  '[&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.84em] [&_:not(pre)>code]:bg-paper-2 [&_:not(pre)>code]:border [&_:not(pre)>code]:border-rule [&_:not(pre)>code]:px-[5px] [&_:not(pre)>code]:py-[1px] [&_:not(pre)>code]:text-ink [&_:not(pre)>code]:[overflow-wrap:anywhere]',
  '[&_pre]:my-6 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:bg-ink [&_pre]:text-paper [&_pre]:border [&_pre]:border-ink [&_pre]:px-4 sm:[&_pre]:px-5 [&_pre]:py-4 [&_pre]:font-mono [&_pre]:text-[13px] sm:[&_pre]:text-[14px] [&_pre]:leading-[1.6]',
].join(' ');

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = blogs.findIndex((b) => b.slug === slug);
  const post = index >= 0 ? blogs[index] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!post) return <NotFound />;

  const next = blogs.length > 1 ? blogs[(index + 1) % blogs.length] : undefined;
  const canonical = `${SITE}/blogs/${post.slug}`;
  const image = `${SITE}/og-image.jpg`;
  const author = { '@type': 'Person', name: 'Abdul Wasih', url: SITE };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: canonical,
    mainEntityOfPage: canonical,
    image,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author,
    publisher: author,
  };

  return (
    <>
      <SEO
        title={`${post.title} | Abdul Wasih`}
        description={post.summary}
        url={canonical}
        image={image}
        type="article"
      />
      <Helmet>
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Header />

        <main>
          <section className="px-5 sm:px-8 pt-9 sm:pt-12 pb-0">
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              <span className="bg-ink text-paper px-[10px] py-[3px]">Post</span>
              <Link to="/blogs" className="hover:text-ink transition-colors">
                Writing
              </Link>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.minutes} min read</span>
            </div>
          </section>

          <section className="px-5 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-ink">
            <h1
              className="font-serif font-normal leading-[0.95] tracking-[-0.03em] max-w-[20ch] [overflow-wrap:anywhere]"
              style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
            >
              {post.title}
            </h1>
            <ul className="mt-6 flex flex-wrap gap-[6px]" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="font-mono text-[10px] tracking-[0.1em] uppercase border border-ink px-2 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <article className="px-5 sm:px-8 pt-4 sm:pt-6 pb-14 sm:pb-20 min-w-0">
            <div className={prose} dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>

          <nav
            aria-label="More posts"
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] border-t border-b border-ink"
          >
            {next ? (
              <Link
                to={`/blogs/${next.slug}`}
                className="group block px-5 sm:px-8 py-7 sm:py-8 border-b md:border-b-0 md:border-r border-ink hover:bg-ink hover:text-paper transition-colors duration-150"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 group-hover:text-rule">
                  Next post
                </span>
                <span className="mt-2 block font-serif text-[26px] sm:text-[32px] leading-[1.1] tracking-[-0.02em]">
                  {next.title} <span aria-hidden>→</span>
                </span>
              </Link>
            ) : (
              <div />
            )}
            <div className="px-5 sm:px-8 py-7 sm:py-8 flex flex-col justify-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
              <Link to="/blogs" className="border-b border-current pb-1 w-max">
                ← Back to all posts
              </Link>
              <a
                href={post.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-current pb-1 w-max"
              >
                The pull request ↗
              </a>
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
