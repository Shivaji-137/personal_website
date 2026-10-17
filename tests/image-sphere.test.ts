import assert from 'node:assert/strict';
import {K,images,potential,surfaceCharge,spherePotential,force,type SphereModel} from '../client/src/lib/physics/imageSphere';
const close=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
for(const neutral of [false,true])for(const d of [1.15,2,5])for(const q of [-3e-9,0,2e-9]){
 const s:SphereModel={a:1,d,q,neutral},im=images(s);
 for(let i=0;i<=100;i++){const t=i*Math.PI/100,x=Math.cos(t)*(1+1e-10),y=Math.sin(t)*(1+1e-10);close(potential(s,x,y),spherePotential(s),1e-6);}
 // Integrate density over the actual 3D surface (midpoint in cos theta).
 const n=100000;let total=0;for(let i=0;i<n;i++)total+=surfaceCharge(s,Math.acos(-1+2*(i+.5)/n))*4*Math.PI/n;
 assert.ok(Math.abs(total-(im.qi+im.qc))<1e-13);
 for(const t of [.2,1,2.8]){const h=1e-6,der=(potential(s,(1+h)*Math.cos(t),(1+h)*Math.sin(t))-spherePotential(s))/h;close(-der/(4*Math.PI*K)*1e9,surfaceCharge(s,t)*1e9,1e-4);}
 assert.ok(force(s)<=0);close(potential(s,0,0),spherePotential(s));assert.ok(Math.abs(potential(s,1e6,0))<.001);
}
const s={a:1,d:2,q:1e-9,neutral:false};close(images(s).b,.5);close(images(s).qi,-.5e-9);close(force(s),-K*1e-18*2/9,1e-16);
assert.equal(potential({...s,q:0},2,0),0);
console.log('Image sphere: boundary potentials, integrated charge, normal derivative, force, far field, and zero-charge checks passed.');
const {electricField,fieldLines}=await import('../client/src/lib/physics/imageSphere');
for(const neutral of [false,true]){
 const model={...s,neutral};
 assert.deepEqual(electricField(model,0,0),[0,0]);
 for(const [x,y] of [[1.5,.4],[-2,1],[3,2]]){
  const h=1e-5,e=electricField(model,x,y);
  close(e[0],-(potential(model,x+h,y)-potential(model,x-h,y))/(2*h),1e-7);
  close(e[1],-(potential(model,x,y+h)-potential(model,x,y-h))/(2*h),1e-7);
 }
 for(const t of [.3,1,2.7]){const e=electricField(model,1.0000001*Math.cos(t),1.0000001*Math.sin(t));assert.ok(Math.abs(-Math.sin(t)*e[0]+Math.cos(t)*e[1])<1e-4);}
 const curves=fieldLines(model);assert.ok(curves.length>=24);for(const line of curves)for(const p of line.points)assert.ok(p.every(Number.isFinite)&&Math.hypot(...p)>=1);
 assert.notDeepEqual(fieldLines({...model,d:1.2})[0].points,curves[0].points);
 const reversed=fieldLines({...model,q:-model.q});assert.equal(reversed[0].direction,-curves[0].direction);
}
assert.deepEqual(fieldLines({...s,q:0}),[]);
console.log('Field lines: gradient, conductor-normal field, finite exterior paths, moving geometry, and sign reversal passed.');
