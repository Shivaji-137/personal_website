import PhysicsReferences from '@/components/PhysicsReferences';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';

import { computeOrbitalState } from '@/lib/physics/binary';

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
    name: 'Unequal-mass detached',
    inclination: 82.5,
    separation: 54,
    eccentricity: 0.02,
    omega: 90,
    massRatio: 0.22,
    tempRatio: 0.62,
  },
  {
    name: 'Eccentric detached',
    inclination: 89.2,
    separation: 76,
    eccentricity: 0.42,
    omega: 245,
    massRatio: 0.31,
    tempRatio: 0.72,
  },
  {
    name: 'Circular detached',
    inclination: 79.0,
    separation: 28,
    eccentricity: 0.0,
    omega: 0,
    massRatio: 0.48,
    tempRatio: 0.94,
  },
  {
    name: 'Lower inclination',
    inclination: 69.5,
    separation: 62,
    eccentricity: 0.25,
    omega: 120,
    massRatio: 0.65,
    tempRatio: 0.80,
  },
];

const EclipsingBinaryPage = () => {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [inclination, setInclination] = useState(84);
  const [separation, setSeparation] = useState(56);
  const [eccentricity, setEccentricity] = useState(0.25);
  const [omega, setOmega] = useState(115);
  const [massRatio, setMassRatio] = useState(0.45);
  const [totalMass, setTotalMass] = useState(3.2);
  const [tempRatio, setTempRatio] = useState(0.76);
  const [primaryRadius, setPrimaryRadius] = useState(4.8);
  const [secondaryRadius, setSecondaryRadius] = useState(3.3);
  const [limbDarkening, setLimbDarkening] = useState(0.6);

  const maxEccentricity = Math.max(0, Math.min(0.7, 1 - (primaryRadius + secondaryRadius) / separation - 0.01));
  useEffect(() => { setEccentricity(e => Math.min(e, maxEccentricity)); }, [maxEccentricity]);
  useEffect(() => { document.title = 'Physics Lab | Shivaji.dev'; }, []);
  useEffect(() => {
    if (!isPlaying) return undefined;
    let frameId = 0;
    let last: number | undefined;
    const tick = (now: number) => { if (last !== undefined) { const dt = Math.min((now - last) / 1000, 0.1); setPhase(current => (current + dt * 0.72 * speed) % (Math.PI * 2)); } last = now; frameId = window.requestAnimationFrame(tick); };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, speed]);

  const modelParams = useMemo(() => ({ inclination, separation, eccentricity: Math.min(eccentricity, maxEccentricity), omega, massRatio, totalMass, tempRatio, r1Scaled: primaryRadius, r2Scaled: secondaryRadius, limbDarkening }), [inclination, separation, eccentricity, omega, massRatio, totalMass, tempRatio, primaryRadius, secondaryRadius, limbDarkening, maxEccentricity]);
  const currentState = useMemo(() => computeOrbitalState(phase, modelParams), [phase, modelParams]);
  const fullCycle = useMemo(() => Array.from({ length: 721 }, (_, i) => computeOrbitalState((i / 720) * Math.PI * 2, modelParams)), [modelParams]);
  const normalizedPhase = phase / (Math.PI * 2);
  const primaryInFront = currentState.primary.z >= currentState.secondary.z;
  const orbitPathPrimary = fullCycle.map((p) => `${p.primary.x},${p.primary.y}`).join(' ');
  const orbitPathSecondary = fullCycle.map((p) => `${p.secondary.x},${p.secondary.y}`).join(' ');
  const fluxY = (flux: number) => 12 + (1 - flux) * 78;
  const rvLimit = Math.max(1, ...fullCycle.flatMap(p => [Math.abs(p.primary.rv), Math.abs(p.secondary.rv)])) * 1.1;
  const lightCurvePolyline = fullCycle.map((p, idx) => `${(idx / (fullCycle.length - 1) * 100).toFixed(2)},${fluxY(p.flux).toFixed(2)}`).join(' ');
  const rvPrimaryPolyline = fullCycle.map((p, idx) => `${(idx / (fullCycle.length - 1) * 100).toFixed(2)},${(50 - p.primary.rv / rvLimit * 40).toFixed(2)}`).join(' ');
  const rvSecondaryPolyline = fullCycle.map((p, idx) => `${(idx / (fullCycle.length - 1) * 100).toFixed(2)},${(50 - p.secondary.rv / rvLimit * 40).toFixed(2)}`).join(' ');
  const applyPreset = (preset: (typeof PRESETS)[number]) => { setPhase(0); setIsPlaying(false); setPrimaryRadius(4.8); setSecondaryRadius(3.3); setTotalMass(3.2); setLimbDarkening(0.6); setInclination(preset.inclination); setSeparation(preset.separation); setEccentricity(preset.eccentricity); setOmega(preset.omega); setMassRatio(preset.massRatio); setTempRatio(preset.tempRatio); };

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden"><StarBackground /><Header /><main className="pt-20 pb-16 relative z-10"><div className="container mx-auto px-4 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5"><p className="text-[#FF65A3] uppercase tracking-[0.28em] text-xs font-medium mb-3">Physics Lab • Observational Astrophysics</p><h1 className="font-space font-bold text-3xl md:text-4xl text-white mb-4">Keplerian Binary Star &amp; Eclipse Model</h1><p className="max-w-3xl mx-auto text-sm text-gray-300">A two-body Keplerian simulation solving <span className="text-[#FFD15C] font-mono">M = E - e sin(E)</span> with numerically integrated limb-darkened eclipses, barycentric dynamics, and simultaneous photometric &amp; radial-velocity synthesis.</p></motion.div>
            {/* Astrophysical Presets Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-4 flex flex-wrap items-center justify-center gap-2.5"
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

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
            {/* Left Column: Sky-Plane Viewport + Real-Time Photometry & Spectroscopy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="min-w-0 rounded-[24px] border border-[#2b2b3a] bg-[radial-gradient(circle_at_center,_rgba(93,62,124,0.35),_rgba(9,10,17,0.96)_60%)] p-4 md:p-5 shadow-[0_25px_80px_rgba(18,10,26,0.7)]"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#3a2d48] pb-3">
                <div><h2 className="font-space text-lg font-semibold">Synchronized orbital observatory</h2><p className="mt-1 font-mono text-xs text-gray-400">ϕ {normalizedPhase.toFixed(3)} • P {currentState.periodDays.toFixed(3)} d • t {(normalizedPhase*currentState.periodDays).toFixed(3)} d</p></div>
                <div className="flex gap-2"><button className="rounded-full border border-[#5D3E7C] px-4 py-2 text-xs" onClick={()=>setIsPlaying(v=>!v)}>{isPlaying?'Pause':'Play'}</button><button className="rounded-full border border-[#5D3E7C] px-4 py-2 text-xs" onClick={()=>setSpeed(v=>v===1?2:v===2?0.4:1)}>{speed}x</button></div>
              </div>
              <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Sky-Plane Orbital Viewport */}
              <div id="astrophysics-orbital-view" className="min-w-0 scroll-mt-24">
                <div className="flex flex-wrap justify-between gap-2 text-xs text-gray-300"><h3 className="font-semibold">Sky-plane orbit</h3><span className="text-cyan-300">{currentState.dSky < primaryRadius + secondaryRadius ? (primaryInFront ? 'Star 2 eclipsed' : 'Star 1 eclipsed') : 'No eclipse'}</span></div>
                <svg viewBox="0 0 100 100" className="mx-auto w-full max-w-[340px]" role="img" aria-label="Sky-plane binary orbit with physically consistent stellar radii">
                  <defs>
                    {['primary','secondary'].map(name => <radialGradient key={name} id={`binary-${name}`}><stop stopColor={name==='primary'?'#fff6c5':'#ffd4e5'}/><stop offset="1" stopColor={name==='primary'?'#d97706':'#be185d'} stopOpacity={1-limbDarkening}/></radialGradient>)}
                  </defs>
                  <line x1="5" y1="50" x2="95" y2="50" stroke="#334155" strokeWidth="0.2" strokeDasharray="1 1"/>
                  <polyline points={orbitPathPrimary} fill="none" stroke="#FFD15C" strokeWidth="0.25" strokeDasharray="1 1"/>
                  <polyline points={orbitPathSecondary} fill="none" stroke="#FF65A3" strokeWidth="0.25"/>
                  <path d="M48 50h4 M50 48v4" stroke="white" strokeWidth="0.25"/>
                  <line x1={currentState.primary.x} y1={currentState.primary.y} x2={currentState.secondary.x} y2={currentState.secondary.y} stroke="#64748b" strokeWidth="0.2"/>
                  {(primaryInFront ? [currentState.secondary,currentState.primary] : [currentState.primary,currentState.secondary]).map(star => <g key={star===currentState.primary?'primary':'secondary'}>
                    <circle cx={star.x} cy={star.y} r={star.radius} fill={star===currentState.primary?'#d97706':'#be185d'}/>
                    <circle cx={star.x} cy={star.y} r={star.radius} fill={`url(#binary-${star===currentState.primary?'primary':'secondary'})`}/>
                  </g>)}
                </svg>
                <p className="text-center font-mono text-xs text-[#FFD15C]">F/F₀ {currentState.flux.toFixed(4)} • Δm {(-2.5*Math.log10(currentState.flux)).toFixed(3)}</p>
              </div>

              {/* Real-Time Diagnostic Plots: Light Curve & Radial Velocity */}
              <div className="grid min-w-0 grid-cols-1 gap-4">
                {/* Normalized Light Curve Plot */}
                <div id="eclipsing-binary-light-curve" className="min-w-0 scroll-mt-24 rounded-xl bg-[#060b14]/70 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-gray-300 font-semibold">
                      Photometric Light Curve
                    </span>
                    <span className="text-xs font-mono text-[#FFD15C]">
                      F/F₀ = {currentState.flux.toFixed(3)}
                    </span>
                  </div>
                  <div className="relative h-28 w-full mb-4">
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
                        cy={fluxY(currentState.flux)}
                        r="2.4"
                        fill="#FF65A3"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-[10px] font-mono text-gray-400">
                      <span>ϕ = 0.0</span>
                      <span>F: 1 at top / 0 at bottom</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>

                {/* Radial Velocity Spectroscopic Graph */}
                <div id="astrophysics-radial-velocity" className="min-w-0 scroll-mt-24 rounded-xl bg-[#060b14]/70 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-gray-300 font-semibold">
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
                  <div className="relative h-28 w-full mb-4">
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

                      <circle cx={normalizedPhase*100} cy={50-currentState.primary.rv/rvLimit*40} r="2.2" fill="#FFD15C"/>
                      <circle cx={normalizedPhase*100} cy={50-currentState.secondary.rv/rvLimit*40} r="2.2" fill="#FF65A3"/>
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
                      <span>±{rvLimit.toFixed(0)} km/s • receding +</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <label className="mt-4 block border-t border-[#3a2d48] pt-3 text-xs text-gray-300">
                <span className="flex justify-between"><span>Scrub shared orbital phase</span><span className="font-mono text-[#FFD15C]">{normalizedPhase.toFixed(3)}</span></span>
                <input aria-label="Shared orbital phase" type="range" min="0" max={Math.PI*2} step="0.001" value={phase} onChange={e=>{setIsPlaying(false);setPhase(+e.target.value);}} className="mt-2 w-full accent-[#FFD15C]"/>
              </label>
              <p className="mt-2 text-[11px] leading-relaxed text-gray-400">All views share the same instant. Phase zero is periastron. Equal spatial scale for stars and orbits; playback is accelerated (8.73 s/orbit at 1x).</p>
            </motion.div>

            {/* Right Column: Parameter Controls & Astrophysical Interpretation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[24px] border border-[#2b2b3a] bg-[#0d1118] p-4 flex flex-col"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-space text-lg text-white">Orbital Elements</h2>
                  <span className="rounded-full border border-[#5D3E7C] bg-[#120d1d] px-2.5 py-0.5 text-[11px] font-mono text-[#FFD15C]">
                    Kepler Solver
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {/* Inclination (i) */}
                  <label className="block">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
                      <span>Eccentricity (e)</span>
                      <span className="font-mono text-[#FFD15C]">{eccentricity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxEccentricity}
                      step="0.01"
                      value={eccentricity}
                      onChange={(e) => setEccentricity(Math.min(maxEccentricity, Number(e.target.value)))}
                      className="w-full accent-[#FF65A3]"
                    />
                  </label>

                  {/* Argument of Periastron (omega) */}
                  <label className="block">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    <label className="block">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-xs text-gray-300">
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

                  <label className="col-span-2 block text-xs text-gray-300">Linear limb darkening u = {limbDarkening.toFixed(2)}
                    <input aria-label="Linear limb darkening" type="range" min="0" max="1" step="0.01" value={limbDarkening} onChange={e=>setLimbDarkening(+e.target.value)} className="w-full accent-[#FFD15C]" />
                  </label>
                  <p className="col-span-2 text-[11px] text-gray-400">Eccentricity is limited to keep the spherical stars separated at periastron: a(1 − e) &gt; R₁ + R₂. Tidal distortion may matter before contact.</p>

                </div>
              </div>

              {/* Astrophysical Interpretation Card */}
              <div className="mt-3 rounded-xl border border-[#5D3E7C] bg-[#120d1d] p-3 text-sm text-gray-300">
                <p className="font-space text-sm text-white mb-1.5">
                  Physical Diagnostics
                </p>
                <p className="mb-3 font-mono text-xs text-[#FFD15C]">M₁ = {(totalMass/(1+massRatio)).toFixed(3)} M☉ • M₂ = {(totalMass*massRatio/(1+massRatio)).toFixed(3)} M☉<br/>K₁ = {currentState.K1.toFixed(2)} km/s • K₂ = {currentState.K2.toFixed(2)} km/s</p>
                <p className="leading-relaxed text-[11px] text-gray-400">Spherical detached stars; bolometric brightness approximation. See equations below for assumptions and conventions.
                </p>
              </div>
            </motion.div>
          </div>
      <section className="mt-6 rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Model foundations</p><h2 className="mt-2 text-2xl font-semibold">Binary-star equations</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{[
          ['M = 2πt/P = E − e sin E; r = a(1 − e cos E)', 'Uniform mean anomaly gives uniform elapsed time; eccentric anomaly determines separation. Phase ϕ = M/2π starts at periastron.'],
          ['P² = 4π²a³ / G(M₁ + M₂)', 'The relative semimajor axis is in solar radii, masses in solar units, and the displayed period is in days. Computation uses nominal solar radius and GM.'],
          ['q = M₂/M₁; a₁ = aq/(1+q); a₂ = a/(1+q)', 'The two stars orbit the common barycenter with opposite positions and mass-weighted velocities.'],
          ['Kⱼ = 2πaⱼ sin i / [P√(1−e²)]', 'RV₁ = −K₁[cos(ν+ω)+e cos ω]; RV₂ = +K₂[cos(ν+ω)+e cos ω]. Here ω describes star 1’s periastron, +z points toward the observer, and positive RV means receding; systemic velocity is zero.'],
          ['I(μ) = I(1)[1−u(1−μ)]; μ = √(1−ρ²/R²)', 'Both stars use the same linear limb-darkening coefficient u. The quadrature integrates blocked intensity over annuli, with an exact uniform-disk limit.'],
          ['F/F₀ = 1 − F_blocked/(L₁+L₂); Lⱼ = πRⱼ²Iⱼ(1)(1−u/3)', 'Flux is normalized to the uneclipsed system; J₂/J₁ = (T₂/T₁)⁴ approximates bolometric surface brightness. Δm = −2.5 log₁₀(F/F₀).']
        ].map(([equation,note])=><div key={equation} className="rounded-xl border border-slate-700 bg-black/20 p-4"><p className="break-words font-mono text-sm leading-7 text-amber-200">{equation}</p><p className="mt-2 text-sm leading-relaxed text-slate-300">{note}</p></div>)}</div>
      </section>
      <PhysicsReferences project="binary" />
      </div></main></div>
  );
};

export default EclipsingBinaryPage;
