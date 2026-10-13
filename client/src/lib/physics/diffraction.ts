export const ARCSEC_PER_RAD = 180 * 3600 / Math.PI;
export const J1_FIRST_ZERO = 3.8317059702075125;
// J1 power series for small arguments, asymptotic expansion for large arguments.
export function besselJ1(value: number) {
  const x=Math.abs(value),sign=value<0?-1:1;
  if(x===0)return 0;
  if(x<16){let term=x/2,sum=term;for(let k=1;k<100;k++){term*=-x*x/(4*k*(k+1));sum+=term;if(Math.abs(term)<1e-16)break;}return sign*sum;}
  let coefficient=1,P=1,Q=0;
  for(let k=1;k<=12;k++){coefficient*=(4-(2*k-1)**2)/(k*8*x);if(k%2===0)P+=(-1)**(k/2)*coefficient;else Q+=(-1)**((k-1)/2)*coefficient;}
  const phase=x-3*Math.PI/4;
  return sign*Math.sqrt(2/(Math.PI*x))*(Math.cos(phase)*P-Math.sin(phase)*Q);
}
export function airyIntensity(radiusArcsec:number,apertureMetres:number,wavelengthNm:number){
 const x=Math.PI*apertureMetres*Math.abs(radiusArcsec)/(wavelengthNm*1e-9*ARCSEC_PER_RAD);
 if(x<1e-5)return 1-x*x/4;
 return (2*besselJ1(x)/x)**2;
}
export const rayleighArcsec=(D:number,nm:number)=>J1_FIRST_ZERO/Math.PI*nm*1e-9/D*ARCSEC_PER_RAD;
export function doubleStarIntensity(x:number,y:number,separation:number,D:number,nm:number){
 return airyIntensity(Math.hypot(x+separation/2,y),D,nm)+airyIntensity(Math.hypot(x-separation/2,y),D,nm);
}
