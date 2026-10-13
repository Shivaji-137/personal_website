import assert from 'node:assert/strict';
import { absolutePhotometry, bolometricPhotometry, distanceModulus } from '../client/src/lib/physics/distancePhotometry';
import { bandMeasurement,DEFAULT_FILTERS } from '../client/src/lib/physics/photometry';
const near=(a:number,b:number,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} versus ${b}`);
for(const temperature of [3000,5772,15000]){
 const abs=absolutePhotometry(temperature,1);
 for(const distance of [1,10,20,10000]){
  const actual=DEFAULT_FILTERS.map(f=>bandMeasurement(f,{temperature,radius:1,distance},'ab'));
  actual.forEach((m,i)=>{near(m.magnitude,abs[i].magnitude+distanceModulus(distance));near(m.energy/abs[i].energy,(10/distance)**2);});
  near(actual[1].magnitude-actual[2].magnitude,abs[1].magnitude-abs[2].magnitude);
  const b=bolometricPhotometry(temperature,1,distance);
  near(b.apparent-b.absolute,distanceModulus(distance));
  near(b.apparent-actual[2].magnitude,b.absolute-abs[2].magnitude);
 }
 const a=bolometricPhotometry(temperature,1,10),b=bolometricPhotometry(temperature,1,20);
 near(a.flux/b.flux,4);near(b.apparent-a.apparent,5*Math.log10(2));
 near(bolometricPhotometry(temperature,2,10).luminosity/a.luminosity,4);
}
near(distanceModulus(10),0);near(distanceModulus(1000),10);
assert.ok(Math.abs((absolutePhotometry(3000,1)[1].magnitude-absolutePhotometry(3000,1)[2].magnitude)-(absolutePhotometry(15000,1)[1].magnitude-absolutePhotometry(15000,1)[2].magnitude))>0.5);
console.log('Distance photometry checks passed: direct band integrals, inverse-square dilution, distance modulus, invariant colors and bolometric corrections, radius scaling and temperature-dependent color.');
