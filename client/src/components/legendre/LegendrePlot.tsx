import { useEffect, useMemo, useRef, useState } from 'react';
export type PlotCurve = { name:string; color:string; value:(x:number)=>number; dashed?:boolean };
export default function LegendrePlot({curves,roots,x,select,theta,label,showNodes}:{curves:PlotCurve[];roots:number[];x:number;select:(x:number)=>void;theta:boolean;label:string;showNodes:boolean}) {
  const svg=useRef<SVGSVGElement>(null);
  const [width,setWidth]=useState(700);
  useEffect(()=>{if(!svg.current)return;const observer=new ResizeObserver(entries=>setWidth(entries[0].contentRect.width||700));observer.observe(svg.current);return()=>observer.disconnect();},[]);
  const tickFont=Math.max(12,Math.min(23,10*700/width));
  const samples=useMemo(()=>Array.from({length:2049},(_,i)=>{const u=i/2048;const x=theta?Math.cos(u*Math.PI):-1+2*u;return {u,values:curves.map(c=>c.value(x))};}),[curves,theta]);
  const maximum=Math.max(...samples.flatMap(s=>s.values.map(Math.abs)),Number.MIN_VALUE);
  const scale=maximum*1.12, exponent=Math.floor(Math.log10(maximum)), axisFactor=Math.abs(exponent)>=3?10**exponent:1;
  const gx=(u:number)=>68+u*590,gy=(v:number)=>175-v/scale*128;
  const ux=(x:number)=>theta?Math.acos(Math.max(-1,Math.min(1,x)))/Math.PI:(x+1)/2;
  const pick=(event:React.PointerEvent<SVGSVGElement>)=>{
    const matrix=svg.current?.getScreenCTM();if(!matrix||!svg.current)return;
    const p=svg.current.createSVGPoint();p.x=event.clientX;p.y=event.clientY;const local=p.matrixTransform(matrix.inverse());
    const u=Math.max(0,Math.min(1,(local.x-68)/590));select(theta?Math.cos(u*Math.PI):-1+2*u);
  };
  return <div className="min-w-0"><svg ref={svg} viewBox="0 0 700 360" className="w-full touch-pan-y select-none rounded-xl bg-[#080f1c]" role="img" aria-label={label} tabIndex={0}
    onPointerDown={e=>{if(e.button!==0)return;pick(e);if(e.pointerType==='mouse')e.currentTarget.setPointerCapture(e.pointerId);}}
    onPointerMove={e=>{if(e.pointerType==='mouse'&&e.buttons===1)pick(e);}}
    onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const u=ux(x)+(e.key==='ArrowRight'?.005:-.005);select(theta?Math.cos(Math.max(0,Math.min(1,u))*Math.PI):Math.max(-1,Math.min(1,-1+2*u)));}}}>
    <defs><clipPath id={label.replace(/\W/g,'')}><rect x="68" y="35" width="590" height="280"/></clipPath></defs>
    {[-1,-.5,0,.5,1].map(t=><g key={t}><line x1="68" x2="658" y1={gy(t*scale)} y2={gy(t*scale)} stroke="#334155" strokeOpacity=".6"/><text x="58" y={gy(t*scale)+4} textAnchor="end" fill="#94a3b8" fontSize={tickFont}>{(t*scale/axisFactor).toFixed(2)}</text></g>)}
    {Array.from({length:5},(_,i)=>i/4).map(u=><g key={u}><line x1={gx(u)} x2={gx(u)} y1="35" y2="315" stroke="#334155" strokeOpacity=".5"/><text x={gx(u)} y="331" textAnchor="middle" fill="#94a3b8" fontSize={tickFont}>{theta?`${u*180}°`:(-1+2*u).toFixed(1)}</text></g>)}
    <line x1="68" x2="658" y1={gy(0)} y2={gy(0)} stroke="#64748b"/>
    {showNodes&&roots.map(r=><g key={r}><line x1={gx(ux(r))} x2={gx(ux(r))} y1="35" y2="315" stroke="#fbbf24" strokeOpacity=".45" strokeDasharray="3 4"/><circle cx={gx(ux(r))} cy={gy(0)} r="3.5" fill="#fbbf24"/></g>)}
    <g clipPath={`url(#${label.replace(/\W/g,'')})`}>{curves.map((curve,j)=><path key={curve.name} d={samples.map((s,i)=>`${i?'L':'M'}${gx(s.u).toFixed(2)},${gy(s.values[j]).toFixed(2)}`).join(' ')} fill="none" stroke={curve.color} strokeWidth={j===0?2.7:1.4} strokeDasharray={curve.dashed?'5 4':undefined}/>)}
      <line x1={gx(ux(x))} x2={gx(ux(x))} y1="35" y2="315" stroke="#f8fafc" strokeDasharray="4 4"/>
      <circle cx={gx(ux(x))} cy={gy(curves[0].value(x))} r="5" fill="#f8fafc" stroke={curves[0].color} strokeWidth="2"/>
    </g>
    <text x="68" y="23" fill="#cbd5e1" fontSize={tickFont}>{axisFactor!==1?`Vertical values × 10^${exponent}`:'Function value'}</text>
    <text x="365" y="356" fill="#cbd5e1" fontSize={tickFont}>{theta?'Colatitude θ • x = cos θ':'Argument x'}</text>
  </svg><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">{curves.map(c=><span key={c.name} style={{color:c.color}}>{c.dashed?'┄':'━'} {c.name}</span>)}{showNodes&&<span className="text-amber-300">● Interior roots</span>}<span className="text-slate-300">⊕ Linked probe</span></div>
  <p className="mt-2 text-[11px] leading-5 text-slate-400">Tap to select; drag with a mouse or use arrow keys. Vertical range fits all visible curves. {theta?'The horizontal coordinate increases from north to south, so x decreases from +1 to −1.':'The plotted domain is −1 ≤ x ≤ 1.'}</p></div>;
}
