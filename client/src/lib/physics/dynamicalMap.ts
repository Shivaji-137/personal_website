export type DynamicsSettings={damping:number;linear:number;cubic:number;x0:number;v0:number;burn:number;cycles:number;steps:number;tolerance:number};
export type OrbitPoint={x:number;v:number};
export type DynamicsCell={omega:number;force:number;period:number;lambda:number;lower:number;upper:number;points:OrbitPoint[];trajectory:OrbitPoint[];escaped:boolean};
export const DEFAULT_DYNAMICS:DynamicsSettings={damping:0.2,linear:-1,cubic:1,x0:1,v0:0,burn:160,cycles:180,steps:160,tolerance:0.001};
export function detectPeriod(points:OrbitPoint[],tolerance:number){
 const tail=points.slice(-90),scaleX=Math.max(1,...tail.map(p=>Math.abs(p.x))),scaleV=Math.max(1,...tail.map(p=>Math.abs(p.v)));
 for(let period=1;period<=9;period++){
  if(tail.length<10*period)continue;
  if(tail.slice(period).every((p,i)=>Math.abs(p.x-tail[i].x)<tolerance*scaleX&&Math.abs(p.v-tail[i].v)<tolerance*scaleV))return period;
 }
 return 0;
}
export function analyzeDynamics(omega:number,force:number,s:DynamicsSettings):DynamicsCell{
 const dt=2*Math.PI/(omega*s.steps),periodTime=2*Math.PI/omega;
 let x=s.x0,v=s.v0,u=1,w=0,t=0,sum=0;
 const points:OrbitPoint[]=[],trajectory:OrbitPoint[]=[],blocks:number[]=[];let blockSum=0,blockCycles=0;
 const acceleration=(a:number,b:number,time:number)=>-s.damping*b-s.linear*a-s.cubic*a**3+force*Math.cos(omega*time);
 const tangent=(a:number,b:number,c:number)=>-(s.linear+3*s.cubic*a*a)*b-s.damping*c;
 for(let cycle=0;cycle<s.burn+s.cycles;cycle++){
  for(let j=0;j<s.steps;j++){
   const a=v,b=acceleration(x,v,t),c=w,d=tangent(x,u,w);
   const x2=x+dt*a/2,v2=v+dt*b/2,u2=u+dt*c/2,w2=w+dt*d/2;
   const a2=v2,b2=acceleration(x2,v2,t+dt/2),c2=w2,d2=tangent(x2,u2,w2);
   const x3=x+dt*a2/2,v3=v+dt*b2/2,u3=u+dt*c2/2,w3=w+dt*d2/2;
   const a3=v3,b3=acceleration(x3,v3,t+dt/2),c3=w3,d3=tangent(x3,u3,w3);
   const x4=x+dt*a3,v4=v+dt*b3,u4=u+dt*c3,w4=w+dt*d3;
   const a4=v4,b4=acceleration(x4,v4,t+dt),c4=w4,d4=tangent(x4,u4,w4);
   x+=dt*(a+2*a2+2*a3+a4)/6;v+=dt*(b+2*b2+2*b3+b4)/6;u+=dt*(c+2*c2+2*c3+c4)/6;w+=dt*(d+2*d2+2*d3+d4)/6;t+=dt;
   if(!Number.isFinite(x)||Math.abs(x)>30||!Number.isFinite(u))return {omega,force,period:-2,lambda:NaN,lower:NaN,upper:NaN,points,trajectory,escaped:true};
   if(cycle>=s.burn+s.cycles-4&&j%4===0)trajectory.push({x,v});
  }
  const length=Math.hypot(u,w),growth=Math.log(length);u/=length;w/=length;
  if(cycle>=s.burn){points.push({x,v});sum+=growth;blockSum+=growth;blockCycles++;
   if(blockCycles===Math.floor(s.cycles/6)){blocks.push(blockSum/(blockCycles*periodTime));blockSum=0;blockCycles=0;}
  }
 }
 const lambda=sum/(s.cycles*periodTime),mean=blocks.reduce((a,b)=>a+b,0)/blocks.length;
 const variance=blocks.reduce((a,b)=>a+(b-mean)**2,0)/Math.max(1,blocks.length-1),margin=2*Math.sqrt(variance/blocks.length);
 const lower=mean-margin,upper=mean+margin;
 const detected=detectPeriod(points,s.tolerance);
 // -1: positive finite-time exponent with a conservative positive block lower bound.
 // 0: unresolved (including periods >9, quasiperiodicity and near-zero estimates).
 const period=lambda>0.005&&lower>0?-1:detected&&lambda< -0.001?detected:0;
 return {omega,force,period,lambda,lower,upper,points,trajectory,escaped:false};
}
