export const C=299792458;
// Spatial coordinates in light-seconds; time in seconds (ct has same numeric value).
export type SpacetimeEvent={x:number;y:number;z:number;t:number};
export function lorentzFactor(beta:number){
 if(!Number.isFinite(beta)||Math.abs(beta)>=1)throw new RangeError('An inertial boost requires |v/c| < 1.');
 return 1/Math.sqrt((1-beta)*(1+beta));
}
export function boost(event:SpacetimeEvent,beta:number):SpacetimeEvent{
 const gamma=lorentzFactor(beta);
 return {x:gamma*(event.x-beta*event.t),t:gamma*(event.t-beta*event.x),y:event.y,z:event.z};
}
export function interval(event:SpacetimeEvent){return (event.t-event.x)*(event.t+event.x)-event.y**2-event.z**2;}
export function causalType(event:SpacetimeEvent){
 const s=interval(event),scale=Math.max(1,event.t**2+event.x**2+event.y**2+event.z**2);
 return Math.abs(s)<1e-12*scale?'Lightlike':s>0?'Timelike':'Spacelike';
}
