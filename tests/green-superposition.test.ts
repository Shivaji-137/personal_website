import assert from 'node:assert/strict';
import {prepareResponse,superpositionLines,type GreenCharge} from '../client/src/lib/physics/greenSuperposition';
import {sphereGreen,greenField,greenScale,norm3,type Point3,type GreenConvention} from '../client/src/lib/physics/sphereGreen';
import {K} from '../client/src/lib/physics/imageSphere';
const close=(a:number,b:number,t=1e-8)=>assert.ok(Math.abs(a-b)<t*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
const charges:GreenCharge[]=[{id:'a',position:[2.5,0,0],q:1},{id:'b',position:[-2.5,0,0],q:-1},{id:'c',position:[0,3,0],q:.4}];
for(const a of [0,1])for(const convention of ['coulomb','unit'] as GreenConvention[]){
 const response=prepareResponse(charges,a,convention);
 for(const p of [[0,2,0],[2,2,.5],[-1.5,-.5,1]] as Point3[]){
  const v=response.evaluate(p),sum=charges.reduce((n,c)=>n+K*1e-9*c.q*sphereGreen(p,c.position,a).total,0);close(v.voltage,sum);
  close(v.voltage,v.total*K*1e-9/greenScale(convention));
  for(let axis=0;axis<3;axis++){
   const expected=charges.reduce((n,c)=>n+K*1e-9*c.q*greenField(p,c.position,a)[axis],0);close(v.field[axis],expected);
   const h=1e-5,plus=[...p] as Point3,minus=[...p] as Point3;plus[axis]+=h;minus[axis]-=h;
   close(v.field[axis],-(response.evaluate(plus).voltage-response.evaluate(minus).voltage)/(2*h),1e-7);
  }
 }
 const dipole=prepareResponse(charges.slice(0,2),a,convention).evaluate([0,2,0]);close(dipole.voltage,0);assert.ok(Math.abs(dipole.field[0])>0.1);close(dipole.field[1],0);
 if(a)for(let i=0;i<120;i++){const t=2*Math.PI*i/120;close(response.evaluate([Math.cos(t),Math.sin(t),0]).voltage,0,1e-11);}
 const lines=superpositionLines(charges,a);assert.ok(lines.length>20);
 for(const line of lines)for(const p of line.points){assert.ok(p.every(Number.isFinite));if(a)assert.ok(norm3(p)>=a);}
 const reversed=superpositionLines(charges.map(c=>({...c,q:-c.q})),a);assert.equal(reversed.length,lines.length);assert.equal(reversed[0].direction,-lines[0].direction);close(reversed[0].points[20][0],lines[0].points[20][0]);
}
const cancelled:GreenCharge[]=[{id:'p',q:1,position:[2,0,0]},{id:'n',q:-1,position:[2,0,0]}];
for(const a of [0,1]){const r=prepareResponse(cancelled,a);assert.deepEqual(r.evaluate([2,0,0]).field,[0,0,0]);assert.equal(r.evaluate([2,0,0]).voltage,0);assert.deepEqual(superpositionLines(cancelled,a),[]);}
const free=prepareResponse([{id:'origin',position:[0,0,0],q:1}],0);close(free.evaluate([2,0,0]).voltage,K*1e-9/2);
assert.equal(prepareResponse([{id:'zero',position:[0,0,0],q:0}],0).evaluate([0,0,0]).voltage,0);
const {readFileSync}=await import('node:fs'),katex=(await import('katex')).default;
for(const match of readFileSync('client/src/components/imagesphere/GreenSuperpositionPlot.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(match[1],{throwOnError:true,strict:'error'});
console.log('Superposition passed: scalar/vector linearity, potential gradient, normalization, grounded boundary, dipole cancellation with nonzero field, charge reversal, origin, co-located cancellation, field traces and LaTeX.');
