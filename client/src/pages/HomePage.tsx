import { useState } from 'react';
import { InView } from 'react-intersection-observer';

import StarBackground from '@/components/StarBackground';
import CosmicBackground from '@/components/CosmicBackground'; // black holes, lensing, etc
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';

const HomePage = () => {
  const [isHeroInView, setIsHeroInView] = useState(true);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden relative">
      {/* Always show stars */}
      <StarBackground />

      {/* Only show cosmic animation in HeroSection */}
      {isHeroInView && (
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <CosmicBackground />
        </div>
      )}

      <Header />

      <main className="relative z-10">
        <InView as="div" onChange={(inView) => setIsHeroInView(inView)} threshold={0.6}>
          <HeroSection />
        </InView>

        <InView as="div" triggerOnce>
          <AboutSection />
        </InView>

        <Footer />
      </main>

      <ScrollToTop />
    </div>
  );
};

export default HomePage;
