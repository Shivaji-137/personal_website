import assert from 'node:assert/strict';
import { flashModel,wavefront } from '../client/src/lib/physics/simultaneity';
import { boost,interval } from '../client/src/lib/physics/lorentz';
const near=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
for(const beta of [-0.95,-0.6,0,0.6,0.95])for(const [x1,x2] of [[-2,2],[-1,3]]){
 const m=flashModel(x1,x2,beta);
 near(m.delay,-m.gamma*beta*(x2-x1));
 for(const s of m.sources){
  const arrival=boost({x:beta*s.arrivalLab,y:0,z:0,t:s.arrivalLab},beta);
  near(arrival.x,0);near(arrival.t,s.arrivalPrime);
  near(interval({x:beta*s.arrivalLab-s.x,y:0,z:0,t:s.arrivalLab}),0);
  const w=wavefront(s.x,beta,s.arrivalPrime,true);
  near(w.radius,Math.abs(w.center));
  near(wavefront(s.x,beta,s.emission.t,true).bulb,s.emission.x);
  // Transform rays in arbitrary directions: each lies on the moving light sphere.
  for(const angle of [0,0.7,1.5,3]){
   const ray=boost({x:s.x+2*Math.cos(angle),y:2*Math.sin(angle),z:0,t:2},beta);
   near((ray.x-s.emission.x)**2+ray.y**2,(ray.t-s.emission.t)**2);
  }
 }
 if(x1===-x2)near(m.arrivalDelay,m.delay);
}
near(flashModel(-2,2,0.6).delay,-3);
near(flashModel(-1,3,0).delay,0);
near(flashModel(-1,3,0).arrivalDelay,2);
assert.equal(wavefront(2,0.6,-5,true).emitted,false);
console.log('Simultaneity checks passed: emission differences, observer worldline intersections, null rays in all directions, spherical fronts, bulb worldlines and reception versus emission.');
