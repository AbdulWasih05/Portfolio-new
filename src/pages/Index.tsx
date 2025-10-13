import { Suspense, lazy } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';


// Lazy load non-critical components for performance
const Services = lazy(() => import('@/components/Services'));
const About = lazy(() => import('@/components/About'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading component for Suspense fallback - Using CSS animation instead of Framer Motion
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen">
        {/* Fixed Header */}
        <Header />
        
        {/* Main Content */}
        <main id="main-content">
          {/* Hero Section - Above the fold, no lazy loading */}
          <Hero />
          <LogoCarousel />

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          {/* Lazy loaded sections with Suspense for code splitting */}

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          

          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
