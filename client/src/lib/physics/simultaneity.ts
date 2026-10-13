import { boost, lorentzFactor } from './lorentz';
export function flashModel(x1:number,x2:number,beta:number){
 const gamma=lorentzFactor(beta);
 const sources=[x1,x2].map(x=>{
  const emission=boost({x,y:0,z:0,t:0},beta);
  const arrivalLab=x>=0?x/(1+beta):-x/(1-beta);
  const arrivalPrime=emission.t+Math.abs(emission.x);
  return {x,emission,arrivalLab,arrivalPrime};
 });
 return {gamma,sources,delay:sources[1].emission.t-sources[0].emission.t,arrivalDelay:sources[1].arrivalPrime-sources[0].arrivalPrime};
}
export function wavefront(x:number,beta:number,time:number,moving:boolean){
 const gamma=lorentzFactor(beta),emission=moving?boost({x,y:0,z:0,t:0},beta):{x,y:0,z:0,t:0};
 return {center:emission.x,radius:time-emission.t,emitted:time>=emission.t,bulb:moving?x/gamma-beta*time:x};
}
