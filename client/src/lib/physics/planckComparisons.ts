import { PLANCK_H as h, LIGHT_C as c, BOLTZMANN_K as k } from './blackbody';
export type RadiationLaw = 'planck' | 'rayleigh' | 'wien';
// Natural log of radiance per nm; avoids overflow and preserves the Wien tail.
export function logRadiance(nm: number, T: number, law: RadiationLaw = 'planck') {
  const lambda=nm*1e-9, x=h*c/(lambda*k*T);
  const prefactor=Math.log(2*h*c*c)-5*Math.log(lambda)+Math.log(1e-9);
  if(law==='rayleigh') return prefactor-Math.log(x);
  if(law==='wien') return prefactor-x;
  return prefactor-(x>50?x+Math.log1p(-Math.exp(-x)):Math.log(Math.expm1(x)));
}
export function approximationErrors(nm:number,T:number){
 const x=h*c/(nm*1e-9*k*T);
 return {x,rayleigh:x>700?Infinity:Math.expm1(x)/x-1,wien:Math.exp(-x)};
}
export function validityWavelengths(T:number,tolerance:number){
 let lo=0,hi=10;
 for(let i=0;i<70;i++){const mid=(lo+hi)/2;if(Math.expm1(mid)/mid-1>tolerance)hi=mid;else lo=mid;}
 const scale=h*c/(k*T)*1e9;
 return {rayleigh:scale/((lo+hi)/2),wien:scale/(-Math.log(tolerance))};
}
// Surface azimuth has been integrated analytically. Remaining three integrals:
// surface colatitude ψ, emission polar angle θ, emission azimuth φ.
export function luminosityQuadrature(nm:number,T:number,radiusM:number,n:number){
 let geometry=0;
 for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let q=0;q<n;q++){
  const psi=(i+0.5)*Math.PI/n,theta=(j+0.5)*Math.PI/(2*n);
  geometry+=2*Math.PI*radiusM**2*Math.sin(psi)*Math.cos(theta)*Math.sin(theta)*(Math.PI/n)*(Math.PI/(2*n))*(2*Math.PI/n);
 }
 const B=Math.exp(logRadiance(nm,T));
 return {numerical:B*geometry,analytic:4*Math.PI**2*radiusM**2*B,relativeError:geometry/(4*Math.PI**2*radiusM**2)-1};
}
export function bandLuminosity(loNm:number,hiNm:number,T:number,radiusM:number){
 const n=2000,a=Math.log(loNm),step=(Math.log(hiNm)-a)/n;
 let integral=0;
 for(let i=0;i<=n;i++){const nm=Math.exp(a+i*step);integral+=Math.exp(logRadiance(nm,T))*nm*(i===0||i===n?1:i%2?4:2);}
 return integral*step/3*4*Math.PI**2*radiusM**2;
}
