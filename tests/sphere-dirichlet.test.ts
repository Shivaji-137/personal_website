import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import katex from 'katex';
import {wedgeCoefficients,prepareWedge,wedgeAnswers,annulusValue,dirichletField,radialPair,wedgeTarget,type Point} from '../client/src/lib/physics/sphereDirichlet';
import {gaussLegendre} from '../client/src/lib/physics/legendre';
import {K} from '../client/src/lib/physics/imageSphere';
const close=(a:number,b:number,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const alpha=Math.PI/3,coeff=wedgeCoefficients(24,alpha,1),fn=prepareWedge(coeff),answers=wedgeAnswers(alpha,1),h=1e-4;
close(fn([0,0,0]),1/3);close(answers.ex,-3*Math.sqrt(3)/8);close(answers.gradient,-5*Math.sqrt(3)/(4*Math.PI));
const centerE=dirichletField(p=>fn(p,'inside'),[0,0,0]);close(centerE[0],answers.ex,1e-7);close(centerE[1],0);close(centerE[2],0);
close(-(fn([h,0,0],'inside')-2*fn([0,0,0],'inside')+fn([-h,0,0],'inside'))/h**2,answers.gradient,1e-7);
// Independent spherical Poisson integral over the nonzero patch.
const quad=gaussLegendre(96),p:Point=[.2,.3,.1],r=Math.hypot(...p);let integral=0;
for(const {x:mu,w} of quad)for(const {x:v,w:wp} of quad){const phi=alpha*v,n=[Math.sqrt(1-mu*mu)*Math.cos(phi),Math.sqrt(1-mu*mu)*Math.sin(phi),mu];integral+=w*wp*alpha/Math.hypot(...p.map((x,k)=>x-n[k]))**3;}
close(fn(p),(1-r*r)/(4*Math.PI)*integral,1e-7);
for(const p of [[.2,.4,.3],[1.4,.3,.5],[0,0,.4]] as Point[]){const r=Math.hypot(...p);if(r>1)close(fn(p),fn(p.map(x=>x/r**2) as Point)/r);const lap=p.reduce((sum,_,i)=>{const a=[...p] as Point,b=[...p] as Point;a[i]+=h;b[i]-=h;return sum+(fn(a)-2*fn(p)+fn(b))/h**2;},0);close(lap,0,5e-6);}
// Surface normal derivative jump equals the charge series.
for(const phi of [.2,1.7]){const n:Point=[Math.cos(phi),Math.sin(phi),0],rad=(x:number)=>n.map(v=>x*v) as Point,derIn=(fn(rad(1+h),'inside')-fn(rad(1-h),'inside'))/(2*h),derOut=(fn(rad(1+h),'outside')-fn(rad(1-h),'outside'))/(2*h);close(fn(n,'surface',true)*1e9,(derIn-derOut)/(4*Math.PI*K)*1e9,1e-5);}
let Q=0;for(const {x:mu,w} of gaussLegendre(32))for(let j=0;j<64;j++){const p=j*Math.PI/32;Q+=w*Math.PI/32*fn([Math.sqrt(1-mu*mu)*Math.cos(p),Math.sqrt(1-mu*mu)*Math.sin(p),mu],'surface',true);}close(Q*1e9,answers.charge*1e9,1e-7);
const constant=prepareWedge(wedgeCoefficients(12,Math.PI,2));close(constant([.2,.3,.4]),2);close(constant([2,0,0]),1);assert.equal(wedgeTarget(alpha,alpha,1),.5);
const zero=prepareWedge(wedgeCoefficients(12,alpha,0));assert.equal(zero([0,0,0]),0);assert.equal(zero([2,1,0]),0);
const s={A:1,B:2,P:1,Q:-.4,dipole:.7,quadrupole:.3};
for(let i=0;i<70;i++){const t=i*.13,phi=i*.37,n:Point=[Math.sin(t)*Math.cos(phi),Math.sin(t)*Math.sin(phi),Math.cos(t)];close(annulusValue(s,n),s.P+s.dipole*n[0]);close(annulusValue(s,n.map(x=>s.B*x) as Point),s.Q+s.quadrupole*s.B**2*(3*n[2]**2-1));}
const a:Point=[1.2,.5,.4],lap=a.reduce((sum,_,i)=>{const p=[...a] as Point,m=[...a] as Point;p[i]+=h;m[i]-=h;return sum+(annulusValue(s,p)-2*annulusValue(s,a)+annulusValue(s,m))/h**2;},0);close(lap,0,1e-6);
for(const l of [0,1,2]){close(radialPair(l,.4,-.7,1,2,1).value,.4);close(radialPair(l,.4,-.7,1,2,2).value,-.7);}
for(const m of readFileSync('client/src/components/imagesphere/SphereDirichletExplorer.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(m[1],{throwOnError:true,strict:'error'});
console.log('Dirichlet spheres: independent Poisson integral, center field/Hessian, Kelvin transform, 3D Laplacian, surface charge jump/total, full-sphere and zero limits, annular 3D boundary values and LaTeX passed.');
