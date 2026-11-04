import assert from 'node:assert/strict';
import {reciprocalRadius as u,orbitInfo as info,orbitEnergy,orbitSamples,type CentralModel} from '../client/src/lib/physics/centralOrbits';
const base:CentralModel={mode:'combined',m:1,L:1,k:1,b:.1,omega:1,r0:1,vr:0};
const close=(a:number,b:number,t=1e-7)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(const mode of ['kepler','combined','inverse2'] as const)for(const b of [.1,.5,1]){const s={...base,mode,b,k:mode==='inverse2'?b:1,vr:-.2};const h=1e-4,g=info(s).g,c=s.m*(mode==='inverse2'?0:s.k)/s.L**2;for(const t of [.1,.5,1]){close((u(s,t+h)-2*u(s,t)+u(s,t-h))/(h*h)+g*u(s,t),c,2e-6);}close(u(s,0),1/s.r0);close((u(s,h)-u(s,-h))/(2*h),-s.m*s.vr/s.L);}
const bound=info(base);close(bound.precession,2*Math.PI*(1/Math.sqrt(.8)-1));assert.ok(bound.precession>0);close(info({...base,b:0}).precession,0);close(u({...base,mode:'kepler'},1),u({...base,b:0},1));
for(const s of [{...base,mode:'inverse2' as const,k:.5,vr:0},{...base,mode:'inverse2' as const,k:.8,vr:-Math.sqrt(.6)}]){if(s.vr===0){close(orbitEnergy(s),0);close(u(s,4),1);}else close(orbitEnergy(s),0);}
const harmonic={...base,mode:'harmonic' as const,r0:2,vr:.3};const hi=info(harmonic);close(hi.aa*hi.bb,harmonic.L/(harmonic.m*harmonic.omega));for(const p of orbitSamples(harmonic).points.filter((_,i)=>i%100===0)){const w=harmonic.omega,c=Math.cos(w*p.t),sn=Math.sin(w*p.t),vx=-harmonic.r0*w*sn+harmonic.vr*c,vy=harmonic.L/(harmonic.m*harmonic.r0)*c;close(.5*harmonic.m*(vx*vx+vy*vy+w*w*p.r*p.r),hi.E);}
assert.ok(orbitSamples({...base,mode:'inverse2',k:1,vr:-.1}).points.every(p=>p.r>0&&Number.isFinite(p.x)));
console.log('Central orbits: Binet equations, threshold circle, energy, Kepler limit, precession, oscillator invariants and positive-radius stopping passed.');

const samples=orbitSamples(base);close(samples.points.at(-1)!.t,3*info(base).radialPeriod,1e-6);close(info({...base,mode:'inverse2',k:.8,vr:-Math.sqrt(.6)}).E,0);close(info({...base,mode:'inverse2',k:.5}).rmax,1);
