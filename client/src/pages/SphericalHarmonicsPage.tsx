import { expandedHarmonicFormula } from '@/lib/physics/harmonicFormula';
import { useEffect, useMemo, useState } from 'react';
import MathFormula from '@/components/MathFormula';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import PhysicsReferences from '@/components/PhysicsReferences';
import HarmonicSphere from '@/components/harmonics/HarmonicSphere';
import HarmonicMap from '@/components/harmonics/HarmonicMap';
import { analyze, angularFactor, complexHarmonic, evaluate, makeField, RAD, sign, thetaFactor, xyz, type Harmonic } from '@/lib/physics/sphericalHarmonics';
const panel = 'rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-4';
const number = (x: number) => x === 0 ? '0' : x.toPrecision(6);
const symbol = (v: number) => v > 0 ? '+' : v < 0 ? '−' : '0';
const degrees = (x: number) => (x / RAD).toFixed(2) + '°';
function IntegerControl({ name, label, value, min, max, change }: { name: string; label: string; value: number; min: number; max: number; change: (x: number) => void }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const commit = () => { const n = Number(draft); if (draft.trim() && Number.isFinite(n)) { const bounded = Math.max(min, Math.min(max, Math.round(n))); setDraft(String(bounded)); change(bounded); } else setDraft(String(value)); };
  return <label className="text-xs text-slate-300">{label}<input aria-label={name} type="number" min={min} max={max} step="1" value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if(e.key === 'Enter') { commit(); e.currentTarget.blur(); } }} className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2 text-base"/></label>;
}
function AngleControl({ name, label, value, min, max, change }: { name: string; label: string; value: number; min: number; max: number; change: (x: number) => void }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => { setDraft(Number(value.toFixed(4)).toString()); }, [value]);
  const commit = () => { const n = Number(draft); if (draft.trim() && Number.isFinite(n)) change(Math.max(min, Math.min(max, n))); else setDraft(String(value)); };
  return <label className="block text-xs text-slate-300"><span className="flex items-center justify-between gap-2">{label}<span><input aria-label={`${name} degrees`} type="number" min={min} max={max} step="any" value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === 'Enter') { commit(); e.currentTarget.blur(); } }} className="w-24 rounded border border-slate-600 bg-slate-950 px-2 py-1 text-right text-cyan-100"/> °</span></span><input aria-label={`${name} slider`} type="range" min={min} max={max} step="0.1" value={value} onChange={e => change(Number(e.target.value))} className="mt-2 w-full accent-cyan-300"/></label>;
}
export default function SphericalHarmonicsPage() {
  const [l, setL] = useState(5), [m, setM] = useState(3), [component, setComponent] = useState<Harmonic['component']>('real'), [phase, setPhase] = useState<Harmonic['phase']>('notes');
  const [theta, setTheta] = useState(35), [psi, setPsi] = useState(-165), [continuous, setContinuous] = useState(true);
  const [nodes, setNodes] = useState(true), [axes, setAxes] = useState(true), [labels, setLabels] = useState(true), [point, setPoint] = useState(true), [lobe, setLobe] = useState(true), [reset, setReset] = useState(0);
  const harmonic = useMemo(() => ({ l, m, component, phase }), [l, m, component, phase]);
  const analysis = useMemo(() => analyze(harmonic), [harmonic]);
  const field = useMemo(() => makeField(harmonic, analysis.scale, continuous), [harmonic, analysis.scale, continuous]);
  const selected = evaluate(harmonic, theta * RAD, psi * RAD), state = sign(selected, analysis.tolerance), complex = complexHarmonic(l, m, theta * RAD, psi * RAD, phase), position = xyz(theta * RAD, psi * RAD);
  const select = (t: number, p: number) => { const degrees = Math.max(0, Math.min(180, t / RAD)); setTheta(degrees); if (degrees > 1e-7 && degrees < 180 - 1e-7) setPsi(Math.max(-180, Math.min(180, p / RAD))); };
  const changeL = (n: number) => { const value = Math.max(0, Math.min(64, Math.round(n))); setL(value); setM(old => Math.max(-value, Math.min(value, old))); };
  const preset = () => { setL(5); setM(3); setComponent('real'); setPhase('notes'); setTheta(35); setPsi(-165); setReset(v => v + 1); };
  const q = Math.abs(m), a = thetaFactor(harmonic, analysis.sampleTheta), b = angularFactor(harmonic, analysis.samplePsi), f = a * b;
  const phaseSign = ((m < 0 ? q : 0) + (phase === 'notes' ? q : 0)) % 2 ? '-' : '';
  const ySymbol = phase === 'notes' ? String.raw`\widetilde Y` : 'Y';
  const operator = component === 'real' ? String.raw`\operatorname{Re}` : String.raw`\operatorname{Im}`;
  const trig = component === 'real' ? String.raw`\cos` : String.raw`\sin`;
  const symbolicFormula = String.raw`${operator}\,${ySymbol}_{${l}}^{${m}}(\theta,\psi) = ` + (analysis.zero ? '0' : String.raw`${phaseSign}\sqrt{\frac{${2*l+1}}{4\pi}\frac{${l-q}!}{${l+q}!}}\,P_{${l}}^{${q}}(\cos\theta)` + (m === 0 ? '' : String.raw`\,${trig}(${m}\psi)`));
  const shared = { harmonic, analysis, field, theta: theta * RAD, psi: psi * RAD, continuous, nodes, axes, labels, point, reset, select };
  useEffect(() => { document.title = 'Spherical Harmonics Explorer | Physics Lab'; }, []);
  return <div className="min-h-screen bg-[#08080a] text-white"><StarBackground/><Header/><main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-24">
    <a href="/#/phd-physics" className="text-xs text-cyan-300 hover:underline">← Physics Lab</a>
    <p className="mt-4 text-[10px] uppercase tracking-[.22em] text-cyan-300">Electricity &amp; Magnetism • Angular structure</p>
    <div className="my-3 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-bold md:text-4xl">Spherical Harmonics Explorer</h1><button onClick={preset} className="rounded-full border border-cyan-300/50 px-4 py-2 text-xs text-cyan-100">Worked preset: ℓ = 5, m = 3</button></div>
    <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-300">One function, two linked views: see how latitude and longitude factors divide a sphere into positive and negative regions. ψ is azimuth, commonly written φ; θ is colatitude measured from the north pole.</p>
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
      <div className="min-w-0 space-y-4"><section className={panel}>
        <div className="sticky top-16 z-20 -mx-1 mb-3 grid grid-cols-2 gap-3 rounded-xl border border-slate-600 bg-[#0d1523] p-3 shadow-lg xl:hidden" aria-label="Quick harmonic selection">
          <IntegerControl name="Mobile degree ell" label="Degree ℓ" value={l} min={0} max={64} change={changeL}/>
          <IntegerControl name="Mobile order m" label="Order m" value={m} min={-l} max={l} change={setM}/>
        </div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold">{component === 'real' ? 'Re' : 'Im'} Y<sub>{l}</sub><sup>{m}</sup>(θ, ψ)</h2><button onClick={() => setReset(v => v + 1)} className="rounded border border-slate-600 px-3 py-1 text-xs hover:border-cyan-300">Reset cameras</button></div>
        <div className="grid min-w-0 gap-4 md:grid-cols-2"><div className="min-w-0"><h3 className="mb-2 text-xs text-slate-300">3D unit sphere • fixed radius r = 1</h3><HarmonicSphere {...shared}/></div><div className="min-w-0"><h3 className="mb-2 text-xs text-slate-300">Angular map • θ increases downward</h3><HarmonicMap {...shared}/></div></div>
        <div className="mt-4 min-w-0 rounded-xl border border-cyan-300/20 bg-cyan-950/15 px-3 py-2" aria-label="Symbolic harmonic formula">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Selected harmonic · symbolic angular dependence</p>
          <MathFormula tex={expandedHarmonicFormula(harmonic)} block/>
          {<details className="text-xs text-slate-400"><summary className="cursor-pointer">Compact associated-Legendre notation</summary><MathFormula tex={symbolicFormula} block/></details>}
          <p className="text-[11px] leading-5 text-slate-400">{phase === 'notes' ? <><MathFormula tex={String.raw`\widetilde Y_\ell^m=(-1)^{|m|}Y_\ell^m`}/> · notes convention.</> : 'Standard Condon–Shortley convention.'} <MathFormula tex={String.raw`P_\ell^{|m|}`}/> includes the Condon–Shortley phase; complex normalization is retained. The associated-Legendre polynomial above is expanded exactly; θ and ψ remain variables.</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"><span className="text-cyan-300">● Positive +</span><span className="text-rose-300">● Negative −</span><span className="text-slate-400">● Zero / node</span><span className="text-yellow-200">⊕ Selected point</span></div>
        {analysis.zero && <p role="status" className="mt-3 rounded-xl border border-slate-600 bg-slate-950 p-3 text-sm text-amber-200">Im Y<sub>{l}</sub><sup>0</sup> ≡ 0 everywhere. The entire sphere is a zero set; ordinary sign-region counting does not apply. A lobe model collapses to the origin.</p>}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">{[['Rows', analysis.zero ? 'not applicable' : analysis.rows], ['Rectangle columns', analysis.zero ? 'not applicable' : analysis.columns], ['Rectangle boxes', analysis.zero ? 'not applicable' : analysis.boxes], ['Sphere regions', analysis.zero ? 'not applicable' : analysis.sphereRegions]].map(([name, value]) => <div key={name} className="rounded-lg bg-black/25 p-3"><p className="text-[10px] text-slate-400">{name}</p><p className="mt-1 text-cyan-100">{value}</p></div>)}</div>
      </section>
      {lobe && <section className={panel}><h2 className="mb-2 font-semibold">Optional lobe representation</h2><div className="grid items-center gap-4 md:grid-cols-2"><HarmonicSphere {...shared} lobe/><div className="text-xs leading-6 text-slate-300">{analysis.zero ? <p>This component is identically zero: its lobe radius is <MathFormula tex="r=0"/> in every direction. No division by a zero peak is performed.</p> : <p><MathFormula tex={String.raw`r=|f(\theta,\psi)|/A`}/>, where <MathFormula tex={`A=${number(analysis.scale)}`}/> is the sampled peak magnitude of this selected component. The sign keeps the same cyan / rose colors.</p>}<p className="mt-3">This changes the shape representation. The unit sphere above keeps every angular direction at <MathFormula tex="r=1"/>. On the lobe model, zero directions all meet at the origin; they are not additional surface circles.</p><p className="mt-3 text-slate-400">Rotation and zoom are independent for each camera. Harmonic, angles, colors and selected markers remain linked. This is not a probability-density plot.</p></div></div></section>}
      </div>
      <aside className={`${panel} space-y-4`}>
        <h2 className="font-semibold">Harmonic &amp; selection</h2>
        <div className="hidden grid-cols-2 gap-3 xl:grid"><IntegerControl name="Degree ell" label="Degree ℓ" value={l} min={0} max={64} change={changeL}/><IntegerControl name="Order m" label="Order m" value={m} min={-l} max={l} change={setM}/></div>
        <p className="hidden text-[10px] text-slate-400 xl:block">Press Enter or leave a number field to apply. Order is constrained to −ℓ…ℓ.</p>
        <label className="block text-xs text-slate-300">Component<select aria-label="Harmonic component" value={component} onChange={e => setComponent(e.target.value as Harmonic['component'])} className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"><option value="real">Real part • cosine</option><option value="imaginary">Imaginary part • sine</option></select></label>
        <label className="block text-xs text-slate-300">Phase convention<select aria-label="Phase convention" value={phase} onChange={e => setPhase(e.target.value as Harmonic['phase'])} className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"><option value="standard">Standard Condon–Shortley</option><option value="notes">Notes • without Condon–Shortley</option></select></label>
        <AngleControl name="Theta" label="Colatitude θ" value={theta} min={0} max={180} change={setTheta}/><AngleControl name="Psi" label="Azimuth ψ" value={psi} min={-180} max={180} change={setPsi}/>
        <label className="block text-xs text-slate-300">Coloring<select aria-label="Color mode" value={continuous ? 'continuous' : 'sign'} onChange={e => setContinuous(e.target.value === 'continuous')} className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"><option value="sign">Sign only</option><option value="continuous">Continuous signed amplitude</option></select></label>
        <fieldset className="grid grid-cols-2 gap-2 text-xs text-slate-300"><legend className="mb-2 text-slate-400">Visible layers</legend>{[['Nodal curves', nodes, setNodes], ['Coordinate axes', axes, setAxes], ['Sign labels', labels, setLabels], ['Selected point', point, setPoint], ['Lobe model', lobe, setLobe]].map(([name, checked, setter]) => <label key={String(name)} className="flex items-center gap-2"><input type="checkbox" checked={checked as boolean} onChange={e => (setter as (x: boolean) => void)(e.target.checked)}/>{name as string}</label>)}</fieldset>
      </aside>
    </div>
    <section className={`${panel} mt-4`} aria-live="polite"><div className="grid gap-4 md:grid-cols-3"><div><h2 className="text-xs text-slate-400">Selected component f(θ, ψ)</h2><p className={`mt-1 font-mono text-2xl ${state > 0 ? 'text-cyan-300' : state < 0 ? 'text-rose-300' : 'text-slate-300'}`}>{number(selected)}</p><p className="mt-1 text-xs text-slate-400">{analysis.zero ? 'Identically zero' : state === 0 ? 'Zero within numerical tolerance' : state > 0 ? 'Positive region +' : 'Negative region −'}</p></div><div className="text-xs leading-6 text-slate-300"><p><MathFormula tex={String.raw`\theta=${theta.toFixed(4)}^\circ,\quad\psi=${psi.toFixed(4)}^\circ`}/></p><p>x, y, z = ({position.map(v => v.toFixed(4)).join(', ')})</p><p><MathFormula tex={String.raw`\operatorname{Re}Y=${number(complex.re)},\quad\operatorname{Im}Y=${number(complex.im)}`}/></p><p><MathFormula tex={String.raw`|Y|^2=${number(complex.re ** 2 + complex.im ** 2)}`}/></p></div><div className="text-[11px] leading-5 text-slate-400"><p>Active: {phase === 'standard' ? 'Condon–Shortley' : <>Notes: <MathFormula tex={String.raw`\widetilde Y_\ell^m=(-1)^{|m|}Y_\ell^m`}/></>}.</p><p>Complex normalization: <MathFormula tex={String.raw`\int |Y_\ell^m|^2\,d\Omega=1`}/>.</p><p>No <MathFormula tex={String.raw`\sqrt2`}/> rescaling of real / imaginary parts.</p><p>Zero tolerance: {number(analysis.tolerance)} (10⁻⁹ × sampled peak).</p>{(theta < 1e-7 || theta > 180 - 1e-7) && <p className="mt-1 text-amber-200">At a pole, longitude is geometrically undefined. Your chosen ψ is retained.</p>}</div></div></section>
    <details open className={`${panel} mt-4`}><summary className="cursor-pointer font-semibold text-cyan-100">How this harmonic makes sign regions</summary><div className="mt-4 grid min-w-0 gap-5 text-sm leading-6 text-slate-300 lg:grid-cols-2">
      <div className="min-w-0"><h3 className="font-semibold text-white">1 · Factor the function</h3>
        <MathFormula tex={String.raw`f(\theta,\psi)=A(\theta)\,${trig}(m\psi)`} block/>
        <MathFormula tex={String.raw`N_{\ell q}=\sqrt{\frac{2\ell+1}{4\pi}\frac{(\ell-q)!}{(\ell+q)!}},\qquad q=|m|`} block/>
        <p>The associated-Legendre function includes the Condon–Shortley phase. In the standard convention:</p>
        <MathFormula tex={String.raw`A(\theta)=\begin{cases}N_{\ell q}P_\ell^q(\cos\theta),&m\geq0,\\(-1)^qN_{\ell q}P_\ell^q(\cos\theta),&m<0.\end{cases}`} block/>
        <p>The notes convention multiplies this factor by <MathFormula tex={String.raw`(-1)^q`}/> for either sign of the order:</p>
        <MathFormula tex={String.raw`\widetilde Y_\ell^m=(-1)^{|m|}Y_\ell^m,\qquad Y_\ell^{-m}=(-1)^m\overline{Y_\ell^m}`} block/>
        <p>Our notes convention preserves the same conjugation identity. Negative order leaves cosine unchanged and reverses sine. These are components of the normalized complex harmonic, with no extra <MathFormula tex={String.raw`\sqrt2`}/> factor.</p>
        <MathFormula tex={String.raw`\int_{S^2}|Y_\ell^m|^2\,d\Omega=1,\qquad d\Omega=\sin\theta\,d\theta\,d\psi`} block/>
        <p className="text-xs text-slate-400">Conventional notation is <MathFormula tex={String.raw`Y_\ell^m`}/>. Your notes write the same degree/order pair as <MathFormula tex={String.raw`Y_m^\ell`}/>.</p>
        <h3 className="mt-4 font-semibold text-white">2 · Latitude nodes and rows</h3>
        <p>The associated-Legendre factor has <MathFormula tex={String.raw`\ell-|m|=${l-q}`}/> interior zeros in colatitude, producing <MathFormula tex={String.raw`\ell-|m|+1=${l-q+1}`}/> rows for a nonzero component. Roots come from the actual factor, not evenly spaced latitudes.</p>
        <p className="mt-2 break-words text-xs text-cyan-100">Interior θ roots: {analysis.latitudes.length ? analysis.latitudes.map(degrees).join(', ') : 'none'}.</p>
        <p className="mt-2 text-xs text-slate-400">For nonzero order, both poles are also zeros; they create no additional rows. {analysis.zero ? 'This imaginary component is zero everywhere, regardless of those factor roots.' : ''}</p>
      </div>
      <div className="min-w-0"><h3 className="font-semibold text-white">3 · Longitude nodes and the seam</h3>
        <p className="mt-2">For the rectangle cut at <MathFormula tex={String.raw`\psi=\pm180^\circ`}/>, nonzero-order cosine has <MathFormula tex={String.raw`2|m|+1`}/> columns and sine has <MathFormula tex={String.raw`2|m|`}/> columns. The real component at zero order has one column; the imaginary component is the zero function, so ordinary sign counting does not apply.</p>
        <p className="mt-2 break-words text-xs text-cyan-100">Interior ψ nodes: {analysis.longitudes.length ? analysis.longitudes.map(degrees).join(', ') : 'none'}.{m !== 0 && component === 'imaginary' ? ' Both seam edges are also nodes.' : ''}</p>
        <p className="mt-2">{analysis.zero ? 'No ordinary sign boxes or connected sign regions exist for the zero function.' : `${analysis.rows} rows × ${analysis.columns} columns = ${analysis.boxes} rectangle boxes; ${analysis.sphereRegions} connected sign regions on the sphere.`} {analysis.zero ? '' : m !== 0 && component === 'real' ? 'The outer cosine columns have the same sign and join across the sphere’s seam, removing one box per row.' : m !== 0 ? 'The sine seam is nodal. Opposite signs on its two sides do not merge.' : 'There are no longitudinal divisions.'}</p>
        <h3 className="mt-4 font-semibold text-white">4 · Work out the first sign</h3>
        {analysis.zero ? <p>There is no top-left sign region: <MathFormula tex={String.raw`\sin(0\psi)=0`}/> everywhere.</p> : <>
          <p>Choose a point strictly inside the top-left box:</p>
          <MathFormula tex={String.raw`\theta=${(analysis.sampleTheta/RAD).toFixed(2)}^\circ,\quad\psi=${(analysis.samplePsi/RAD).toFixed(2)}^\circ`} block/>
          <div className="mt-2 rounded-lg bg-black/25 p-3">
            <MathFormula tex={String.raw`A(\theta)=${number(a)}\quad(${symbol(a)})`} block/>
            <MathFormula tex={String.raw`${trig}(${m}\psi)=${number(b)}\quad(${symbol(b)})`} block/>
            <MathFormula tex={String.raw`f=A\times\text{angular factor}=${number(f)}\quad(${symbol(f)})`} block/>
          </div>
          <p className="mt-2">Across each ordinary simple nodal line, one factor changes sign, so neighboring signs alternate. Crossing an intersection can reverse both factors, preserving the diagonal sign.</p>
        </>}
        <p className="mt-3">An overall sign reversal swaps every + and − while preserving the nodes. Changing these phase conventions reverses odd absolute orders and leaves even absolute orders unchanged.</p>
      </div>
    </div><div className="mt-4 min-w-0 rounded-xl border border-slate-700 p-4 text-xs leading-6">
      <p className="font-semibold text-white">Worked example: degree 5, order 3, real, notes convention</p>
      <MathFormula tex={String.raw`\operatorname{Re}\widetilde Y_5^3(\theta,\psi)=\frac{\sqrt{385/\pi}}{32}\sin^3\theta\,(9\cos^2\theta-1)\cos(3\psi)`} block/>
      <p>Latitude nodes: 70.53°, 109.47°. Longitude nodes: −150°, −90°, −30°, 30°, 90°, 150°. The rectangle has 3 × 7 = 21 boxes, while the sphere has 18 connected sign regions. The top-left region is negative.</p>
      <p className="mt-2 text-amber-200">Signs describe function sign or phase, not electric charge or probability. Probability density is <MathFormula tex={String.raw`|Y|^2`}/>. These angular basis functions are used in multipole expansions; no physical charge distribution is inferred.</p>
      <p>Azimuth ψ (ϕ) increases eastward from the Greenwich meridian. London: 0°; Kathmandu: approximately +85°; Lexington: approximately −84°. The x and y axes are exchanged: +y is Greenwich and +x is 90° east.</p>
      <MathFormula tex={String.raw`x=\sin\theta\sin\psi,\qquad y=\sin\theta\cos\psi,\qquad z=\cos\theta`} block/>
      <p className="text-slate-400">The sphere and map share a sampled field; mathematical readouts and nodal roots use the recurrence directly. Dense sign labels are thinned or hidden for readability.</p>
    </div></details>
    <section className={`${panel} mt-4`} aria-label="Detailed learning guide">
      <p className="text-[10px] uppercase tracking-[.2em] text-cyan-300">Learn from the beginning</p>
      <h2 className="mt-2 text-lg font-semibold">How do we get these formulas?</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Follow the derivations, expanded Legendre polynomials, normalization, phase conventions, nodal patterns and worked examples—with figures and exercises.</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <a href="/#/phd-physics/spherical-harmonics/guide" className="rounded-full bg-cyan-300 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-200">Read the illustrated guide →</a>
        <a href="/guides/spherical-harmonics/README.md" download="spherical-harmonics-guide.md" className="rounded-full border border-slate-600 px-4 py-2 text-cyan-100 hover:border-cyan-300">Download guide (.md)</a>
        <a href="/guides/spherical-harmonics/all-degree-order-pairs.md" download className="rounded-full border border-slate-600 px-4 py-2 text-cyan-100 hover:border-cyan-300">Download all 4,225 ℓ, m pairs (.md)</a>
      </div>
    </section>
    <PhysicsReferences project="harmonics"/>
  </main></div>;
}
