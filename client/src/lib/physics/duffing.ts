export type DuffingParameters={alpha:number;nu:number;force:number};
export type DuffingRoot={amplitude:number;phase:number;stable:boolean;local:boolean};
// Dimensionless x¨ + ν x˙ + x + αx³ = f cos(ωτ).
export function duffingRoots(omega:number,p:DuffingParameters):DuffingRoot[]{
 const a=0.75*p.alpha,d=1-omega**2,b=p.nu*omega;
 if(Math.abs(a)<1e-10)return [{amplitude:p.force/Math.hypot(d,b),phase:Math.atan2(b,d),stable:true,local:true}];
 const poly=(y:number)=>y*((d+a*y)**2+b*b)-p.force**2;
 const slope=(y:number)=>(d+a*y)*(d+3*a*y)+b*b;
 const discriminant=(4*a*d)**2-12*a*a*(d*d+b*b);
 const turning=discriminant>0?[(-4*a*d-Math.sqrt(discriminant))/(6*a*a),(-4*a*d+Math.sqrt(discriminant))/(6*a*a)].filter(v=>v>0).sort((x,y)=>x-y):[];
 let upper=Math.max(1,...turning.map(v=>v*2));while(poly(upper)<0)upper*=2;
 const limits=[0,...turning,upper],roots:number[]=[];
 for(let i=0;i<limits.length-1;i++){
  let lo=limits[i],hi=limits[i+1];if(poly(lo)*poly(hi)>0)continue;
  for(let j=0;j<70;j++){const mid=(lo+hi)/2;if(poly(lo)*poly(mid)<=0)hi=mid;else lo=mid;}
  const y=(lo+hi)/2;if(!roots.some(v=>Math.abs(v-y)<1e-8))roots.push(y);
 }
 return roots.map(y=>({amplitude:Math.sqrt(y),phase:Math.atan2(b,d+a*y),stable:slope(y)>0,local:p.alpha>=0||y<0.85**2/(-p.alpha)}));
}
export function sweepBranch(frequencies:number[],p:DuffingParameters){
 let previous:number|null=null;
 return frequencies.map(omega=>{
  const roots=duffingRoots(omega,p).filter(r=>r.stable&&r.local);
  const chosen=roots.reduce<DuffingRoot|null>((best,r)=>!best||Math.abs(r.amplitude-(previous??0))<Math.abs(best.amplitude-(previous??0))?r:best,null);
  const jump=previous!==null&&chosen!==null&&Math.abs(chosen.amplitude-previous)>0.12;
  previous=chosen?.amplitude??null;return {omega,root:chosen,jump};
 });
}
export function integrateDuffing(omega:number,p:DuffingParameters,seed:DuffingRoot){
 const period=2*Math.PI/omega,steps=320,h=period/steps,burn=Math.max(80,Math.ceil(12/(p.nu*period))),measure=24;
 let x=seed.amplitude*Math.cos(seed.phase),v=seed.amplitude*omega*Math.sin(seed.phase),t=0,cos=0,sin=0,maximum=-Infinity,minimum=Infinity;
 const rhs=(xx:number,vv:number,tt:number)=>-p.nu*vv-xx-p.alpha*xx**3+p.force*Math.cos(omega*tt);
 for(let i=0;i<(burn+measure)*steps;i++){
  const k1x=v,k1v=rhs(x,v,t),k2x=v+h*k1v/2,k2v=rhs(x+h*k1x/2,v+h*k1v/2,t+h/2),k3x=v+h*k2v/2,k3v=rhs(x+h*k2x/2,v+h*k2v/2,t+h/2),k4x=v+h*k3v,k4v=rhs(x+h*k3x,v+h*k3v,t+h);
  x+=h*(k1x+2*k2x+2*k3x+k4x)/6;v+=h*(k1v+2*k2v+2*k3v+k4v)/6;t+=h;
  if(!Number.isFinite(x)||Math.abs(x)>20)return {escaped:true,amplitude:NaN,halfRange:NaN,cycles:burn+measure};
  if(i>=burn*steps){cos+=x*Math.cos(omega*t);sin+=x*Math.sin(omega*t);maximum=Math.max(maximum,x);minimum=Math.min(minimum,x);}
 }
 return {escaped:false,amplitude:2*Math.hypot(cos,sin)/(measure*steps),halfRange:(maximum-minimum)/2,cycles:burn+measure};
}
