import assert from 'node:assert/strict';
import {dielectricPotential as V,dielectricRadial as R,dielectricDiagnostics as D,dielectricImage as I,type DielectricChargeModel} from '../client/src/lib/physics/dielectricCharge';
const close=(a:number,b:number,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const s:DielectricChargeModel={central:false,k:2,d:2,n:100};
for(const k of [.2,.5,1,2,3.7,8]){const m={...s,k};const d=D(m);assert.ok(d.potential<1e-12);assert.ok(d.normal<1e-11);for(const [x,z] of [[1.2,.4],[-2,1],[.4,-1.3]])close(V(m,x,z),I(m,x,z,8192),1e-7);}
for(const [x,z] of [[.3,.5],[1.2,.4],[-2,1]])close(V({...s,k:1},x,z),1/Math.hypot(x,z-2));
close(V(s,0,0),.5);close(V({...s,central:true},.5,0),1.5);close(V({...s,central:true},2,0),.5);
close(R({...s,central:true},1,1,true).u,R({...s,central:true},1,1,false).u);
assert.ok(D({...s,n:4}).normal>D(s).normal);
// Kelvin point alone fails: its monopole is nonzero; the line image cancels it.
const reaction=(r:number)=>V(s,0,-r)-1/(r+2);
assert.ok(Math.abs(reaction(100)/reaction(200)-4)<.03);
console.log('Dielectric sphere: central solution, boundary conditions, uniform-medium limit, image integral and convergence passed.');

// Interior harmonicity and field as a potential gradient, away from the interface/source.
for(const [x,z] of [[.2,.3],[1.3,.4]]){const h=1e-3;const v=V(s,x,z),lap=(V(s,x+h,z)+V(s,x-h,z)+V(s,x,z+h)+V(s,x,z-h)-4*v)/(h*h)+(V(s,x+h,z)-V(s,x-h,z))/(2*h*x);assert.ok(Math.abs(lap)<1e-4);}
