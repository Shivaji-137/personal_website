import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import katex from 'katex';
import {dipoleImages,dipoleRaw,dipolePhysical,dipoleDensity,dipoleLines,type Vec3} from '../client/src/lib/physics/dipoleSphere';
import {K} from '../client/src/lib/physics/imageSphere';
import {gaussLegendre} from '../client/src/lib/physics/legendre';
const close=(a:number,b:number,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const quad=gaussLegendre(192);
for(const neutral of [false,true])for(const d of [1.15,3,5])for(const angle of [0,.7,Math.PI/2,Math.PI,4.2]){
 const s={a:1,d,p:1e-9,angle,neutral},im=dipoleImages(s);
 for(let i=0;i<=32;i++)for(let j=0;j<16;j++){
  const mu=-1+i/16,phi=j*Math.PI/8,n:Vec3=[mu,Math.sqrt(1-mu*mu)*Math.cos(phi),Math.sqrt(1-mu*mu)*Math.sin(phi)],f=dipoleRaw(s,n),en=f.e.reduce((v,x,k)=>v+x*n[k],0);
  close(f.v,K*im.center,1e-9);f.e.forEach((x,k)=>close(x,en*n[k],1e-8));
 }
 let total=0;for(const {x:mu,w} of quad)for(const sign of [-1,1])total+=w*Math.PI*dipoleDensity(s,[mu,sign*Math.sqrt(1-mu*mu),0]);
 close(total*1e9,(im.q+im.center)*1e9,1e-8);
 const r:Vec3=[2,1.3,.7],h=1e-5,f=dipoleRaw(s,r);
 for(let k=0;k<3;k++){const a=[...r] as Vec3,b=[...r] as Vec3;a[k]+=h;b[k]-=h;close(f.e[k],-(dipoleRaw(s,a).v-dipoleRaw(s,b).v)/(2*h));}
 // Independently approach an ideal dipole using two opposite point charges and their exact images.
 const delta=1e-4,q=s.p/delta;let pair=0;
 for(const sign of [-1,1]){const pos:Vec3=[d+sign*delta*Math.cos(angle)/2,sign*delta*Math.sin(angle)/2,0],rad=Math.hypot(...pos),image=pos.map(v=>v/rad**2) as Vec3,qi=-sign*q/rad;
  pair+=K*(sign*q/Math.hypot(...r.map((v,k)=>v-pos[k]))+qi/Math.hypot(...r.map((v,k)=>v-image[k]))-(neutral?qi/Math.hypot(...r):0));}
 close(pair,f.v,1e-7);
 assert.deepEqual(dipolePhysical(s,[0,0,0]).e,[0,0,0]);
}
const tangent={a:1,d:3,p:1e-9,angle:Math.PI/2,neutral:false};assert.equal(dipoleImages(tangent).q,0);
assert.deepEqual(dipoleRaw({...tangent,p:0},[3,0,0]),{v:0,e:[0,0,0]});
for(const path of dipoleLines(tangent))for(const r of path)assert.ok(Math.hypot(...r)>1);
for(const match of readFileSync('client/src/components/imagesphere/DipoleSphereExplorer.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(match[1],{throwOnError:true,strict:'error'});
console.log('Dipole sphere: 3D boundary, integrated charge, gradient, independent finite-pair limit, tangential/zero cases, exterior field lines and LaTeX passed.');
