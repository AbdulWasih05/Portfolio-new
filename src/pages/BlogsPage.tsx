import { Link } from 'react-router-dom';
import { blogs, formatDate } from '../data/blogs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { site } from '@/data/site';

const SITE = site.url;

const BlogsPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Writing by Abdul Wasih',
    url: `${SITE}/blogs`,
    author: { '@type': 'Person', name: 'Abdul Wasih', url: SITE },
    blogPost: blogs.map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `${SITE}/blogs/${b.slug}`,
      datePublished: b.date,
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SEO
        title="Writing | Abdul Wasih"
        description="Posts by Abdul Wasih about open-source work: the cognee connectors built for Mergetober, and what testing them against real APIs taught me."
        path="/blogs"
        jsonLd={jsonLd}
      />
      <Header />

      <main>
        <section className="px-5 sm:px-8 py-10 sm:py-12 border-b border-ink">
          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 mb-[14px]">
            <span className="bg-ink text-paper px-[10px] py-[3px]">Writing</span>
            <span>{blogs.length} posts</span>
          </div>
          <h1
            className="font-serif font-normal leading-[0.86] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}
          >
            Writing.
          </h1>
          <p className="mt-[18px] max-w-[60ch] text-ink-2 text-[17px] leading-[1.55]">
            Notes from open-source work: what I built, what review caught, and what broke when I tested it for real.
          </p>
        </section>

        {blogs.map((post, i) => {
          const num = (i + 1).toString().padStart(2, '0');
          return (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[80px_minmax(0,1fr)_160px_60px] items-start md:items-center gap-4 md:gap-6 px-5 sm:px-7 py-7 sm:py-9 border-b border-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              <div className="font-mono text-[14px] font-bold tracking-[0.1em]">{num}</div>
              <div className="min-w-0">
                <h2
                  className="font-serif font-normal leading-[1.02] tracking-[-0.03em] mb-3 [overflow-wrap:anywhere]"
                  style={{ fontSize: 'clamp(28px, 4.4vw, 56px)' }}
                >
                  {post.title}
                </h2>
                <p className="text-[15px] leading-[1.55] max-w-[60ch] text-ink-2 group-hover:text-rule">{post.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-[6px]" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase border border-current px-2 py-1"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase md:text-right text-left">
                <time dateTime={post.date} className="block font-serif font-normal text-[22px] tracking-[-0.02em] normal-case mb-1">
                  {formatDate(post.date)}
                </time>
                <span>{post.minutes} min read</span>
              </div>
              <div className="font-serif text-[28px] md:text-right text-left tracking-[-0.02em]" aria-hidden>
                →
              </div>
            </Link>
          );
        })}

        <div className="px-5 sm:px-8 py-7 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center border-b border-ink font-mono text-xs tracking-[0.16em] uppercase">
          <Link to="/" className="border-b border-current pb-1">
            ← Back to Home
          </Link>
          <Link to="/projects" className="border-b border-current pb-1">
            All projects →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPage;
