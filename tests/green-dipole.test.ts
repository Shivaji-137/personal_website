import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import katex from 'katex';
import {prepareDipole,greenDipoleTerms,greenDipoleLines} from '../client/src/lib/physics/greenDipole';
import {prepareResponse} from '../client/src/lib/physics/greenSuperposition';
import {boundaryClearance,type GreenBoundary} from '../client/src/lib/physics/greenBoundaries';
import {norm3,type Point3} from '../client/src/lib/physics/sphereGreen';
const close=(a:number,b:number,tol=1e-6)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
for(const kind of ['free','sphere','plane','plates'] as const)for(const moment of [[1,0,0],[0,1,0],[.5,-.7,.3]] as Point3[]){
 const b:GreenBoundary={kind,gap:6,cutoff:12},position:Point3=[1.5,.6,.2],source={position,moment},response=prepareDipole(source,b),r:Point3=[.7,1.4,.5],v=response.evaluate(r),h=1e-5;
 // Source-coordinate derivative of the independent point-charge Green response.
 let numeric=0;
 for(let k=0;k<3;k++){const a=[...position] as Point3,c=[...position] as Point3;a[k]+=h;c[k]-=h;numeric+=moment[k]*(prepareResponse([{id:'a',position:a,q:1}],b).evaluate(r).voltage-prepareResponse([{id:'c',position:c,q:1}],b).evaluate(r).voltage)/(2*h);
 const plus=[...r] as Point3,minus=[...r] as Point3;plus[k]+=h;minus[k]-=h;close(v.field[k],-(response.evaluate(plus).total-response.evaluate(minus).total)/(2*h));}
 close(v.total,numeric);
 if(kind==='free'){assert.equal(v.reaction,0);assert.equal(response.terms.length,1);}
 if(kind==='sphere')for(let i=0;i<100;i++){const t=i*.09,z=Math.sin(i*.6),u=Math.sqrt(1-z*z),r:Point3=[u*Math.cos(t),u*Math.sin(t),z],v=response.evaluate(r),en=v.field.reduce((s,x,k)=>s+x*r[k],0);close(v.total,0,1e-10);v.field.forEach((x,k)=>close(x,en*r[k],1e-9));}
 if(kind==='plane'||kind==='plates')for(const x of kind==='plane'?[0]:[-3,3])for(const y of [-4,0,2]){const v=response.evaluate([x,y,1]);close(v.total,0,kind==='plane'?1e-10:2e-6);close(v.field[1],0,kind==='plane'?1e-10:2e-6);close(v.field[2],0,kind==='plane'?1e-10:2e-6);}
 const zero=prepareDipole({position,moment:[0,0,0]},b).evaluate(position);assert.deepEqual(zero,{free:0,reaction:0,total:0,field:[0,0,0]});
}
const b:GreenBoundary={kind:'plates',gap:6,cutoff:8},s={position:[1.5,.5,0] as Point3,moment:[1,.3,0] as Point3};
const low=Math.abs(prepareDipole(s,b).evaluate([3,2,1]).total),high=Math.abs(prepareDipole(s,{...b,cutoff:32}).evaluate([3,2,1]).total);assert.ok(high<low/20);
for(const kind of ['free','sphere','plane','plates'] as const){const config={...b,kind};for(const path of greenDipoleLines(s,config))for(const p of path)assert.ok(boundaryClearance(p,config)>=0&&Number.isFinite(norm3(p)));}
const tangent=greenDipoleTerms({position:[2,0,0],moment:[0,1,0]},{...b,kind:'sphere'});assert.equal(tangent[1].q,0);
for(const m of readFileSync('client/src/components/imagesphere/GreenDipoleExplorer.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(m[1],{throwOnError:true,strict:'error'});
console.log('Green dipole: independent source derivatives, E gradient, all boundaries, plate convergence, zero moment, tangential image charge, exterior lines, LaTeX passed.');
