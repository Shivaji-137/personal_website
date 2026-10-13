import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** ESO's photographed Milky Way panorama, gently reframed behind the hero. */
const CosmicBackground = () => {
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[#020306]">
    {!failed && <motion.img
      src="https://cdn.eso.org/images/wallpaper4/eso0932a.jpg"
      alt=""
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: '50% 48%' }}
      initial={false}
      animate={reducedMotion ? { scale: 1.04, x: 0 } : { scale: [1.04, 1.09, 1.04], x: [0, -8, 0] }}
      transition={{ duration: 140, repeat: Infinity, ease: 'easeInOut' }}
    />}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,3,6,0.38), rgba(2,3,6,0.23) 35%, rgba(2,3,6,0.52) 72%, rgba(2,3,6,0.92))' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(2,3,6,0.28) 0%, transparent 55%, rgba(2,3,6,0.4) 100%)' }} />
  </div>;
};

export default CosmicBackground;
