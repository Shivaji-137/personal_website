export type CentralMode='kepler'|'inverse2'|'combined'|'harmonic';
export type CentralModel={mode:CentralMode;m:number;L:number;k:number;b:number;omega:number;r0:number;vr:number};
export const coefficients=(s:CentralModel)=>({a:s.mode==='inverse2'?0:s.k,b:s.mode==='kepler'?0:s.mode==='inverse2'?s.k:s.b});
export function centralPotential(s:CentralModel,r:number){const {a,b}=coefficients(s);return s.mode==='harmonic'?.5*s.m*s.omega**2*r*r:-a/r-b/(r*r);}
export const effectivePotential=(s:CentralModel,r:number)=>centralPotential(s,r)+s.L*s.L/(2*s.m*r*r);
export const orbitEnergy=(s:CentralModel)=>.5*s.m*s.vr*s.vr+effectivePotential(s,s.r0);
export function orbitInfo(s:CentralModel){const {a,b}=coefficients(s),D=s.L*s.L-2*s.m*b,rawE=orbitEnergy(s),E=Math.abs(rawE)<1e-12?0:rawE,tol=1e-10*Math.max(1,s.L*s.L,2*s.m*b),g=D/s.L**2;
 if(s.mode==='harmonic'){const disc=Math.sqrt(Math.max(0,E*E-s.omega*s.omega*s.L*s.L)),aa=Math.sqrt((E+disc)/(s.m*s.omega**2)),bb=s.L/(s.m*s.omega*aa);return {E,D,g,type:disc<1e-8?'Circular oscillator':'Bound centered ellipse',emin:s.omega*s.L,rmin:bb,rmax:aa,radialPeriod:Math.PI/s.omega,advance:Math.PI,precession:NaN,aa,bb,e:Math.sqrt(Math.max(0,1-bb*bb/(aa*aa)))};}
 const circular=a>0&&D>tol&&Math.abs(s.vr)<1e-10&&Math.abs(s.r0-D/(s.m*a))<1e-8;
 const emin=D>tol&&a>0?-s.m*a*a/(2*D):D>tol?0:-Infinity;
 const beta=Math.sqrt(Math.abs(g)),ecc=a>0&&D>tol?Math.sqrt(Math.max(0,1+2*E*D/(s.m*a*a))):NaN;
 let type:string;
 if(circular)type='Stable circular orbit';else if(D>tol)type=E<0?'Bound precessing orbit':E===0?'Marginal escape / parabolic scattering':'Scattering orbit';
 else if(Math.abs(D)<=tol&&a===0)type=Math.abs(E)<tol?'Neutral circle · any radius':'Critical plunge / escape';
 else type=E<0?'Radially bounded plunge':Math.abs(E)<tol&&a===0?'Zero-energy logarithmic spiral':'Plunge / time-reversed escape';
 if(a===0&&D>tol)type='Scattering · cosine branch';
 const neutral=a===0&&Math.abs(D)<=tol&&E===0;
 const rmin=neutral?s.r0:D>tol&&a>0?D/(s.m*a*(1+ecc)):D>tol?Math.sqrt(D/(2*s.m*E)):0;
 const rmax=neutral?s.r0:E<0?(a>0&&D>tol?D/(s.m*a*(1-ecc)):(-a-Math.sqrt(a*a+2*E*D/s.m))/(2*E)):Infinity;
 const radialPeriod=a>0&&D>tol&&E<0?2*Math.PI*a*Math.sqrt(s.m)/(-2*E)**1.5:Infinity;
 return {E,D,g,type,emin,rmin,rmax,radialPeriod,advance:g>0?2*Math.PI/beta:Infinity,precession:g>0?2*Math.PI*(1/beta-1):NaN,aa:NaN,bb:NaN,e:ecc};
}
/** Exact Binet solution from r(0), radial velocity; positive L fixes increasing theta. */
export function reciprocalRadius(s:CentralModel,theta:number){const {a,b}=coefficients(s),g=1-2*s.m*b/(s.L*s.L),u=1/s.r0,v=-s.m*s.vr/s.L,c=s.m*a/(s.L*s.L);if(Math.abs(g)<1e-12)return u+v*theta+.5*c*theta*theta;if(g>0){const beta=Math.sqrt(g),p=c/g;return p+(u-p)*Math.cos(beta*theta)+v/beta*Math.sin(beta*theta);}const beta=Math.sqrt(-g),p=c/g;return p+(u-p)*Math.cosh(beta*theta)+v/beta*Math.sinh(beta*theta);}
export type OrbitPoint={x:number;y:number;r:number;t:number;theta:number};
export function orbitSamples(s:CentralModel){const info=orbitInfo(s),points:OrbitPoint[]=[];let stop='';if(s.mode==='harmonic'){const end=6*Math.PI/s.omega;for(let i=0;i<=2400;i++){const t=end*i/2400,c=Math.cos(s.omega*t),sn=Math.sin(s.omega*t),x=s.r0*c+s.vr/s.omega*sn,y=s.L/(s.m*s.r0*s.omega)*sn;points.push({x,y,r:Math.hypot(x,y),t,theta:Math.atan2(y,x)});}return {points,stop:'Three complete oscillator orbits (six radial periods).'};}
 const end=info.g>0?Math.min(100,6*Math.PI/Math.sqrt(info.g)):24;let time=0,prevU=1/s.r0;const count=6000;
 for(let i=0;i<=count;i++){const theta=end*i/count,u=reciprocalRadius(s,theta);if(u<=0){stop='Stopped at the first nonpositive 1/r: infinity is an orbit endpoint, not a continuation to negative radius.';break;}const r=1/u;if(r<.025){stop='Plunge stopped at r = 0.025 (display cutoff); the singular origin is never crossed.';break;}if(r>20){stop='Orbit exits the finite display window at r = 20; an escape branch continues toward infinity.';break;}if(i)time+=s.m/s.L*end/count*.5*(1/(u*u)+1/(prevU*prevU));points.push({x:r*Math.cos(theta),y:r*Math.sin(theta),r,t:time,theta});prevU=u;}
 return {points,stop:stop||'Three radial periods where available; angular window limited to 100 radians near the critical threshold.'};}
