import assert from 'node:assert/strict';
import { parallaxState } from '../client/src/lib/physics/parallax';
const near=(a:number,b:number,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const d of [1,2,5,10,100])for(const latitude of [-90,-45,0,45,90]){
 const jan=parallaxState(d,0,latitude),jul=parallaxState(d,6,latitude);
 near(jan.parallaxArcsec,1/d);
 near(jan.eastArcsec,-jul.eastArcsec);near(jan.northArcsec,0);near(jul.northArcsec,0);
 near(Math.hypot(jan.eastArcsec-jul.eastArcsec,jan.northArcsec-jul.northArcsec),2/d,1e-10);
 near(Math.hypot(jan.earth.x-jul.earth.x,jan.earth.y-jul.earth.y),2);
 near(parallaxState(d,12,latitude).eastArcsec,jan.eastArcsec);
 for(let month=0;month<12;month+=0.25){const s=parallaxState(d,month,latitude);near(s.earth.x*s.earth.x+s.earth.y*s.earth.y,1);}
}
near(parallaxState(5,0).parallaxArcsec/parallaxState(10,0).parallaxArcsec,2);
for(let month=0;month<12;month+=0.1){
 near(parallaxState(1,month,0).northArcsec,0);
 const polar=parallaxState(1,month,90);near(Math.hypot(polar.eastArcsec,polar.northArcsec),1,1e-9);
 const north=parallaxState(5,month,45),south=parallaxState(5,month,-45);near(north.northArcsec,-south.northArcsec);
}
console.log('Parallax checks passed: inverse distance, opposite-month baseline and 2p shift, periodicity, ecliptic line, polar circle, latitude sign.');
