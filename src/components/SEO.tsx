import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const SEO = ({
  title = "Abdul Wasih - Full Stack Engineer | React, Node.js Specialist",
  description = "Enthusiastic Full Stack Engineer crafting scalable web applications with React.js, Next.js, Node.js. Specializing in responsive UI, API integration and Docker containerization.",
  url = "https://wasih.tech",
  image = "https://wasih.tech/og-image.jpg",
  type = "website"
}: SEOProps) => {
  // Note: Person JSON-LD lives statically in index.html (single source of truth,
  // crawlable without JS and visible in View Source).

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Abdul Wasih" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:site_name" content="Abdul Wasih - Full Stack Engineer Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@abdulwasih" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="keywords" content="Abdul Wasih, Full Stack Engineer, React Developer, Node.js Developer, Next.js, TypeScript, JavaScript, MongoDB, MySQL, Docker, Git, Web Development, Portfolio, API Development, Frontend Developer, Backend Developer, Cloud Computing, DevOps, Responsive Web Design, REST API" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
};

export default SEO;