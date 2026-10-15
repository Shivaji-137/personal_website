import assert from 'node:assert/strict';
import katex from 'katex';
import { associatedExpression, associatedLegendre as A, ordinaryLegendre as P, ordinaryDerivative as D, legendreRoots, gaussLegendre, polynomialExpression, logFactorial } from '../client/src/lib/physics/legendre';
const near=(a:number,b:number,t=3e-11)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
for(const x of [-1,-.8,-.2,0,.3,.9,1]){
 near(P(0,x),1);near(P(1,x),x);near(P(2,x),(3*x*x-1)/2);near(P(3,x),(5*x**3-3*x)/2);
 near(A(1,1,x),-Math.sqrt(1-x*x));near(A(2,1,x),-3*x*Math.sqrt(1-x*x));near(A(2,2,x),3*(1-x*x));
 near(A(5,3,x),-105/2*(1-x*x)**1.5*(9*x*x-1));near(D(5,3,x),105/2*(9*x*x-1));
 near(A(1,-1,x),.5*Math.sqrt(1-x*x));near(A(2,-2,x),(1-x*x)/8);
}
const gauss=gaussLegendre();near(gauss.reduce((s,p)=>s+p.w,0),2);
for(const l of [0,1,2,5,16,32,64]){
 near(P(l,1),1);near(P(l,-1),(-1)**l);near(D(l,0,.37),P(l,.37));
 near(gauss.reduce((s,p)=>s+p.w*P(l,p.x)**2,0),2/(2*l+1));
 for(const q of new Set([0,Math.min(1,l),Math.floor(l/2),l]))for(const m of new Set([q,-q])){
  for(const phase of ['standard','notes'] as const){
   near(gauss.reduce((s,p)=>s+p.w*A(l,m,p.x,phase,true)**2,0),1/(2*Math.PI));
   const v=A(l,m,.37,phase),neg=A(l,m,-.37,phase);near(neg,(-1)**(l+q)*v);
   assert.ok(Number.isFinite(v));if(q){assert.equal(A(l,m,1,phase),0);assert.equal(A(l,m,-1,phase),0);}
   for(const theta of [false,true])for(const normalized of [false,true])katex.renderToString(associatedExpression(l,m,phase,normalized,theta),{throwOnError:true,strict:'error'});
  }
  const positive=A(l,q,.37),negative=A(l,-q,.37),ratio=(-1)**q*Math.exp(logFactorial(l-q)-logFactorial(l+q));
  if(Math.abs(positive)>1e-200&&q)near(negative/positive,ratio,1e-12);
  near(A(l,m,.37,'notes'),(-1)**q*A(l,m,.37));
 }
}
for(const [l,q]of [[0,0],[5,0],[5,3],[16,7],[64,63],[64,64]]){
 const roots=legendreRoots(l,q);assert.equal(roots.length,l-q);
 for(const root of roots)near(A(l,q,root,'standard',true),0,2e-10);
}
const roots=legendreRoots(5,3);near(roots[0],-1/3);near(roots[1],1/3);
assert.ok(polynomialExpression(5,3).includes('9x^{2}-1'));
assert.ok(polynomialExpression(5,3,String.raw`\cos\theta`).includes(String.raw`9\cos^{2}\theta-1`));
// Differential equation in the regular interior, checked with independent finite differences.
for(const [l,m] of [[1,0],[2,1],[5,3],[8,-2]])for(const x of [-.6,.2,.7]){
 const h=1e-4,y=A(l,m,x,'standard',true),yp=(A(l,m,x+h,'standard',true)-A(l,m,x-h,'standard',true))/(2*h),ypp=(A(l,m,x+h,'standard',true)-2*y+A(l,m,x-h,'standard',true))/(h*h);
 assert.ok(Math.abs((1-x*x)*ypp-2*x*yp+(l*(l+1)-m*m/(1-x*x))*y)<2e-5);
}
console.log('Legendre formulas, signed orders, phases, exact expansions, endpoints, roots, ODE and normalization through degree 64 passed.');
