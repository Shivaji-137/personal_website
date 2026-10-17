import {greenImage,norm3,type Point3} from './sphereGreen';
export type GreenGeometry='free'|'sphere'|'plane'|'plates';
export type GreenBoundary={kind:GreenGeometry;gap:number;cutoff:number};
export type BoundaryInput=number|GreenBoundary;
export function boundaryConfig(input:BoundaryInput):GreenBoundary{return typeof input==='number'?{kind:input>0?'sphere':'free',gap:6,cutoff:12}:input;}
export function boundaryClearance(p:Point3,input:BoundaryInput){const b=boundaryConfig(input);return b.kind==='sphere'?norm3(p)-(typeof input==='number'?input:1):b.kind==='plane'?p[0]:b.kind==='plates'?b.gap/2-Math.abs(p[0]):Infinity;}
export function constrainPoint(p:Point3,b:GreenBoundary):Point3{
 if(b.kind==='plane')return [Math.max(.1,Math.min(5,p[0])),Math.max(-5,Math.min(5,p[1])),0];
 if(b.kind==='plates')return [Math.max(-b.gap/2+.1,Math.min(b.gap/2-.1,p[0])),Math.max(-5,Math.min(5,p[1])),0];
 const r=norm3(p),min=b.kind==='sphere'?1.05:0;if(!r)return [min,0,0];const next=Math.max(min,Math.min(5,r));return p.map(v=>v*next/r) as Point3;
}
/** Coefficients relative to one real unit source. n=0 real term is returned separately.
 * Plates x=±gap/2. Symmetric image sums S_N are Richardson extrapolated using
 * their leading (N+1/2)^-2 truncation error. Every retained term stays harmonic
 * in the slab; finite-cutoff boundary residuals remain measurable, not clamped. */
export function boundaryImages(source:Point3,input:BoundaryInput){
 const b=boundaryConfig(input),terms:{position:Point3;strength:number}[]=[];
 if(b.kind==='sphere'){const im=greenImage(source,typeof input==='number'?input:1);terms.push({position:im.point,strength:im.strength});}
 if(b.kind==='plane')terms.push({position:[-source[0],source[1],source[2]],strength:-1});
 if(b.kind==='plates'){
  const N=b.cutoff,L=b.gap,u=source[0]+L/2,lambda=((2*N+.5)/(N+.5))**2,outer=lambda/(lambda-1);
  for(let n=-2*N;n<=2*N;n++){
   const weight=Math.abs(n)<=N?1:outer;
   if(n!==0)terms.push({position:[u+2*n*L-L/2,source[1],source[2]],strength:weight});
   terms.push({position:[-u+2*n*L-L/2,source[1],source[2]],strength:-weight});
  }
 }
 return terms;
}
