import assert from 'node:assert/strict';
import { laneEmden, stellarModel, G } from '../client/src/lib/physics/hydrostatic';
const near = (a:number,b:number,tol:number) => assert.ok(Math.abs(a-b)<tol,`${a} vs ${b}`);
near(laneEmden(0).at(-1)!.xi,Math.sqrt(6),2e-6);
const analytic=laneEmden(1);
near(analytic.at(-1)!.xi,Math.PI,3e-6);
for(const p of analytic.filter((_,i)=>i%100===0)) if(p.xi>0) near(p.theta,Math.sin(p.xi)/p.xi,2e-6);
near(laneEmden(3).at(-1)!.xi,6.89684862,4e-6);
near(laneEmden(3).at(-1)!.v,2.01823595,2e-6);
for(const n of [1,1.5,3,4]) {
 const model=stellarModel(1,1,n),dr=model.radius/10000;
 let integratedMass=0,pressureIntegral=0,energy=0;
 for(let i=0;i<10000;i++) {
  const s=model.state((i+.5)/10000);
  integratedMass+=4*Math.PI*s.r**2*s.density*dr;
  pressureIntegral+=4*Math.PI*s.r**2*s.pressure*dr;
  energy-=4*Math.PI*G*s.enclosedMass*s.r*s.density*dr;
 }
 near(integratedMass/model.mass,1,2e-5);
 near((3*pressureIntegral+energy)/Math.abs(energy),0,3e-5);
 for(const u of [.1,.3,.6,.85]) {
  const s=model.state(u),h=.0001;
  const derivative=(model.state(u+h).pressure-model.state(u-h).pressure)/(2*h*model.radius);
  near(derivative/s.pressureGradient,1,.006);
 }
 assert.equal(model.state(0).gravity,0); assert.equal(model.state(1).pressure,0); assert.equal(model.state(1).density,0);
 near(model.state(1).enclosedMass/model.mass,1,1e-12);
 const doubled=stellarModel(2,1,n),large=stellarModel(1,2,n);
 near(doubled.centralPressure/model.centralPressure,4,1e-10);
 near(large.centralPressure/model.centralPressure,1/16,1e-10);
 near(doubled.centralTemperature/model.centralTemperature,2,1e-10);
}
assert.throws(()=>stellarModel(0,1,3));assert.throws(()=>laneEmden(5));
console.log('Hydrostatic checks passed: analytic polytropes, n=3 constants, independent mass/virial integrals, pressure gradients and scaling.');
