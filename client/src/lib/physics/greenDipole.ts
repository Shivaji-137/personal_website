import {boundaryImages,boundaryClearance,type GreenBoundary} from './greenBoundaries';
import {K} from './imageSphere';
import {norm3,distance3,type Point3} from './sphereGreen';
export type GreenDipole={position:Point3;moment:Point3};
export type DipoleTerm={position:Point3;moment:Point3;q:number;image:boolean};
const dot=(a:Point3,b:Point3)=>a.reduce((v,x,i)=>v+x*b[i],0);
/** Moments in nC m and charges in nC. Exact source derivatives of the image kernel.
 * Plate weights are the same Richardson acceleration as the monopole kernel. */
export function greenDipoleTerms(source:GreenDipole,b:GreenBoundary):DipoleTerm[]{
 const terms:DipoleTerm[]=[{...source,q:0,image:false}];
 if(b.kind==='sphere'){
  const d=norm3(source.position),n=source.position.map(x=>x/d) as Point3,pn=dot(source.moment,n),f=1/d**3;
  terms.push({position:source.position.map(x=>x/d**2) as Point3,moment:source.moment.map((p,i)=>f*(2*n[i]*pn-p)) as Point3,q:pn/d**2,image:true});
 }else for(const im of boundaryImages(source.position,b))terms.push({position:im.position,moment:[Math.abs(im.strength)*source.moment[0],im.strength*source.moment[1],im.strength*source.moment[2]],q:0,image:true});
 return terms;
}
export function prepareDipole(source:GreenDipole,b:GreenBoundary){
 const terms=greenDipoleTerms(source,b);
 function evaluate(r:Point3){
  let free=0,reaction=0;const field:Point3=[0,0,0];
  for(const t of terms){if(t.q===0&&t.moment.every(p=>p===0))continue;
   const R=r.map((v,i)=>v-t.position[i]) as Point3,h=norm3(R),pr=dot(t.moment,R);
   if(h===0)return {free:NaN,reaction:NaN,total:NaN,field:[NaN,NaN,NaN] as Point3};
   const v=K*1e-9*(t.q/h+pr/h**3);if(t.image)reaction+=v;else free+=v;
   for(let i=0;i<3;i++)field[i]+=K*1e-9*(t.q*R[i]/h**3+3*R[i]*pr/h**5-t.moment[i]/h**3);
  }return {free,reaction,total:free+reaction,field};
 }
 return {terms,evaluate};
}
export function greenDipoleLines(source:GreenDipole,b:GreenBoundary){
 if(!norm3(source.moment))return [];
 const {evaluate}=prepareDipole(source,b),paths:Point3[][]=[],seed=Math.min(.04,boundaryClearance(source.position,b)*.15);
 for(let i=0;i<(b.kind==='plates'?16:24);i++)for(const direction of [-1,1]){
  const theta=2*Math.PI*(i+.4)/(b.kind==='plates'?16:24);let r:Point3=[source.position[0]+seed*Math.cos(theta),source.position[1]+seed*Math.sin(theta),0];const path=[r];
  const unit=(r:Point3)=>{const e=evaluate(r).field,h=norm3(e);return Number.isFinite(h)&&h>1e-14?e.map(v=>direction*v/h) as Point3:null;};
  for(let j=0;j<1000;j++){
   const clearance=boundaryClearance(r,b),dist=distance3(r,source.position);if(clearance<.0005||dist<seed*.35||Math.abs(r[0])>5.75||Math.abs(r[1])>5.75)break;
   const h=Math.min(.045,dist*.18,Math.max(.00002,clearance*.28)),u=unit(r);if(!u)break;
   const v=unit(r.map((x,k)=>x+h*u[k]/2) as Point3);if(!v)break;
   const next=r.map((x,k)=>x+h*v[k]) as Point3;if(boundaryClearance(next,b)<0)break;r=next;path.push(r);
  }if(path.length>4)paths.push(direction===1?path:path.reverse());
 }return paths;
}
