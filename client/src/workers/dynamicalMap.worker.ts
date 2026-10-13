import { analyzeDynamics, type DynamicsSettings } from '../lib/physics/dynamicalMap';
self.onmessage=(event:MessageEvent<{omegas:number[];forces:number[];settings:DynamicsSettings}>)=>{
 const {omegas,forces,settings}=event.data;
 for(let row=0;row<forces.length;row++){
  const cells=omegas.map(omega=>analyzeDynamics(omega,forces[row],settings));
  self.postMessage({row,cells,progress:(row+1)/forces.length});
 }
 self.postMessage({done:true});
};
