import assert from 'node:assert/strict';
import { boost,interval,lorentzFactor,causalType } from '../client/src/lib/physics/lorentz';
const near=(a:number,b:number,scale=1)=>assert.ok(Math.abs(a-b)<1e-9*scale,`${a} != ${b}`);
near(lorentzFactor(0.6),1.25);
const e={x:1,y:0.3,z:-0.4,t:2};const p=boost(e,0.6);
near(p.x,-0.25);near(p.t,1.75);near(p.y,e.y);near(p.z,e.z);
for(const beta of [-0.999,-0.9,0,0.6,0.999])for(const ev of [e,{x:2,y:0,z:0,t:2},{x:2,y:0,z:0,t:1},{x:100,y:50,z:-10,t:-100}]){
 const moved=boost(ev,beta),back=boost(moved,-beta);
 near(interval(moved),interval(ev),Math.max(1,ev.t**2+ev.x**2+ev.y**2+ev.z**2));
 for(const k of ['x','y','z','t'] as const)near(back[k],ev[k],100);
 if(causalType(ev)==='Timelike')assert.equal(Math.sign(moved.t),Math.sign(ev.t));
}
for(const beta of [-0.99,0.99]){const light=boost({x:2,y:0,z:0,t:2},beta);near(light.x/light.t,1);}
assert.equal(causalType({x:0,y:0,z:0,t:2}),'Timelike');
assert.equal(causalType({x:2,y:0,z:0,t:2}),'Lightlike');
assert.equal(causalType({x:0,y:3,z:0,t:2}),'Spacelike');
assert.throws(()=>lorentzFactor(1),RangeError);assert.throws(()=>lorentzFactor(-1),RangeError);
console.log('Lorentz checks passed: known boost, transverse coordinates, inverse recovery, interval invariance, light speed, causal ordering and invalid velocity rejection.');
