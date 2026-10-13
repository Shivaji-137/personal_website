export const PLANCK_H = 6.62607015e-34;
export const LIGHT_C = 299792458;
export const BOLTZMANN_K = 1.380649e-23;
export const WIEN_B = 2.897771955e-3;
export const STEFAN_SIGMA = 5.670374419e-8;
export const peakWavelengthNm = (temperature: number) => WIEN_B / temperature * 1e9;
// Spectral radiance per nanometre: W m^-2 sr^-1 nm^-1 (wavelength form).
export function planckRadiance(wavelengthNm: number, temperature: number) {
  const lambda = wavelengthNm * 1e-9;
  return 2 * PLANCK_H * LIGHT_C ** 2 / (lambda ** 5 * Math.expm1(PLANCK_H * LIGHT_C / (lambda * BOLTZMANN_K * temperature))) * 1e-9;
}
// Piecewise Gaussian approximation to the CIE 1931 2° observer, Wyman et al. (2013).
export function cieXYZ(nm: number) {
  const g = (center: number, left: number, right: number) => Math.exp(-0.5 * ((nm-center)*(nm<center?left:right)) ** 2);
  return {
    x: 0.362*g(442,0.0624,0.0374)+1.056*g(599.8,0.0264,0.0323)-0.065*g(501.1,0.049,0.0382),
    y: 0.821*g(568.8,0.0213,0.0247)+0.286*g(530.9,0.0613,0.0322),
    z: 1.217*g(437,0.0845,0.0278)+0.681*g(459,0.0385,0.0725),
  };
}
export function blackbodyColor(temperature: number) {
  let X=0,Y=0,Z=0;
  for(let nm=380;nm<=780;nm+=2){const s=planckRadiance(nm,temperature),v=cieXYZ(nm),w=nm===380||nm===780?0.5:1;X+=s*v.x*w;Y+=s*v.y*w;Z+=s*v.z*w;}
  const sum=X+Y+Z,chromaticity={x:X/sum,y:Y/sum};
  X/=Y;Z/=Y;Y=1;
  const linear=[3.2406*X-1.5372*Y-0.4986*Z,-0.9689*X+1.8758*Y+0.0415*Z,0.0557*X-0.204*Y+1.057*Z].map(v=>Math.max(0,v));
  const maximum=Math.max(...linear);
  const rgb=linear.map(v=>{const c=v/maximum;return Math.round(255*(c<=0.0031308?12.92*c:1.055*c**(1/2.4)-0.055));});
  return {rgb,css:`rgb(${rgb.join(', ')})`,chromaticity};
}
export function visibleFraction(temperature: number) {
  let integral=0;
  for(let nm=380;nm<=780;nm++)integral+=planckRadiance(nm,temperature)*(nm===380||nm===780?0.5:1);
  return Math.PI*integral/(STEFAN_SIGMA*temperature**4);
}
