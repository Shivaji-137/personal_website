import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import katex from 'katex';
import {sphereValue,sphereSurface,sphereLines,metalVoltage,dielectricValue,type SphereBoundaryModel} from '../client/src/lib/physics/sphereBoundary';
import {gaussLegendre} from '../client/src/lib/physics/legendre';
import {K} from '../client/src/lib/physics/imageSphere';
const base:SphereBoundaryModel={mode:'conductor',condition:'grounded',d:2.5,q:1,Q:.6,voltage:12,outer:1.5,epsIn:4,epsOut:1,order:96};
const close=(a:number,b:number,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const quad=gaussLegendre(192);
for(const mode of ['conductor','cavity','dielectric','insulator'] as const)for(const condition of ['grounded','voltage','charge'] as const){
 const s={...base,mode,condition,d:mode==='cavity'?.65:1.3};
 let Q=0;
 for(const {x,w} of quad)Q+=2*Math.PI*w*sphereSurface(s,Math.acos(x)).sigma*1e9;
 if(mode==='conductor')close(Q,-s.q/s.d+metalVoltage(s)/K*1e9);
 if(mode==='cavity'){close(Q,-s.q);if(condition==='charge')close(Q+metalVoltage(s)*s.outer/K*1e9,s.Q);assert.equal(sphereValue(s,1.2,0).ex,0);}
 if(mode==='dielectric')close(Q,0,1e-6);
 for(let i=0;i<=100;i++){const a=sphereSurface(s,i*Math.PI/100);close(a.outside.v,a.inside.v,1e-7);close(a.tangent,0,1e-6);if(mode==='dielectric')close(a.displacement*1e9,0,1e-6);}
 for(const [x,y] of [[.3,.4],[1.1,.8],[-2,1],[3,2]]){
  const h=1e-5,v=sphereValue(s,x,y);close(v.ex,-(sphereValue(s,x+h,y).v-sphereValue(s,x-h,y).v)/(2*h),1e-6);close(v.ey,-(sphereValue(s,x,y+h).v-sphereValue(s,x,y-h).v)/(2*h),1e-6);
 }
 for(const line of sphereLines(s))for(const [x,y] of line.points){const r=Math.hypot(x,y);assert.ok(Number.isFinite(r));if(mode==='conductor')assert.ok(r>1);if(mode==='cavity')assert.ok(r<1||r>s.outer);}
}
// Central cavity source limit and continuous shell interfaces.
const center={...base,mode:'cavity' as const,d:0,condition:'charge' as const};close(sphereValue(center,.5,0).v,K*1e-9*(2-1)+metalVoltage(center));
for(const t of [.2,1,2.8]){close(sphereValue(center,Math.cos(t)*(1-1e-9),Math.sin(t)*(1-1e-9)).v,metalVoltage(center));close(sphereValue(center,center.outer+1e-9,0).v,metalVoltage(center));}
// Matched dielectric constants recover the homogeneous-medium Coulomb solution.
const matched={...base,mode:'dielectric' as const,epsIn:3,epsOut:3};
for(const [x,y] of [[0,0],[.2,.4],[1.2,.7]]){const R=Math.hypot(x-matched.d,y),v=sphereValue(matched,x,y);close(v.v,K*1e-9/3/R);close(v.ex,K*1e-9*(x-matched.d)/(3*R**3));}
// High-permittivity limit is an isolated neutral conductor, not a grounded one.
const dielectric={...base,mode:'dielectric' as const,epsIn:1e9},neutral={...base,condition:'charge' as const,Q:0};close(sphereValue(dielectric,1.5,.4).v,sphereValue(neutral,1.5,.4).v,1e-6);
const near={...base,mode:'dielectric' as const,d:1.3};const error=(order:number)=>{const s={...near,order};return Math.abs(dielectricValue(s,1,0,true).v-dielectricValue(s,1,0,false).v);};assert.ok(error(64)<error(8)*1e-5);
const uniform={...base,mode:'insulator' as const,Q:2};close(sphereValue(uniform,0,0).v,3*K*2e-9/2);assert.equal(sphereValue(uniform,0,0).ex,0);close(sphereValue(uniform,2,0).ex,K*2e-9/4);
for(const mode of ['conductor','cavity','dielectric','insulator'] as const){const s={...base,mode,d:mode==='cavity'?.4:2.5,q:0,Q:0,condition:'grounded' as const};assert.deepEqual(sphereValue(s,.2,.3),{v:0,ex:0,ey:0});}
for(const m of readFileSync('client/src/pages/SphereBoundaryPage.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(m[1],{throwOnError:true,strict:'error'});
console.log('Sphere boundaries: conductor constraints, shell charge, dielectric D/E/V matching, net polarization charge, field gradients, matched media, neutral-conductor limit, convergence, central/zero cases, field-line domains and LaTeX passed.');
