import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const SEO = ({ 
  title = "Abdul Wasih - Full Stack Developer Portfolio",
  description = "Creative UI/UX and brand designer specializing in meaningful digital experiences. Crafting intuitive interfaces and strategic design solutions for modern brands.",
  url = "https://Abdul Wasih.design",
  image = "https://Abdul Wasih.design/og-image.jpg",
  type = "website"
}: SEOProps) => {
  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abdul Wasih",
    "jobTitle": "Full Stack Developer",
    "description": description,
    "url": url,
    "image": image,
    "sameAs": [
      "https://linkedin.com/in/Abdul Wasih",
      "https://dribbble.com/Abdul Wasih",
      "https://instagram.com/Abdul Wasih"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Designer"
    },
    "knowsAbout": [
      "UI/UX Design",
      "Brand Design", 
      "Web Design",
      "User Experience",
      "Visual Design",
      "Design Strategy",
      "Creative Direction"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Design Institute"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Alex Johnson" />
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Alex Johnson Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@alexjohnson" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="keywords" content="Alex Johnson, Full-Stack Developer, React Developer, TypeScript, JavaScript, Web Development, Portfolio, Freelance Developer, Frontend Developer, Backend Developer" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
};

export default SEO;