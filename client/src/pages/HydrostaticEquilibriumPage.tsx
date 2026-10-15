import MathFormula from '@/components/MathFormula';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import PhysicsReferences from '@/components/PhysicsReferences';
import { stellarModel } from '@/lib/physics/hydrostatic';

const panel = 'rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-4';
const scientific = (value: number) => value === 0 ? '0' : value.toExponential(2);
function BalancePlot({ title, unit, leftLabel, rightLabel, values, negative = false }: {
  title: string; unit: string; leftLabel: string; rightLabel: string;
  values: { u: number; numerical: number; expected: number }[]; negative?: boolean;
}) {
  const maximum = Math.max(...values.flatMap(p => [Math.abs(p.numerical), Math.abs(p.expected)]));
  const y = (value: number) => 45 + (negative ? -value / maximum : 1 - value / maximum) * 160;
  const curve = (key: 'numerical' | 'expected') => values.map(p => `${80 + p.u * 320},${y(p[key])}`).join(' ');
  const error = Math.max(...values.map(p => Math.abs(p.numerical - p.expected))) / maximum;
  return <section className={panel}><h2 className="text-sm font-semibold">{title}</h2><p className="mt-1 text-[10px] text-slate-400">Independent finite differences vs. the differential equation</p>
    <svg viewBox="0 0 430 255" role="img" aria-label={`${title}: numerical and expected gradients in ${unit}`} className="mt-2 w-full">
      <rect x="80" y="45" width="320" height="160" fill="#060c16"/>
      {[0, .25, .5, .75, 1].map(f => { const value = (negative ? -1 : 1) * maximum * f; return <g key={f}><line x1="80" x2="400" y1={y(value)} y2={y(value)} stroke="#243244"/><text x="72" y={y(value) + 3} textAnchor="end" fill="#94a3b8" fontSize="9">{value.toExponential(1)}</text><text x={80 + 320 * f} y="223" textAnchor="middle" fill="#94a3b8" fontSize="10">{f}</text></g>; })}
      <polyline points={curve('expected')} fill="none" stroke="#fb923c" strokeWidth="3"/>
      <polyline points={curve('numerical')} fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="5 3"/>
      <text x="80" y="27" fill="#94a3b8" fontSize="10">{unit}</text><text x="240" y="246" textAnchor="middle" fill="#94a3b8" fontSize="10">Radius r / R</text>
    </svg><div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]"><span className="text-cyan-200">– – {leftLabel}</span><span className="text-orange-300">━━ {rightLabel}</span></div><p className="mt-2 text-[10px] text-slate-400">Maximum difference / peak magnitude: {(error * 100).toFixed(3)}%</p></section>;
}
function Control({ label, value, min, max, step, onChange, unit = '' }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; unit?: string }) {
  return <label className="block text-xs text-slate-300"><span className="flex justify-between gap-3"><span>{label}</span><span className="text-cyan-200">{value.toFixed(step < 0.1 ? 2 : 1)} {unit}</span></span><input className="mt-2 w-full accent-cyan-300" aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/></label>;
}

