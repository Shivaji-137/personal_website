/** Exterior Dirichlet Green kernel in 3D. a > 0; source exterior; observation r >= a.
 * Coulomb convention: laplacian G = -4 pi delta. Unit convention divides G by 4 pi.
 * The image expression is evaluated directly at the boundary, without clamping. */
export type Point3=[number,number,number];
export type GreenConvention='coulomb'|'unit';
export const norm3=(p:Point3)=>Math.hypot(...p);
export const distance3=(p:Point3,q:Point3)=>Math.hypot(...p.map((v,i)=>v-q[i]));
export const greenScale=(convention:GreenConvention)=>convention==='unit'?1/(4*Math.PI):1;
export function greenImage(source:Point3,a=1){const d=norm3(source);if(d<=a)throw new RangeError('Source must be exterior');return {point:source.map(v=>v*a*a/(d*d)) as Point3,strength:-a/d};}
export function sphereGreen(point:Point3,source:Point3,a=1,convention:GreenConvention='coulomb'){
 const scale=greenScale(convention),R=distance3(point,source),free=scale/R;
 if(a===0)return {free,reaction:0,total:free};
 const image=greenImage(source,a),reaction=scale*image.strength/distance3(point,image.point);
 return {free,reaction,total:free+reaction};
}
/** Centered Cartesian differences in all THREE dimensions, not the 2D screen slice. */
export function greenLaplacian(point:Point3,source:Point3,h:number,a=1,convention:GreenConvention='coulomb'){
 const v=sphereGreen(point,source,a,convention).total;let sum=0;
 for(let axis=0;axis<3;axis++){const plus=[...point] as Point3,minus=[...point] as Point3;plus[axis]+=h;minus[axis]-=h;sum+=sphereGreen(plus,source,a,convention).total-2*v+sphereGreen(minus,source,a,convention).total;}
 return sum/(h*h);
}
/** -grad G; multiply by kq (Coulomb convention) to obtain physical electric field.
 * a = 0 selects all of free space, including the origin. */
export function greenField(point:Point3,source:Point3,a=1):Point3{
 if(a>0&&norm3(point)<=a)return [0,0,0];
 const result:Point3=[0,0,0],im=a>0?greenImage(source,a):null;
 for(const [center,strength] of [[source,1],...(im?[[im.point,im.strength]]:[])] as [Point3,number][]){
  const R=distance3(point,center);for(let j=0;j<3;j++)result[j]+=strength*(point[j]-center[j])/R**3;
 }
 return result;
}
export function greenFieldLines(source:Point3,a=1,chargeSign=1){
 if(!chargeSign)return [];
 const sign=Math.sign(chargeSign),seed=Math.min(.065,a>0?(norm3(source)-a)*.2:.065),lines:{points:Point3[];direction:number}[]=[];
 const unit=(p:Point3)=>{const f=greenField(p,source,a),m=norm3(f);return m>1e-16?f.map(v=>v/m) as Point3:null;};
 for(let k=0;k<32;k++){
  const t=2*Math.PI*(k+.5)/32;let p:Point3=[source[0]+seed*Math.cos(t),source[1]+seed*Math.sin(t),0];const points:Point3[]=[p];
  for(let i=0;i<1500;i++){
   const r=norm3(p),R=distance3(p,source);if((a>0&&r<=a*1.0005)||R<seed*.5||Math.abs(p[0])>5.78||Math.abs(p[1])>5.78)break;
   const step=Math.min(.035,R*.22,a>0?Math.max(.00005,(r-a)*.3):.035),u=unit(p);if(!u)break;
   const mid=p.map((v,j)=>v+step*u[j]/2) as Point3,v=unit(mid);if(!v)break;
   p=p.map((x,j)=>x+step*v[j]) as Point3;points.push(p);
  }
  if(points.length>3)lines.push({points,direction:sign});
 }
 return lines;
}
