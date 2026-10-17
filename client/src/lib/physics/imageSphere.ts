/** SI electrostatics: solid perfect conductor, external point charge on +x. */
export const K = 8.9875517923e9;
export type SphereModel = { a:number; d:number; q:number; neutral:boolean };
export function images(s:SphereModel) { return { b:s.a*s.a/s.d, qi:-s.q*s.a/s.d, qc:s.neutral?s.q*s.a/s.d:0 }; }
export function spherePotential(s:SphereModel) { return s.neutral?K*s.q/s.d:0; }
export function potential(s:SphereModel,x:number,y:number) {
  if(s.q===0) return 0;
  if(Math.hypot(x,y)<=s.a) return spherePotential(s);
  const {b,qi,qc}=images(s);
  return K*(s.q/Math.hypot(x-s.d,y)+qi/Math.hypot(x-b,y)+qc/Math.hypot(x,y));
}
/** Polar angle from +x, density in C/m²; exact boundary normal derivative. */
export function surfaceCharge(s:SphereModel,theta:number) {
  const r2=(s.d-s.a)**2+2*s.a*s.d*(1-Math.cos(theta));
  return -s.q*(s.d*s.d-s.a*s.a)/(4*Math.PI*s.a*r2**1.5)+images(s).qc/(4*Math.PI*s.a*s.a);
}
export function force(s:SphereModel) { const {b,qi,qc}=images(s);return K*s.q*(qi/(s.d-b)**2+qc/s.d**2); }
/** Physical field, not the fictitious image field inside the metal. */
export function electricField(s:SphereModel,x:number,y:number):[number,number] {
 if(s.q===0||Math.hypot(x,y)<=s.a)return [0,0];
 const {b,qi,qc}=images(s);let ex=0,ey=0;
 for(const [cx,q] of [[s.d,s.q],[b,qi],[0,qc]]){
  if(q===0)continue;const dx=x-cx,r=Math.hypot(dx,y),f=K*q/r**3;ex+=f*dx;ey+=f*y;
 }
 return [ex,ey];
}
export type FieldLine={points:[number,number][];direction:number};
/** Midpoint integration in arc length. Seeds are illustrative, not equal flux tubes. */
export function fieldLines(s:SphereModel):FieldLine[]{
 if(s.q===0)return [];
 const lines:FieldLine[]=[],sign=Math.sign(s.q),sourceRadius=Math.min(.07*s.a,(s.d-s.a)*.2);
 const trace=(x:number,y:number,direction:number)=>{
  const points:[number,number][]=[[x,y]];
  const unit=(px:number,py:number)=>{const e=electricField(s,px,py),mag=Math.hypot(...e);return mag>1e-18?[direction*e[0]/mag,direction*e[1]/mag]:null;};
  for(let i=0;i<1700;i++){
   const r=Math.hypot(x,y),source=Math.hypot(x-s.d,y);
   if(r<=s.a*1.0005||source<sourceRadius*.6||x< -2.4||x>7.8||Math.abs(y)>3)break;
   const h=Math.min(.035*s.a,Math.max(.00015*s.a,(r-s.a)*.3),source*.22),u=unit(x,y);if(!u)break;
   const v=unit(x+h*u[0]/2,y+h*u[1]/2);if(!v)break;
   x+=h*v[0];y+=h*v[1];points.push([x,y]);
  }
  if(points.length>4)lines.push({points,direction});
 };
 for(let i=0;i<24;i++){const t=2*Math.PI*(i+.5)/24;trace(s.d+sourceRadius*Math.cos(t),sourceRadius*Math.sin(t),sign);}
 // For an isolated sphere, trace lines connecting the like-sign far-side charge to infinity.
 if(s.neutral)for(let i=0;i<18;i++){const t=2*Math.PI*(i+.5)/18;if(surfaceCharge(s,t)*s.q>0)trace(s.a*1.003*Math.cos(t),s.a*1.003*Math.sin(t),sign);}
 return lines;
}
