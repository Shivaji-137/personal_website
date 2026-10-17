import assert from 'node:assert/strict';
import {sphereGreen,greenImage,greenScale,greenLaplacian,norm3,distance3,type Point3,type GreenConvention} from '../client/src/lib/physics/sphereGreen';
import {potential,K} from '../client/src/lib/physics/imageSphere';
const close=(a:number,b:number,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
for(const convention of ['coulomb','unit'] as GreenConvention[])for(const a of [.7,1,2]){
 for(const source of [[1.05*a,0,0],[0,2*a,0],[a,2*a,3*a]] as Point3[]){
  const im=greenImage(source,a),scale=greenScale(convention),d=norm3(source);
  close(norm3(im.point),a*a/d);assert.ok(norm3(im.point)<a);
  for(let i=0;i<150;i++){
   const z=1-2*(i+.5)/150,theta=i*2.399963229728653,p:Point3=[a*Math.sqrt(1-z*z)*Math.cos(theta),a*Math.sqrt(1-z*z)*Math.sin(theta),a*z];
   close(sphereGreen(p,source,a,convention).total,0,1e-12);
  }
  for(const p of [[-2*a,1.4*a,.5*a],[3*a,-a,2*a],[0,0,1.3*a]] as Point3[]){
   const g=sphereGreen(p,source,a,convention);
   close(g.total,sphereGreen(source,p,a,convention).total,1e-12);assert.ok(g.total>0);assert.ok(g.reaction<0);
   close(g.reaction,-scale*a/Math.sqrt(norm3(p)**2*d*d+a**4-2*a*a*p.reduce((v,x,i)=>v+x*source[i],0)),1e-12);
   const lap=greenLaplacian(p,source,1e-3*a,a,convention);assert.ok(Math.abs(lap)<scale*2e-5/a**3);
  }
  close(sphereGreen(source,source,a,convention).reaction,-scale*a/(d*d-a*a),1e-12);
  assert.equal(sphereGreen(source,source,a,convention).total,Infinity);
  assert.ok(Math.abs(sphereGreen([1e8*a,0,0],source,a,convention).total)<1e-7/a);
  // Closed-surface gradient flux around the singularity: independent 3D numerical integration.
  const radius=Math.min(.02*a,(d-a)*.2),h=radius*1e-4,N=3000;let flux=0;
  for(let i=0;i<N;i++){
   const z=1-2*(i+.5)/N,t=i*2.399963229728653,u:Point3=[Math.sqrt(1-z*z)*Math.cos(t),Math.sqrt(1-z*z)*Math.sin(t),z],p=source.map((v,k)=>v+radius*u[k]) as Point3;
   for(let axis=0;axis<3;axis++){const plus=[...p] as Point3,minus=[...p] as Point3;plus[axis]+=h;minus[axis]-=h;flux+=(sphereGreen(plus,source,a,convention).total-sphereGreen(minus,source,a,convention).total)/(2*h)*u[axis]*4*Math.PI*radius*radius/N;}
  }
  close(flux,-4*Math.PI*scale,1e-6);
 }
}
for(const p of [[1,1,0],[-2,1,0],[0,3,0]] as Point3[]){const source:Point3=[2.5,0,0],a=sphereGreen(p,source),b=sphereGreen(p,source,1,'unit');close(a.total,4*Math.PI*b.total);close(K*1e-9*a.total,potential({a:1,d:2.5,q:1e-9,neutral:false},p[0],p[1]));}
assert.throws(()=>greenImage([.5,0,0]),RangeError);
console.log('Sphere Green: full-sphere boundary, 3D Laplacian, reciprocity, symmetric correction, singularity flux, normalization and image-project agreement passed.');
const {greenField,greenFieldLines}=await import('../client/src/lib/physics/sphereGreen');
for(const a of [0,1])for(const source of [[2.5,0,0],[0,1.05,0],[-1.1,2,0]] as Point3[]){
 for(const p of [[-2,1,0],[1.4,1,1],[0,0,2]] as Point3[]){
  const f=greenField(p,source,a),h=1e-5;
  for(let axis=0;axis<3;axis++){const plus=[...p] as Point3,minus=[...p] as Point3;plus[axis]+=h;minus[axis]-=h;close(f[axis],-(sphereGreen(plus,source,a).total-sphereGreen(minus,source,a).total)/(2*h),1e-8);}
 }
 const paths=greenFieldLines(source,a,1);assert.ok(paths.length>=24);
 for(const line of paths)for(const point of line.points){assert.ok(point.every(Number.isFinite));if(a)assert.ok(norm3(point)>=a);}
 const reversed=greenFieldLines(source,a,-1);assert.deepEqual(paths[0].points,reversed[0].points);assert.equal(reversed[0].direction,-paths[0].direction);
 if(a===0){for(const p of paths[0].points){const first=paths[0].points[0],dx=p[0]-source[0],dy=p[1]-source[1];assert.ok(Math.abs(dx*(first[1]-source[1])-dy*(first[0]-source[0]))<1e-10);}}
 assert.deepEqual(greenFieldLines(source,a,0),[]);
}
for(const source of [[0,0,0],[.2,.1,0]] as Point3[]){
 const p:Point3=[.5,-.3,.2],g=sphereGreen(p,source,0);close(g.total,1/distance3(p,source));assert.equal(g.reaction,0);close(g.total,sphereGreen(source,p,0).total);assert.ok(Math.abs(greenLaplacian(p,source,1e-4,0))<1e-4);assert.equal(greenFieldLines(source,0).length,32);
}
for(const theta of [.2,1,2.4]){const p:Point3=[1.0000001*Math.cos(theta),1.0000001*Math.sin(theta),0],f=greenField(p,[2,0,0],1);assert.ok(Math.abs(-Math.sin(theta)*f[0]+Math.cos(theta)*f[1])<1e-5);}
console.log('Field/free-space checks passed: field gradient, radial free-space lines, sphere-normal field, sign reversal, zero charge, and no excluded origin.');
