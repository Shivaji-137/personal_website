import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Interactive launch and booster separation in the hero sky. */
export default function RocketFlyby() {
  const reducedMotion = useReducedMotion();
  const [arrived, setArrived] = useState(Boolean(reducedMotion));
  const [separated, setSeparated] = useState(false);
  useEffect(() => {
    if (reducedMotion) { setArrived(true); return; }
    const timer = window.setTimeout(() => setArrived(true), 6800);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);
  return (
    <motion.div
      className="pointer-events-none fixed z-20 w-[72px] sm:w-[92px]"
      style={{ translateX: '-50%', translateY: '-50%' }}
      initial={reducedMotion ? false : { left: 'calc(100% - 40px)', top: 'calc(100% + 110px)', rotate: -38, opacity: 0 }}
      animate={reducedMotion
        ? { left: '50%', top: '38%', rotate: -12, opacity: 0.85 }
        : { left: ['calc(100% - 40px)', '76%', '55%', '50%'], top: ['calc(100% + 110px)', '67%', '39%', '38%'], rotate: [-38, -44, -25, -12], opacity: [0, 1, 1, 0.95] }}
      transition={{ duration: reducedMotion ? 0 : 6, delay: reducedMotion ? 0 : 0.8, times: [0, 0.36, 0.8, 1], ease: 'easeInOut' }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0, 7, 0], x: [0, 4, 0, -3, 0], rotate: [0, 4, 0, -3, 0] }}
        transition={{ duration: 7, delay: 6.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute bottom-[calc(100%-12px)] left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-cyan-200/60 bg-slate-950/95 px-4 py-2 text-sm font-medium text-cyan-50 shadow-[0_0_20px_rgba(103,232,249,0.15)]"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 6.8, duration: 0.5 }}
        >
          Hi, I’m Shivaji 👋
          <span className="absolute -bottom-[5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-cyan-200/60 bg-slate-950" />
        </motion.div>
        {arrived && !separated && (
          <motion.div
            aria-hidden="true"
            className="absolute right-full top-1/3 mr-3 whitespace-nowrap rounded-full border border-cyan-200/50 bg-slate-950/95 px-3 py-2 text-xs font-medium text-cyan-100"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          >Click me →</motion.div>
        )}
        <button
          type="button"
          aria-label={separated ? 'Space observatory with deployed solar panels' : 'Separate the rocket booster'}
          aria-pressed={separated}
          disabled={!arrived || separated}
          onClick={() => setSeparated(true)}
          className={`${arrived && !separated ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'} block w-full rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950`}
        >
        <svg aria-hidden="true" viewBox="0 0 96 170" className="h-auto w-full overflow-visible" focusable="false">
          <defs>
            <linearGradient id="rocket-shell" x1="0" x2="1">
              <stop stopColor="#64748b"/><stop offset="0.45" stopColor="#f8fafc"/><stop offset="1" stopColor="#94a3b8"/>
            </linearGradient>
            <linearGradient id="rocket-exhaust" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#ecfeff"/><stop offset="0.22" stopColor="#67e8f9"/><stop offset="0.6" stopColor="#fb923c"/><stop offset="1" stopColor="#f97316" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <motion.g
            initial={false}
            animate={separated
              ? { y: reducedMotion ? 60 : [0, 12, 180, 550], x: reducedMotion ? 20 : [0, 10, 60, 140], rotate: reducedMotion ? 15 : [0, 12, 45, 85], opacity: [1, 1, 0.7, 0] }
              : { y: 0, x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 2.2, ease: 'easeIn' }}
            style={{ transformOrigin: '48px 85px' }}
          >
          <path d="M33 72 L63 72 L63 86 Q62 97 55 100 L41 100 Q34 97 33 86 Z" fill="url(#rocket-shell)" stroke="#e2e8f0" strokeWidth="1"/>
          <motion.g
            style={{ transformOrigin: '48px 100px' }}
            animate={reducedMotion ? undefined : { scaleY: [0.8, 1.15, 0.92, 1.05, 0.8], opacity: [0.7, 1, 0.85, 1, 0.7] }}
            transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M34 99 Q26 123 48 166 Q69 126 62 99 Z" fill="url(#rocket-exhaust)" opacity="0.25" style={{ filter: 'blur(5px)' }}/>
            <path d="M39 100 Q33 125 48 156 Q63 126 57 100 Z" fill="url(#rocket-exhaust)"/>
            <path d="M44 100 Q41 117 48 131 Q55 117 52 100 Z" fill="#ecfeff" opacity="0.9"/>
          </motion.g>
          <path d="M33 65 Q14 77 17 108 L34 94 Z" fill="#a78bfa" stroke="#c4b5fd" strokeWidth="1"/>
          <path d="M63 65 Q82 77 79 108 L62 94 Z" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="1"/>
          <path d="M42 95 L54 95 L57 103 L39 103 Z" fill="#475569" stroke="#94a3b8"/>
          <path d="M48 75 L44 96 L48 109 L52 96 Z" fill="#c4b5fd"/>
          </motion.g>
          {/* Solar arrays unfold from the capsule after booster release. */}
          {[-1, 1].map(side => (
            <motion.g
              key={side}
              style={{ transformOrigin: `${side < 0 ? 33 : 63}px 56px` }}
              initial={false}
              animate={{ scaleX: separated ? 1 : 0, opacity: separated ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.25, delay: separated && !reducedMotion ? 0.65 : 0, ease: 'easeOut' }}
            >
              <path d={side < 0 ? 'M33 56 H23' : 'M63 56 H73'} stroke="#cbd5e1" strokeWidth="3"/>
              <rect x={side < 0 ? -27 : 73} y="34" width="50" height="44" rx="1.5" fill="#172554" stroke="#fbbf24" strokeWidth="1.3"/>
              {Array.from({ length: 8 }, (_, col) => Array.from({ length: 4 }, (_, row) => (
                <rect key={`${col}-${row}`} x={(side < 0 ? -25 : 75) + col * 6} y={36 + row * 10} width="5" height="9" fill={(col + row) % 2 ? '#1d4ed8' : '#0369a1'} stroke="#7dd3fc" strokeWidth="0.3"/>
              )))}
              <path d={side < 0 ? 'M-26 56 H22' : 'M74 56 H122'} stroke="#fbbf24" strokeWidth="0.8"/>
            </motion.g>
          ))}
          <motion.path
            initial={false}
            animate={{ d: separated ? 'M33 27 Q48 20 63 27 L63 74 Q48 80 33 74 Z' : 'M33 42 Q34 21 48 8 Q62 21 63 42 L63 74 Q48 80 33 74 Z' }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: separated && !reducedMotion ? 0.3 : 0 }}
            fill="url(#rocket-shell)" stroke="#e2e8f0" strokeWidth="1"
          />
          <motion.path d="M34 37 Q37 20 48 8 Q59 20 62 37 Z" fill="#f472b6" initial={false} animate={{ opacity: separated ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}/>
          <motion.g initial={false} animate={{ opacity: separated ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay: separated && !reducedMotion ? 0.7 : 0 }}>
            {/* Hubble-inspired telescope aperture and a small communications antenna. */}
            <ellipse cx="48" cy="27" rx="15" ry="5" fill="#334155" stroke="#e2e8f0" strokeWidth="1"/>
            <ellipse cx="48" cy="27" rx="10" ry="3" fill="#020617" stroke="#67e8f9" strokeWidth="0.6"/>
            <circle cx="48" cy="27" r="1.5" fill="#fbbf24"/>
            <path d="M48 78 V90 M42 90 Q48 99 54 90" fill="none" stroke="#cbd5e1" strokeWidth="1.5"/>
            <path d="M48 92 V100" stroke="#94a3b8" strokeWidth="1"/>
            <circle cx="48" cy="100" r="1.5" fill="#67e8f9"/>
          </motion.g>
          <circle cx="48" cy="53" r="14" fill="#0c4a6e" stroke="#e2e8f0" strokeWidth="2"/>
          {/* Astronaut seated behind the porthole: suit, helmet and smiling visor. */}
          <path d="M38 62 Q39 56 48 56 Q57 56 58 62 Q48 69 38 62" fill="#cbd5e1"/>
          <circle cx="48" cy="51" r="10" fill="#f8fafc"/>
          <rect x="40" y="45" width="16" height="12" rx="5" fill="#1e293b"/>
          <ellipse cx="48" cy="51" rx="6" ry="5" fill="#dba77b"/>
          <circle cx="45.5" cy="50" r="0.8" fill="#172033"/>
          <circle cx="50.5" cy="50" r="0.8" fill="#172033"/>
          <path d="M45 53 Q48 56 51 53" fill="none" stroke="#713f32" strokeWidth="1" strokeLinecap="round"/>
          <path d="M40 45 Q43 42 47 44" fill="none" stroke="#a5f3fc" strokeWidth="1.3" strokeLinecap="round" opacity="0.8"/>
          <path d="M42 63 L45 61 L51 61 L54 63" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        </svg>
        </button>
        <span className="sr-only" role="status">{separated ? 'Booster detached. Solar-panel wings deployed. The astronaut’s space observatory remains floating in the sky.' : ''}</span>
      </motion.div>
    </motion.div>
  );
}
