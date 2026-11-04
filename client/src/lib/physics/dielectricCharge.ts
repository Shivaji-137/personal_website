/** Dimensionless u=4π ε₂ A Φ/Q; lengths in A, k=ε₁/ε₂. */
export type DielectricChargeModel={central:boolean;k:number;d:number;n:number};
export function dielectricRadial(s:DielectricChargeModel,r:number,mu:number,inside=r<1){
 if(s.central)return {u:inside?1/(s.k*r)+1-1/s.k:1/r,dr:inside?-1/(s.k*r*r):-1/(r*r)};
 let u=0,dr=0,p0=1,p1=mu;
 if(!inside){const R=Math.sqrt(r*r+s.d*s.d-2*r*s.d*mu);u=1/R;dr=-(r-s.d*mu)/(R**3);}
 for(let l=0;l<=s.n;l++){
  const p=l===0?1:l===1?mu:((2*l-1)*mu*p1-(l-1)*p0)/l;
  if(l>=2){p0=p1;p1=p;}
  const den=s.k*l+l+1;
  const c=inside?(2*l+1)/den:-(s.k-1)*l/den;
  const term=c/Math.pow(s.d,l+1)*Math.pow(r,inside?l:-l-1)*p;
  u+=term;if(r>0)dr+=(inside?l:-l-1)*term/r;
 }
 // Regular solid harmonics at the origin: only l=0 contributes to potential.
 if(r===0)return {u:1/s.d,dr:-(s.n>=1?3/(s.k+2)/s.d**2:0)*mu};
 return {u,dr};
}
export function dielectricPotential(s:DielectricChargeModel,x:number,z:number){const r=Math.hypot(x,z);return dielectricRadial(s,r,r?z/r:1).u;}
export function dielectricField(s:DielectricChargeModel,x:number,z:number){const h=2e-5;return {x:-(dielectricPotential(s,x+h,z)-dielectricPotential(s,x-h,z))/(2*h),z:-(dielectricPotential(s,x,z+h)-dielectricPotential(s,x,z-h))/(2*h)};}
/** Exact exterior image representation, evaluated by midpoint quadrature after removing endpoint singularity. */
export function dielectricImage(s:DielectricChargeModel,x:number,z:number,steps=1024){const beta=(s.k-1)/(s.k+1),b=1/s.d;let line=0;for(let i=0;i<steps;i++){const t=(i+.5)/steps;line+=1/Math.hypot(x,z-b*t**(s.k+1));}return 1/Math.hypot(x,z-s.d)-beta/s.d/Math.hypot(x,z-b)+beta/s.d*line/steps;}
export function dielectricDiagnostics(s:DielectricChargeModel){let potential=0,normal=0;for(let i=0;i<=180;i++){const mu=Math.cos(i*Math.PI/180),a=dielectricRadial(s,1,mu,true),b=dielectricRadial(s,1,mu,false);potential=Math.max(potential,Math.abs(a.u-b.u));normal=Math.max(normal,Math.abs(s.k*a.dr-b.dr));}return {potential,normal};}
