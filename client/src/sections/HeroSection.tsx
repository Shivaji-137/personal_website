import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Hi, I'm Shivaji Chaulagain";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-transparent z-10"
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight mb-6 min-h-[4rem]">
            {text.split(' ').map((word, index) => {
              if (index === 2) {
                return (
                  <span key={index}>
                    <span className="text-[#FF65A3]">{word}</span>{' '}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
            <span
              className={`border-r-4 border-[#FF65A3] ${isTypingComplete ? 'animate-blink' : ''}`}
            ></span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Exploring the physics of the universe through code
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5D3E7C] hover:bg-[#FF65A3] text-white font-medium px-8 py-3 rounded-md transition-colors font-space"
              onClick={() => scrollToSection('about')}
            >
              More about Me
            </motion.button>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
          >
            <i className="ri-arrow-down-line text-3xl text-white opacity-75"></i>
          </motion.div>

          {/* Floating blobs */}
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-[#5D3E7C] opacity-20 rounded-full filter blur-2xl animate-[cosmic-shift_25s_linear_infinite]" />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF65A3] opacity-10 rounded-full filter blur-2xl animate-[cosmic-shift_25s_linear_infinite]"
            style={{ animationDelay: '-5s' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