export default function HydrostaticEquilibriumPage() {
  const [mass, setMass] = useState(1), [radius, setRadius] = useState(1), [index, setIndex] = useState(3);
  const [shell, setShell] = useState(0.45), [support, setSupport] = useState(1), [temperature, setTemperature] = useState(false);
  const model = useMemo(() => stellarModel(mass, radius, index), [mass, radius, index]);
  const balances = useMemo(() => {
    const h = .0005;
    return model.samples.map(p => {
      const left = model.state(Math.max(0, p.u - h)), right = model.state(Math.min(1, p.u + h));
      const dr = right.r - left.r;
      // At the regular center and zero-density surface both exact derivatives vanish.
      const boundary = p.u === 0 || p.u === 1;
      return { u: p.u, pressure: { numerical: boundary ? 0 : (right.pressure - left.pressure) / dr, expected: -p.density * p.gravity }, mass: { numerical: boundary ? 0 : (right.enclosedMass - left.enclosedMass) / dr, expected: 4 * Math.PI * p.r ** 2 * p.density } };
    });
  }, [model]);
  const selected = model.state(shell), acceleration = (support - 1) * selected.gravity;
  useEffect(() => { document.title = 'Hydrostatic Equilibrium | Physics Lab'; }, []);
  const reset = () => { setMass(1); setRadius(1); setIndex(3); setShell(.45); setSupport(1); };
  const line = (value: (p: typeof selected) => number) => model.samples.map(p => `${48 + p.u * 304},${272 - 222 * value(p)}`).join(' ');
  const arrowLength = 34;
  const probe = (event: React.PointerEvent<SVGSVGElement>, star: boolean) => {
    const svg = event.currentTarget, matrix = svg.getScreenCTM();
    if (!matrix) return;
    const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    setShell(star ? Math.max(0, Math.min(1, Math.hypot(local.x - 180, local.y - 165) / 126)) : Math.max(0, Math.min(1, (local.x - 48) / 304)));
  };
  return <div className="min-h-screen bg-[#08080a] text-white"><StarBackground/><Header/>
    <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24">
      <a className="text-xs text-cyan-300 hover:underline" href="/#/phd-physics">← Physics Lab</a>
      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-cyan-300">Astrophysics • Stellar interiors</p>
      <h1 className="my-3 text-3xl font-bold md:text-5xl">Hydrostatic Equilibrium</h1>
      <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-300">Explore a star from its core to its surface. A pressure gradient pushes outward while the gravity of the enclosed mass pulls inward. In equilibrium, these forces balance at every shell.</p>
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Central density', scientific(model.centralDensity), 'kg m⁻³'], ['Central pressure', scientific(model.centralPressure), 'Pa'], ['Ideal-gas central T', (model.centralTemperature / 1e6).toFixed(2), 'million K'], ['Central / mean density', (model.centralDensity / model.meanDensity).toFixed(2), 'concentration']].map(([label, value, unit]) => <div key={label} className={panel}><p className="text-[11px] text-slate-400">{label}</p><p className="mt-1 text-xl font-semibold text-cyan-100">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p></div>)}
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">Inside a self-gravitating star</h2><span className="text-[11px] text-slate-400">Drag either view to select a shell</span></div>
          <div className="grid gap-2 md:grid-cols-2">
            <svg viewBox="0 0 360 330" role="img" aria-label="Stellar interior cutaway with selected shell and opposing pressure and gravity arrows" className="w-full touch-none" onPointerDown={e => probe(e, true)} onPointerMove={e => { if (e.buttons) probe(e, true); }}>
              <defs>
                <radialGradient id="interior-star"><stop stopColor="#fff8bf"/><stop offset="0.25" stopColor="#fbbf24"/><stop offset="0.65" stopColor="#f97316"/><stop offset="1" stopColor="#9f2442"/></radialGradient>
                <marker id="interior-gravity" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#fb923c"/></marker>
                <marker id="interior-pressure" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#67e8f9"/></marker>
              </defs>
              <circle cx="180" cy="165" r="126" fill="url(#interior-star)"/>
              <path d="M180 165 L180 39 A126 126 0 0 1 306 165 Z" fill="#080c18" opacity="0.85"/>
              {[.2, .4, .6, .8, 1].map(u => <circle key={u} cx="180" cy="165" r={u * 126} fill="none" stroke="#fed7aa" strokeOpacity="0.16"/>)}
              <circle cx="180" cy="165" r={shell * 126} fill="none" stroke="#f8fafc" strokeWidth="1.2" strokeDasharray="4 4"/>
              <circle cx={180 + shell * 126} cy="165" r="4" fill="#f8fafc"/>
              {shell > 0 && shell < 1 && <g>
                <line x1={180 + shell * 126} x2={180 + shell * 126 - arrowLength} y1="155" y2="155" stroke="#fb923c" strokeWidth="2.5" markerEnd="url(#interior-gravity)"/>
                <line x1={180 + shell * 126} x2={180 + shell * 126 + arrowLength * support} y1="176" y2="176" stroke="#67e8f9" strokeWidth="2.5" markerEnd="url(#interior-pressure)"/>
              </g>}
              <text x="180" y="17" textAnchor="middle" fill="#cbd5e1" fontSize="11">Core → surface • illustrative thermal coloring</text>
              <text x="180" y="308" textAnchor="middle" fill="#94a3b8" fontSize="10">Arrows compare local force density; lengths normalized</text>
            </svg>
            <svg viewBox="0 0 380 330" role="img" aria-label="Normalized pressure, density and enclosed mass profiles versus radius" className="w-full touch-none" onPointerDown={e => probe(e, false)} onPointerMove={e => { if (e.buttons) probe(e, false); }}>
              <rect x="48" y="50" width="304" height="222" fill="#060c16"/>
              {[0, .25, .5, .75, 1].map(u => <g key={u}><line x1="48" x2="352" y1={272 - 222 * u} y2={272 - 222 * u} stroke="#243244"/><text x="40" y={276 - 222 * u} textAnchor="end" fill="#94a3b8" fontSize="10">{u}</text><text x={48 + 304 * u} y="290" textAnchor="middle" fill="#94a3b8" fontSize="10">{u}</text></g>)}
              <polyline points={line(p => p.density / model.centralDensity)} fill="none" stroke="#fb923c" strokeWidth="2"/>
              <polyline points={line(p => p.pressure / model.centralPressure)} fill="none" stroke="#67e8f9" strokeWidth="2"/>
              <polyline points={line(p => p.enclosedMass / model.mass)} fill="none" stroke="#c4b5fd" strokeWidth="2"/>
              {temperature && <polyline points={line(p => p.theta)} fill="none" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="4 3"/>}
              <line x1={48 + 304 * shell} x2={48 + 304 * shell} y1="50" y2="272" stroke="#f8fafc" strokeDasharray="3 4"/>
              <text x="200" y="22" textAnchor="middle" fill="#cbd5e1" fontSize="11">Normalized interior profiles</text>
              <text x="200" y="314" textAnchor="middle" fill="#94a3b8" fontSize="11">Radius r / R</text>
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px]"><span className="text-orange-300">● Density ρ / ρc</span><span className="text-cyan-200">● Pressure P / Pc</span><span className="text-violet-300">● Enclosed mass m / M</span><label className="flex items-center gap-2 text-amber-200"><input type="checkbox" checked={temperature} onChange={e => setTemperature(e.target.checked)}/>Ideal-gas T / Tc</label></div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            {[['Shell density', `${scientific(selected.density)} kg m⁻³`], ['Shell pressure', `${scientific(selected.pressure)} Pa`], ['Enclosed mass', `${(100 * selected.enclosedMass / model.mass).toFixed(1)}% of M`], ['Gravity', `${scientific(selected.gravity)} m s⁻²`]].map(([label, value]) => <div key={label} className="rounded-lg bg-black/30 p-3"><p className="text-slate-400">{label}</p><p className="mt-1 text-slate-100">{value}</p></div>)}
          </div>
        </section>
        <aside className={`${panel} space-y-4`}>
          <h2 className="font-semibold">Build a polytropic star</h2>
          <Control label="Stellar mass" value={mass} min={.1} max={20} step={.1} onChange={setMass} unit="M☉"/>
          <Control label="Stellar radius" value={radius} min={.2} max={10} step={.1} onChange={setRadius} unit="R☉"/>
          <Control label="Polytropic index n" value={index} min={1} max={4} step={.05} onChange={setIndex}/>
          <div className="flex flex-wrap gap-2">{[{ n: 1, label: 'n = 1' }, { n: 1.5, label: 'Convective-like' }, { n: 3, label: 'Concentrated' }].map(p => <button key={p.n} aria-pressed={index === p.n} onClick={() => setIndex(p.n)} className={`rounded-full border px-2 py-1 text-[10px] ${index === p.n ? 'border-cyan-300 text-cyan-200' : 'border-slate-600 text-slate-300'}`}>{p.label}</button>)}</div>
          <Control label="Selected radius r / R" value={shell} min={0} max={1} step={.01} onChange={setShell}/>
          <Control label="Pressure-gradient multiplier" value={support} min={.5} max={1.5} step={.01} onChange={setSupport}/>
          <div className="rounded-xl border border-slate-700 p-3 text-[11px] leading-5">
            <p className={support === 1 ? 'text-emerald-300' : 'text-amber-200'}>{selected.density === 0 ? 'Zero-density surface boundary' : support === 1 ? 'Balanced support' : support < 1 ? 'Initial inward acceleration' : 'Initial outward acceleration'}</p>
            <p className="text-orange-300">Gravity: {scientific(selected.forceDensity)} N m⁻³ inward</p>
            <p className="text-cyan-200">Pressure: {scientific(selected.forceDensity * support)} N m⁻³ outward</p>
            <p className="mt-1 text-slate-300">{selected.density === 0 ? 'No gas at this idealized surface' : `a = ${scientific(acceleration)} m s⁻²`} <span className="text-slate-400">(outward positive)</span></p>
            <p className="mt-2 text-slate-400">Multiplier ≠ 1 is an instantaneous force experiment at the original density, not a new equilibrium or an evolution simulation.</p>
          </div>
          <button onClick={reset} className="w-full rounded-lg border border-slate-600 px-3 py-2 text-xs hover:border-cyan-300">Reset equilibrium</button>
        </aside>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <BalancePlot title="Hydrostatic balance: dP/dr = −ρg" unit="Pa m⁻¹ = N m⁻³" leftLabel="dP/dr from profile" rightLabel="−ρg" negative values={balances.map(p => ({ u: p.u, ...p.pressure }))}/>
        <BalancePlot title="Mass continuity: dm/dr = 4πr²ρ" unit="kg m⁻¹" leftLabel="dm/dr from profile" rightLabel="4πr²ρ" values={balances.map(p => ({ u: p.u, ...p.mass }))}/>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">These plots check the equilibrium model. The pressure-gradient multiplier above is a separate force experiment. Endpoint derivatives use their regular limiting values; interior derivatives use centered differences.</p>
      <section className={`${panel} mt-4 grid gap-5 md:grid-cols-2`}>
        <div><h2 className="font-semibold">The equations behind the interior</h2><div className="mt-3 space-y-2 font-mono text-sm text-cyan-100"><p><MathFormula tex={String.raw`\frac{dP}{dr}=-\rho g`} block/></p><p><MathFormula tex={String.raw`g(r)=\frac{Gm(r)}{r^2}`} block/></p><p><MathFormula tex={String.raw`\frac{dm}{dr}=4\pi r^2\rho`} block/></p><p><MathFormula tex={String.raw`P=K\rho^{1+1/n}`} block/></p><p><MathFormula tex={String.raw`\frac1{\xi^2}\frac d{d\xi}\left(\xi^2\frac{d\theta}{d\xi}\right)=-\theta^n`} block/></p></div><p className="mt-3 text-xs leading-5 text-slate-400"><MathFormula tex={String.raw`\theta(0)=1,\quad\theta'(0)=0`}/>; the first zero of θ defines the surface. The dimensional scale is chosen to match your M and R. Pressure falls outward; gravity depends on enclosed mass, not the star’s total mass at every radius.</p></div>
        <div><h2 className="font-semibold">What this model represents</h2><p className="mt-3 text-xs leading-5 text-slate-300">A spherical, nonrotating Newtonian polytrope with zero surface pressure. This solves mechanical equilibrium; it does not solve nuclear burning, luminosity, energy transport, or stability. The index n controls the density profile and is not automatically the gas’s adiabatic index.</p><p className="mt-3 text-xs leading-5 text-slate-400">Temperature is inferred assuming all pressure is ideal-gas pressure with <MathFormula tex={String.raw`\mu=0.61`}/>. Radiation pressure and degeneracy are omitted, so this estimate is not valid for every mass–radius combination. The <MathFormula tex={String.raw`n=3`}/> preset is a teaching approximation, not a calibrated solar model; the zero-pressure surface is not a realistic photosphere.</p><p className="mt-3 text-xs text-slate-400">First zero ξ₁ = {model.xi1.toFixed(5)} · mass coefficient <MathFormula tex={String.raw`-\xi_1^2\theta'(\xi_1)`}/> = {model.massCoefficient.toFixed(5)}</p></div>
      </section>
      <PhysicsReferences project="hydrostatic"/>
    </main>
  </div>;
}
