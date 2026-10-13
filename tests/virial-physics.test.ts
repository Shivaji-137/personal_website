import assert from 'node:assert/strict';
import { virialState,virialSamples,virialAverage,type VirialParams,AU_METRES,SOLAR_MASS_KG } from '../client/src/lib/physics/virial';
const near=(a:number,b:number,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const m1 of [0.1,1,10])for(const m2 of [0.1,0.7,10])for(const e of [0,0.5,0.85]){
 const p:VirialParams={m1,m2,a:1.3,e},table=virialSamples(p),scale=table.states[0].energyScale;
 const avg=virialAverage(1,table)!;
 near(avg.K/scale,0.5,1e-8);near(avg.U/scale,-1,1e-8);near(avg.residual/scale,0,1e-8);
 for(const phase of [0,0.17,0.5,0.87]){
  const s=virialState(phase,p);near(s.totalEnergy/scale,-0.5);near(s.K,s.K1+s.K2,Math.abs(s.K)*1e-12);
  near(m1*s.body1.x+m2*s.body2.x,0);near(m1*s.body1.vx+m2*s.body2.vx,0,1e-8);
  near(s.K/scale,p.a/s.r-0.5);near(s.U/scale,-p.a/s.r);
  const reducedK=0.5*s.reducedMass*SOLAR_MASS_KG*(s.vx**2+s.vy**2);near(reducedK/scale,s.K/scale);
  // Independent finite difference of I = reduced mass * r^2 verifies the instantaneous identity.
  const dt=1e-5,seconds=dt*s.periodYears*365.25*86400;
  const before=virialState(phase-dt,p),after=virialState(phase+dt,p);
  const ddI=s.reducedMass*SOLAR_MASS_KG*AU_METRES**2*(after.r**2-2*s.r**2+before.r**2)/seconds**2;
  near(0.5*ddI/scale,s.virial/scale,2e-5);
 }
 near(virialState(0,p).r,p.a*(1-e));near(virialState(0.5,p).r,p.a*(1+e));
 near(virialAverage(3,table)!.residual/scale,0,1e-8);
 if(e>0)assert.ok(Math.abs(virialAverage(0.2,table)!.residual/scale)>0.01);
}
assert.equal(virialAverage(0,virialSamples({m1:1,m2:1,a:1,e:0.5})),null);
console.log('Virial checks passed: reduced mass, COM and momentum, energy conservation, vis-viva, instantaneous virial identity, full-orbit and finite-time averages.');
