import assert from 'node:assert/strict';
import {scatteringAngle as angle,turningRadius as rmin,scatteringPotential as V,angleByQuadrature as quad,differentialCrossSection as cross,impactForAngle as impact,acceptedCrossSection as accepted,radialFlight,scatteringTrajectory as trajectory,type ScatteringModel} from '../client/src/lib/physics/scattering';
const base:ScatteringModel={kind:'repulsive',energy:1,strength:1,range:1,radius:1,mass:1};
const close=(a:number,b:number,t=1e-7)=>assert.ok(Math.abs(a-b)<t*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
for(const kind of ['repulsive','attractive','inverseSquare','screened'] as const)for(const b of [.05,.2,1,3]){const s={...base,kind},r=rmin(s,b);close(1-b*b/r**2-V(s,r)/s.energy,0,1e-10);close(Math.abs(quad(s,b)),angle(s,b),2e-7);close(angle(s,impact(s,angle(s,b))),angle(s,b),1e-7);assert.ok(cross(s,b)!>0);}
close(angle(base,.5),Math.PI/2);close(cross(base,.5)!,1/4);
const hard={...base,kind:'hard' as const};close(angle(hard,Math.sqrt(.5)),Math.PI/2);close(cross(hard,.5)!,1/4);assert.equal(cross(hard,2),null);close(angle(hard,2),0);
for(const b of [.15,.8,2]){close(angle(base,b),angle({...base,kind:'attractive'},b));assert.ok(angle({...base,kind:'screened'},b)<angle(base,b));}
// Integrate dσ over a finite solid-angle range, independently of πb².
for(const kind of ['repulsive','attractive','inverseSquare','hard','screened'] as const){const s={...base,kind},a=.2,z=2.9,N=3000,h=(z-a)/N;let integral=0;for(let i=0;i<N;i++){const theta=a+(i+.5)*h,b=impact(s,theta);integral+=2*Math.PI*Math.sin(theta)*cross(s,b)!*h;}const expected=Math.PI*(impact(s,a)**2-impact(s,z)**2);close(integral,expected,3e-5);}
for(const kind of ['repulsive','attractive','inverseSquare','screened','hard'] as const){const s={...base,kind},tr=trajectory(s,.7,160);assert.ok(tr.points.every((p,i)=>Number.isFinite(p.x)&&Number.isFinite(p.t)&&(!i||p.t>tr.points[i-1].t)));const r=tr.points.reduce((min,p)=>Math.min(min,Math.hypot(p.x,p.y)),Infinity);close(r,tr.rmin);const mass2=trajectory({...s,mass:4},.7,160);close(mass2.duration,2*tr.duration);}
console.log('Scattering: Rutherford, hard sphere, inverse-square and screened potentials, turning points, angular quadrature, cross-section integrals and time scaling passed.');

const well={...base,kind:'well' as const};const n=Math.sqrt(2),max=Math.PI-2*Math.asin(1/n);
for(const b of [.05,.4,.8,.999]){const theta=angle(well,b);close(impact(well,theta),b);close(rmin(well,b),b/n);const tr=trajectory(well,b);assert.ok(tr.signed<0);const first=tr.points[0],last=tr.points.at(-1)!;close(first.y,b);const delta=tr.points[tr.points.length-2],ux=(last.x-delta.x)/(last.t-delta.t),uy=(last.y-delta.y)/(last.t-delta.t);close(Math.hypot(ux,uy),Math.sqrt(2));close(Math.atan2(uy,ux),-theta);close(last.x*uy-last.y*ux,-b*Math.sqrt(2));const prev=tr.points[300],next=tr.points[301],vxi=(next.x-prev.x)/(next.t-prev.t),vyi=(next.y-prev.y)/(next.t-prev.t);close(.5*(vxi*vxi+vyi*vyi)-well.strength,well.energy);close(prev.x*vyi-prev.y*vxi,-b*Math.sqrt(2));}
assert.equal(angle(well,1.1),0);assert.equal(cross(well,1.1),null);close(cross(well,0)!,1/(4*(1-1/n)**2));close(accepted(well,max+.1),0);
let total=0;const N=10000;for(let i=0;i<N;i++){const theta=max*(i+.5)/N,b=impact(well,theta);total+=2*Math.PI*Math.sin(theta)*cross(well,b)!*max/N;}close(total,Math.PI,1e-6);
const cut=.3,bc=impact(well,cut);close(accepted(well,cut),Math.PI*(1-bc*bc));
console.log('Square well: entry/exit energy and angular momentum, angle inversion, forward limit, grazing cutoff and integrated geometric cross section passed.');

// Verify physical traversal time independently through energy and angular momentum derivatives,
// including the strongly attractive near-head-on regime that defeats a uniform 1/r time quadrature.
for(const kind of ['repulsive','attractive','inverseSquare','screened'] as const)for(const energy of [.2,5])for(const b of [.05,3]){
 const s={...base,kind,energy,strength:3,range:.3},r0=rmin(s,b),v=Math.sqrt(2*energy/s.mass);
 for(const factor of [1.1,3,10]){const r=r0*factor,h=r*1e-5,F=1-b*b/r**2-V(s,r)/energy,plus=radialFlight(s,b,r+h),minus=radialFlight(s,b,r-h);close((plus.time-minus.time)/(2*h),1/(v*Math.sqrt(F)),2e-6);close((plus.alpha-minus.alpha)/(2*h),b/(r*r*Math.sqrt(F)),2e-6);}
 const tr=trajectory(s,b);assert.ok(tr.points.every((p,i)=>Number.isFinite(p.t)&&(!i||p.t>tr.points[i-1].t)));
}
console.log('Traversal-time and orbit-angle derivatives agree with conserved-energy dynamics across the parameter extremes.');
