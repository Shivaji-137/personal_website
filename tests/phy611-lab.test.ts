import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import katex from 'katex';
import {modules,assignmentUrl,solidAngleQuadratures,squareAngle,distortedRadius,harmonicValue,laplacian,cubeSource,cubeSourceApprox,cubePotential,sixExact,sixApprox,triangleEnergy,bumpExact,bumpSeries,boxSpectral,boxImages,boxNonzero,neumannDisk,createModel,ballField,ballPotential,type LabParams,type V3} from '../client/src/lib/physics/phy611Lab';
import {gaussLegendre} from '../client/src/lib/physics/legendre';
const close=(a:number,b:number,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
assert.equal(new Set(modules.map(m=>m.assignment)).size,13);assert.equal(modules.length,18);assert.equal(assignmentUrl(1).endsWith('1Assignment.docx'),true);
for(const m of modules)for(const tex of m.equations)katex.renderToString(tex,{throwOnError:true,strict:'error'});
for(const h of [.2,1,3]){close(squareAngle(h),4*Math.atan(1/(h*Math.sqrt(h*h+2))));const a=solidAngleQuadratures(h,10),b=solidAngleQuadratures(h,80);assert.ok(Math.abs(b.surface-b.exact)<Math.abs(a.surface-a.exact));assert.ok(Math.abs(b.line-b.exact)<Math.abs(a.line-a.exact));}
for(const eta of [-.04,0,.04]){let Q=0;for(const {x:mu,w} of gaussLegendre(96)){const r=distortedRadius(mu,eta),er=1/r**2+3*eta*(3*mu*mu-1)/r**4,et=6*eta*mu*Math.sqrt(1-mu*mu)/r**4;close(1/r+eta*(3*mu*mu-1)/r**3,1);Q+=w*r*r*(er+et*et/er)/2;}close(Q,1);}
for(let degree=1;degree<=3;degree++)for(let basis=0;basis<2*degree+1;basis++)for(const exterior of [false,true])close(laplacian(p=>harmonicValue(degree,basis,p)/(exterior?Math.hypot(...p)**(2*degree+1):1),[.7,.6,.5]),0,2e-6);
for(const p of [[.3,.4,.6],[.5,.5,.5]] as V3[]){close(laplacian(p=>cubePotential(p,7),p),-cubeSourceApprox(p,7),1e-7);close(cubeSourceApprox(p,11),cubeSource(p),2e-5);assert.ok(Math.abs(cubeSourceApprox(p,11)-cubeSource(p))<Math.abs(cubeSourceApprox(p,3)-cubeSource(p)));}
for(let axis=0;axis<3;axis++)for(const edge of [0,1]){const p:V3=[.3,.4,.6];p[axis]=edge;close(cubePotential(p,7),0);}
// Leading six-charge correction is fourth order and the residual starts at sixth order.
const err=(r:number)=>Math.abs(sixExact([r,0,0])-sixApprox([r,0,0]));assert.ok(err(.1)/err(.05)>55);close(sixExact([0,0,0]),6);
for(const t of [-2,-.7,0,.4,Math.PI/2])close(triangleEnergy(t),(21*Math.cos(t)**2-15*Math.sin(t)**2)/4);close(triangleEnergy(Math.PI/2),-3.75);close(triangleEnergy(0,true),3);
for(const D of [1.3,2.5,4])for(let i=0;i<=30;i++){const t=i*Math.PI/60;close(bumpExact([Math.sin(t),0,Math.cos(t)],D),0);close(bumpExact([i*.1,0,0],D),0);}
for(const p of [[1.2,0,1],[.5,.3,3.2]] as V3[])close(bumpSeries(p,2.5,64),bumpExact(p,2.5),1e-6);
for(const z of [.1,.5,2])close(neumannDisk([0,0,z]).v,z-Math.sqrt(1+z*z),1e-6);
for(const p of [[.1,.2,.4],[-.2,.1,-.7]] as V3[]){close(boxSpectral([.5,p[1],p[2]],31),0);close(boxSpectral([p[0],p[1],100],31),0);assert.ok(Math.abs(boxImages(p,12)-boxSpectral(p,51))<.08);close(boxNonzero([.5,p[1],p[2]],31),p[2]**2);}
// Finite-source projection: verify the nonzero-box solver solves its projected Poisson correction.
const p:V3=[.13,.21,.7],N=15;let source=0;for(let k=1;k<=N;k+=2)for(let m=1;m<=N;m+=2)source+=32*Math.sin(k*Math.PI*(p[0]+.5))*Math.sin(m*Math.PI*(p[1]+.5))/(Math.PI**2*k*m);close(laplacian(p=>boxNonzero(p,N),p),2-source,2e-6);
close(ballPotential([0,0,0]),1.5);close(ballPotential([2,0,0]),.5);close(ballField([2,0,0])[0],.25);
// Independent quadrature of the interaction: the mean-value property gives 1/D.
let U=0;for(const {x:mu,w} of gaussLegendre(32))for(const {x:rr,w:wr} of gaussLegendre(32)){const r=(rr+1)/2;U+=1.5*w*wr/2*r*r*ballPotential([r*Math.sqrt(1-mu*mu),0,3+r*mu]);}close(U,1/3);
const base:LabParams={a:1,b:1.5,c:1,d:2.5,n:16,angle:.7,basis:0,degree:2,option:'plane'};
for(const boundary of ['plane','sphere']){const s={...base,option:boundary},model=createModel('dipole-images',s);for(let i=0;i<30;i++){const t=i*.1,p:V3=boundary==='plane'?[Math.cos(t),Math.sin(t),0]:[Math.sin(t),0,Math.cos(t)];close(model.v(p),0,1e-9);}}
const dipole=createModel('dipole-series',{...base,n:32});close(dipole.v([.2,.1,.4]),dipole.other([.2,.1,.4]));
const wire=createModel('wire',{...base,a:100,d:1});close(wire.other([.4,0,0]),wire.v([.4,0,0]),1e-4);
const mode=createModel('plane-mode',base);close(laplacian(mode.v,[.1,.2,.7]),0,1e-6);
for(const m of modules){const s={...base,d:m.id==='legendre'?.6:m.id==='balls'?3:2.5,a:m.id==='distorted'?.025:1},model=createModel(m.id,s);for(const p of [[.3,.2,.6],[1.5,0,.7]] as V3[])if(model.valid(p))assert.ok(Number.isFinite(model.v(p)),`${m.id} finite value`);}
for(const m of readFileSync('client/src/pages/PHY611LabPage.tsx','utf8').matchAll(/String\.raw`([^`]*)`/g))katex.renderToString(m[1],{throwOnError:true,strict:'error'});
console.log('PHY611: all 13 assignments/18 modules; source metadata, solid-angle integrals, deformed-conductor flux, harmonic/Kelvin PDEs, cube modes, cubic symmetry, dipole energy, bump images/series, Neumann disk, finite box, charged-ball energy, dipole boundaries/series, line reference, and LaTeX passed.');
