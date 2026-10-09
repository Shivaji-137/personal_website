import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ScrollToTop from '@/components/ScrollToTop';

type OrbitalParams = {
  inclination: number;
  separation: number;
  eccentricity: number;
  omega: number;
  massRatio: number;
  totalMass: number;
  tempRatio: number;
  r1Scaled: number;
  r2Scaled: number;
  limbDarkening: number;
};

// Solve Kepler's Equation: M = E - e * sin(E) using Newton-Raphson iteration
const solveKepler = (M: number, e: number): number => {
  let E = M;
  for (let i = 0; i < 7; i++) {
    const f = E - e * Math.sin(E) - M;
    const fPrime = 1 - e * Math.cos(E);
    E = E - f / fPrime;
  }
  return E;
};

// Exact geometric area of intersection between two circles of radii R1, R2 separated by d
const circleIntersectionArea = (R1: number, R2: number, d: number): number => {
  if (d >= R1 + R2) return 0;
  if (d <= Math.abs(R1 - R2)) {
    const rMin = Math.min(R1, R2);
    return Math.PI * rMin * rMin;
  }
  const r1Sq = R1 * R1;
  const r2Sq = R2 * R2;
  const dSq = d * d;

  const alpha = Math.acos(Math.max(-1, Math.min(1, (dSq + r1Sq - r2Sq) / (2 * d * R1))));
  const beta = Math.acos(Math.max(-1, Math.min(1, (dSq + r2Sq - r1Sq) / (2 * d * R2))));

  const term =
    (-d + R1 + R2) *
    (d + R1 - R2) *
    (d - R1 + R2) *
    (d + R1 + R2);

  return r1Sq * alpha + r2Sq * beta - 0.5 * Math.sqrt(Math.max(0, term));
};

// Compute instantaneous 3D orbital state, flux occultation, and radial velocities at mean anomaly M
const computeOrbitalState = (M: number, params: OrbitalParams) => {
  const {
    inclination,
    separation,
    eccentricity,
    omega,
    massRatio,
    totalMass,
    tempRatio,
    r1Scaled,
    r2Scaled,
    limbDarkening,
  } = params;

  const incRad = (inclination * Math.PI) / 180;
  const omegaRad = (omega * Math.PI) / 180;

  // 1. Eccentric Anomaly (E) and True Anomaly (nu)
  const E = solveKepler(M, eccentricity);
  const nu =
    2 *
    Math.atan2(
      Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
      Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
    );

  // 2. Separation in orbital plane
  const a = 95 + separation * 1.15;
  const r = (a * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(nu));

  // Distance from barycenter (center of mass)
  const r1 = r * (massRatio / (1 + massRatio));
  const r2 = r * (1 / (1 + massRatio));

  const angle = nu + omegaRad;

  // 3. Sky-plane coordinates (x, y in % of viewport, z along line-of-sight where +z is toward observer)
  const x1 = 50 + Math.cos(angle) * r1 * 0.34;
  const y1 = 50 + Math.sin(angle) * Math.cos(incRad) * r1 * 0.34;
  const z1 = Math.sin(angle) * Math.sin(incRad) * r1;

  const x2 = 50 - Math.cos(angle) * r2 * 0.34;
  const y2 = 50 - Math.sin(angle) * Math.cos(incRad) * r2 * 0.34;
  const z2 = -Math.sin(angle) * Math.sin(incRad) * r2;

  // 4. Projected sky separation & analytic limb-darkened occultation
  const dSky = Math.hypot(x1 - x2, y1 - y2);
  const overlapArea = circleIntersectionArea(r1Scaled, r2Scaled, dSky);

  const area1 = Math.PI * r1Scaled * r1Scaled;
  const area2 = Math.PI * r2Scaled * r2Scaled;

  // Surface brightness ratio J2 / J1 ~ (T2 / T1)^4
  const sb2 = Math.pow(tempRatio, 4);
  const L1 = area1 * 1.0;
  const L2 = area2 * sb2;
  const totalUnocculted = L1 + L2;

  let fluxLoss = 0;
  if (overlapArea > 0) {
    const eclipsedRadius = z1 < z2 ? r1Scaled : r2Scaled;
    const mu = Math.sqrt(
      Math.max(0, 1 - Math.min(1, Math.pow(dSky / (r1Scaled + r2Scaled), 2)))
    );
    const ldWeight =
      (1 - limbDarkening * (1 - mu)) / (1 - limbDarkening / 3);

    if (z1 < z2) {
      // Secondary is in front -> Primary is occulted
      fluxLoss = overlapArea * 1.0 * ldWeight * (eclipsedRadius / r1Scaled);
    } else {
      // Primary is in front -> Secondary is occulted
      fluxLoss = overlapArea * sb2 * ldWeight * (eclipsedRadius / r2Scaled);
    }
  }

  const normalizedFlux = Math.max(0.15, (totalUnocculted - fluxLoss) / totalUnocculted);

  // 5. Radial Velocity (km/s) along line of sight
  const kBase =
    (115 * Math.sqrt(totalMass / 2) * Math.sin(incRad)) /
    Math.sqrt((1 - eccentricity * eccentricity) * (separation / 50));
  const K1 = kBase * (massRatio / (1 + massRatio));
  const K2 = kBase * (1 / (1 + massRatio));

  const rv1 = K1 * (Math.cos(nu + omegaRad) + eccentricity * Math.cos(omegaRad));
  const rv2 = -K2 * (Math.cos(nu + omegaRad) + eccentricity * Math.cos(omegaRad));

  return {
    M,
    nu,
    r,
    a,
    primary: { x: x1, y: y1, z: z1, rv: rv1, radius: r1Scaled },
    secondary: { x: x2, y: y2, z: z2, rv: rv2, radius: r2Scaled },
    flux: normalizedFlux,
    eclipseDepth: 1 - normalizedFlux,
    dSky,
  };
};

