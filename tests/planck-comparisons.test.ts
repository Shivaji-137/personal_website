import assert from 'node:assert/strict';
import { logRadiance, approximationErrors, validityWavelengths, luminosityQuadrature, bandLuminosity } from '../client/src/lib/physics/planckComparisons';
import { planckRadiance, STEFAN_SIGMA } from '../client/src/lib/physics/blackbody';
const near=(a:number,b:number,tol:number)=>assert.ok(Math.abs(a/b-1)<tol,`${a} versus ${b}`);
for(const T of [10,300,5772,1e7]){
 for(const nm of [1,550,1e4,1e7]){
  assert.ok(Number.isFinite(logRadiance(nm,T)));
  const direct=planckRadiance(nm,T);if(direct>1e-290)near(Math.exp(logRadiance(nm,T)),direct,1e-12);
 }
 for(const tolerance of [0.01,0.05,0.1]){
  const limits=validityWavelengths(T,tolerance);
  near(approximationErrors(limits.rayleigh,T).rayleigh,tolerance,1e-10);
  near(approximationErrors(limits.wien,T).wien,tolerance,1e-10);
 }
 // Broad integral recovers Stefan–Boltzmann even outside the UI range.
 near(bandLuminosity(1e-3,1e11,T,2),4*Math.PI*4*STEFAN_SIGMA*T**4,1e-6);
}
const q12=luminosityQuadrature(550,5772,1,12),q48=luminosityQuadrature(550,5772,1,48);
assert.ok(Math.abs(q48.relativeError)<Math.abs(q12.relativeError));
near(q48.numerical,q48.analytic,0.001);
near(luminosityQuadrature(550,5772,2,24).numerical,4*luminosityQuadrature(550,5772,1,24).numerical,1e-10);
assert.ok(approximationErrors(1e7,5772).rayleigh<0.001);
assert.ok(approximationErrors(1,5772).wien<1e-100);
assert.ok(approximationErrors(1,5772).rayleigh===Infinity);
console.log('Planck comparison checks passed: stable spectra, validity thresholds, limiting laws, luminosity convergence, radius scaling and bolometric integral.');
