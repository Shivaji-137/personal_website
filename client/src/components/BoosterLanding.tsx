import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SLSHardware from './SLSHardware';

/** An illustrative powered recovery, independent of the satellite's orbit. */
export default function BoosterLanding({ x, startY, surfaceY, width, reducedMotion, hidden }: {
  x: number; startY: number; surfaceY: number; width: number;
  reducedMotion: boolean; hidden: boolean;
}) {
  const [landed, setLanded] = useState(reducedMotion);
  const scale = width / 96;
  // SVG feet are at y=132; the cropped SVG begins at y=40.
  const touchdownTop = surfaceY - 92 * scale;
  useEffect(() => {
    if (reducedMotion) { setLanded(true); return; }
    const timer = window.setTimeout(() => setLanded(true), 6000);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return <div className="pointer-events-none fixed inset-0 z-[19]" style={{ visibility: hidden ? 'hidden' : 'visible' }}>
    <svg aria-hidden="true" className="absolute" width={width * 0.7} height="8" style={{ left: x - width * 0.35, top: surfaceY - 4 }}>
      <ellipse cx={width * 0.35} cy="4" rx={width * 0.32} ry="3" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.7" />
    </svg>
    <motion.svg aria-hidden="true" viewBox="0 40 96 140" width={width} className="absolute overflow-visible"
      style={{ left: x - width / 2, transformOrigin: '50% 45%' }}
      initial={reducedMotion ? false : { top: startY, rotate: 0 }}
      animate={reducedMotion ? { top: touchdownTop, rotate: 0 } : {
        top: [startY, startY + (touchdownTop - startY) * 0.18, startY + (touchdownTop - startY) * 0.72, touchdownTop - 4, touchdownTop],
        rotate: [0, -10, 5, 0, 0],
      }}
      transition={{ duration: reducedMotion ? 0 : 6, times: [0, 0.2, 0.65, 0.92, 1], ease: 'easeInOut' }}>
      <defs>
        <linearGradient id="return-booster-metal"><stop stopColor="#64748b"/><stop offset="0.45" stopColor="#f8fafc"/><stop offset="1" stopColor="#94a3b8"/></linearGradient>
        <linearGradient id="return-booster-flame" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ecfeff"/><stop offset="0.3" stopColor="#67e8f9"/><stop offset="0.7" stopColor="#fb923c"/><stop offset="1" stopColor="#fb923c" stopOpacity="0"/></linearGradient>
      </defs>
      <SLSHardware id="return-sls" />
      <motion.g initial={{ opacity: reducedMotion ? 1 : 0, scaleX: reducedMotion ? 1 : 0.2 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: reducedMotion ? 0 : 3.5, duration: reducedMotion ? 0 : 0.8 }} style={{ transformOrigin: '48px 111px' }}>
        <path d="M36 105 L24 132 H17 M60 105 L72 132 H79" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M36 116 L24 132 M60 116 L72 132" stroke="#94a3b8" strokeWidth="1"/>
      </motion.g>
      {!reducedMotion && !landed && <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.8, 1, 0.7, 0], scaleY: [0.3, 0.3, 1.1, 0.7, 0.3, 0] }} transition={{ duration: 6, times: [0, 0.34, 0.55, 0.77, 0.96, 1] }} style={{ transformOrigin: '48px 120px' }}>
        <path d="M43 120 Q38 145 48 169 Q58 145 53 120 Z" fill="url(#return-booster-flame)"/>
        <path d="M46 120 Q44 130 48 145 Q52 130 50 120 Z" fill="#ecfeff"/>
      </motion.g>}
    </motion.svg>
    {landed && <span className="absolute -translate-x-1/2 rounded-full bg-slate-950/75 px-2 py-1 text-[9px] tracking-wider text-emerald-200" style={{ left: x, top: surfaceY + 7 }}>BOOSTER LANDED</span>}
    <span className="sr-only" role="status">{landed ? 'Booster safely landed on Earth. Landing legs deployed and engine off.' : 'Booster returning to Earth for a controlled powered landing.'}</span>
  </div>;
}
