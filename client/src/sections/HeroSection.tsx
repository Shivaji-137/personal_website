import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

const NoticeBanner = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = [
    '🚀 New Project!!: Convolutional Neural Networks (CNNs) - Educational App'
  ];

  const bannerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue('100%'); // Motion value for horizontal movement
  const isHoveringRef = useRef(false); // Track hover state
  const activeAnimationRef = useRef<ReturnType<typeof animate> | null>(null); // Track animation instance

  const baseDuration = 30; // Base duration in seconds for full scroll (from 100% to -100%)

  // Function to start the continuous full loop animation (100% -> -100%)
  const startFullLoopAnimation = () => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }
    activeAnimationRef.current = animate(x, ['100%', '-100%'], {
      duration: baseDuration,
      ease: 'linear',
      repeat: Infinity,
    });
  };

  // Function to resume animation from its current position
  const resumeAnimation = (fromXPercentString: string) => {
    if (isHoveringRef.current) return; // Don't resume if still hovering

    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }

    const startNum = parseFloat(fromXPercentString); // Current x position
    const endNum = -100; // Target end position

    if (startNum <= endNum) {
      x.set('100%', false); // Teleport to 100%
      startFullLoopAnimation();
      return;
    }

    const distanceToCover = startNum - endNum;
    const proportionOfFullAnimation = distanceToCover / 200;
    const segmentDuration = proportionOfFullAnimation * baseDuration;

    if (segmentDuration <= 0) {
      x.set('100%', false);
      startFullLoopAnimation();
      return;
    }

    activeAnimationRef.current = animate(x, `${endNum}%`, {
      duration: segmentDuration,
      ease: 'linear',
      onComplete: () => {
        if (!isHoveringRef.current) {
          x.set('100%', false);
          startFullLoopAnimation();
        }
      },
    });
  };

  // Effect to start the animation on mount and clean up on unmount
  useEffect(() => {
    isHoveringRef.current = false; // Ensure hover state is false
    x.set('100%');
    startFullLoopAnimation();

    return () => {
      isHoveringRef.current = true; // Prevent onComplete callbacks when unmounted
      if (activeAnimationRef.current) {
        activeAnimationRef.current.stop();
      }
    };
  }, [messages.length]); // Empty dependency array ensures effect runs once on mount

  // Handle hover
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop(); // Pause the animation
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    resumeAnimation(x.get()); // Resume from the current position
  };

  return (
    <div className="relative top-16 w-full z-50 overflow-hidden bg-black/20 backdrop-blur-md">
      <motion.div
        ref={bannerRef}
        className="whitespace-nowrap text-white text-sm py-2 px-6 cursor-pointer select-none flex"
        style={{ x }} // Bind the x motion value to the div's style
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Loop through messages and display them together */}
        {messages.map((message, index) => (
          <span key={index} className="mr-8">
            🚀{' '}
            <a href='https://shivaji-interactiveguide-to-cnn.streamlit.app/' className="hover:text-pink-400 no-underline">
              {message}
            </a>
          </span>
        ))}
      </motion.div>
    </div>
  );
};


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
    <>
      <NoticeBanner />

      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 bg-transparent z-10"
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
            <div className="absolute top-1/2 left-1/4 w-50 h-50 bg-[#5D3E7C] opacity-20 rounded-full filter blur-2xl animate-[cosmic-shift_25s_linear_infinite]" />
            <div
              className="absolute bottom-1/2 right-1/4 w-60 h-60 bg-[#FF65A3] opacity-10 rounded-full filter blur-2xl animate-[cosmic-shift_25s_linear_infinite]"
              style={{ animationDelay: '-5s' }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
