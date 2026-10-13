import { useEffect, useRef, useState } from 'react';
import { oscillatorResponse, steadyMotion, type OscillatorParameters } from '@/lib/physics/drivenOscillator';
export default function SteadyOscillatorMotion({omega,parameters}:{omega:number;parameters:OscillatorParameters}){
 const canvas=useRef<HTMLCanvasElement>(null),clock=useRef(0);
 const [playing,setPlaying]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches),[speed,setSpeed]=useState(1),[reset,setReset]=useState(0);
 const response=oscillatorResponse(omega,parameters);
 useEffect(()=>{
  const ctx=canvas.current?.getContext('2d');if(!ctx)return;
  let frame=0,last=0;
  const draw=(now:number)=>{
   if(last&&playing)clock.current+=Math.min((now-last)/1000,0.05)*speed;
   last=now;
   const t=clock.current,motion=steadyMotion(t,omega,parameters),force=parameters.acceleration*Math.cos(omega*t);
   const range=Math.max(0.25,response.amplitude*1.2),scale=170/range,center=350,massX=center+motion.x*scale;
   ctx.clearRect(0,0,700,190);ctx.fillStyle='#050b14';ctx.fillRect(0,0,700,190);
   ctx.fillStyle='#94a3b8';ctx.font='11px sans-serif';ctx.fillText(`t = ${t.toFixed(2)} s   x = ${motion.x.toFixed(5)} m   ẋ = ${motion.velocity.toFixed(5)} m/s`,15,22);
   ctx.fillText(`A = ${response.amplitude.toFixed(5)} m   δ = ${(response.phase*180/Math.PI).toFixed(2)}°`,15,40);
   ctx.strokeStyle='#64748b';ctx.beginPath();ctx.moveTo(30,145);ctx.lineTo(670,145);ctx.stroke();
   ctx.fillStyle='#475569';ctx.fillRect(30,60,10,85);
   // The displayed spring is attached to the moving mass, with equilibrium at x = 0.
   const end=massX-22;ctx.strokeStyle='#67e8f9';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(40,100);ctx.lineTo(55,100);
   for(let i=0;i<=16;i++)ctx.lineTo(55+(end-65)*i/16,100+(i===0||i===16?0:i%2?10:-10));ctx.lineTo(end,100);ctx.stroke();
   ctx.strokeStyle='#475569';ctx.setLineDash([3,4]);ctx.beginPath();ctx.moveTo(center,55);ctx.lineTo(center,152);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle='#164e63';ctx.fillRect(massX-22,78,44,44);ctx.strokeStyle='#67e8f9';ctx.strokeRect(massX-22,78,44,44);ctx.fillStyle='#cffafe';ctx.font='12px sans-serif';ctx.fillText('m',massX-5,105);
   // Force arrow is normalized independently; displacement retains its labelled metre scale.
   const length=force/parameters.acceleration*65,start=massX,endForce=start+length;
   ctx.strokeStyle='#fbbf24';ctx.beginPath();ctx.moveTo(start,64);ctx.lineTo(endForce,64);if(Math.abs(length)>1){const sign=Math.sign(length);ctx.moveTo(endForce-sign*7,60);ctx.lineTo(endForce,64);ctx.lineTo(endForce-sign*7,68);}ctx.stroke();
   ctx.fillStyle='#fbbf24';ctx.font='10px sans-serif';ctx.fillText(`F/m = ${force.toFixed(3)} m/s²`,480,22);
   for(const v of [-range,0,range]){const px=center+v*scale;ctx.fillStyle='#94a3b8';ctx.fillRect(px,141,1,8);ctx.fillText(`${v.toFixed(3)} m`,px-20,166);}
   ctx.fillText('Dashed line: equilibrium • metre scale expands only when needed to fit the motion',15,184);
   if(playing)frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frame);
 },[omega,parameters,response.amplitude,response.phase,playing,speed,reset]);
 return <div className="mb-3 rounded-xl border border-slate-700 bg-black/20 p-3"><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h3 className="text-xs font-semibold text-cyan-300">Exact steady-state mass motion</h3><div className="flex items-center gap-2 text-xs"><button onClick={()=>setPlaying(v=>!v)} className="rounded bg-slate-800 px-2 py-1">{playing?'Pause':'Play'}</button><button onClick={()=>{clock.current=0;setReset(v=>v+1);}} className="rounded bg-slate-800 px-2 py-1">Reset time</button><label>Speed <select aria-label="Oscillator playback speed" value={speed} onChange={e=>setSpeed(+e.target.value)} className="rounded bg-slate-800 p-1">{[0.25,0.5,1,2].map(v=><option key={v} value={v}>{v}×</option>)}</select></label></div></div><canvas ref={canvas} width="700" height="190" role="img" aria-label="Animated spring and mass following the exact steady-state displacement; gold arrow indicates driving force" className="w-full rounded-lg"/><p className="mt-2 text-[11px] leading-5 text-slate-400">x(t) = A cos(ωt − δ). Sliders update the steady state instantly at the current time; switching transients are not simulated. The force arrow uses a separate normalized scale. {omega===0?'At zero driving frequency the mass holds its static displacement.':''}</p></div>;
}
