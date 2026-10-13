import assert from 'node:assert/strict';
import {blockedFlux,circleIntersectionArea,computeOrbitalState,solveKepler,SOLAR_RADIUS_KM,type OrbitalParams} from '../client/src/lib/physics/binary';
const near=(actual:number,expected:number,tol=1e-8)=>assert.ok(Math.abs(actual-expected)<tol,`${actual} differs from ${expected}`);
const p:OrbitalParams={inclination:90,separation:30,eccentricity:0.4,omega:30,massRatio:0.4,totalMass:3,tempRatio:0.7,r1Scaled:4,r2Scaled:2,limbDarkening:0.6};
for(const e of [0,0.4,0.7])for(let m=-6;m<7;m+=0.13){const E=solveKepler(m,e);near(Math.sin(E-e*Math.sin(E)),Math.sin(m));}
near(computeOrbitalState(0,p).r,18);near(computeOrbitalState(Math.PI,p).r,42);
for(let m=0;m<2*Math.PI;m+=0.13){
 const s=computeOrbitalState(m,p);near((s.primary.x-50)+p.massRatio*(s.secondary.x-50),0);near(s.primary.rv+p.massRatio*s.secondary.rv,0);
 const dt=1e-5,a=computeOrbitalState(m-dt,p),b=computeOrbitalState(m+dt,p);
 const secondsPerRadian=s.periodDays*86400/(2*Math.PI);
 near(s.primary.rv,-(b.primary.z-a.primary.z)*SOLAR_RADIUS_KM/(2*dt*secondsPerRadian),1e-5);
 assert.ok(s.flux>=0&&s.flux<=1);
}
near(computeOrbitalState(1,{...p,inclination:0}).primary.rv,0);
near(computeOrbitalState(1,{...p,inclination:0}).flux,1);
const base=computeOrbitalState(0,p).periodDays;
near(computeOrbitalState(0,{...p,separation:60}).periodDays/base,2**1.5);
near(computeOrbitalState(0,{...p,totalMass:12}).periodDays/base,0.5);
for(const d of [0,1,2,3,4,5,6,7])near(blockedFlux(4,2,d,0),circleIntersectionArea(4,2,d));
near(blockedFlux(4,8,0,0.6),Math.PI*16*0.8);
near(blockedFlux(4,2,7,0.6),0);
// Independent 2D disk grid validates radial quadrature at partial and central overlaps.
for(const d of [0,1,2,3,4,5.5]){
 let flux=0;const n=600,dx=8/n;
 for(let j=0;j<n;j++)for(let k=0;k<n;k++){const x=-4+(j+0.5)*dx,y=-4+(k+0.5)*dx,r2=x*x+y*y;if(r2<16&&(x-d)**2+y*y<4)flux+=(0.4+0.6*Math.sqrt(1-r2/16))*dx*dx;}
 near(blockedFlux(4,2,d,0.6),flux,0.006);
}
const equal={...p,eccentricity:0,omega:0,r1Scaled:4,r2Scaled:4,tempRatio:1};
near(computeOrbitalState(Math.PI/2,equal).flux,0.5);
near(computeOrbitalState(3*Math.PI/2,equal).flux,0.5);
console.log('Binary physics checks passed: Kepler solver, orbital scaling, barycenter, RV derivative/sign, flux bounds, eclipse integration, equal-star eclipses.');
