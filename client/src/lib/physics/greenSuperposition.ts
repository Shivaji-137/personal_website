import {boundaryConfig,boundaryClearance,boundaryImages,type BoundaryInput} from './greenBoundaries';
import {K} from './imageSphere';
import {greenScale,norm3,distance3,type Point3,type GreenConvention} from './sphereGreen';
/** Source strength is in nC; q / (1 nC) is the dimensionless kernel weight. */
export type GreenCharge={id:string;position:Point3;q:number};
export function effectiveCharges(charges:GreenCharge[]){
 const groups=new Map<string,{source:GreenCharge;absolute:number}>();
 for(const c of charges){const key=c.position.join(',');const old=groups.get(key);if(old){old.source.q+=c.q;old.absolute+=Math.abs(c.q);}else groups.set(key,{source:{...c,q:c.q},absolute:Math.abs(c.q)});}
 // Cancel only floating-point residue from co-located source sums, not separated charges.
 return Array.from(groups.values()).filter(g=>Math.abs(g.source.q)>g.absolute*1e-14).map(g=>g.source);
}
export function prepareResponse(charges:GreenCharge[],a:BoundaryInput=1,convention:GreenConvention='coulomb'){
 const sources=effectiveCharges(charges),scale=greenScale(convention);
 const terms=sources.flatMap(c=>[{position:c.position,q:c.q,image:false},...boundaryImages(c.position,a).map(im=>({position:im.position,q:c.q*im.strength,image:true}))]);
 function evaluate(p:Point3,withField=true){
  let free=0,reaction=0;const field:Point3=[0,0,0];let singular=false;
  for(const t of terms){const dx=p[0]-t.position[0],dy=p[1]-t.position[1],dz=p[2]-t.position[2],R=Math.sqrt(dx*dx+dy*dy+dz*dz),v=t.q/R;if(t.image)reaction+=v;else free+=v;if(R===0)singular=true;else if(withField)for(let i=0;i<3;i++)field[i]+=t.q*(p[i]-t.position[i])/R**3;}
  const total=free+reaction;
  return {free:free*scale,reaction:reaction*scale,total:total*scale,voltage:K*1e-9*total,field:boundaryClearance(p,a)<-1e-12?[0,0,0] as Point3:singular?[NaN,NaN,NaN] as Point3:field.map(v=>K*1e-9*v) as Point3};
 }
 return {evaluate,sources};
}
/** Integral curves of the COMBINED vector field; images are never line seeds. */
export function superpositionLines(charges:GreenCharge[],a:BoundaryInput=1){
 const {evaluate,sources}=prepareResponse(charges,a),config=boundaryConfig(a),lines:{points:Point3[];direction:number}[]=[];
 const unit=(p:Point3,direction:number)=>{const f=evaluate(p).field,m=norm3(f);return Number.isFinite(m)&&m>1e-12?f.map(v=>direction*v/m) as Point3:null;};
 for(const source of sources){
  const nearest=Math.min(...sources.filter(c=>c!==source).map(c=>distance3(c.position,source.position)),Infinity),seed=Math.min(.055,boundaryClearance(source.position,a)*.18,nearest*.12),direction=Math.sign(source.q);
  if(seed<1e-8)continue;
  const count=config.kind==='plates'?10:18;
  for(let k=0;k<count;k++){
   const theta=2*Math.PI*(k+.5)/count;let p:Point3=[source.position[0]+seed*Math.cos(theta),source.position[1]+seed*Math.sin(theta),0];const points:Point3[]=[p];
   for(let i=0;i<1400;i++){
    const clearance=boundaryClearance(p,a),R=Math.min(...sources.map(c=>distance3(p,c.position)));
    if((clearance<=.0005)||R<Math.min(.012,seed*.45)||Math.abs(p[0])>5.78||Math.abs(p[1])>5.78)break;
    const h=Math.min(.04,R*.18,Math.max(.00003,clearance*.28)),u=unit(p,direction);if(!u)break;
    const mid=p.map((v,j)=>v+h*u[j]/2) as Point3,v=unit(mid,direction);if(!v)break;
    p=p.map((x,j)=>x+h*v[j]) as Point3;points.push(p);
   }
   if(points.length>3)lines.push({points,direction});
  }
 }
 return lines;
}
