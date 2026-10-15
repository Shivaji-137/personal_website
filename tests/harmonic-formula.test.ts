import assert from 'node:assert/strict';
import { legendrePolynomial, expandedHarmonicFormula } from '../client/src/lib/physics/harmonicFormula';
import { thetaFactor } from '../client/src/lib/physics/sphericalHarmonics';
const p = legendrePolynomial(5,3);
assert.equal(p.numerator,BigInt(105)); assert.equal(p.denominator,BigInt(2));
assert.deepEqual(p.terms.map(t=>[t.power,Number(t.coefficient)]),[[2,9],[0,-1]]);
for(let l=0;l<=16;l++)for(let q=0;q<=l;q++)for(const theta of [.35,1.2,2.6])for(const m of new Set([q,-q]))for(const phase of ['standard','notes'] as const){
 const poly=legendrePolynomial(l,q);
 let logNorm=Math.log((2*l+1)/(4*Math.PI));for(let j=l-q+1;j<=l+q;j++)logNorm-=Math.log(j);
 const value=Number(poly.numerator)/Number(poly.denominator)*poly.terms.reduce((s,t)=>s+Number(t.coefficient)*Math.cos(theta)**t.power,0)*Math.sin(theta)**q*Math.exp(logNorm/2)*(-1)**(q+(m<0?q:0)+(phase==='notes'?q:0));
 const expected=thetaFactor({l,m,phase,component:'real'},theta);
 assert.ok(Math.abs(value-expected)<2e-9,`Mismatch ${l},${m},${phase}: ${value} vs ${expected}`);
}
for(let l=0;l<=64;l++)for(let m=-l;m<=l;m++) {
 const formula=expandedHarmonicFormula({l,m,phase:'notes',component:'real'});
 assert.ok(!formula.includes('P_')); assert.ok(!formula.includes('component')); if(m!==0) assert.ok(formula.includes('\\cos(')); assert.ok(!formula.includes('NaN'));
}
assert.ok(expandedHarmonicFormula({l:5,m:0,phase:'notes',component:'imaginary'}).endsWith('=0'));
console.log('Exact polynomial expansion, normalized signs, orders through 64, and zero component passed.');
