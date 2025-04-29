import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useNavigate, useLocation } from 'react-router-dom';

type NavLink = {
  text: string;
  href: string;
};

const links: NavLink[] = [
  { text: 'About', href: '#about' },
  { text: 'Projects', href: '/projects' },
  { text: 'Research', href: '/research' },
  { text: 'Blog', href: '/blog' },
  { text: 'CV', href: '/cv' },
  { text: 'Contact', href: '/contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = useScrollSpy(
    ['home', 'about'],
    { rootMargin: "-100px 0px 0px 0px" }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname === '/' || location.pathname === '/#') {
        smoothScrollTo(href.substring(1));
      } else {
        navigate('/');
        setTimeout(() => smoothScrollTo(href.substring(1)), 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0B1026] bg-opacity-90 backdrop-blur-lg border-b border-[#5D3E7C] border-opacity-30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-[#FFD15C] font-space font-bold text-2xl tracking-wider"
          >
            SHIVAJI<span className="text-[#FF65A3]">.</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link font-space text-white hover:text-[#FF65A3] transition-colors relative ${
                  (link.href.startsWith('#') && activeSection === link.href.substring(1)) || 
                  (location.pathname === link.href) ? 'text-[#FF65A3]' : ''
                }`}
              >
                {link.text}
                {(link.href.startsWith('#') && activeSection === link.href.substring(1)) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-[#FF65A3] rounded-[1px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="md:hidden fixed top-0 right-0 w-64 h-full bg-[#0B1026] border-l border-[#5D3E7C] z-50"
          >
            <div className="p-6">
              <button
                className="absolute top-4 right-4 text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <div className="flex flex-col space-y-6 mt-12">
                {links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.href)}
                    className={`nav-link font-space text-left text-white hover:text-[#FF65A3] transition-colors ${
                      (link.href.startsWith('#') && activeSection === link.href.substring(1)) || 
                      (location.pathname === link.href) ? 'text-[#FF65A3]' : ''
                    }`}
                  >
                    {link.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
