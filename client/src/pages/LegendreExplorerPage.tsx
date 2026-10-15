import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import MathFormula from '@/components/MathFormula';
import PhysicsReferences from '@/components/PhysicsReferences';
import LegendrePlot, { type PlotCurve } from '@/components/legendre/LegendrePlot';
import { associatedExpression, associatedLegendre, gaussLegendre, legendreRoots, ordinaryDerivative, ordinaryLegendre, polynomialExpression, type Phase } from '@/lib/physics/legendre';
const panel='min-w-0 rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-4 md:p-5';
const fmt=(x:number)=>x===0?'0':Math.abs(x)>=1e5||Math.abs(x)<1e-4?x.toExponential(5):x.toPrecision(6);
const quadrature=gaussLegendre();
function IntegerField({label,value,min,max,change}:{label:string;value:number;min:number;max:number;change:(n:number)=>void}) {
  // Remount on committed value to synchronize presets and order clamping without replacing an active draft.
  return <label className="block text-xs text-slate-300">{label}<input key={`${value}-${min}-${max}`} aria-label={label} type="number" min={min} max={max} step="1" defaultValue={value}
    onBlur={e=>{const n=Number(e.target.value);const next=e.target.value.trim()&&Number.isFinite(n)?Math.max(min,Math.min(max,Math.round(n))):value;e.target.value=String(next);change(next);}}
    onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-base text-cyan-100"/></label>;
}
export default function LegendreExplorerPage() {
  useEffect(() => { document.title='Legendre Polynomial Explorer | Physics Lab'; }, []);
  const [l,setL]=useState(5),[m,setM]=useState(3),[x,setX]=useState(.3),[phase,setPhase]=useState<Phase>('standard');
  const [normalized,setNormalized]=useState(false),[theta,setTheta]=useState(false),[family,setFamily]=useState(false),[nodes,setNodes]=useState(true),[construction,setConstruction]=useState(false),[view,setView]=useState('both');
  const q=Math.abs(m),changeL=(degree:number)=>{setL(degree);setM(old=>Math.max(-degree,Math.min(degree,old)));};
  const presets=[{label:'Constant',l:0,m:0},{label:'Dipole',l:1,m:0},{label:'Quadrupole',l:2,m:0},{label:'Worked 5, 3',l:5,m:3},{label:'Sectoral 6, 6',l:6,m:6}];
  const ordinaryRoots=useMemo(()=>legendreRoots(l),[l]),associatedRoots=useMemo(()=>legendreRoots(l,m),[l,m]);
  const ordinaryCurves=useMemo<PlotCurve[]>(()=>[{name:`P${l}(x)`,color:'#22d3ee',value:u=>ordinaryLegendre(l,u)},...(family?Array.from({length:Math.min(3,l)},(_,i)=>({name:`P${l-i-1}(x)`,color:['#c4b5fd','#fb923c','#64748b'][i],dashed:true,value:(u:number)=>ordinaryLegendre(l-i-1,u)})):[])],[l,family]);
  const associatedCurves=useMemo<PlotCurve[]>(()=>[{name:`${normalized?'Normalized ':''}${phase==='notes'?'Notes ':''}P${l}^${m}(x)`,color:'#fb7185',value:u=>associatedLegendre(l,m,u,phase,normalized)}],[l,m,phase,normalized]);
  const constructionCurves=useMemo<PlotCurve[]>(()=>{
    const sample=Array.from({length:2049},(_,i)=>Math.cos(Math.PI*i/2048));
    const derivativeScale=Math.max(...sample.map(u=>Math.abs(ordinaryDerivative(l,q,u)))),associatedScale=Math.max(...sample.map(u=>Math.abs(associatedLegendre(l,m,u,phase))));
    return [
      {name:`d^${q}P${l}/dx^${q} • own peak = 1`,color:'#c4b5fd',value:(u:number)=>ordinaryDerivative(l,q,u)/derivativeScale},
      {name:`(1−x²)^(${q}/2)`,color:'#fbbf24',dashed:true,value:(u:number)=>Math.max(0,1-u*u)**(q/2)},
      {name:'Associated function • own peak = 1',color:'#fb7185',value:(u:number)=>associatedLegendre(l,m,u,phase)/associatedScale},
    ];
  },[l,m,q,phase]);
  const verification=useMemo(()=>{
    const other=l===64?63:l+1;
    const norm=quadrature.reduce((sum,p)=>sum+p.w*ordinaryLegendre(l,p.x)**2,0),cross=quadrature.reduce((sum,p)=>sum+p.w*ordinaryLegendre(l,p.x)*ordinaryLegendre(other,p.x),0);
    const associatedNorm=quadrature.reduce((sum,p)=>sum+p.w*associatedLegendre(l,m,p.x,phase,true)**2,0);
    return {other,norm,cross,associatedNorm};
  },[l,m,phase]);
  const p=ordinaryLegendre(l,x),a=associatedLegendre(l,m,x,phase,normalized),angle=Math.acos(x)*180/Math.PI;
  const symbol=normalized?(phase==='notes'?String.raw`\widehat{\widetilde P}`:String.raw`\widehat P`):(phase==='notes'?String.raw`\widetilde P`:'P');
  const arg=theta?String.raw`\cos\theta`:'x';
  return <div className="min-h-screen bg-[#08080a] text-white"><StarBackground/><Header/><main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-24">
    <a href="/#/phd-physics" className="text-xs text-cyan-300 hover:underline">← Physics Lab</a>
    <p className="mt-4 text-[10px] uppercase tracking-[.22em] text-cyan-300">Electricity &amp; Magnetism • Mathematical foundations</p>
    <h1 className="mt-3 text-3xl font-bold md:text-4xl">Legendre Polynomial Explorer</h1>
    <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">Start with Pℓ, take derivatives, and build the associated functions Pℓᵐ. Compare their shapes, roots and symmetries with linked interactive plots. Here x is a dimensionless argument, not a Cartesian position on the sphere.</p>
    <section className={`${panel} sticky top-16 z-20 mt-5 !bg-[#0d1523]`} aria-label="Legendre controls">
      <div className="grid grid-cols-2 items-end gap-3 md:grid-cols-[120px_120px_minmax(0,1fr)]">
        <IntegerField label="Degree ℓ" value={l} min={0} max={64} change={changeL}/><IntegerField label="Order m" value={m} min={-l} max={l} change={setM}/>
        <label className="col-span-2 text-xs text-slate-300 md:col-span-1">{theta?`Probe θ = ${angle.toFixed(2)}°`:`Probe x = ${x.toFixed(4)}`}<input aria-label="Linked Legendre probe" type="range" min={theta?0:-1} max={theta?180:1} step={theta?.1:.0001} value={theta?angle:x} onChange={e=>setX(theta?Math.cos(Number(e.target.value)*Math.PI/180):Number(e.target.value))} className="mt-3 block w-full accent-cyan-300"/></label>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" role="group" aria-label="Visible plots">{[['both','Both plots'],['ordinary','Ordinary Pℓ'],['associated','Associated Pℓᵐ']].map(([id,label])=><button key={id} aria-pressed={view===id} onClick={()=>setView(id)} className={`rounded-full border px-3 py-1.5 ${view===id?'border-cyan-300 bg-cyan-300/10 text-cyan-200':'border-slate-600 text-slate-300'}`}>{label}</button>)}</div>
    </section>
    <div className="mt-4 flex flex-wrap gap-2">{presets.map(p=><button key={p.label} onClick={()=>{setL(p.l);setM(p.m);}} className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-cyan-300">{p.label}</button>)}</div>
    <div className={`mt-4 grid items-start gap-4 ${view==='both'?'lg:grid-cols-2':''}`}>
      {view!=='associated'&&<section className={panel} aria-label="Ordinary Legendre plot panel"><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold text-cyan-200">Ordinary Legendre polynomial</h2><label className="text-xs text-slate-300"><input type="checkbox" checked={family} onChange={e=>setFamily(e.target.checked)}/> Previous degrees</label></div>
        <LegendrePlot curves={ordinaryCurves} roots={ordinaryRoots} x={x} select={setX} theta={theta} label="Ordinary Legendre polynomial interactive plot" showNodes={nodes}/>
        <div className="mt-3 rounded-xl bg-black/25 px-3"><MathFormula tex={String.raw`P_{${l}}(${arg})=${polynomialExpression(l,0,arg)}`} block/></div>
        <p className="mt-2 text-sm text-cyan-200"><MathFormula tex={String.raw`P_{${l}}(${x.toFixed(4)})=${fmt(p)}`}/></p>
        <p className="mt-2 text-xs leading-6 text-slate-400">{l} interior roots • parity: {l%2?'odd, Pℓ(−x) = −Pℓ(x)':'even, Pℓ(−x) = Pℓ(x)'}. Endpoint values are Pℓ(1) = 1 and Pℓ(−1) = (−1)ℓ.</p>
      </section>}
      {view!=='ordinary'&&<section className={panel} aria-label="Associated Legendre plot panel"><h2 className="mb-2 font-semibold text-rose-200">Associated Legendre function</h2>
        <LegendrePlot curves={associatedCurves} roots={associatedRoots} x={x} select={setX} theta={theta} label="Associated Legendre function interactive plot" showNodes={nodes}/>
        <div className="mt-3 rounded-xl bg-black/25 px-3"><MathFormula tex={String.raw`${symbol}_{${l}}^{${m}}(${arg})=${associatedExpression(l,m,phase,normalized,theta)}`} block/></div>
        <p className="mt-2 text-sm text-rose-200"><MathFormula tex={String.raw`${symbol}_{${l}}^{${m}}(${x.toFixed(4)})=${fmt(a)}`}/></p>
        <p className="mt-2 text-xs leading-6 text-slate-400">{l-q} interior roots • {q?'both endpoints are zero':'order zero recovers the ordinary polynomial before normalization'}. Parity: {((l+q)%2)?'odd':'even'}. Each graph has its own vertical scale.</p>
      </section>}
    </div>
    <section className={`${panel} mt-4`}><h2 className="font-semibold">Plot settings &amp; linked selection</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs text-slate-300">Horizontal coordinate<select aria-label="Legendre horizontal coordinate" value={theta?'theta':'x'} onChange={e=>setTheta(e.target.value==='theta')} className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-950 p-2"><option value="x">Argument x: −1 to +1</option><option value="theta">Colatitude θ: 0° to 180°</option></select></label>
      <label className="text-xs text-slate-300">Associated amplitude<select aria-label="Associated normalization" value={normalized?'spherical':'raw'} onChange={e=>setNormalized(e.target.value==='spherical')} className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-950 p-2"><option value="raw">Raw Pℓᵐ</option><option value="spherical">Spherical normalization Nℓm Pℓᵐ</option></select></label>
      <label className="text-xs text-slate-300">Associated phase<select aria-label="Legendre phase convention" value={phase} onChange={e=>setPhase(e.target.value as Phase)} className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-950 p-2"><option value="standard">Standard Condon–Shortley</option><option value="notes">Notes • remove (−1)^|m|</option></select></label>
      <div className="space-y-3 text-xs text-slate-300"><label className="block"><input type="checkbox" checked={nodes} onChange={e=>setNodes(e.target.checked)}/> Show interior roots</label><label className="block"><input type="checkbox" checked={construction} onChange={e=>setConstruction(e.target.checked)}/> Show derivative construction</label></div>
    </div><p className="mt-4 text-xs leading-6 text-slate-400">Enter or leave a degree/order field to apply it. Lowering the degree clamps the order automatically. Tapping either graph moves both probes. Changing coordinates preserves the selected point: <MathFormula tex={String.raw`x=\cos\theta=${x.toFixed(4)},\quad\theta=${angle.toFixed(3)}^\circ`}/>. The associated normalization and phase controls do not change the ordinary polynomial.</p></section>
    {construction&&<section className={`${panel} mt-4`}><h2 className="font-semibold">Build the associated function from derivatives</h2><p className="my-3 text-xs leading-6 text-slate-300">Differentiate the ordinary polynomial |m| times, then multiply by the endpoint factor and the phase/order constants. Purple and rose curves below are each divided by their own sampled peak to compare shapes; these vertical values are not raw amplitudes. The gold factor needs no rescaling.</p>
      <LegendrePlot curves={constructionCurves} roots={associatedRoots} x={x} select={setX} theta={theta} label="Legendre derivative construction interactive plot" showNodes={nodes}/>
      <MathFormula tex={String.raw`\frac{d^{${q}}P_{${l}}}{dx^{${q}}}=${polynomialExpression(l,q)}`} block/>
      <MathFormula tex={String.raw`P_{${l}}^{${q}}(x)=(-1)^{${q}}(1-x^2)^{${q}/2}\frac{d^{${q}}P_{${l}}}{dx^{${q}}}`} block/>
      <p className="text-xs text-slate-400">The construction identity above is standard phase at positive order q = |m|. Negative orders and notes phase add the factors shown below; the rose curve includes your active signed order and phase. At order zero the derivative and associated shapes coincide, and the gold factor equals one.</p>
    </section>}
    <section className={`${panel} mt-4`}><h2 className="font-semibold">Actual roots • not evenly spaced</h2><div className="mt-3 grid gap-4 text-xs leading-6 md:grid-cols-2"><div><p className="text-cyan-200">Ordinary: {l} interior roots</p><p className="break-words text-slate-300">{ordinaryRoots.length?ordinaryRoots.map(r=>theta?`${(Math.acos(r)*180/Math.PI).toFixed(4)}°`:r.toFixed(6)).join(', '):'None: P₀ is constant.'}</p></div><div><p className="text-rose-200">Associated: {l-q} interior roots</p><p className="break-words text-slate-300">{associatedRoots.length?associatedRoots.map(r=>theta?`${(Math.acos(r)*180/Math.PI).toFixed(4)}°`:r.toFixed(6)).join(', '):'None: the differentiated polynomial is constant.'}</p></div></div><p className="mt-3 text-xs text-slate-400">Roots are listed in increasing x (decreasing θ). Nonzero order also vanishes at x = ±1, which are endpoint zeros and are excluded from these counts. Changing phase or normalization never moves a root.</p></section>
    <details open className={`${panel} mt-4`}><summary className="cursor-pointer font-semibold text-cyan-100">Learn the mathematics • formulas, conventions and EM meaning</summary><div className="mt-4 grid gap-5 text-sm leading-7 text-slate-300 lg:grid-cols-2">
      <div className="min-w-0"><h3 className="font-semibold text-white">1 · Start with Rodrigues’ formula</h3><MathFormula tex={String.raw`P_\ell(x)=\frac1{2^\ell\ell!}\frac{d^\ell}{dx^\ell}(x^2-1)^\ell`} block/><p>These ordinary polynomials solve the axisymmetric angular equation from Laplace’s equation. They are normalized by their endpoint value, not by unit squared integral.</p><MathFormula tex={String.raw`\frac d{dx}\left[(1-x^2)\frac{dP_\ell}{dx}\right]+\ell(\ell+1)P_\ell=0`} block/>
      <h3 className="mt-4 font-semibold text-white">2 · Add associated order</h3><MathFormula tex={String.raw`P_\ell^q(x)=(-1)^q(1-x^2)^{q/2}\frac{d^qP_\ell}{dx^q},\quad q=|m|`} block/><p>On this real interval these are precisely Ferrers functions of the first kind. For odd order, the square-root factor means the full function is not a polynomial in x. The name “associated Legendre polynomial” is common, but “function” is more precise.</p><MathFormula tex={String.raw`(1-x^2)y''-2xy'+\left[\ell(\ell+1)-\frac{m^2}{1-x^2}\right]y=0`} block/><p>This ODE applies in the open interval. For nonzero order, the endpoint values are zero; derivatives can be singular there for odd order, even though the function remains finite.</p></div>
      <div className="min-w-0"><h3 className="font-semibold text-white">3 · Keep conventions explicit</h3><MathFormula tex={String.raw`P_\ell^{-q}=(-1)^q\frac{(\ell-q)!}{(\ell+q)!}P_\ell^q`} block/><MathFormula tex={String.raw`\widetilde P_\ell^m=(-1)^{|m|}P_\ell^m`} block/><p>Negative raw orders have a factorial scale as well as a phase. Spherical normalization compensates that scale, leaving the corresponding signed-order relation used by the harmonic explorer.</p><MathFormula tex={String.raw`\widehat P_\ell^m=\sqrt{\frac{2\ell+1}{4\pi}\frac{(\ell-m)!}{(\ell+m)!}}\,P_\ell^m`} block/><p>The factorials here use signed m. The same normalization is applied to the notes function when that phase is active. This is the latitude factor of a normalized complex spherical harmonic, not a unit-norm real basis.</p>
      <h3 className="mt-4 font-semibold text-white">4 · From these curves to electromagnetic fields</h3><MathFormula tex={String.raw`Y_\ell^m(\theta,\psi)=\widehat P_\ell^m(\cos\theta)e^{im\psi}`} block/><p>Axisymmetric electrostatic multipoles use ordinary Pℓ(cos θ). Non-axisymmetric angular structure requires associated functions and longitude dependence. The signs plotted here describe basis-function values; they are not automatically electric charges.</p><MathFormula tex={String.raw`V_{\rm axisym}(r,\theta)=\sum_{\ell=0}^{\infty}\left(a_\ell r^\ell+b_\ell r^{-\ell-1}\right)P_\ell(\cos\theta)`} block/><p>This potential expansion applies within a charge-free spherical shell; boundary conditions determine the coefficients and which radial terms are allowed.</p><a href="/#/phd-physics/spherical-harmonics" className="text-cyan-300 underline">Continue to the Spherical Harmonics Explorer →</a></div>
    </div></details>
    <section className={`${panel} mt-4`}><h2 className="font-semibold">Orthogonality &amp; normalization • independent quadrature</h2><div className="mt-3 grid gap-4 md:grid-cols-2"><div className="min-w-0 text-sm leading-7 text-slate-300"><MathFormula tex={String.raw`\int_{-1}^1P_\ell P_k\,dx=\frac2{2\ell+1}\delta_{\ell k}`} block/><MathFormula tex={String.raw`\int_{-1}^1(\widehat P_\ell^m)^2\,dx=\frac1{2\pi}`} block/><p>The second norm is not one: the remaining longitude integral in a complex harmonic contributes 2π. The check uses 96-point Gauss–Legendre quadrature and the stable recurrence, independent of plot sampling.</p></div><div className="min-w-0 rounded-xl bg-black/25 p-4 text-xs leading-7 text-slate-300"><MathFormula tex={String.raw`\int_{-1}^1P_{${l}}^2\,dx\approx${fmt(verification.norm)}`} block/><p>Expected: {(2/(2*l+1)).toPrecision(8)} · relative error: {Math.abs(verification.norm/(2/(2*l+1))-1).toExponential(2)}</p><MathFormula tex={String.raw`\int_{-1}^1P_{${l}}P_{${verification.other}}\,dx\approx${fmt(verification.cross)}`} block/><p>Expected zero for these unequal degrees.</p><MathFormula tex={String.raw`\int_{-1}^1(\widehat P_{${l}}^{${m}})^2\,dx\approx${fmt(verification.associatedNorm)}`} block/><p>Expected: {(1/(2*Math.PI)).toPrecision(8)}. Phase choice does not change a squared norm.</p></div></div></section>
    <p className="mt-4 text-xs leading-6 text-slate-400">Values use a normalized associated-Legendre recurrence through degree 64. Symbolic coefficients use exact integer arithmetic; direct floating-point evaluation of expanded high-degree polynomials can suffer cancellation. Root positions are numerical, with rounded display values. This project covers the real interval −1 ≤ x ≤ 1, not the separate outside-interval branch conventions.</p>
    <PhysicsReferences project="legendre"/>
  </main></div>;
}
