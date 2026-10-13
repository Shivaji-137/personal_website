import { LIGHT_C, PLANCK_H, planckRadiance, STEFAN_SIGMA } from './blackbody';
export type Band = 'U' | 'B' | 'V';
export type Filter = { band: Band; center: number; width: number; throughput: number };
export const DEFAULT_FILTERS: Filter[] = [
  {band:'U',center:365,width:60,throughput:1},
  {band:'B',center:440,width:90,throughput:1},
  {band:'V',center:550,width:85,throughput:1},
];
export const REFERENCE_TEMPERATURE = 9600;
export const STAR_RADIUS_M = 6.957e8;
export const PARSEC_M = 3.085677581491367e16;
export function filterResponse(nm:number,f:Filter){return f.throughput*Math.exp(-4*Math.log(2)*((nm-f.center)/f.width)**2);}
export type PhotometryParams={temperature:number;distance:number;radius:number};
export function observedFlux(nm:number,p:PhotometryParams){return Math.PI*planckRadiance(nm,p.temperature)*(p.radius*STAR_RADIUS_M/(p.distance*PARSEC_M))**2;}
export function bandMeasurement(f:Filter,p:PhotometryParams,system:'reference'|'ab'='reference'){
 let photons=0,energy=0,reference=0,ab=0;
 // Trapezoidal quadrature on a 1 nm grid; Gaussian tails negligible outside this range.
 for(let nm=100;nm<=2000;nm++){
  const response=filterResponse(nm,f),weight=nm===100||nm===2000?0.5:1;
  const lambda=nm*1e-9,photonWeight=lambda/(PLANCK_H*LIGHT_C),flux=observedFlux(nm,p);
  energy+=flux*response*weight;photons+=flux*response*photonWeight*weight;
  reference+=observedFlux(nm,{temperature:REFERENCE_TEMPERATURE,distance:10,radius:1})*response*photonWeight*weight;
  const abFlux=3631e-26*LIGHT_C/(lambda*lambda)*1e-9;
  ab+=abFlux*response*photonWeight*weight;
 }
 const totalFlux=STEFAN_SIGMA*p.temperature**4*(p.radius*STAR_RADIUS_M/(p.distance*PARSEC_M))**2;
 return {band:f.band,photons,energy,fraction:energy/totalFlux,magnitude:-2.5*Math.log10(photons/(system==='ab'?ab:reference)),reference,ab};
}
