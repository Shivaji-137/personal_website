export type OscillatorParameters={omega0:number;nu:number;acceleration:number};
// x¨ + ν x˙ + ω₀²x = a₀ cos(ωt), with ν = b/m, not b/(2m).
export function oscillatorResponse(omega:number,p:OscillatorParameters){
 const real=p.omega0**2-omega**2,imaginary=p.nu*omega,denominator=Math.hypot(real,imaginary);
 return {amplitude:p.acceleration/denominator,phase:Math.atan2(imaginary,real)};
}
export function amplitudePeak(p:OscillatorParameters){
 const squared=p.omega0**2-p.nu**2/2;
 const interior=p.nu/p.omega0<Math.SQRT2;
 const omega=interior?Math.sqrt(Math.max(0,squared)):0;
 return {omega,amplitude:oscillatorResponse(omega,p).amplitude,interior};
}
// Half maximum of time-averaged absorbed power, not displacement amplitude.
export function powerBandwidth(p:OscillatorParameters){
 const root=Math.hypot(p.nu,2*p.omega0);
 return {low:2*p.omega0**2/(root+p.nu),high:(root+p.nu)/2,width:p.nu};
}
export function steadyMotion(t:number,omega:number,p:OscillatorParameters){
 const {amplitude:A,phase}=oscillatorResponse(omega,p),angle=omega*t-phase;
 return {x:A*Math.cos(angle),velocity:-A*omega*Math.sin(angle),acceleration:-A*omega**2*Math.cos(angle)};
}
