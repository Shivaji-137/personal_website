import { useEffect } from 'react';
import { useState } from 'react';

import CosmicBackground from '@/components/CosmicBackground';
import { InView } from 'react-intersection-observer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ResearchSection from '@/sections/ResearchSection';
import BlogSection from '@/sections/BlogSection';
import CVSection from '@/sections/CVSection';
import ContactSection from '@/sections/ContactSection';

const HomePage = () => {
  const [showCosmic, setShowCosmic] = useState(false);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      {showCosmic && <CosmicBackground />}

      <Header />

      <main>
        <InView as="div" onChange={(inView) => setShowCosmic(inView)}>
          <HeroSection />
        </InView>

        <InView as="div" onChange={(inView) => setShowCosmic((prev) => prev || inView)}>
          <AboutSection />
        </InView>

        <div className="hidden">
          <ProjectsSection />
          <ResearchSection />
          <BlogSection />
          <CVSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;

