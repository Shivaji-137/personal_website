import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ResearchSection from '@/sections/ResearchSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const ResearchPage = () => {
  useEffect(() => {
    document.title = "Research | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <StarBackground />
      <Header />
      
      <main className="pt-20 relative z-10">
        <ResearchSection />
        <Footer />

      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default ResearchPage;
