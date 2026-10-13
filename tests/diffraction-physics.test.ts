import assert from 'node:assert/strict';
import {airyIntensity,besselJ1,doubleStarIntensity,J1_FIRST_ZERO,rayleighArcsec} from '../client/src/lib/physics/diffraction';
const near=(a:number,b:number,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
near(besselJ1(0),0);near(besselJ1(1),0.4400505857449335);near(besselJ1(5),-0.3275791375914652);near(besselJ1(10),0.0434727461688614);near(besselJ1(J1_FIRST_ZERO),0);
// Independent numerical integral for J1 checks series/asymptotic transition and large arguments.
for(const x of [0.001,3.83170597,15.99,16,20,40,80,150]){
 let sum=0;const n=8192;for(let j=0;j<=n;j++){const t=j*Math.PI/n;sum+=Math.cos(t-x*Math.sin(t))*(j===0||j===n?0.5:1);}near(besselJ1(x),sum/n,2e-8);
 near(besselJ1(-x),-besselJ1(x));
}
for(const D of [0.05,0.2,2.4,10])for(const nm of [380,550,2000]){
 const radius=rayleighArcsec(D,nm);near(airyIntensity(0,D,nm),1);near(airyIntensity(radius,D,nm),0,1e-20);
 near(rayleighArcsec(D*2,nm)/radius,0.5);near(rayleighArcsec(D,nm*2)/radius,2);
 near(doubleStarIntensity(-radius/2,0,radius,D,nm),1);
 near(doubleStarIntensity(0,0,0,D,nm),2);
 const mid=doubleStarIntensity(0,0,radius,D,nm);assert.ok(mid>0.72&&mid<0.75);
 for(let r=0;r<radius*8;r+=radius/10){const I=airyIntensity(r,D,nm);assert.ok(I>=0&&I<=1+1e-10);}
}
console.log('Diffraction checks passed: Bessel values and independent integral, Airy center/first zero, Rayleigh alignment, aperture/wavelength scaling, incoherent intensity addition and Rayleigh dip.');
