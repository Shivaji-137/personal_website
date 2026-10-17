import { K, images, spherePotential, surfaceCharge, type SphereModel } from './imageSphere';
export const EPS0=1/(4*Math.PI*K);
/** Image expression evaluated at the boundary without enforcing its known value. */
export function exteriorPotential(s:SphereModel,r:number,theta:number){
 if(!s.q)return 0;const {b,qi,qc}=images(s),c=Math.cos(theta);
 const distance=(v:number)=>Math.sqrt((r-v)**2+2*r*v*(1-c));
 return K*(s.q/distance(s.d)+qi/distance(b)+qc/r);
}
/** Work relative to infinite separation; real point-charge self-energy excluded. */
export function interactionEnergy(s:SphereModel){
 if(s.q===0)return 0;
 const gap2=(s.d-s.a)*(s.d+s.a);
 return -K*s.q*s.q*s.a/(2*gap2)*(s.neutral?s.a*s.a/(s.d*s.d):1);
}
export function energyForce(s:SphereModel,h:number){
 const u=(d:number)=>interactionEnergy({...s,d});
 return -(u(s.d-2*h)-8*u(s.d-h)+8*u(s.d+h)-u(s.d+2*h))/(12*h);
}
export function boundaryDiagnostics(s:SphereModel,h:number){
 return Array.from({length:181},(_,i)=>{
  const theta=i*Math.PI/180,v=exteriorPotential(s,s.a,theta),delta=1e-4;
  const et=-(exteriorPotential(s,s.a,theta+delta)-exteriorPotential(s,s.a,theta-delta))/(2*delta*s.a);
  const en=-(-3*v+4*exteriorPotential(s,s.a+h,theta)-exteriorPotential(s,s.a+2*h,theta))/(2*h);
  const sigma=surfaceCharge(s,theta);
  return {theta,v,residual:v-spherePotential(s),et,en,sigma,numericalSigma:EPS0*en};
 });
}
/** Exterior induced multipoles, with the real-source Coulomb potential left exact.
 * Valid r >= a > b. Signed q, order L includes l = 0 through L. */
export function multipolePotential(s:SphereModel,r:number,theta:number,L:number){
 if(r<s.a)throw new RangeError('Exterior expansion requires r >= a');
 if(!s.q)return 0;
 const {b,qi,qc}=images(s),mu=Math.cos(theta),ratio=b/r;
 let p0=1,p1=mu,power=1,sum=qi/r;
 for(let l=1;l<=L;l++){
  const p=l===1?p1:((2*l-1)*mu*p1-(l-1)*p0)/l;
  if(l>1){p0=p1;p1=p;}power*=ratio;sum+=qi/r*power*p;
 }
 const R=Math.sqrt((r-s.d)**2+2*r*s.d*(1-mu));
 return K*(s.q/R+sum+qc/r);
}
/** Uniform bound from |P_l(mu)| <= 1, including the Coulomb prefactor. */
export function multipoleErrorBound(s:SphereModel,r:number,L:number){
 const {b,qi}=images(s),t=b/r;return K*Math.abs(qi)/r*t**(L+1)/(1-t);
}
