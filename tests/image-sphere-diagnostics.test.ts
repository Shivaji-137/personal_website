import assert from 'node:assert/strict';
import {K,force,images,spherePotential,type SphereModel} from '../client/src/lib/physics/imageSphere';
import {boundaryDiagnostics,energyForce,interactionEnergy,exteriorPotential,multipolePotential,multipoleErrorBound} from '../client/src/lib/physics/imageSphereDiagnostics';
const relative=(a:number,b:number,tol:number)=>assert.ok(Math.abs(a-b)<=tol*Math.max(Math.abs(a),Math.abs(b),1e-28),`${a} vs ${b}`);
for(const neutral of [false,true])for(const a of [.7,1,2])for(const ratio of [1.15,2,5])for(const q of [-3e-9,0,1e-9]){
 const s:SphereModel={a,d:a*ratio,q,neutral},h=a*1e-5,vScale=K*Math.abs(q)/a;
 const boundary=boundaryDiagnostics(s,h),im=images(s);
 for(const p of boundary){
  assert.ok(Math.abs(p.residual)<Math.max(1e-13,vScale*1e-12));
  assert.ok(Math.abs(p.et)<Math.max(1e-12,vScale/a*1e-7));
 }
 const maxSigma=Math.max(...boundary.map(p=>Math.abs(p.sigma)),1e-28);
 assert.ok(Math.max(...boundary.map(p=>Math.abs(p.numericalSigma-p.sigma)))/maxSigma<1e-7);
 relative(energyForce(s,h),force(s),2e-8);
 const induced=K*(im.qi/(s.d-im.b)+im.qc/s.d);
 relative(interactionEnergy(s),q*induced/2,1e-12);
 // Independent mechanical work integral using u = 1/d, Simpson quadrature.
 let work=0;const n=2048,du=1/s.d/n;
 for(let i=1;i<=n;i++){const u=i*du,F=force({...s,d:1/u})/(u*u);work+=F*(i===n?1:i%2?4:2);}
 relative(work*du/3,interactionEnergy(s),2e-9);
 for(const r of [a,a+.8*(s.d-a),s.d*1.5])for(const theta of [0,.3,1.5,Math.PI])for(const L of [0,1,8,32,64]){
  const err=Math.abs(multipolePotential(s,r,theta,L)-exteriorPotential(s,r,theta));
  assert.ok(err<=multipoleErrorBound(s,r,L)*(1+1e-10)+vScale*1e-12);
 }
 assert.ok(Math.abs(exteriorPotential(s,a,1)-spherePotential(s))<Math.max(1e-13,vScale*1e-12));
 // The bound is saturated at theta=0 before numerical roundoff dominates.
 relative(Math.abs(multipolePotential(s,a,0,1)-exteriorPotential(s,a,0)),multipoleErrorBound(s,a,1),1e-10);
 if(!q){assert.equal(force(s),0);assert.equal(interactionEnergy(s),0);}
}
const s={a:1,d:2,q:1e-9,neutral:true};
// Neutral induced monopole cancels exactly at L=0.
relative(multipolePotential(s,1,.8,0),K*s.q/Math.sqrt(1+4-4*Math.cos(.8)),1e-13);
assert.ok(multipoleErrorBound({...s,d:1.15},1,8)>multipoleErrorBound(s,1,8));
assert.ok(multipoleErrorBound(s,1.5,8)<multipoleErrorBound(s,1,8));
assert.throws(()=>multipolePotential(s,.9,0,3),RangeError);
console.log('Advanced sphere checks passed: boundary residuals, numerical surface density, energy half-factor, force derivative, independent work integral, multipole tail bounds and neutral monopole cancellation.');
const {readFileSync}=await import('node:fs');
const katex=(await import('katex')).default;
const component=readFileSync('client/src/components/imagesphere/SphereDiagnostics.tsx','utf8');
let formulas=0;for(const match of component.matchAll(/String\.raw`([^`]*)`/g)){katex.renderToString(match[1],{throwOnError:true,strict:'error'});formulas++;}
assert.ok(formulas>=6);console.log(`Validated ${formulas} advanced-panel LaTeX equations.`);
