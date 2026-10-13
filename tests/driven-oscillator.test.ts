import assert from 'node:assert/strict';
import { amplitudePeak,oscillatorResponse,powerBandwidth,steadyMotion } from '../client/src/lib/physics/drivenOscillator';
const near=(a:number,b:number,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const omega0 of [1,5,10])for(const r of [0.02,0.3,1,Math.SQRT2,1.8,2,3]){
 const p={omega0,nu:r*omega0,acceleration:1.7},peak=amplitudePeak(p);
 near(oscillatorResponse(0,p).amplitude,p.acceleration/omega0**2);
 near(oscillatorResponse(omega0,p).phase,Math.PI/2);
 near(oscillatorResponse(omega0,p).amplitude,p.acceleration/(p.nu*omega0));
 assert.equal(peak.interior,r<Math.SQRT2);
 // Global numerical sweep is bounded by the analytic maximum.
 for(let i=0;i<=10000;i++)assert.ok(oscillatorResponse(i/1000*omega0,p).amplitude<=peak.amplitude*(1+1e-12));
 for(const omega of [0,0.5*omega0,omega0,3*omega0])for(const t of [0,0.1,1,10]){
  const m=steadyMotion(t,omega,p);
  near(m.acceleration+p.nu*m.velocity+omega0**2*m.x,p.acceleration*Math.cos(omega*t));
 }
 const bw=powerBandwidth(p),power=(omega:number)=>p.nu*omega**2*oscillatorResponse(omega,p).amplitude**2/2;
 near(bw.high-bw.low,p.nu);near(power(bw.low)/power(omega0),0.5);near(power(bw.high)/power(omega0),0.5);
}
const weak={omega0:5,nu:0.5,acceleration:1},strong={...weak,nu:2};
assert.ok(amplitudePeak(weak).amplitude>amplitudePeak(strong).amplitude);
assert.ok(amplitudePeak(weak).omega>amplitudePeak(strong).omega);
assert.ok(powerBandwidth(weak).width<powerBandwidth(strong).width);
near(oscillatorResponse(1e6,weak).phase,Math.PI,1e-6);
assert.ok(oscillatorResponse(1e-6,weak).phase<1e-6);
console.log('Driven oscillator checks passed: static and resonant limits, exact global peak and threshold, phase quadrants, differential-equation residual and exact half-power bandwidth.');
