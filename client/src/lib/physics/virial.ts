import { solveKepler } from './binary';
export const GRAVITY_G = 6.67430e-11;
export const SOLAR_MASS_KG = 1.98847e30;
export const AU_METRES = 149597870700;
export type VirialParams = { m1: number; m2: number; a: number; e: number };
export function virialState(phase: number, p: VirialParams) {
  const {m1,m2,a,e}=p, totalMass=m1+m2, reducedMass=m1*m2/totalMass;
  const E=solveKepler(phase*2*Math.PI,e), b=a*Math.sqrt(1-e*e), r=a*(1-e*Math.cos(E));
  const n=Math.sqrt(GRAVITY_G*totalMass*SOLAR_MASS_KG/(a*AU_METRES)**3), dEdt=n/(1-e*Math.cos(E));
  const x=a*(Math.cos(E)-e),y=b*Math.sin(E),vx=-a*AU_METRES*Math.sin(E)*dEdt,vy=b*AU_METRES*Math.cos(E)*dEdt;
  const f1=m2/totalMass,f2=m1/totalMass;
  const K1=0.5*m1*SOLAR_MASS_KG*f1*f1*(vx*vx+vy*vy),K2=0.5*m2*SOLAR_MASS_KG*f2*f2*(vx*vx+vy*vy);
  const K=K1+K2,U=-GRAVITY_G*m1*m2*SOLAR_MASS_KG**2/(r*AU_METRES),energyScale=GRAVITY_G*m1*m2*SOLAR_MASS_KG**2/(a*AU_METRES);
  return {r,x,y,vx,vy,K1,K2,K,U,totalEnergy:K+U,virial:2*K+U,energyScale,reducedMass,periodYears:2*Math.PI/n/(365.25*86400),
    body1:{x:-f1*x,y:-f1*y,vx:-f1*vx,vy:-f1*vy},body2:{x:f2*x,y:f2*y,vx:f2*vx,vy:f2*vy}};
}
// Equal mean-anomaly spacing is equal elapsed time, not equal true-anomaly spacing.
export function virialSamples(p:VirialParams,n=2048){
 const states=Array.from({length:n+1},(_,j)=>virialState(j/n,p));
 const cumulativeK=[0],cumulativeU=[0];
 for(let j=1;j<=n;j++){cumulativeK.push(cumulativeK[j-1]+(states[j-1].K+states[j].K)/(2*n));cumulativeU.push(cumulativeU[j-1]+(states[j-1].U+states[j].U)/(2*n));}
 return {states,cumulativeK,cumulativeU,n};
}
export function virialAverage(elapsedOrbits:number, table:ReturnType<typeof virialSamples>){
 if(elapsedOrbits<=0)return null;
 const cycles=Math.floor(elapsedOrbits),fraction=elapsedOrbits-cycles,pos=fraction*table.n,j=Math.min(table.n-1,Math.floor(pos)),f=pos-j;
 const partial=(v:number[])=>v[j]+f*(v[j+1]-v[j]);
 const K=(cycles*table.cumulativeK[table.n]+partial(table.cumulativeK))/elapsedOrbits;
 const U=(cycles*table.cumulativeU[table.n]+partial(table.cumulativeU))/elapsedOrbits;
 return {K,U,residual:2*K+U};
}
