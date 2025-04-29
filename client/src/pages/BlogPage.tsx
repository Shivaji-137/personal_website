import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import BlogSection from '@/sections/BlogSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const BlogPage = () => {
  useEffect(() => {
    document.title = "Blog | Shivaji.";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <CosmicBackground />
      <Header />
      
      <main className="pt-20">
        <BlogSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPage;
