import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import CosmicJourney from './CosmicJourney';
import BoosterLanding from './BoosterLanding';
import SLSHardware from './SLSHardware';
import { cosmicJourneyImages } from '@/data/cosmicJourneyImages';

/** Interactive launch and booster separation in the hero sky. */
export default function RocketFlyby() {
  const reducedMotion = useReducedMotion();
  const [arrived, setArrived] = useState(Boolean(reducedMotion));
  const launchElapsed = useRef(0);
  const [separated, setSeparated] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [journeyOrigin, setJourneyOrigin] = useState<{x:number;y:number}|null>(null);
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const [earthFailed, setEarthFailed] = useState(false);
  const orbitElapsed = useRef(0);
  const paused = useRef(false);
  const focused = useRef(false);
  const craftX = useMotionValue(0);
  const craftY = useMotionValue(0);
  const labelOffset = useMotionValue(0);
  const [titleCenter, setTitleCenter] = useState<number | null>(null);
  const centerX = viewport.width * 0.5;
  const centerY = titleCenter ?? viewport.height * 0.52;
  const earthRadius = Math.min(viewport.width * 0.31, viewport.height * 0.25, 260);
  const orbitRadius = Math.min(viewport.width * 0.41, earthRadius + 210);
  const orbitHeight = earthRadius + 125;
  useEffect(() => {
    const title = document.querySelector('[data-hero-title]');
    const resize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      if (title) {
        const bounds = title.getBoundingClientRect();
        setTitleCenter(bounds.top + bounds.height / 2);
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (title) observer.observe(title);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', resize, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', resize);
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    let elapsed = orbitElapsed.current;
    let previous = performance.now();
    const draw = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (deployed && !reducedMotion && !document.hidden && !journeyOrigin && !paused.current && !focused.current) elapsed += delta;
      orbitElapsed.current = elapsed;
      if (!document.hidden && !journeyOrigin) launchElapsed.current += delta;
      const launch = reducedMotion ? 1 : Math.max(0, Math.min(1, (launchElapsed.current - 0.8) / 6));
      const eased = launch * launch * (3 - 2 * launch);
      if (launch === 1 && !arrived) setArrived(true);
      const angle = -Math.PI / 2 + elapsed * Math.PI * 2 / 90;
      const positionX = centerX + Math.cos(angle) * orbitRadius;
      craftX.set(positionX);
      const craftWidth = viewport.width < 640 ? 52 : 66;
      const labelWidth = 64;
      const labelLeft = deployed ? positionX + craftWidth / 2 + 20 : positionX - craftWidth / 2 - 12 - labelWidth;
      labelOffset.set(Math.max(12, Math.min(viewport.width - labelWidth - 12, labelLeft)) - positionX + craftWidth / 2);
      const surfaceLaunchY = centerY - earthRadius * 0.94 - 35 * craftWidth / 96;
      const positionY = surfaceLaunchY * (1 - eased) + (centerY + Math.sin(angle) * orbitHeight) * eased;
      craftY.set(Math.max(145, Math.min(viewport.height - 145, positionY)));
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [centerX, centerY, orbitRadius, orbitHeight, earthRadius, reducedMotion, arrived, deployed, journeyOrigin, viewport.width, craftX, craftY, labelOffset]);
  useEffect(() => {
    if (!separated) return;
    const timer = window.setTimeout(() => setDeployed(true), reducedMotion ? 0 : 2200);
    return () => window.clearTimeout(timer);
  }, [separated, reducedMotion]);
  return (
    <>
    <div className="pointer-events-none fixed inset-0 z-[1]" style={{ visibility: journeyOrigin ? 'hidden' : 'visible' }} aria-hidden="true">
      <div className="absolute overflow-hidden rounded-full" style={{ left: centerX - earthRadius, top: centerY - earthRadius, width: earthRadius * 2, height: earthRadius * 2, opacity: 0.65, maskImage: 'radial-gradient(circle closest-side, black 0%, black 85%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle closest-side, black 0%, black 85%, transparent 100%)' }}>
        {!earthFailed && <img src={cosmicJourneyImages.earth.src} alt="" onError={() => setEarthFailed(true)} className="h-full w-full object-cover" />}
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 26%, transparent 28%, rgba(2,6,23,0.2) 65%, rgba(2,6,23,0.85) 100%)' }}/>
      </div>
    </div>
    <div className="pointer-events-none fixed bottom-4 z-[16] w-72 -translate-x-1/2 text-center text-[10px] leading-relaxed text-slate-400" style={{ left: centerX, visibility: journeyOrigin ? 'hidden' : 'visible' }}>
      <span className="tracking-[0.18em] text-cyan-100/70">EARTH · ORBITAL OBSERVATORY</span><br />
      Click the rocket to release your orbiting satellite<br />
      SLS-inspired design · fictional booster recovery<br />
      <a className="pointer-events-auto underline underline-offset-2" href={cosmicJourneyImages.earth.source} target="_blank" rel="noopener noreferrer">{earthFailed ? 'View NASA Earth image' : 'Earth imagery: NASA'}</a>
      {' · '}<a className="pointer-events-auto underline underline-offset-2" href="https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits" target="_blank" rel="noopener noreferrer">About orbits</a> · <a className="pointer-events-auto underline underline-offset-2" href="https://www.nasa.gov/reference/space-launch-system/" target="_blank" rel="noopener noreferrer">NASA SLS</a><br />
      <a className="pointer-events-auto underline underline-offset-2" href="https://www.eso.org/public/images/eso0932a/" target="_blank" rel="noopener noreferrer">Sky: ESO/S. Brunier</a> · cropped and dimmed
    </div>
    {separated && <BoosterLanding x={centerX} startY={centerY - orbitHeight - 45 * (viewport.width < 640 ? 52 : 66) / 96} surfaceY={centerY - earthRadius * 0.94} width={viewport.width < 640 ? 52 : 66} reducedMotion={Boolean(reducedMotion)} hidden={Boolean(journeyOrigin)} />}
    <motion.div
      className="pointer-events-none fixed z-20 w-[52px] sm:w-[66px]"
      style={{ left: craftX, top: craftY, translateX: '-50%', translateY: '-50%', visibility: journeyOrigin ? 'hidden' : 'visible' }}
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
      onFocusCapture={() => { focused.current = true; }}
      onBlurCapture={() => { focused.current = false; }}
    >
      <motion.div>
        {arrived && (!separated || deployed) && (
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-1/3 flex w-16 flex-col gap-0.5 rounded-md border border-cyan-200/20 bg-slate-950/75 px-1 py-0.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={{ x: labelOffset }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.7 }}
          >
            <span className="text-[7px] italic leading-tight text-slate-300">
              {deployed ? 'Let’s change perspective' : 'Hi, I’m Shivaji'}
            </span>
            <span className="text-[8px] font-medium leading-tight text-cyan-100">
              {deployed ? 'Click me to explore cosmos' : 'Click me'}
            </span>
            <span aria-hidden="true" className="text-[7px] leading-none text-cyan-200/70">{deployed ? '←' : '→'}</span>
          </motion.div>
        )}
        <button
          type="button"
          aria-label={deployed ? 'Start the journey through cosmic scales' : 'Separate the rocket booster'}
          aria-pressed={separated}
          disabled={!arrived || (separated && !deployed)}
          onClick={event => {
            if (!separated) {
              setSeparated(true);
              paused.current = false;
              focused.current = false;
              event.currentTarget.blur();
              return;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            setJourneyOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.31 });
          }}
          className={`${arrived && (!separated || deployed) ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'} block w-full rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950`}
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
          {!separated && <g>
            <SLSHardware id="launch-sls" />
            {!arrived && <motion.g style={{ transformOrigin: '48px 120px' }} animate={reducedMotion ? undefined : { scaleY: [0.9, 1.08, 0.96, 1], opacity: [0.85, 1, 0.9, 1] }} transition={{ duration: 0.45, repeat: Infinity }}>
              {[27, 48, 69].map((x, i) => <g key={x}>
                <path d={`M${x - 5} 120 Q${x - 8} 143 ${x} ${i === 1 ? 170 : 160} Q${x + 8} 143 ${x + 5} 120 Z`} fill="url(#rocket-exhaust)"/>
                <path d={`M${x - 2} 120 Q${x - 3} 131 ${x} 144 Q${x + 3} 131 ${x + 2} 120 Z`} fill="#fff7ed"/>
              </g>)}
            </motion.g>}
            <path d="M39 34 H57 V48 L59 52 H37 L39 48 Z" fill="url(#rocket-shell)" stroke="#94a3b8" strokeWidth="0.6"/>
            <path d="M40 38 H56 M39 47 H57" stroke="#64748b" strokeWidth="0.8"/>
            <text x="48" y="44" textAnchor="middle" fill="#c32632" fontFamily="Arial, sans-serif" fontSize="4.5" fontWeight="bold">NASA</text>
            <path d="M46 3 H50 V17 L56 31 H40 L46 17 Z" fill="url(#rocket-shell)" stroke="#94a3b8" strokeWidth="0.6"/>
            <path d="M44 15 H52 M43 18 H53" stroke="#334155" strokeWidth="0.7"/>
            <rect x="47" y="0" width="2" height="6" fill="#e2e8f0"/>
            <path d="M41 29 H55" stroke="#111827" strokeWidth="1.3"/>
            <rect x="44" y="25" width="3" height="2" rx="0.5" fill="#0f172a"/>
          </g>}
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
            animate={{ d: separated ? 'M33 27 Q48 20 63 27 L63 74 Q48 80 33 74 Z' : 'M40 31 H56 V34 H40 Z' }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: separated && !reducedMotion ? 0.3 : 0 }}
            fill="url(#rocket-shell)" stroke="#e2e8f0" strokeWidth="1"
          />

          <motion.g initial={false} animate={{ opacity: separated ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay: separated && !reducedMotion ? 0.7 : 0 }}>
            {/* Hubble-inspired telescope aperture and a small communications antenna. */}
            <ellipse cx="48" cy="27" rx="15" ry="5" fill="#334155" stroke="#e2e8f0" strokeWidth="1"/>
            <ellipse cx="48" cy="27" rx="10" ry="3" fill="#020617" stroke="#67e8f9" strokeWidth="0.6"/>
            <circle cx="48" cy="27" r="1.5" fill="#fbbf24"/>
            <path d="M48 78 V90 M42 90 Q48 99 54 90" fill="none" stroke="#cbd5e1" strokeWidth="1.5"/>
            <path d="M48 92 V100" stroke="#94a3b8" strokeWidth="1"/>
            <circle cx="48" cy="100" r="1.5" fill="#67e8f9"/>
          </motion.g>
          {separated && <g>
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
          </g>}
        </svg>
        </button>
        <span className="sr-only" role="status">{separated ? 'Booster detached. Solar-panel wings deployed. The astronaut’s space observatory continues orbiting Earth.' : ''}</span>
      </motion.div>
    </motion.div>
    {journeyOrigin && <CosmicJourney origin={journeyOrigin} onClose={() => setJourneyOrigin(null)} />}
    </>
  );
}
