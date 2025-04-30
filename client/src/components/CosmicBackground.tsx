import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// Ripple with crest/trough wave look
const Ripple = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x - 100,
      top: y - 100,
      width: 200,
      height: 200,
      background: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: `
        0 0 0 0 rgba(255, 255, 255, 0.2),
        0 0 0 10px rgba(255, 255, 255, 0.1),
        0 0 0 20px rgba(255, 255, 255, 0.05)
      `,
      zIndex: 5,
    }}
    initial={{ scale: 0.5, opacity: 0.8 }}
    animate={{ scale: 2.5, opacity: 0 }}
    transition={{ duration: 1.8, ease: 'easeOut' }}
  />
);

const AccretionDisk = ({ size }: { size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: `conic-gradient(from 0deg, #ffcc80, #ff4081, #7c4dff, #ffcc80)`,
      filter: 'blur(30px) contrast(150%)',
      opacity: 0.5,
      zIndex: 1,
      mixBlendMode: 'screen',
    }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
  />
);

const GravitationalLensing = ({ size }: { size: number }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 0 100px 20px rgba(255, 255, 255, 0.08)',
      zIndex: 0,
      pointerEvents: 'none',
    }}
  />
);

const BlackHoleCore = ({ size }: { size: number }) => (
  <div
    className="absolute rounded-full bg-black"
    style={{
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 60px 15px rgba(0, 0, 0, 0.9)',
      zIndex: 13,
    }}
  />
);

const CosmicBackground = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some(entry => entry.isIntersecting);
        setIsVisible(visible);
      },
      { threshold: 0.1 }
    );

    const home = document.getElementById('home');
    const about = document.getElementById('about');

    if (home) observer.observe(home);
    if (about) observer.observe(about);

    return () => {
      if (home) observer.unobserve(home);
      if (about) observer.unobserve(about);
    };
  }, []);

  // Mouse + Touch Support
  useEffect(() => {
    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current || !isVisible) return;

      let clientX: number, clientY: number;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const newRipple = {
          x: clientX,
          y: clientY,
          id: rippleId.current++,
        };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1800);
      }
    };

    document.addEventListener('mousemove', handleEvent);
    document.addEventListener('touchstart', handleEvent);
    return () => {
      document.removeEventListener('mousemove', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const baseSize = isMobile ? 200 : 300;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <AccretionDisk size={baseSize} />
      <GravitationalLensing size={baseSize + 50} />
      <BlackHoleCore size={isMobile ? 50 : 80} />

      <AnimatePresence>
        {ripples.map(({ x, y, id }) => (
          <Ripple key={id} x={x} y={y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CosmicBackground;