const PRESETS: Array<{
  name: string;
  inclination: number;
  separation: number;
  eccentricity: number;
  omega: number;
  massRatio: number;
  tempRatio: number;
}> = [
  {
    name: 'Algol (Semi-Detached)',
    inclination: 82.5,
    separation: 54,
    eccentricity: 0.02,
    omega: 90,
    massRatio: 0.22,
    tempRatio: 0.62,
  },
  {
    name: 'Kepler-16 (Eccentric)',
    inclination: 89.2,
    separation: 76,
    eccentricity: 0.42,
    omega: 245,
    massRatio: 0.31,
    tempRatio: 0.72,
  },
  {
    name: 'W UMa (Overcontact)',
    inclination: 79.0,
    separation: 28,
    eccentricity: 0.0,
    omega: 0,
    massRatio: 0.48,
    tempRatio: 0.94,
  },
  {
    name: 'Grazing Inclination',
    inclination: 69.5,
    separation: 62,
    eccentricity: 0.25,
    omega: 120,
    massRatio: 0.65,
    tempRatio: 0.80,
  },
];

const PhDPhysicsPage = () => {
  const { pathname } = useLocation();
  const isAnimationPage = pathname === '/phd-physics/eclipsing-binary';
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [phase, setPhase] = useState(0); // Mean anomaly [0, 2*PI]
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  // Orbital & Stellar Parameters
  const [inclination, setInclination] = useState(84);
  const [separation, setSeparation] = useState(56);
  const [eccentricity, setEccentricity] = useState(0.25);
  const [omega, setOmega] = useState(115); // Argument of periastron (deg)
  const [massRatio, setMassRatio] = useState(0.45); // q = M2 / M1
  const [totalMass, setTotalMass] = useState(3.2); // Total system mass in solar masses
  const [tempRatio, setTempRatio] = useState(0.76); // T2 / T1
  const [primaryRadius, setPrimaryRadius] = useState(4.8); // Primary radius in solar radii
  const [secondaryRadius, setSecondaryRadius] = useState(3.3); // Secondary radius in solar radii
  const [limbDarkening] = useState(0.6);

  useEffect(() => {
    document.title = 'Physics Lab | Shivaji.dev';
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;
    let frameId = 0;

    const tick = () => {
      setPhase((current) => (current + 0.012 * speed) % (Math.PI * 2));
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, speed]);

  const modelParams = useMemo(
    () => ({
      inclination,
      separation,
      eccentricity,
      omega,
      massRatio,
      totalMass,
      tempRatio,
      r1Scaled: primaryRadius,
      r2Scaled: secondaryRadius,
      limbDarkening,
    }),
    [inclination, separation, eccentricity, omega, massRatio, totalMass, tempRatio, primaryRadius, secondaryRadius, limbDarkening]
  );

  // Instantaneous state at current orbital phase
  const currentState = useMemo(
    () => computeOrbitalState(phase, modelParams),
    [phase, modelParams]
  );

  // Full orbital cycle curves (Light Curve + Radial Velocity + Orbit Paths)
  const fullCycle = useMemo(() => {
    const samples = 120;
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const m = (i / samples) * Math.PI * 2;
      points.push(computeOrbitalState(m, modelParams));
    }
    return points;
  }, [modelParams]);

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setInclination(preset.inclination);
    setSeparation(preset.separation);
    setEccentricity(preset.eccentricity);
    setOmega(preset.omega);
    setMassRatio(preset.massRatio);
    setTempRatio(preset.tempRatio);
  };

  // SVG Polyline strings for Orbital Trajectories, Light Curve, and RV Curve
  const orbitPathPrimary = useMemo(
    () => fullCycle.map((p) => `${p.primary.x},${p.primary.y}`).join(' '),
    [fullCycle]
  );
  const orbitPathSecondary = useMemo(
    () => fullCycle.map((p) => `${p.secondary.x},${p.secondary.y}`).join(' '),
    [fullCycle]
  );

  const lightCurvePolyline = useMemo(
    () =>
      fullCycle
        .map((p, idx) => {
          const x = (idx / (fullCycle.length - 1)) * 100;
          const y = 90 - ((p.flux - 0.35) / 0.68) * 78;
          return `${x.toFixed(2)},${Math.max(6, Math.min(96, y)).toFixed(2)}`;
        })
        .join(' '),
    [fullCycle]
  );

  const rvPrimaryPolyline = useMemo(
    () =>
      fullCycle
        .map((p, idx) => {
          const x = (idx / (fullCycle.length - 1)) * 100;
          const y = 50 - (p.primary.rv / 160) * 40;
          return `${x.toFixed(2)},${Math.max(5, Math.min(95, y)).toFixed(2)}`;
        })
        .join(' '),
    [fullCycle]
  );

  const rvSecondaryPolyline = useMemo(
    () =>
      fullCycle
        .map((p, idx) => {
          const x = (idx / (fullCycle.length - 1)) * 100;
          const y = 50 - (p.secondary.rv / 160) * 40;
          return `${x.toFixed(2)},${Math.max(5, Math.min(95, y)).toFixed(2)}`;
        })
        .join(' '),
    [fullCycle]
  );

  const normalizedPhase = phase / (Math.PI * 2);
  const primaryInFront = currentState.primary.z >= currentState.secondary.z;

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <StarBackground />
      {!isAnimationPage && <Header />}

      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          {!isAnimationPage && <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-[#FF65A3] uppercase tracking-[0.28em] text-xs font-medium mb-3">
              {isAnimationPage ? 'Physics Lab • Observational Astrophysics' : 'Physics Lab'}
            </p>
            <h1 className="font-space font-bold text-4xl md:text-5xl text-white mb-4">
              {isAnimationPage ? 'Keplerian Binary Star & Eclipse Model' : 'Physics Topics & Simulations'}
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">
              {isAnimationPage ? (
                <>An analytical two-body Keplerian simulation solving <span className="text-[#FFD15C] font-mono">M = E - e sin(E)</span> with limb-darkened disk occultations, barycentric dynamics, and simultaneous photometric &amp; radial-velocity synthesis.</>
              ) : (
                'Explore foundational physics topics and open focused visual simulations when you are ready to investigate a model.'
              )}
            </p>
          </motion.div>}

          {!isAnimationPage && <nav className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Physics subsections">
            {[
              ['Classical Mechanics', '#classical-mechanics'],
              ['Electricity & Magnetism', '#electricity-magnetism'],
              ['Astrophysics', '#astrophysics'],
            ].map(([label, href]) => (
              <button
                type="button"
                key={href}
                onClick={() => setSelectedSection(href.slice(1))}
                aria-pressed={selectedSection === href.slice(1)}
                className="rounded-full border border-[#3a2d48] bg-[#120d1d]/80 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gray-300 transition hover:border-[#FF65A3] hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>}

          {!isAnimationPage && (selectedSection === null || selectedSection === 'classical-mechanics') && <section id="classical-mechanics" className="mb-10 scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#3a2d48]" />
              <h2 className="font-space text-xl font-semibold text-white">Classical Mechanics</h2>
              <span className="h-px flex-1 bg-[#3a2d48]" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Dynamics', 'Forces, momentum, and the equations that govern motion.', 'ri-focus-3-line'],
                ['Conservation Laws', 'Energy, angular momentum, and symmetry in physical systems.', 'ri-refresh-line'],
                ['Oscillations', 'Periodic motion, coupled systems, and resonant behavior.', 'ri-pulse-line'],
              ].map(([title, description, icon]) => (
                <article key={title} className="rounded-2xl border border-[#2b2b3a] bg-[#0d1118]/80 p-5">
                  <i className={`${icon} mb-3 block text-2xl text-[#FFD15C]`} />
                  <h3 className="mb-2 font-space text-lg text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </article>
              ))}
            </div>
          </section>}

          {!isAnimationPage && (selectedSection === null || selectedSection === 'electricity-magnetism') && <section id="electricity-magnetism" className="mb-12 scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#3a2d48]" />
              <h2 className="font-space text-xl font-semibold text-white">Electricity &amp; Magnetism</h2>
              <span className="h-px flex-1 bg-[#3a2d48]" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Fields & Potentials', 'Visualizing electric fields, potentials, and charge distributions.', 'ri-bubble-chart-line'],
                ['Maxwell Systems', 'A unified view of electric and magnetic fields in space and time.', 'ri-signal-tower-line'],
                ['Waves & Circuits', 'Propagation, resonance, and the flow of energy through systems.', 'ri-radar-line'],
              ].map(([title, description, icon]) => (
                <article key={title} className="rounded-2xl border border-[#2b2b3a] bg-[#0d1118]/80 p-5">
                  <i className={`${icon} mb-3 block text-2xl text-[#8be9fd]`} />
                  <h3 className="mb-2 font-space text-lg text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </article>
              ))}
            </div>
          </section>}

          {(isAnimationPage || selectedSection === null || selectedSection === 'astrophysics') && <section id="astrophysics" className="scroll-mt-24">
            {!isAnimationPage && <div className="mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#3a2d48]" />
              <h2 className="font-space text-xl font-semibold text-white">Astrophysics</h2>
              <span className="h-px flex-1 bg-[#3a2d48]" />
            </div>}

            {!isAnimationPage && (
              <div className="grid gap-4 md:grid-cols-3">
                <a
                  href="/#/phd-physics/eclipsing-binary"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-[#5D3E7C] bg-[#120d1d]/80 p-5 transition hover:border-[#FFD15C] hover:bg-[#1a1225]"
                >
                  <span className="mb-3 flex items-center justify-between">
                    <i className="ri-sun-line text-2xl text-[#FFD15C]" />
                    <i className="ri-external-link-line text-gray-500 transition group-hover:text-[#FFD15C]" />
                  </span>
                  <h3 className="mb-2 font-space text-lg text-white">Eclipsing Binary Star</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Open the Keplerian orbit, light curve, radial velocity, and stellar parameter model.
                  </p>
                </a>
                <article className="rounded-2xl border border-[#2b2b3a] bg-[#0d1118]/80 p-5">
                  <i className="ri-telescope-line mb-3 block text-2xl text-[#FF65A3]" />
                  <h3 className="mb-2 font-space text-lg text-white">Stellar Astrophysics</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Topics in stellar structure, evolution, and observational inference.
                  </p>
                </article>
                <article className="rounded-2xl border border-[#2b2b3a] bg-[#0d1118]/80 p-5">
                  <i className="ri-earth-line mb-3 block text-2xl text-[#8be9fd]" />
                  <h3 className="mb-2 font-space text-lg text-white">Cosmology</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Large-scale structure, expansion, and the physics of the universe.
                  </p>
                </article>
              </div>
            )}

            {isAnimationPage && <>
            {/* Astrophysical Presets Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-8 flex flex-wrap items-center justify-center gap-2.5"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 mr-2">
                System Presets:
              </span>
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="rounded-full border border-[#3a2d48] bg-[#120d1d]/90 px-4 py-1.5 text-xs font-medium text-gray-200 transition-all hover:border-[#FF65A3] hover:bg-[#5D3E7C]/30 hover:text-white"
                >
                  {preset.name}
                </button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-8 items-stretch">
            {/* Left Column: Sky-Plane Viewport + Real-Time Photometry & Spectroscopy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6 rounded-[28px] border border-[#2b2b3a] bg-[radial-gradient(circle_at_center,_rgba(93,62,124,0.35),_rgba(9,10,17,0.96)_60%)] p-4 md:p-6 shadow-[0_25px_80px_rgba(18,10,26,0.7)]"
            >
              {/* Sky-Plane Orbital Viewport */}
              <div id="astrophysics-orbital-view" className="relative h-[390px] w-full scroll-mt-24 overflow-hidden rounded-[22px] border border-[#3a2d48] bg-[#060b14]">
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#101827] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05),_transparent_58%)]" />

                {/* Projected Orbital Paths & Line of Nodes */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full pointer-events-none"
                >
                  {/* Reference Crosshair through Barycenter */}
                  <line
                    x1="10"
                    y1="50"
                    x2="90"
                    y2="50"
                    stroke="rgba(93, 62, 124, 0.25)"
                    strokeWidth="0.25"
                    strokeDasharray="1.2 1.2"
                  />
                  <line
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="90"
                    stroke="rgba(93, 62, 124, 0.25)"
                    strokeWidth="0.25"
                    strokeDasharray="1.2 1.2"
                  />

                  {/* Primary & Secondary Projected Keplerian Orbits */}
                  <polygon
                    points={orbitPathPrimary}
                    fill="none"
                    stroke="rgba(255, 209, 92, 0.32)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 0.8"
                  />
                  <polygon
                    points={orbitPathSecondary}
                    fill="none"
                    stroke="rgba(255, 101, 163, 0.35)"
                    strokeWidth="0.35"
                  />

                  {/* Line Connecting Stars through Barycenter */}
                  <line
                    x1={currentState.primary.x}
                    y1={currentState.primary.y}
                    x2={currentState.secondary.x}
                    y2={currentState.secondary.y}
                    stroke="rgba(255, 255, 255, 0.16)"
                    strokeWidth="0.25"
                  />
                </svg>

                {/* Barycenter (+) Marker */}
                <div
                  className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  title="System Barycenter (Center of Mass)"
                >
                  <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-[#FFD15C]/60" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-[#FFD15C]/60" />
                </div>

                {/* Primary Star (M1) - Z-ordered dynamically */}
                <div
                  className="absolute rounded-full transition-shadow duration-75"
                  style={{
                    width: `${Math.max(28, primaryRadius * 11.25)}px`,
                    height: `${Math.max(28, primaryRadius * 11.25)}px`,
                    left: `${currentState.primary.x}%`,
                    top: `${currentState.primary.y}%`,
                    zIndex: primaryInFront ? 20 : 10,
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.98), #FFD15C 38%, #d97706 82%, #78350f 100%)',
                    boxShadow: '0 0 32px rgba(255, 209, 92, 0.8)',
                  }}
                />

                {/* Secondary Star (M2) - Z-ordered dynamically */}
                <div
                  className="absolute rounded-full transition-shadow duration-75"
                  style={{
                    width: `${Math.max(20, secondaryRadius * 11.2)}px`,
                    height: `${Math.max(20, secondaryRadius * 11.2)}px`,
                    left: `${currentState.secondary.x}%`,
                    top: `${currentState.secondary.y}%`,
                    zIndex: primaryInFront ? 10 : 20,
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92), #FF65A3 38%, #be185d 85%, #500724 100%)',
                    boxShadow: '0 0 28px rgba(255, 101, 163, 0.8)',
                  }}
                />

                {/* Occultation Corona Ring when Eclipsing */}
                {currentState.eclipseDepth > 0.01 && (
                  <div
                    className="absolute rounded-full pointer-events-none border border-[#FFD15C]/50"
                    style={{
                      width: '46px',
                      height: '46px',
                      left: `${(currentState.primary.x + currentState.secondary.x) / 2}%`,
                      top: `${(currentState.primary.y + currentState.secondary.y) / 2}%`,
                      zIndex: 25,
                      transform: 'translate(-50%, -50%)',
                      opacity: Math.min(1, currentState.eclipseDepth * 2.4),
                      boxShadow: '0 0 30px rgba(255, 101, 163, 0.65), inset 0 0 14px rgba(0,0,0,0.9)',
                    }}
                  />
                )}

                {/* Top Telemetry Badges */}
                <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-30">
                  <div className="rounded-full border border-[#3a2d48] bg-black/55 backdrop-blur-md px-3.5 py-1 text-[11px] font-mono text-gray-200">
                    Phase ϕ: <span className="text-[#FFD15C]">{normalizedPhase.toFixed(3)}</span> • ν:{' '}
                    <span className="text-[#FF65A3]">
                      {(((currentState.nu * 180) / Math.PI + 360) % 360).toFixed(0)}°
                    </span>
                  </div>

                  <div className="rounded-full border border-[#3a2d48] bg-black/55 backdrop-blur-md px-3.5 py-1 text-[11px] font-mono text-gray-200">
                    {currentState.eclipseDepth > 0.015 ? (
                      <span className="text-[#FF65A3] font-semibold">
                        {primaryInFront ? 'SECONDARY OCCULTATION' : 'PRIMARY TRANSIT'}
                      </span>
                    ) : (
                      <span className="text-emerald-400">UNOCCULTED QUADRATURE</span>
                    )}
                  </div>
                </div>

                {/* Bottom Telemetry Readouts */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-30">
                  <div className="rounded-full border border-[#5D3E7C] bg-black/60 backdrop-blur-md px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-gray-200">
                    Flux F/F₀: <span className="text-[#FFD15C] font-bold">{(currentState.flux * 100).toFixed(1)}%</span>{' '}
                    | Δm:{' '}
                    <span className="text-[#FF65A3] font-bold">
                      {(-2.5 * Math.log10(currentState.flux)).toFixed(3)} mag
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className="rounded-full border border-[#5D3E7C] bg-[#120d1d]/90 px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white hover:border-[#FF65A3] transition"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.4 : 1))}
                      className="rounded-full border border-[#3a2d48] bg-black/60 px-3 py-1 text-[10px] font-mono text-[#FFD15C] hover:border-[#FFD15C] transition"
                    >
                      {speed}x
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-Time Diagnostic Plots: Light Curve & Radial Velocity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Normalized Light Curve Plot */}
                <div id="eclipsing-binary-light-curve" className="scroll-mt-24 rounded-[20px] border border-[#3a2d48] bg-[#060b14] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-semibold">
                      Photometric Light Curve
                    </span>
                    <span className="text-xs font-mono text-[#FFD15C]">
                      F/F₀ = {currentState.flux.toFixed(3)}
                    </span>
                  </div>
                  <div className="relative h-32 w-full">
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="h-full w-full overflow-visible"
                    >
                      {/* Baseline Flux = 1.0 */}
                      <line
                        x1="0"
                        y1="12"
                        x2="100"
                        y2="12"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="0.6"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="0"
                        y1="50"
                        x2="100"
                        y2="50"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.5"
                      />

                      {/* Light Curve Polyline */}
                      <polyline
                        fill="none"
                        stroke="#FFD15C"
                        strokeWidth="1.6"
                        points={lightCurvePolyline}
                      />

                      {/* Current Phase Cursor */}
                      <line
                        x1={normalizedPhase * 100}
                        y1="0"
                        x2={normalizedPhase * 100}
                        y2="100"
                        stroke="#FF65A3"
                        strokeWidth="0.9"
                        strokeDasharray="2 1.5"
                      />
                      <circle
                        cx={normalizedPhase * 100}
                        cy={Math.max(
                          6,
                          Math.min(96, 90 - ((currentState.flux - 0.35) / 0.68) * 78)
                        )}
                        r="2.4"
                        fill="#FF65A3"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-[10px] font-mono text-gray-400">
                      <span>ϕ = 0.0</span>
                      <span>0.5</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>

                {/* Radial Velocity Spectroscopic Graph */}
                <div id="astrophysics-radial-velocity" className="scroll-mt-24 rounded-[20px] border border-[#3a2d48] bg-[#060b14] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-semibold">
                      Radial Velocity (km/s)
                    </span>
                    <span className="text-[11px] font-mono">
                      <span className="text-[#FFD15C]">
                        V₁:{currentState.primary.rv.toFixed(0)}
                      </span>{' '}
                      /{' '}
                      <span className="text-[#FF65A3]">
                        V₂:{currentState.secondary.rv.toFixed(0)}
                      </span>
                    </span>
                  </div>
                  <div className="relative h-32 w-full">
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="h-full w-full overflow-visible"
                    >
                      {/* Systemic Velocity Centerline (0 km/s) */}
                      <line
                        x1="0"
                        y1="50"
                        x2="100"
                        y2="50"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="0.6"
                        strokeDasharray="2 2"
                      />

                      {/* Primary & Secondary RV Curves */}
                      <polyline
                        fill="none"
                        stroke="#FFD15C"
                        strokeWidth="1.5"
                        points={rvPrimaryPolyline}
                      />
                      <polyline
                        fill="none"
                        stroke="#FF65A3"
                        strokeWidth="1.5"
                        points={rvSecondaryPolyline}
                      />

                      {/* Current Phase Cursor */}
                      <line
                        x1={normalizedPhase * 100}
                        y1="0"
                        x2={normalizedPhase * 100}
                        y2="100"
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth="0.8"
                        strokeDasharray="2 1.5"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-[10px] font-mono text-gray-400">
                      <span>ϕ = 0.0</span>
                      <span>v_sys = 0</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Parameter Controls & Astrophysical Interpretation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[28px] border border-[#2b2b3a] bg-[#0d1118] p-5 md:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-space text-2xl text-white">Orbital Elements</h2>
                  <span className="rounded-full border border-[#5D3E7C] bg-[#120d1d] px-2.5 py-0.5 text-[11px] font-mono text-[#FFD15C]">
                    Kepler Solver
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Inclination (i) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Orbital Inclination (i)</span>
                      <span className="font-mono text-[#FFD15C]">{inclination.toFixed(1)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="0.5"
                      value={inclination}
                      onChange={(e) => setInclination(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Semi-Major Axis Separation (a) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Semi-Major Axis (a)</span>
                      <span className="font-mono text-[#FFD15C]">{separation} R☉</span>
                    </div>
                    <input
                      type="range"
                      min="22"
                      max="100"
                      value={separation}
                      onChange={(e) => setSeparation(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Eccentricity (e) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Eccentricity (e)</span>
                      <span className="font-mono text-[#FFD15C]">{eccentricity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.7"
                      step="0.01"
                      value={eccentricity}
                      onChange={(e) => setEccentricity(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Argument of Periastron (omega) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Arg. of Periastron (ω)</span>
                      <span className="font-mono text-[#FFD15C]">{omega}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={omega}
                      onChange={(e) => setOmega(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Mass Ratio (q = M2/M1) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Mass Ratio (q = M₂/M₁)</span>
                      <span className="font-mono text-[#FFD15C]">{massRatio.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.01"
                      value={massRatio}
                      onChange={(e) => setMassRatio(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Total System Mass */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Total System Mass (M☉)</span>
                      <span className="font-mono text-[#FFD15C]">{totalMass.toFixed(1)} M☉</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="12"
                      step="0.1"
                      value={totalMass}
                      onChange={(e) => setTotalMass(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Effective Temperature Ratio (T2/T1) */}
                  <label className="block">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Temp. Ratio (T₂/T₁)</span>
                      <span className="font-mono text-[#FFD15C]">{tempRatio.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.4"
                      max="1.0"
                      step="0.01"
                      value={tempRatio}
                      onChange={(e) => setTempRatio(Number(e.target.value))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Stellar Radii */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                        <span>Primary Radius</span>
                        <span className="font-mono text-[#FFD15C]">{primaryRadius.toFixed(1)} R☉</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        step="0.1"
                        value={primaryRadius}
                        onChange={(e) => setPrimaryRadius(Number(e.target.value))}
                        className="w-full accent-[#FFD15C]"
                      />
                    </label>

                    <label className="block">
                      <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                        <span>Secondary Radius</span>
                        <span className="font-mono text-[#FF65A3]">{secondaryRadius.toFixed(1)} R☉</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        step="0.1"
                        value={secondaryRadius}
                        onChange={(e) => setSecondaryRadius(Number(e.target.value))}
                        className="w-full accent-[#FF65A3]"
                      />
                    </label>
                  </div>

                  {/* Manual Orbital Phase Scrubber */}
                  <label className="block pt-2 border-t border-[#2b2b3a]">
                    <div className="mb-1.5 flex items-center justify-between text-sm text-gray-300">
                      <span>Manual Phase Scrub (ϕ)</span>
                      <span className="font-mono text-[#FF65A3]">{normalizedPhase.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={Math.PI * 2}
                      step="0.01"
                      value={phase}
                      onChange={(e) => {
                        setIsPlaying(false);
                        setPhase(Number(e.target.value));
                      }}
                      className="w-full accent-[#FFD15C]"
                    />
                  </label>
                </div>
              </div>

              {/* Astrophysical Interpretation Card */}
              <div className="mt-6 rounded-2xl border border-[#5D3E7C] bg-[#120d1d] p-4 text-sm text-gray-300">
                <p className="font-space text-lg text-white mb-1.5">
                  Physical Diagnostics
                </p>
                <p className="leading-relaxed text-xs text-gray-300">
                  Non-zero eccentricity (<span className="text-[#FFD15C]">e &gt; 0</span>) shifts the secondary eclipse away from phase <span className="text-[#FFD15C]">ϕ = 0.5</span> according to <span className="text-[#FF65A3]">e cos(ω)</span> and induces Asymmetric Radial Velocity (Rossiter-McLaughlin/Keplerian skew). Relative eclipse depths scale with effective surface brightness <span className="text-[#FFD15C]">(T₂/T₁)⁴</span>.
                </p>
              </div>
            </motion.div>
          </div>
            </>}
          </section>}
        </div>
      </main>

      {!isAnimationPage && <Footer />}
      {!isAnimationPage && <ScrollToTop />}
    </div>
  );
};

export default PhDPhysicsPage;