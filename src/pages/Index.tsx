import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';
import { site } from '@/data/site';
import { projects, slugify } from '@/data/projects';

// Who this site is about, in the vocabulary search engines and AI assistants read.
const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  givenName: 'Abdul',
  familyName: 'Wasih',
  jobTitle: site.role,
  description: site.summary,
  url: `${site.url}/`,
  image: `${site.url}/portrait/avatar.jpg`,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin, site.x],
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.education.school },
  knowsLanguage: ['English', 'Hindi', 'Urdu', 'Arabic'],
  knowsAbout: [
    'Full-stack web development',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'FastAPI',
    'PostgreSQL',
    'MySQL',
    'Payments and webhooks',
    'Realtime systems (WebSockets)',
    'AI features with LLMs',
    'Open source',
  ],
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { '@id': `${site.url}/#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profile`,
      url: `${site.url}/`,
      name: `${site.name} — ${site.role}`,
      isPartOf: { '@id': `${site.url}/#website` },
      mainEntity: { '@id': `${site.url}/#person` },
      hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${site.url}/projects/${slugify(p.title)}` })),
    },
  ],
};

const Index = () => {
  useReveal();

  return (
    <>
      <SEO jsonLd={homeJsonLd} />
      <div className="min-h-screen bg-paper text-ink">
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <Projects />
          <Experience />
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
