import assert from 'node:assert/strict';
import {blackbodyColor,peakWavelengthNm,planckRadiance,STEFAN_SIGMA,visibleFraction} from '../client/src/lib/physics/blackbody';
const near=(a:number,b:number,tol:number)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
near(peakWavelengthNm(3000),965.923985,0.0001);
near(peakWavelengthNm(15000),193.184797,0.0001);
near(peakWavelengthNm(6000)/peakWavelengthNm(3000),0.5,1e-12);
for(const T of [3000,3600,5772,13000,15000]){
 const peak=peakWavelengthNm(T),v=planckRadiance(peak,T);
 assert.ok(v>planckRadiance(peak*0.99,T));assert.ok(v>planckRadiance(peak*1.01,T));
 // Integrate the entire spectral radiance independently in log wavelength.
 let total=0;const lo=Math.log(1),hi=Math.log(1e7),n=24000,h=(hi-lo)/n;
 for(let j=0;j<=n;j++){const nm=Math.exp(lo+j*h);total+=planckRadiance(nm,T)*nm*(j===0||j===n?0.5:1)*h;}
 near(total*Math.PI/(STEFAN_SIGMA*T**4),1,1e-6);
 const visible=visibleFraction(T);assert.ok(visible>0&&visible<1);
 const c=blackbodyColor(T);assert.ok(c.rgb.every(v=>Number.isFinite(v)&&v>=0&&v<=255));
}
const cool=blackbodyColor(3000),hot=blackbodyColor(15000);
assert.ok(cool.rgb[0]>cool.rgb[2]);assert.ok(hot.rgb[2]>hot.rgb[0]);
near(blackbodyColor(6500).chromaticity.x,0.3135,0.004);
near(blackbodyColor(6500).chromaticity.y,0.3237,0.004);
for(const nm of [100,380,550,780,2500])assert.ok(planckRadiance(nm,15000)>planckRadiance(nm,3000));
console.log('Blackbody checks passed: Wien peak, spectral maxima, Stefan–Boltzmann integral, increasing radiance, visible fraction, warm/cool colors and chromaticity.');
