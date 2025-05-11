import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ProjectsSection from '@/sections/ProjectsSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "Projects | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <StarBackground />
      <Header />
      
      <main className="pt-20 relative z-10">
        <ProjectsSection />
        <Footer />
      </main>
      
      
      <ScrollToTop />
    </div>
  );
};

export default ProjectsPage;
