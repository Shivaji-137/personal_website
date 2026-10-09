import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-intersection-observer';

const orbitParticles = Array.from({ length: 12 }, (_, index) => index);

const PhDPhysicsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      setPhase((current) => current + 0.018);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const orbitShiftX = (pointer.x - 50) * 0.9;
  const orbitShiftY = (pointer.y - 50) * 0.8;

  return (
    <section id="phd-physics" ref={sectionRef} className="py-20 relative section-transition">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#FF65A3] uppercase tracking-[0.25em] text-xs font-medium mb-3">
            Physics Lab
          </p>
          <h2 className="font-space font-bold text-3xl md:text-4xl text-white mb-4">
            Physics in Motion
          </h2>
          <div className="w-20 h-1 bg-[#FF65A3] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5D3E7C] bg-[#120d1d] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#FFD15C] mb-4">
              <i className="ri-flashlight-line"></i>
              Research visualisation
            </div>

            <h3 className="font-space text-3xl md:text-4xl font-semibold text-white mb-5">
              Exploring field dynamics, orbital systems, and wave phenomena.
            </h3>

            <p className="text-lg text-gray-300 mb-6">
              This space is where I will share interactive simulations, visual models, and physics-inspired experiments from my research and teaching work. The goal is to make abstract concepts feel tangible and intuitive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Orbital motion', icon: 'ri-planet-line', color: 'text-[#FFD15C]' },
                { label: 'Wave propagation', icon: 'ri-waveform-line', color: 'text-[#FF65A3]' },
                { label: 'Field gradients', icon: 'ri-contrast-drop-line', color: 'text-[#8be9fd]' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[#2b2b3a] bg-black/20 p-4">
                  <i className={`${item.icon} ${item.color} text-2xl mb-3 block`}></i>
                  <p className="font-space text-white text-sm">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-[#5D3E7C] hover:bg-[#FF65A3] text-white font-medium px-6 py-2 rounded-md transition-colors font-space inline-flex items-center">
                <i className="ri-play-circle-line mr-2"></i>
                View experiments
              </button>
              <button className="border border-[#FF65A3] text-[#FF65A3] hover:bg-[#FF65A3] hover:text-white font-medium px-6 py-2 rounded-md transition-colors font-space inline-flex items-center">
                <i className="ri-book-open-line mr-2"></i>
                Research notes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div
              className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-[#2b2b3a] bg-[radial-gradient(circle_at_center,_rgba(93,62,124,0.35),_rgba(10,12,18,0.95)_60%)]"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                setPointer({ x, y });
              }}
              onMouseLeave={() => setPointer({ x: 50, y: 50 })}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,101,163,0.18),_transparent_45%)]" />

              <motion.div
                animate={{ rotate: phase * 60 }}
                transition={{ duration: 0.1, ease: 'linear' }}
                className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="absolute inset-0 rounded-full border border-[#5D3E7C]/80" />
                <div className="absolute inset-[18%] rounded-full border border-[#FF65A3]/70" />
                <div className="absolute inset-[36%] rounded-full border border-[#FFD15C]/70" />
              </motion.div>

              {orbitParticles.map((particleIndex) => {
                const angle = phase * (0.9 + particleIndex * 0.04) + (particleIndex / orbitParticles.length) * Math.PI * 2;
                const radius = 110 + Math.sin(phase * 1.5 + particleIndex) * 25;
                const x = 50 + Math.cos(angle) * radius + orbitShiftX;
                const y = 50 + Math.sin(angle) * radius * 0.7 + orbitShiftY;

                return (
                  <motion.div
                    key={particleIndex}
                    animate={{
                      x: `${(x - 50) * 2}px`,
                      y: `${(y - 50) * 2}px`,
                      scale: 1 + (Math.sin(phase + particleIndex) + 1) * 0.35,
                    }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                    className="absolute left-1/2 top-1/2"
                  >
                    <div
                      className="h-3 w-3 rounded-full shadow-[0_0_18px_rgba(255,101,163,0.9)]"
                      style={{
                        background: particleIndex % 3 === 0 ? '#FFD15C' : particleIndex % 3 === 1 ? '#FF65A3' : '#8be9fd',
                        boxShadow: `0 0 18px ${particleIndex % 3 === 0 ? 'rgba(255,209,92,0.85)' : particleIndex % 3 === 1 ? 'rgba(255,101,163,0.85)' : 'rgba(139,233,253,0.85)'}`,
                      }}
                    />
                  </motion.div>
                );
              })}

              <motion.div
                animate={{
                  x: (pointer.x - 50) * 1.2,
                  y: (pointer.y - 50) * 1.2,
                  scale: 1.15,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFD15C]/80 bg-[#FFD15C]/10 blur-sm"
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#5D3E7C] bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-200">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FF65A3]" />
                interactive model
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhDPhysicsSection;
