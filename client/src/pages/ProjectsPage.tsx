import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import ProjectsSection from '@/sections/ProjectsSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "Projects | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <CosmicBackground />
      <Header />
      
      <main className="pt-20">
        <ProjectsSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProjectsPage;
