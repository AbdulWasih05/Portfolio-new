import { Suspense, lazy } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionLoader from '@/components/SectionLoader';

const Projects = lazy(() => import('@/components/Projects'));
const About = lazy(() => import('@/components/About'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-paper text-ink">
        <Header />
        <main id="main-content">
          <Hero />

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
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
