import { Helmet } from 'react-helmet-async';
import { site } from '@/data/site';

interface SEOProps {
  title?: string;
  description?: string;
  /** Path on this site, e.g. "/projects". The canonical URL is built from site.url. */
  path?: string;
  image?: string;
  type?: string;
  /** Structured data (JSON-LD) for this page. */
  jsonLd?: object;
}

// Per-page head tags. Prerendered into static HTML at build time (scripts/prerender.mjs),
// so crawlers that don't run JavaScript still get the right title, description and links.
const SEO = ({
  title = `${site.name} — ${site.role}`,
  description = site.summary,
  path = '/',
  image = `${site.url}/og-image.jpg`,
  type = 'website',
  jsonLd,
}: SEOProps) => {
  const url = `${site.url}${path === '/' ? '/' : path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={site.name} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_US" />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.xHandle} />
      <meta name="twitter:creator" content={site.xHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
