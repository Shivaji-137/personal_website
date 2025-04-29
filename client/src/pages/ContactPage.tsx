import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import ContactSection from '@/sections/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact | Shivaji.dev";
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <CosmicBackground />
      <Header />
      
      <main className="pt-20">
        <ContactSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ContactPage;
