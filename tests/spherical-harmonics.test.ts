import assert from 'node:assert/strict';
import { analyze, complexHarmonic, evaluate, latitudeNodes, longitudeNodes, xyz, anglesFromXYZ, sign, type Harmonic } from '../client/src/lib/physics/sphericalHarmonics';
const near=(a:number,b:number,t=2e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(const t of [0,.3,1.2,Math.PI])for(const p of [-Math.PI,-.7,0,Math.PI]) {
 near(complexHarmonic(0,0,t,p).re,1/Math.sqrt(4*Math.PI));
 near(complexHarmonic(1,0,t,p).re,Math.sqrt(3/(4*Math.PI))*Math.cos(t));
 const c=complexHarmonic(1,1,t,p); near(c.re,-Math.sqrt(3/(8*Math.PI))*Math.sin(t)*Math.cos(p)); near(c.im,-Math.sqrt(3/(8*Math.PI))*Math.sin(t)*Math.sin(p));
 near(complexHarmonic(2,0,t,p).re,Math.sqrt(5/(16*Math.PI))*(3*Math.cos(t)**2-1));
}
for(const l of [0,1,2,5,16,32,64])for(const q of [...new Set([0,Math.min(l,1),Math.floor(l/2),Math.max(0,l-1),l])]) {
 const roots=latitudeNodes(l,q);assert.equal(roots.length,l-q);
 const v=complexHarmonic(l,q,1.1,-.9),n=complexHarmonic(l,-q,1.1,-.9),phase=(-1)**q;
 near(n.re,phase*v.re);near(n.im,-phase*v.im);
 for(const m of [q,-q]) { const a=complexHarmonic(l,m,1.1,-.9),b=complexHarmonic(l,m,1.1,-.9,'notes');near(b.re,phase*a.re);near(b.im,phase*a.im);assert.ok(Number.isFinite(a.re)); }
 // Gauss-Legendre quadrature integrates the squared normalized theta factor.
 let integral=0;const N=96;
 for(let i=1;i<=N;i++) {
  let x=Math.cos(Math.PI*(i-.25)/(N+.5)),derivative=0;
  for(let k=0;k<10;k++) {let a=1,b=x;for(let j=2;j<=N;j++)[a,b]=[b,((2*j-1)*x*b-(j-1)*a)/j];derivative=N*(x*b-a)/(x*x-1);const dx=b/derivative;x-=dx;if(Math.abs(dx)<1e-15)break;}
  const weight=2/((1-x*x)*derivative**2),z=complexHarmonic(l,q,Math.acos(x),.3);
  integral+=weight*(z.re**2+z.im**2)*2*Math.PI;
 }
 near(integral,1,2e-10);
}
const h:Harmonic={l:5,m:3,component:'real',phase:'notes'},a=analyze(h);
near(a.latitudes[0]*180/Math.PI,70.5287793655,1e-8);near(a.latitudes[1]*180/Math.PI,109.4712206345,1e-8);
assert.deepEqual(a.longitudes.map(x=>Math.round(x*180/Math.PI)),[-150,-90,-30,30,90,150]);assert.equal(a.boxes,21);assert.equal(a.sphereRegions,18);
for(const t of [.3,.8,1.6,2.7])for(const p of [-2.9,.4,2.8])near(evaluate(h,t,p),Math.sqrt(385/Math.PI)/32*Math.sin(t)**3*(9*Math.cos(t)**2-1)*Math.cos(3*p));
for(let l=0;l<=64;l++)for(const m of [0,Math.floor(l/2),Math.max(0,l-1),l])for(const component of ['real','imaginary'] as const) {
 assert.equal(longitudeNodes(m,component).length,m===0?0:component==='real'?2*m:2*m-1);
}
for(const t of [.1,.8,Math.PI/2,3])for(const p of [-Math.PI,-.8,2.9,Math.PI]) {const v=xyz(t,p),b=anglesFromXYZ(...v,.7);near(b.theta,t);near(Math.cos(b.psi),Math.cos(p));near(Math.sin(b.psi),Math.sin(p));}
near(anglesFromXYZ(0,0,1,.73).psi,.73);near(anglesFromXYZ(0,0,-1,-1.2).psi,-1.2);
assert.equal(analyze({...h,m:0,component:'imaginary'}).zero,true);assert.equal(evaluate({...h,m:0,component:'imaginary'},.5,.8),0);
assert.equal(sign(evaluate(h,a.latitudes[0],.3),a.tolerance),0);assert.equal(sign(evaluate(h,.4,a.longitudes[0]),a.tolerance),0);
assert.ok(evaluate(h,a.sampleTheta,a.samplePsi)<0);
console.log('Spherical harmonics: formulas, normalization through ℓ=64, phases, negative orders, nodes/counts, poles, linked coordinate round-trips and zero component passed.');

for(const component of ['real','imaginary'] as const)for(const m of [-3,3])for(const phase of ['standard','notes'] as const) {
 const h:Harmonic={l:5,m,component,phase},z=analyze(h),ts=[0,...z.latitudes,Math.PI],ps=[-Math.PI,...z.longitudes,Math.PI];
 const cell=(j:number,i:number)=>Math.sign(evaluate(h,(ts[j]+ts[j+1])/2,(ps[i]+ps[i+1])/2));
 for(let j=0;j<ts.length-1;j++)for(let i=0;i<ps.length-1;i++) {if(i)assert.equal(cell(j,i),-cell(j,i-1));if(j)assert.equal(cell(j,i),-cell(j-1,i));}
 const selected=complexHarmonic(5,m,.8,.9,phase), standard=complexHarmonic(5,m,.8,.9,'standard');near(selected.re**2+selected.im**2,standard.re**2+standard.im**2);
}
for(let q=0;q<=64;q++)assert.equal(latitudeNodes(64,q).length,64-q);
console.log('All degree-64 orders and neighboring-region sign alternation passed.');
