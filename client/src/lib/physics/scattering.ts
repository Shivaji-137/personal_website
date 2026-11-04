import {gaussLegendre} from './legendre';
export type ScatteringKind='repulsive'|'attractive'|'screened'|'inverseSquare'|'hard'|'well';
export type ScatteringModel={kind:ScatteringKind;energy:number;strength:number;range:number;radius:number;mass:number};
const quadratures=new Map<number,ReturnType<typeof gaussLegendre>>();
function integrate(fn:(x:number)=>number,end=1,n=96){if(!quadratures.has(n))quadratures.set(n,gaussLegendre(n));return quadratures.get(n)!.reduce((sum,q)=>sum+q.w*fn((q.x+1)*end/2),0)*end/2;}
export function scatteringPotential(s:ScatteringModel,r:number){if(s.kind==='hard')return r<s.radius?Infinity:0;if(s.kind==='well')return r<s.radius?-s.strength:0;if(s.kind==='inverseSquare')return s.strength/r**2;return (s.kind==='attractive'?-1:1)*s.strength/r*(s.kind==='screened'?Math.exp(-r/s.range):1);}
export function scatteringDerivative(s:ScatteringModel,r:number){if(s.kind==='hard'||s.kind==='well')return 0;if(s.kind==='inverseSquare')return -2*s.strength/r**3;const v=scatteringPotential(s,r);return -v*(1/r+(s.kind==='screened'?1/s.range:0));}
export function turningRadius(s:ScatteringModel,b:number){
 if(s.kind==='hard')return Math.max(b,s.radius);
 if(s.kind==='well')return b<s.radius?b/Math.sqrt(1+s.strength/s.energy):b;
 if(s.kind==='inverseSquare')return Math.sqrt(b*b+s.strength/s.energy);
 const a=s.strength/(2*s.energy),root=Math.hypot(a,b);
 if(s.kind==='repulsive')return root+a;
 if(s.kind==='attractive')return b*b/(root+a);
 let lo=b,hi=Math.max(b+s.strength/s.energy,s.range);const f=(r:number)=>1-b*b/r**2-scatteringPotential(s,r)/s.energy;while(f(hi)<0)hi*=2;for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(f(mid)>0)hi=mid;else lo=mid;}return (lo+hi)/2;
}
/** Regularized turning-point integral with u=rmin/r=1-t². */
function radialKernel(s:ScatteringModel,b:number,rmin:number,t:number){const u=1-t*t,r=rmin/u,ratio=b/rmin;
 // Evaluate the difference from the exact turning-point value, avoiding cancellation near t=0.
 const vmin=scatteringPotential(s,rmin),v=scatteringPotential(s,r);
 const g=ratio*ratio*(1-u*u)+(vmin-v)/s.energy;
 const limit=2/Math.sqrt(2*ratio*ratio-rmin*scatteringDerivative(s,rmin)/s.energy);
 return g>0?2*t/Math.sqrt(g):limit;
}
export function scatteringAngle(s:ScatteringModel,b:number,n=96){if(s.kind==='well'){if(b>=s.radius)return 0;const n=Math.sqrt(1+s.strength/s.energy);return 2*(Math.asin(b/s.radius)-Math.asin(b/(n*s.radius)));}if(b<0)throw new RangeError('Use nonnegative impact-parameter magnitude');if(s.kind==='hard')return b>=s.radius?0:2*Math.acos(b/s.radius);if(b===0){if(s.kind==='attractive')return NaN;return Math.PI;}
 if(s.kind==='repulsive'||s.kind==='attractive')return 2*Math.atan(s.strength/(2*s.energy*b));
 if(s.kind==='inverseSquare')return Math.PI*(1-b/Math.sqrt(b*b+s.strength/s.energy));
 const r=turningRadius(s,b),angle=Math.PI-2*b/r*integrate(t=>radialKernel(s,b,r,t),1,n);return Math.min(Math.PI,Math.max(0,angle));
}
export function angleByQuadrature(s:ScatteringModel,b:number,n=128){const r=turningRadius(s,b);return Math.PI-2*b/r*integrate(t=>radialKernel(s,b,r,t),1,n);}
export function differentialCrossSection(s:ScatteringModel,b:number,hScale=1){const theta=scatteringAngle(s,b);if(s.kind==='well'){if(b>=s.radius)return null;const n=Math.sqrt(1+s.strength/s.energy);if(b===0)return s.radius**2/(4*(1-1/n)**2);const u=b/s.radius,derivative=2/s.radius*(1/Math.sqrt(1-u*u)-1/(n*Math.sqrt(1-(u/n)**2)));return b/(Math.sin(theta)*derivative);}if(s.kind==='hard')return b<s.radius?s.radius*s.radius/4:null;if(theta<=1e-7||Math.PI-theta<1e-10)return null;
 if(s.kind==='repulsive'||s.kind==='attractive')return (s.strength/(4*s.energy))**2/Math.sin(theta/2)**4;
 if(s.kind==='inverseSquare'){const w=1-theta/Math.PI;return (s.strength/s.energy)*w/(Math.PI*Math.sin(theta)*(1-w*w)**2);}
 const h=Math.min(b*.01,Math.max(1e-5,b*5e-4))*hScale,derivative=(scatteringAngle(s,b+h)-scatteringAngle(s,b-h))/(2*h);
 return Math.abs(derivative)>1e-12?b/(Math.sin(theta)*Math.abs(derivative)):null;
}
export function impactForAngle(s:ScatteringModel,theta:number){if(!(theta>0&&theta<Math.PI))throw new RangeError('Cutoff angle must lie strictly between 0 and pi');if(s.kind==='well'){const n=Math.sqrt(1+s.strength/s.energy),max=Math.PI-2*Math.asin(1/n);if(theta>=max)return s.radius;const half=theta/2;return s.radius*n*Math.sin(half)/Math.sqrt((n-1)**2+4*n*Math.sin(half/2)**2);}if(s.kind==='hard')return s.radius*Math.cos(theta/2);if(s.kind==='repulsive'||s.kind==='attractive')return s.strength/(2*s.energy)/Math.tan(theta/2);if(s.kind==='inverseSquare'){const w=1-theta/Math.PI;return Math.sqrt(s.strength/s.energy)*w/Math.sqrt(1-w*w);}
 let lo=0,hi=Math.max(s.range,s.strength/s.energy,1);while(scatteringAngle(s,hi)>theta)hi*=2;for(let i=0;i<55;i++){const mid=(lo+hi)/2;if(scatteringAngle(s,mid)>theta)lo=mid;else hi=mid;}return (lo+hi)/2;
}
/** Time since periapsis and swept angle at radius r. Hyperbolic anomaly removes stiff endpoint layers. */
export function radialFlight(s:ScatteringModel,b:number,r:number,n=64){
 const rmin=turningRadius(s,b),v=Math.sqrt(2*s.energy/s.mass);
 if(r<=rmin*(1+1e-14))return {alpha:0,time:0};
 if(s.kind==='repulsive'||s.kind==='attractive'){
  const a=s.strength/(2*s.energy),e=Math.hypot(a,b)/a,sign=s.kind==='repulsive'?1:-1,H=Math.acosh(Math.max(1,1+(r-rmin)/(a*e))),ue=-sign*a/(b*b),alpha=Math.acos(Math.max(-1,Math.min(1,(1/r-ue)/(1/rmin-ue))));
  const remainder=Math.abs(H)<.001?H**3/6+H**5/120+H**7/5040:Math.sinh(H)-H;
  const time=sign===1?a/v*(e*Math.sinh(H)+H):a/v*((e-1)*H+e*remainder);
  return {alpha,time};
 }
 const H=Math.acosh(r/rmin);
 if(s.kind==='inverseSquare')return {alpha:b/rmin*Math.acos(rmin/r),time:rmin/v*Math.sinh(H)};
 const ratio=b/rmin,Vmin=scatteringPotential(s,rmin),K=2*ratio*ratio-rmin*scatteringDerivative(s,rmin)/s.energy;
 const kernel=(h:number)=>{const c=Math.cosh(h),u=1/c,radius=rmin*c,F=ratio*ratio*(1-u*u)+(Vmin-scatteringPotential(s,radius))/s.energy;return F>0?Math.sinh(h)/Math.sqrt(F):Math.sqrt(2/K);};
 return {alpha:b/rmin*integrate(h=>kernel(h)/Math.cosh(h)**2,H,n),time:rmin/v*integrate(kernel,H,n)};
}
export type ScatterPoint={x:number;y:number;t:number};
export function scatteringTrajectory(s:ScatteringModel,b:number,count=240){const theta=scatteringAngle(s,b),signed=s.kind==='attractive'||s.kind==='well'?-theta:theta,rmin=turningRadius(s,b),v=Math.sqrt(2*s.energy/s.mass),extent=Math.max(7,b*2.5,s.kind==='hard'||s.kind==='well'?3*s.radius:4*rmin),points:ScatterPoint[]=[];
 if(s.kind==='well'){
  if(b>=s.radius){for(let i=0;i<=2*count;i++)points.push({x:-extent+2*extent*i/(2*count),y:b,t:2*extent/v*i/(2*count)});return {points,theta,signed,rmin,extent,peri:{x:0,y:b},duration:points.at(-1)!.t};}
  const n=Math.sqrt(1+s.strength/s.energy),i=Math.asin(b/s.radius),j=Math.asin(b/(n*s.radius)),delta=i-j,entry={x:-Math.sqrt(s.radius*s.radius-b*b),y:b},length=2*s.radius*Math.cos(j),inside={x:Math.cos(delta),y:-Math.sin(delta)},exit={x:entry.x+length*inside.x,y:entry.y+length*inside.y},tin=(entry.x+extent)/v,through=length/(n*v);
  for(let q=0;q<=count;q++){const f=q/count;points.push({x:-extent+(entry.x+extent)*f,y:b,t:tin*f});}
  for(let q=1;q<=count;q++){const f=q/count;points.push({x:entry.x+length*inside.x*f,y:b+length*inside.y*f,t:tin+through*f});}
  for(let q=1;q<=count;q++){const t=extent/v*q/count;points.push({x:exit.x+v*t*Math.cos(signed),y:exit.y+v*t*Math.sin(signed),t:tin+through+t});}
  return {points,theta,signed,rmin,extent,peri:{x:entry.x+length*.5*inside.x,y:b+length*.5*inside.y},duration:points.at(-1)!.t};
 }
 if(s.kind==='hard'){const hit=b<s.radius,xc=hit?-Math.sqrt(s.radius*s.radius-b*b):0,start=-extent,tc=(xc-start)/v;for(let i=0;i<=count;i++){const fraction=i/count,x=start+(xc-start)*fraction;points.push({x,y:b,t:tc*fraction});}for(let i=1;i<=count;i++){const t=extent/v*i/count;points.push({x:xc+v*t*Math.cos(signed),y:b+v*t*Math.sin(signed),t:tc+t});}return {points,theta,signed,rmin,extent,peri:{x:xc,y:b},duration:points.at(-1)!.t};}
 const alphaInf=(Math.PI-signed)/2,phiPeri=Math.PI-alphaInf,half:ScatterPoint[]=[];
 const coulomb=s.kind==='repulsive'||s.kind==='attractive',a=s.strength/(2*s.energy),ecc=Math.hypot(a,b)/a;
 const Hmax=coulomb?Math.acosh(1+(extent-rmin)/(a*ecc)):Math.acosh(extent/rmin);
 for(let i=0;i<=count;i++){
  const H=Hmax*i/count,r=coulomb?rmin+2*a*ecc*Math.sinh(H/2)**2:rmin*Math.cosh(H),flight=radialFlight(s,b,r);
  half.push({x:r*Math.cos(phiPeri-flight.alpha),y:r*Math.sin(phiPeri-flight.alpha),t:flight.time});
 }
 const halfTime=half.at(-1)!.t;
 // Reflection about the periapsis direction creates the incoming half, preserving asymptotic b.
 for(let i=count;i>=0;i--){const p=half[i],r=Math.hypot(p.x,p.y),angle=2*phiPeri-Math.atan2(p.y,p.x);points.push({x:r*Math.cos(angle),y:r*Math.sin(angle),t:halfTime-p.t});}
 for(let i=1;i<=count;i++)points.push({...half[i],t:halfTime+half[i].t});
 return {points,theta,signed,rmin,extent,peri:{x:rmin*Math.cos(phiPeri),y:rmin*Math.sin(phiPeri)},duration:points.at(-1)!.t};
}

export function acceptedCrossSection(s:ScatteringModel,theta:number){const b=impactForAngle(s,theta);return Math.PI*(s.kind==='well'?Math.max(0,s.radius*s.radius-b*b):b*b);}
