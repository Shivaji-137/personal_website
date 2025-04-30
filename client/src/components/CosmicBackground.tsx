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

const Ripple = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x - 150,
      top: y - 150,
      width: 300,
      height: 300,
      background: `radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)`,
      boxShadow: '0 0 40px 10px rgba(255,255,255,0.05)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)',
      zIndex: 5,
    }}
    initial={{ scale: 0.5, opacity: 0.6 }}
    animate={{ scale: 2.5, opacity: 0 }}
    transition={{ duration: 1.6, ease: 'easeOut' }}
  />
);

const MobilePulse = () => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 180,
      height: 180,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
      zIndex: 3,
    }}
    animate={{
      scale: [1, 1.8],
      opacity: [0.2, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
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
      borderRadius: '50%',
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
      borderRadius: '50%',
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

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const newRipple = {
          x: e.clientX,
          y: e.clientY,
          id: rippleId.current++,
        };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1600);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, isMobile]);

  if (!isVisible) return null;

  const baseSize = isMobile ? 180 : 300;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <AccretionDisk size={baseSize} />
      <GravitationalLensing size={baseSize + 50} />
      <BlackHoleCore size={isMobile ? 50 : 80} />

      {isMobile ? (
        <MobilePulse />
      ) : (
        <AnimatePresence>
          {ripples.map(({ x, y, id }) => (
            <Ripple key={id} x={x} y={y} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CosmicBackground;
