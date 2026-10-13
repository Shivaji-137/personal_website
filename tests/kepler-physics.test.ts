import assert from 'node:assert/strict';
import {keplerPeriod,keplerState,sweptArea} from '../client/src/lib/physics/kepler';
const near=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
near(keplerPeriod(1),1);near(keplerPeriod(4),8);near(keplerPeriod(4,4),4);
for(const a of [0.3,1,2,30])for(const ratio of [0.2,0.3,0.8,1]){
 const b=a*ratio,e=Math.sqrt(1-ratio*ratio);
 for(let j=0;j<=1000;j++){
  const s=keplerState(j/1000,a,b,1.3);
  near((s.x+a*e)**2/a**2+s.y**2/b**2,1);
  near(s.x*s.vy-s.y*s.vx,2*s.areaRate,1e-7);
  near(s.speed**2,4*Math.PI**2*1.3*(2/s.r-1/a),1e-6);
  near(Math.sin(s.E-e*Math.sin(s.E)),Math.sin(j/1000*2*Math.PI));
 }
 near(keplerState(0,a,b).r,a*(1-e));near(keplerState(0.5,a,b).r,a*(1+e));
 // Independent polygon cross-product area validates the displayed swept sectors.
 for(const start of [0,0.4,0.9]){
  const end=start+0.125,n=16000;let numericalArea=0,prev=keplerState(start,a,b);
  for(let j=1;j<=n;j++){const next=keplerState(start+(end-start)*j/n,a,b);numericalArea+=(prev.x*next.y-prev.y*next.x)/2;prev=next;}
  near(numericalArea,sweptArea(start,end,a,b),Math.max(1e-9,sweptArea(start,end,a,b)*1e-6));
 }
}
near((Math.log10(keplerPeriod(10))-Math.log10(keplerPeriod(1)))/(Math.log10(10)-Math.log10(1)),1.5);
console.log('Kepler checks passed: ellipse locus, solver at high eccentricity, equal swept areas including wrap, angular momentum, vis-viva, period scaling, and log-log slope.');
