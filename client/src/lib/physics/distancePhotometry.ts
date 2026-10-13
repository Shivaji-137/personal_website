import { bandMeasurement, DEFAULT_FILTERS, PARSEC_M, STAR_RADIUS_M } from './photometry';
import { STEFAN_SIGMA } from './blackbody';
export const BOLOMETRIC_L0=3.0128e28;
export const BOLOMETRIC_F0=BOLOMETRIC_L0/(4*Math.PI*(10*PARSEC_M)**2);
export function absolutePhotometry(temperature:number,radius:number){
 return DEFAULT_FILTERS.map(f=>bandMeasurement(f,{temperature,radius,distance:10},'ab'));
}
export function distanceModulus(distancePc:number){return 5*Math.log10(distancePc/10);}
export function bolometricPhotometry(temperature:number,radius:number,distancePc:number){
 const luminosity=4*Math.PI*(radius*STAR_RADIUS_M)**2*STEFAN_SIGMA*temperature**4;
 const flux=luminosity/(4*Math.PI*(distancePc*PARSEC_M)**2);
 return {luminosity,flux,absolute:-2.5*Math.log10(luminosity/BOLOMETRIC_L0),apparent:-2.5*Math.log10(flux/BOLOMETRIC_F0)};
}
