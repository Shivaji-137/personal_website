import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#5D3E7C] hover:bg-[#FF65A3] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-40"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
