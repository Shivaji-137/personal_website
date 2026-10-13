import assert from 'node:assert/strict';
import { analyzeDynamics, DEFAULT_DYNAMICS,detectPeriod } from '../client/src/lib/physics/dynamicalMap';
const linear=analyzeDynamics(1.2,0.2,{...DEFAULT_DYNAMICS,linear:1,cubic:0});
assert.equal(linear.period,1);assert.ok(Math.abs(linear.lambda+0.1)<0.005);
const equilibrium=analyzeDynamics(1,0,DEFAULT_DYNAMICS);assert.equal(equilibrium.period,1);assert.ok(equilibrium.lambda<0);
const chaos=analyzeDynamics(1,0.3,{...DEFAULT_DYNAMICS,burn:400,cycles:360});
console.log('Chaotic reference estimate',chaos.lambda,chaos.lower,chaos.period);
assert.equal(chaos.period,-1);assert.ok(chaos.lambda>0.02);
const refined=analyzeDynamics(1,0.3,{...DEFAULT_DYNAMICS,burn:400,cycles:360,steps:320});
assert.equal(refined.period,-1);assert.ok(refined.lambda>0.02);
for(let period=1;period<=9;period++){const samples=Array.from({length:180},(_,i)=>({x:Math.cos(i%period),v:Math.sin(i%period)}));assert.equal(detectPeriod(samples,1e-5),period);}
assert.equal(detectPeriod(Array.from({length:180},(_,i)=>({x:Math.sin(i*Math.sqrt(2)),v:Math.cos(i*Math.sqrt(2))})),0.001),0);
console.log('Dynamical map checks passed: linear exponent, stable equilibrium, periods 1–9, nonperiodic rejection and chaotic classification under step refinement.');
