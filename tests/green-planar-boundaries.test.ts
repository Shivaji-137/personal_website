import assert from 'node:assert/strict';
import {prepareResponse,superpositionLines,type GreenCharge} from '../client/src/lib/physics/greenSuperposition';
import {boundaryImages,boundaryClearance,constrainPoint,type GreenBoundary} from '../client/src/lib/physics/greenBoundaries';
import {K} from '../client/src/lib/physics/imageSphere';
import {distance3,type Point3} from '../client/src/lib/physics/sphereGreen';
const close=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
const eps=1/(4*Math.PI*K),plane:GreenBoundary={kind:'plane',gap:6,cutoff:12};
for(const q of [-2,0,1]){
 const source:GreenCharge={id:'s',position:[1.4,.7,-.3],q},r=prepareResponse([source],plane);
 for(let i=0;i<50;i++){
  const p:Point3=[0,-3+i*.12,.4];close(r.evaluate(p).voltage,0,1e-12);close(r.evaluate(p).field[1],0,1e-12);close(r.evaluate(p).field[2],0,1e-12);
  const sigma=eps*r.evaluate(p).field[0]*1e9,expected=-q*source.position[0]/(2*Math.PI*(source.position[0]**2+(p[1]-source.position[1])**2+(p[2]-source.position[2])**2)**1.5);close(sigma,expected,1e-12);
 }
}
// Independent high-cutoff raw symmetric series plus its analytically derived leading tail.
function reference(p:Point3,s:Point3,L:number){
 const u=p[0]+L/2,v=s[0]+L/2,rho2=(p[1]-s[1])**2+(p[2]-s[2])**2,N=8192;
 const term=(n:number)=>1/Math.sqrt(rho2+(u-v-2*n*L)**2)-1/Math.sqrt(rho2+(u+v-2*n*L)**2);
 let sum=term(0),zeta=0;for(let n=1;n<=N;n++){sum+=term(n)+term(-n);zeta+=1/n**3;}return sum-u*v/L**3*(1.202056903159594-zeta);
}
for(const gap of [3,6,9]){
 const s:Point3=[gap*.24,.6,.2],p:Point3=[-gap*.14,-.5,.9],charge:GreenCharge={id:'s',position:s,q:1},b:GreenBoundary={kind:'plates',gap,cutoff:12};
 const ref=reference(p,s,gap),errors=[8,16,32].map(cutoff=>Math.abs(prepareResponse([charge],{...b,cutoff}).evaluate(p).total-ref));
 assert.ok(errors[1]<errors[0]/8);assert.ok(errors[2]<errors[1]/8);assert.ok(errors[2]<2e-8);
 for(const cutoff of [8,16,32]){
  const config={...b,cutoff},r=prepareResponse([charge],config),swap=prepareResponse([{id:'p',position:p,q:1}],config);
  close(r.evaluate(p).total,swap.evaluate(s).total,1e-12);
  for(const x of [-gap/2,gap/2])for(const y of [-5,0,5]){
   const v=r.evaluate([x,y,.8]);assert.ok(Math.abs(v.voltage)<.001);assert.ok(Math.abs(v.field[1])<.001);
   const normal=x<0?1:-1,h=1e-5,v1=r.evaluate([x+normal*h,y,.8],false).voltage,v2=r.evaluate([x+normal*2*h,y,.8],false).voltage;
   close(-(-3*v.voltage+4*v1-v2)/(2*h),normal*v.field[0],1e-6);
  }
 }
}
for(const b of [plane,{kind:'plates',gap:6,cutoff:16} as GreenBoundary]){
 const charges:GreenCharge[]=[{id:'s',position:[1.2,.2,0],q:1},{id:'t',position:[.6,2,0],q:-.7}],r=prepareResponse(charges,b),p:Point3=[.7,-.5,.2],h=1e-4;
 const v=r.evaluate(p),unit=prepareResponse(charges,b,'unit').evaluate(p);close(v.voltage,unit.voltage);for(let axis=0;axis<3;axis++){
  const plus=[...p] as Point3,minus=[...p] as Point3;plus[axis]+=h;minus[axis]-=h;
  close(v.field[axis],-(r.evaluate(plus,false).voltage-r.evaluate(minus,false).voltage)/(2*h),1e-7);
 }
 let lap=0;for(let axis=0;axis<3;axis++){const plus=[...p] as Point3,minus=[...p] as Point3;plus[axis]+=h;minus[axis]-=h;lap+=r.evaluate(plus,false).voltage-2*v.voltage+r.evaluate(minus,false).voltage;}assert.ok(Math.abs(lap/h**2)<1e-4);
 const paths=superpositionLines(charges,b);assert.ok(paths.length>10);for(const line of paths)for(const p of line.points)assert.ok(p.every(Number.isFinite)&&boundaryClearance(p,b)>=0);
 for(const p of [[-5,8,0],[5,-8,0],[0,0,0]] as Point3[])assert.ok(boundaryClearance(constrainPoint(p,b),b)>=.099999999);
 for(const c of charges)assert.ok(boundaryImages(c.position,b).every(im=>boundaryClearance(im.position,b)<0));
 // Local source flux uses the analytical field from the retained image charges.
 const source=charges[0].position,rr=.02,N=2500;let flux=0;
 for(let i=0;i<N;i++){const z=1-2*(i+.5)/N,t=i*2.399963229728653,u:Point3=[Math.sqrt(1-z*z)*Math.cos(t),Math.sqrt(1-z*z)*Math.sin(t),z],p=source.map((x,j)=>x+rr*u[j]) as Point3,f=r.evaluate(p).field;flux+=f.reduce((n,x,j)=>n+x*u[j],0)*4*Math.PI*rr**2/N;}
 close(flux,4*Math.PI*K*1e-9,1e-6);
}
const {readFileSync}=await import('node:fs'),katex=(await import('katex')).default;
for(const match of readFileSync('client/src/components/imagesphere/PlanarBoundaryDiagnostics.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(match[1],{throwOnError:true,strict:'error'});
console.log('Planar boundaries passed: exact plane density, plate image-series reference and convergence, reciprocity, gradient, 3D Laplacian, surface normal derivatives, source flux, field-line domain, source constraints and LaTeX.');
