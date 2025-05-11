import MyOdyssey from "@/sections/MyOdyssey"; // or your actual path
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const MyOdysseyPage = () => {
  useEffect(() => {
    document.title = "My Odyssey | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <StarBackground />
      <Header />
      
      <main className="pt-20 relative z-10">
        <MyOdyssey />
        <Footer />

      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default MyOdysseyPage;

