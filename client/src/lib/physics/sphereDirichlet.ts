import {gaussLegendre} from './legendre';
import {legendre} from './sphericalHarmonics';
import {K} from './imageSphere';
export type Point=[number,number,number];
export type SurfaceTerm={l:number;m:number;c:number};
/** Normalized complex Y_lm, CS phase. Real even data; negative m is combined by factor two. */
export function wedgeCoefficients(order:number,alpha:number,voltage:number):SurfaceTerm[]{
 const quad=gaussLegendre(Math.max(96,4*order)),terms:SurfaceTerm[]=[];
 for(let l=0;l<=order;l++)for(let m=0;m<=l;m++){
  if((l+m)%2)continue;
  const phi=m?2*Math.sin(m*alpha)/m:2*alpha;
  const integral=quad.reduce((v,{x,w})=>{const theta=(x+1)*Math.PI/2;return v+w*Math.PI/2*Math.sin(theta)*legendre(l,m,theta);},0);
  const c=voltage*phi*integral;if(Math.abs(c)>1e-14)terms.push({l,m,c});
 }return terms;
}
/** Sum on a fixed side. Boundary radial derivatives must use the one-sided formulas. */
export function prepareWedge(terms:SurfaceTerm[]){
 const max=Math.max(0,...terms.map(t=>t.l)),lookup=Array.from({length:max+1},()=>Array(max+1).fill(0) as number[]);for(const t of terms)lookup[t.l][t.m]=t.c;
 return function valueAt(r:Point,side:'inside'|'outside'|'surface'='surface',density=false){
 const radius=Math.hypot(...r),inside=side==='inside'||(side==='surface'&&radius<=1);
 if(radius===0)return density?NaN:inside?(terms.find(t=>t.l===0)?.c??0)/Math.sqrt(4*Math.PI):NaN;
 const theta=Math.acos(Math.max(-1,Math.min(1,r[2]/radius))),phi=Math.atan2(r[1],r[0]);let value=0;
 // Recurrence runs over degrees for each order once, rather than rebuilding every Y.

 let diagonal=1/Math.sqrt(4*Math.PI);const sine=Math.sin(theta),mu=Math.cos(theta);
 for(let m=0;m<=max;m++){
  if(m)diagonal*=-Math.sqrt((2*m+1)/(2*m))*sine;
  let previous=diagonal,current=diagonal;
  for(let l=m;l<=max;l++){
   if(l===m)current=diagonal;
   else if(l===m+1){previous=diagonal;current=Math.sqrt(2*m+3)*mu*diagonal;}
   else{const a=Math.sqrt((4*l*l-1)/(l*l-m*m)),b=Math.sqrt(((2*l+1)*((l-1)**2-m*m))/((2*l-3)*(l*l-m*m)));[previous,current]=[current,a*mu*current-b*previous];}
   const c=lookup[l][m];if(!c)continue;
   value+=(m?2:1)*c*current*Math.cos(m*phi)*(density?(2*l+1)/(4*Math.PI*K):inside?radius**l:radius**(-l-1));
  }
 }return value;
 };
}
export function wedgeValue(terms:SurfaceTerm[],r:Point,side:'inside'|'outside'|'surface'='surface',density=false){return prepareWedge(terms)(r,side,density);}
export function wedgeAnswers(alpha:number,voltage:number){return {center:voltage*alpha/Math.PI,charge:voltage*alpha/(Math.PI*K),ex:-3*voltage*Math.sin(alpha)/4,gradient:-5*voltage*Math.sin(2*alpha)/(2*Math.PI)};}
export function wedgeTarget(phi:number,alpha:number,voltage:number){const p=Math.atan2(Math.sin(phi),Math.cos(phi));return Math.abs(Math.abs(p)-alpha)<1e-10?voltage/2:Math.abs(p)<alpha?voltage:0;}
export type Annulus={A:number;B:number;P:number;Q:number;dipole:number;quadrupole:number};
export function radialPair(l:number,fa:number,fb:number,a:number,b:number,r:number){
 const c=(fb*b**(l+1)-fa*a**(l+1))/(b**(2*l+1)-a**(2*l+1)),d=fa*a**(l+1)-c*a**(2*l+1);
 return {value:c*r**l+d*r**(-l-1),derivative:l*c*r**(l-1)-(l+1)*d*r**(-l-2)};
}
export function annulusValue(s:Annulus,r:Point){
 const radius=Math.hypot(...r);if(radius===0)return NaN;
 const nx=r[0]/radius,nz=r[2]/radius;
 return radialPair(0,s.P,s.Q,s.A,s.B,radius).value+radialPair(1,s.dipole*s.A,0,s.A,s.B,radius).value*nx+radialPair(2,0,s.quadrupole*s.B**2,s.A,s.B,radius).value*(3*nz*nz-1);
}
/** Cartesian derivative of the physical harmonic continuation; explicit side avoids crossing charged sheets. */
export function dirichletField(value:(r:Point)=>number,r:Point,h=1e-4):Point{return r.map((_,i)=>{const a=[...r] as Point,b=[...r] as Point;a[i]+=h;b[i]-=h;return -(value(a)-value(b))/(2*h);}) as Point;}
