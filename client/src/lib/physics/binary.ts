export type OrbitalParams = {
  inclination: number; separation: number; eccentricity: number; omega: number;
  massRatio: number; totalMass: number; tempRatio: number;
  r1Scaled: number; r2Scaled: number; limbDarkening: number;
};
// Solar radius in km and nominal solar gravitational parameter in km^3/s^2.
export const SOLAR_RADIUS_KM = 695700;
export const SOLAR_GM = 1.3271244e11;
export function solveKepler(M: number, e: number) {
  const m = ((M + Math.PI) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI) - Math.PI;
  let E=e>0.8 ? (m>=0?Math.PI:-Math.PI) : m;
  for(let i=0;i<30;i++){const delta=(E-e*Math.sin(E)-m)/(1-e*Math.cos(E));E-=delta;if(Math.abs(delta)<1e-13)break;}
  return E;
}
export function circleIntersectionArea(R: number, b: number, d: number) {
  if(d>=R+b)return 0;
  if(d<=Math.abs(R-b))return Math.PI*Math.min(R,b)**2;
  const clamp=(v:number)=>Math.max(-1,Math.min(1,v));
  return R*R*Math.acos(clamp((d*d+R*R-b*b)/(2*d*R)))+b*b*Math.acos(clamp((d*d+b*b-R*R)/(2*d*b)))-0.5*Math.sqrt(Math.max(0,(-d+R+b)*(d+R-b)*(d-R+b)*(d+R+b)));
}
// Integrate the blocked intensity over stellar annuli; linear limb darkening.
// A sin² substitution smooths the overlap-boundary endpoints for Simpson quadrature.
export function blockedFlux(R:number, b:number, d:number, u:number) {
  const total=Math.PI*R*R*(1-u/3);
  if(d>=R+b)return 0;
  if(b>=d+R)return total;
  if(u===0)return circleIntersectionArea(R,b,d);
  const lo=Math.max(0,d-b), hi=Math.min(R,d+b);
  const fullRadius=Math.min(R,Math.max(0,b-d));
  // Exact integral over completely covered central annuli.
  let blocked=Math.PI*(1-u)*fullRadius**2+2*Math.PI*u*R*R/3*(1-(1-(fullRadius/R)**2)**1.5);
  const lower=Math.max(lo,fullRadius);
  if(hi<=lower)return blocked;
  const n=128, step=Math.PI/2/n;
  const f=(theta:number)=>{
    const rho=lower+(hi-lower)*Math.sin(theta)**2;
    if(rho===0||theta===0||theta===Math.PI/2)return 0;
    const c=Math.max(-1,Math.min(1,(rho*rho+d*d-b*b)/(2*rho*d)));
    const arc=2*Math.acos(c), intensity=1-u+u*Math.sqrt(Math.max(0,1-(rho/R)**2));
    return arc*rho*intensity*(hi-lower)*Math.sin(2*theta);
  };
  let sum=0;for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(i*step);
  blocked+=sum*step/3;
  return Math.max(0,Math.min(total,blocked));
}
export function computeOrbitalState(M:number,p:OrbitalParams) {
 const {inclination,separation:a,eccentricity:e,omega,massRatio:q,totalMass,tempRatio,r1Scaled:R1,r2Scaled:R2,limbDarkening:u}=p;
 const i=inclination*Math.PI/180,w=omega*Math.PI/180,E=solveKepler(M,e);
 const nu=2*Math.atan2(Math.sqrt(1+e)*Math.sin(E/2),Math.sqrt(1-e)*Math.cos(E/2));
 const r=a*(1-e*Math.cos(E)), angle=nu+w, f1=q/(1+q), f2=1/(1+q);
 // +z toward observer, primary periastron convention; RV positive receding.
 const x=r*Math.cos(angle), y=r*Math.sin(angle)*Math.cos(i), z=r*Math.sin(angle)*Math.sin(i);
 const scale=40/(a*(1+e));
 const dSky=Math.hypot(x,y), J2=tempRatio**4;
 const L1=Math.PI*R1*R1*(1-u/3), L2=Math.PI*R2*R2*(1-u/3)*J2;
 const loss=z<0?blockedFlux(R1,R2,dSky,u):blockedFlux(R2,R1,dSky,u)*J2;
 const flux=Math.max(0,Math.min(1,1-loss/(L1+L2)));
 const akm=a*SOLAR_RADIUS_KM, n=Math.sqrt(SOLAR_GM*totalMass/akm**3), periodDays=2*Math.PI/n/86400;
 const k=n*akm*Math.sin(i)/Math.sqrt(1-e*e), shape=Math.cos(angle)+e*Math.cos(w);
 return {M,nu,r,a,scale,periodDays,K1:k*f1,K2:k*f2,
 primary:{x:50+x*f1*scale,y:50+y*f1*scale,z:z*f1,rv:-k*f1*shape,radius:R1*scale},
 secondary:{x:50-x*f2*scale,y:50-y*f2*scale,z:-z*f2,rv:k*f2*shape,radius:R2*scale},
 flux,eclipseDepth:1-flux,dSky};
}
