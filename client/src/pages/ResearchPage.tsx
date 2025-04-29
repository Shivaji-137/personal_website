import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import ResearchSection from '@/sections/ResearchSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const ResearchPage = () => {
  useEffect(() => {
    document.title = "Research | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <CosmicBackground />
      <Header />
      
      <main className="pt-20">
        <ResearchSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ResearchPage;
