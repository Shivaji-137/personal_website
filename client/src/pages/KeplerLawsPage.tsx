import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import PhysicsReferences from '@/components/PhysicsReferences';
import { keplerPeriod, keplerState, sweptArea } from '@/lib/physics/kepler';
import { wrap } from '@/lib/physics/astronomy';
const planets = [
  {name:'Mercury',a:0.387099,p:0.2408467,e:0.205636}, {name:'Venus',a:0.723336,p:0.6151973,e:0.006777},
  {name:'Earth',a:1.000003,p:1.0000174,e:0.016711}, {name:'Mars',a:1.523710,p:1.8808476,e:0.093394},
  {name:'Jupiter',a:5.202887,p:11.862615,e:0.048386}, {name:'Saturn',a:9.536676,p:29.447498,e:0.053862},
  {name:'Uranus',a:19.189165,p:84.016846,e:0.047257}, {name:'Neptune',a:30.069923,p:164.79132,e:0.008590},
];
const colors=['#fcd34d','#fb7185','#67e8f9','#a78bfa','#34d399','#fb923c','#60a5fa','#e879f9'];
const panel='rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-5';
type PlotPoint={name:string;a:number;p:number};
export default function KeplerLawsPage() {
 const [a,setA]=useState(2),[b,setB]=useState(1.6),[mass,setMass]=useState(1),[phase,setPhase]=useState(0);
 const [playing,setPlaying]=useState(true),[speed,setSpeed]=useState(0.5),[sectors,setSectors]=useState(8),[showAreas,setShowAreas]=useState(true),[showVelocity,setShowVelocity]=useState(false);
 const [plotted,setPlotted]=useState<string[]>(['Earth']),[custom,setCustom]=useState<PlotPoint[]>([]),[selected,setSelected]=useState<PlotPoint|null>(null);
 useEffect(()=>{document.title='Kepler’s Laws Demonstrator | Shivaji.dev';},[]);
 const state=keplerState(phase,a,b,mass),period=state.period;
 useEffect(()=>{if(!playing)return;let id:number,last:number|undefined;const tick=(now:number)=>{if(last!==undefined){const dt=Math.min((now-last)/1000,0.1);setPhase(v=>wrap(v+dt*speed/period,1));}last=now;id=requestAnimationFrame(tick);};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);},[playing,speed,period]);
 const scale=190/a, cx=260,cy=205, focusX=cx+a*state.e*scale;
 const xy=(p:{x:number;y:number})=>({x:focusX+p.x*scale,y:cy-p.y*scale});
 const current=xy(state), activeSector=Math.min(sectors-1,Math.floor(phase*sectors));
 const wedges=useMemo(()=>Array.from({length:sectors},(_,j)=>{
  const start=j/sectors,end=(j+1)/sectors, points=Array.from({length:81},(_,i)=>xy(keplerState(start+(end-start)*i/80,a,b,mass)));
  return {path:`M ${focusX} ${cy} L ${points.map(p=>`${p.x} ${p.y}`).join(' L ')} Z`,area:sweptArea(start,end,a,b)};
 }),[a,b,mass,sectors]);
 const partial=Array.from({length:81},(_,i)=>xy(keplerState(activeSector/sectors+(phase-activeSector/sectors)*i/80,a,b,mass)));
 const partialPath=`M ${focusX} ${cy} L ${partial.map(p=>`${p.x} ${p.y}`).join(' L ')} Z`;
 const changeA=(v:number)=>{setA(v);setB(old=>Math.max(v*0.2,Math.min(v,old)));};
 const loadPlanet=(p:typeof planets[number])=>{setA(p.a);setB(p.a*Math.sqrt(1-p.e*p.e));setMass(1);setPhase(0);};
 const logX=(v:number)=>60+(Math.log10(v)+1)*490/3,logY=(v:number)=>305-(Math.log10(v)+1.5)*260/4.5;
 const points=[...planets.filter(p=>plotted.includes(p.name)),...custom];
 const addCustom=()=>{const point={name:`Trial ${Math.max(0,...custom.map(p=>Number(p.name.split(' ')[1])))+1}`,a,p:period};setCustom(old=>[...old.slice(-19),point]);setSelected(point);};
 const addNext=()=>{const next=planets.find(p=>!plotted.includes(p.name));if(next){setPlotted(old=>[...old,next.name]);setSelected(next);}};
 const theory=Array.from({length:121},(_,i)=>{const v=10**(-1+i*3/120);return `${logX(v)},${logY(keplerPeriod(v,mass))}`;}).join(' ');
 return <div className="min-h-screen bg-[#08080a] text-white"><StarBackground/><Header/><main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24">
 <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Physics Lab • Orbital mechanics</p><h1 className="my-3 text-3xl font-bold md:text-5xl">Kepler’s Laws Demonstrator</h1><p className="mb-6 max-w-3xl text-slate-300">Shape an ellipse, compare equal-time sectors, and build a planetary period diagram. One orbit connects all three laws.</p>
 <div className="mb-4 flex flex-wrap gap-2">{[{name:'Circle',ratio:1},{name:'Moderate ellipse',ratio:0.8},{name:'Highly eccentric',ratio:0.3}].map(p=><button key={p.name} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs hover:border-cyan-300" onClick={()=>{setB(a*p.ratio);setPhase(0);}}>{p.name}</button>)}<select aria-label="Load planet orbit" value="" className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs" onChange={ev=>{const p=planets.find(p=>p.name===ev.target.value);if(p)loadPlanet(p);}}><option value="">Load a planet’s ellipse…</option>{planets.map(p=><option key={p.name}>{p.name}</option>)}</select></div>
 <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><section className={panel}><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-semibold">Laws I & II • Ellipse and equal areas</h2><p className="mt-1 text-xs text-slate-400">Sun at a focus • top-down orbital plane</p></div><div className="flex gap-2"><button className="rounded-full bg-cyan-300 px-4 py-2 text-xs text-black" onClick={()=>setPlaying(v=>!v)}>{playing?'Pause':'Play'}</button><button className="rounded-full bg-slate-800 px-4 py-2 text-xs" onClick={()=>{setPhase(0);setPlaying(false);}}>Reset</button></div></div>
 <svg viewBox="0 0 520 410" className="mx-auto max-h-[420px] w-full" role="img" aria-label="Elliptical orbit with Sun at a focus and shaded equal-time swept sectors">
 <line x1={cx-190} y1={cy} x2={cx+190} y2={cy} stroke="#475569" strokeDasharray="3 5"/>
 <line x1={cx} y1={cy-b*scale} x2={cx} y2={cy+b*scale} stroke="#475569" strokeDasharray="3 5"/>
 {showAreas&&wedges.map((w,j)=><path key={j} d={w.path} fill={colors[j%colors.length]} fillOpacity={j===activeSector?0.18:0.09} stroke={colors[j%colors.length]} strokeOpacity="0.45" strokeWidth="0.6"/>)}
 {showAreas&&<path d={partialPath} fill={colors[activeSector%colors.length]} fillOpacity="0.5"/>}
 <ellipse cx={cx} cy={cy} rx="190" ry={b*scale} fill="none" stroke="#67e8f9" strokeWidth="1.6"/>
 <line x1={focusX} y1={cy} x2={current.x} y2={current.y} stroke="#fcd34d" strokeWidth="1.3"/>
 <circle cx={cx-a*state.e*scale} cy={cy} r="3" fill="none" stroke="#94a3b8"/><text x={cx-a*state.e*scale} y={cy+22} fill="#94a3b8" fontSize="10" textAnchor="middle">Other focus</text>
 <circle cx={cx} cy={cy} r="2" fill="#94a3b8"/><text x={cx} y={cy-10} fill="#94a3b8" fontSize="10">Center</text>
 <circle cx={focusX} cy={cy} r="7" fill="#fcd34d"/><text x={focusX} y={cy-13} fill="#fcd34d" textAnchor="middle" fontSize="12">Sun</text>
 <circle cx={current.x} cy={current.y} r="5" fill="#67e8f9"/>
 {showVelocity&&<g><line x1={current.x} y1={current.y} x2={current.x+state.vx/state.speed*35} y2={current.y-state.vy/state.speed*35} stroke="#34d399" strokeWidth="2"/><circle cx={current.x+state.vx/state.speed*35} cy={current.y-state.vy/state.speed*35} r="2" fill="#34d399"/></g>}
 <text x={cx+190} y={cy+34} textAnchor="middle" fill="#fcd34d" fontSize="10">Perihelion</text><text x={cx-190} y={cy+34} textAnchor="middle" fill="#94a3b8" fontSize="10">Aphelion</text>
 <line x1={cx} y1="388" x2={cx+190} y2="388" stroke="#f472b6"/><text x={cx+95} y="381" textAnchor="middle" fill="#f472b6" fontSize="11">a = {a.toFixed(3)} AU</text>
 <text x={cx+8} y={cy-b*scale-9} fill="#f472b6" fontSize="11">b = {b.toFixed(3)} AU</text>
 </svg>
 <label className="block text-xs text-slate-300"><span className="flex justify-between"><span>Elapsed orbital phase • scrub to compare sectors</span><span>{phase.toFixed(3)} P</span></span><input aria-label="Orbital phase" type="range" min="0" max="0.9999" step="0.0001" value={phase} onChange={ev=>{setPhase(+ev.target.value);setPlaying(false);}} className="mt-2 w-full accent-cyan-300"/></label>
 <div className="mt-4 grid grid-cols-3 gap-3 text-xs"><div className="rounded-lg bg-black/30 p-3"><p className="text-slate-400">Sun–planet distance</p><p className="mt-1 font-mono text-cyan-300">{state.r.toFixed(3)} AU</p></div><div className="rounded-lg bg-black/30 p-3"><p className="text-slate-400">Orbital speed</p><p className="mt-1 font-mono text-cyan-300">{(state.speed*4.74047).toFixed(2)} km/s</p></div><div className="rounded-lg bg-black/30 p-3"><p className="text-slate-400">Equal-time interval</p><p className="mt-1 font-mono text-cyan-300">{(period/sectors).toFixed(3)} yr</p></div></div>
 <div className="mt-4 flex flex-wrap gap-2">{wedges.map((w,j)=><button key={j} aria-label={`Inspect sector ${j+1}`} className="rounded-lg border px-3 py-2 text-xs" style={{borderColor:colors[j%8],background:j===activeSector?'#1e293b':'transparent'}} onClick={()=>{setPhase((j+0.5)/sectors);setPlaying(false);}}><span style={{color:colors[j%8]}}>A{j+1}</span> {w.area.toFixed(4)} AU²</button>)}</div><p className="mt-3 text-xs leading-relaxed text-slate-400">Every complete sector spans the same time and area. The bright wedge is the current, partially completed interval. Near perihelion, the planet moves faster through a wider angle. Sector areas use the exact Kepler relation; boundaries are sampled for drawing.</p>
 </section><aside className={`${panel} space-y-5`}><h2 className="font-semibold">Orbital playground</h2>
 <label className="block text-sm">Semimajor axis a <span className="float-right font-mono text-cyan-300">{a.toFixed(3)} AU</span><input className="w-full accent-cyan-300" type="range" min="0.3" max="31" step="0.001" value={a} onChange={ev=>changeA(+ev.target.value)}/></label>
 <label className="block text-sm">Semiminor axis b <span className="float-right font-mono text-pink-300">{b.toFixed(3)} AU</span><input className="w-full accent-pink-300" type="range" min={a*0.2} max={a} step={a/1000} value={b} onChange={ev=>setB(Math.max(a*0.2,Math.min(a,+ev.target.value)))}/></label>
 <p className="text-xs text-slate-400">Full axis lengths are 2a and 2b. The controls keep 0 &lt; b ≤ a; b = a gives a circle. The orbit view fits the ellipse automatically.</p>
 <label className="block text-sm">Central mass <span className="float-right font-mono text-cyan-300">{mass.toFixed(2)} M☉</span><input className="w-full" type="range" min="0.2" max="3" step="0.01" value={mass} onChange={ev=>setMass(+ev.target.value)}/></label>
 <label className="block text-sm">Equal-time sectors<select aria-label="Number of equal-time sectors" className="mt-2 w-full rounded bg-slate-800 p-2" value={sectors} onChange={ev=>setSectors(+ev.target.value)}>{[4,6,8,12].map(n=><option key={n}>{n}</option>)}</select></label>
 <div className="flex flex-col gap-2 text-sm"><label><input type="checkbox" checked={showAreas} onChange={ev=>setShowAreas(ev.target.checked)} className="mr-2 accent-cyan-300"/>Show swept areas</label><label><input type="checkbox" checked={showVelocity} onChange={ev=>setShowVelocity(ev.target.checked)} className="mr-2 accent-emerald-300"/>Show velocity direction</label></div>
 <label className="block text-sm">Playback {speed.toFixed(2)} simulated yr/s<input className="w-full" type="range" min="0.05" max="10" step="0.05" value={speed} onChange={ev=>setSpeed(+ev.target.value)}/></label>
 <div className="space-y-2 border-t border-slate-700 pt-4 font-mono text-sm"><p>e = {state.e.toFixed(5)}</p><p>P = {period.toFixed(4)} yr</p><p>Perihelion = {(a*(1-state.e)).toFixed(3)} AU</p><p>Aphelion = {(a*(1+state.e)).toFixed(3)} AU</p><p>dA/dt = {state.areaRate.toFixed(4)} AU²/yr</p></div>
 </aside></div>
 <section className={`${panel} mt-5`}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Law III • Build the period–distance diagram</h2><p className="mt-2 text-sm text-slate-400">Both axes are logarithmic. P ∝ a³ᐟ² appears as a straight line of slope 1.5.</p></div><div className="flex flex-wrap gap-2"><button onClick={addNext} disabled={plotted.length===8} className="rounded-lg bg-slate-800 px-3 py-2 text-xs disabled:opacity-40">Plot next planet</button><button onClick={()=>setPlotted(planets.map(p=>p.name))} className="rounded-lg bg-slate-800 px-3 py-2 text-xs">Plot all planets</button><button onClick={addCustom} className="rounded-lg bg-cyan-300 px-3 py-2 text-xs text-black">Plot current orbit</button><button onClick={()=>{setPlotted([]);setCustom([]);setSelected(null);}} className="rounded-lg bg-slate-800 px-3 py-2 text-xs">Clear points</button></div></div>
 <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]"><svg viewBox="0 0 600 365" className="max-h-[400px] w-full" role="img" aria-label="Interactive log-log graph of semimajor axis and orbital period">
 {[-1,0,1,2].map(v=><g key={v}><line x1={logX(10**v)} x2={logX(10**v)} y1="45" y2="305" stroke="#263548"/><text x={logX(10**v)} y="325" textAnchor="middle" fill="#94a3b8" fontSize="11">{10**v}</text></g>)}
 {[-1,0,1,2,3].map(v=><g key={v}><line x1="60" x2="550" y1={logY(10**v)} y2={logY(10**v)} stroke="#263548"/><text x="48" y={logY(10**v)+4} textAnchor="end" fill="#94a3b8" fontSize="11">{10**v}</text></g>)}
 <defs><clipPath id="kepler-plot-clip"><rect x="60" y="45" width="490" height="260"/></clipPath></defs>
 <g clipPath="url(#kepler-plot-clip)"><polyline points={theory} fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="5 4"/></g>
 <text x="70" y="30" fill="#67e8f9" fontSize="11">Model curve: {mass.toFixed(2)} M☉ • slope 1.5</text>
 {points.map((p,i)=><g key={`${p.name}-${i}`} role="button" tabIndex={0} aria-label={`${p.name}: ${p.a} AU, ${p.p} years. Inspect point.`} onClick={()=>setSelected(p)} onKeyDown={ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();setSelected(p);}}} className="cursor-pointer outline-none focus:stroke-white"><title>{p.name}: a = {p.a} AU, P = {p.p} yr</title><circle cx={logX(p.a)} cy={logY(p.p)} r="10" fill="transparent"/><circle cx={logX(p.a)} cy={logY(p.p)} r={selected?.name===p.name?6:4} fill={p.name.startsWith('Trial')?'#f472b6':'#fcd34d'}/><text x={logX(p.a)+7} y={logY(p.p)-7+(i%2)*17} fill="#cbd5e1" fontSize="9">{p.name}</text></g>)}
 <circle cx={logX(a)} cy={logY(period)} r="7" fill="none" stroke="#f472b6" strokeWidth="2"/>
 <text x="300" y="355" fill="#cbd5e1" textAnchor="middle" fontSize="12">Semimajor axis a (AU) • logarithmic</text><text transform="translate(15 180) rotate(-90)" fill="#cbd5e1" textAnchor="middle" fontSize="12">Period P (years) • logarithmic</text>
 </svg><div className="text-sm"><h3 className="font-semibold">Choose planets to plot</h3><div className="mt-3 grid grid-cols-2 gap-2">{planets.map(p=><label key={p.name} className="text-xs"><input className="mr-2 accent-amber-300" type="checkbox" checked={plotted.includes(p.name)} onChange={ev=>setPlotted(old=>ev.target.checked?[...old,p.name]:old.filter(n=>n!==p.name))}/>{p.name}</label>)}</div>
 <div className="mt-5 rounded-xl bg-black/30 p-4">{selected?<><p className="text-cyan-300">{selected.name}</p><p className="mt-2 font-mono text-xs">a = {selected.a.toFixed(4)} AU<br/>P = {selected.p.toFixed(5)} yr<br/>P²/a³ = {(selected.p**2/selected.a**3).toFixed(5)}</p></>:<p className="text-xs text-slate-400">Click a plotted point to inspect its period and distance.</p>}</div><p className="mt-4 text-xs leading-relaxed text-slate-400">Gold points: rounded solar-system data. Pink points: your trial orbits; the outlined marker tracks the live orbit. Changing central mass shifts the model curve, while the real planets remain solar data. Small deviations reflect rounded elements, planetary masses and perturbations.</p></div></div>
 </section>
 <section className={`${panel} mt-5 text-sm leading-7 text-slate-300`}><h2 className="font-semibold text-white">Three laws, one two-body model</h2><p><span className="text-cyan-300">I.</span> e = √(1 − b²/a²): the Sun lies at one focus, a distance ae from the ellipse center.</p><p><span className="text-amber-300">II.</span> M = E − e sin E = 2πt/P; swept area = (ab/2)(ΔE − e Δsin E) = πab Δt/P.</p><p><span className="text-pink-300">III.</span> P² = a³/M in solar units; log₁₀ P = 1.5 log₁₀ a − 0.5 log₁₀ M.</p><p>The playground assumes a negligible-mass planet and a fixed central star in an isolated Newtonian two-body system. Time is in Julian years and distance in AU; the solar-unit normalization is rounded. Planetary axes and eccentricities (Earth uses the Earth–Moon barycenter) use rounded J2000 fitted elements from JPL, and periods use JPL sidereal periods. These are teaching values, not a dated ephemeris.</p></section>
 <PhysicsReferences project="kepler"/>
 </main></div>;
}
