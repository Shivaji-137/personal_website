import assert from 'node:assert/strict';
import {bandMeasurement,DEFAULT_FILTERS,filterResponse,observedFlux,REFERENCE_TEMPERATURE} from '../client/src/lib/physics/photometry';
import {PLANCK_H,LIGHT_C} from '../client/src/lib/physics/blackbody';
const near=(a:number,b:number,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const p={temperature:5772,distance:10,radius:1};
for(const system of ['reference','ab'] as const)for(const f of DEFAULT_FILTERS){
 near(filterResponse(f.center,f),1);near(filterResponse(f.center+f.width/2,f),0.5);
 const base=bandMeasurement(f,p,system),far=bandMeasurement(f,{...p,distance:20},system),big=bandMeasurement(f,{...p,radius:2},system),dim=bandMeasurement({...f,throughput:0.3},p,system);
 near(far.photons/base.photons,0.25);near(far.energy/base.energy,0.25);near(far.magnitude-base.magnitude,5*Math.log10(2));
 near(big.photons/base.photons,4);near(big.magnitude-base.magnitude,-5*Math.log10(2));
 near(dim.photons/base.photons,0.3);near(dim.magnitude,base.magnitude);
 near(far.fraction,base.fraction);assert.ok(base.fraction>0&&base.fraction<1);
 near(bandMeasurement(f,{temperature:REFERENCE_TEMPERATURE,distance:10,radius:1}).magnitude,0);
 // Independent midpoint quadrature with half-nanometre sampling checks photon weighting.
 let independent=0;for(let nm=100.25;nm<2000;nm+=0.5)independent+=observedFlux(nm,p)*filterResponse(nm,f)*nm*1e-9/(PLANCK_H*LIGHT_C)*0.5;
 near(independent/base.photons,1,1e-7);
}
const color=(T:number,distance=10)=>{const ms=DEFAULT_FILTERS.map(f=>bandMeasurement(f,{temperature:T,distance,radius:1}));return{ub:ms[0].magnitude-ms[1].magnitude,bv:ms[1].magnitude-ms[2].magnitude};};
for(const T of [3000,5772,9600,15000]){near(color(T).ub,color(T,1000).ub);near(color(T).bv,color(T,1000).bv);}
assert.ok(color(3000).bv>color(5772).bv);assert.ok(color(5772).bv>color(15000).bv);
console.log('Photometry checks passed: filter centers/FWHM, photon integration, throughput calibration, reference zeros, inverse-square flux, magnitude shifts and distance-independent colors.');
