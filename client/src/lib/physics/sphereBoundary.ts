import {K} from './imageSphere';
export type SphereCase='conductor'|'cavity'|'dielectric'|'insulator';
export type SphereCondition='grounded'|'voltage'|'charge';
/** SI except charge controls in nC. Inner/reference radius a=1 m; shell outer radius b. */
export type SphereBoundaryModel={mode:SphereCase;condition:SphereCondition;d:number;q:number;Q:number;voltage:number;outer:number;epsIn:number;epsOut:number;order:number};
export type SphereValue={v:number;ex:number;ey:number};
const zero=():SphereValue=>({v:0,ex:0,ey:0});
function point(q:number,b:number,x:number,y:number):SphereValue{if(!q)return zero();const dx=x-b,r=Math.hypot(dx,y);return {v:K*q/r,ex:K*q*dx/r**3,ey:K*q*y/r**3};}
const add=(a:SphereValue,b:SphereValue):SphereValue=>({v:a.v+b.v,ex:a.ex+b.ex,ey:a.ey+b.ey});
export function metalVoltage(s:SphereBoundaryModel){
 if(s.condition==='grounded')return 0;
 if(s.condition==='voltage')return s.voltage;
 return s.mode==='cavity'?K*(s.Q+s.q)*1e-9/s.outer:K*(s.Q+s.q/s.d)*1e-9;
}
/** Dielectric series evaluated independently on each side, including at r=a. */
export function dielectricValue(s:SphereBoundaryModel,x:number,y:number,inside:boolean):SphereValue{
 if(s.q===0)return zero();
 const r=Math.hypot(x,y),mu=r?x/r:0,kq=K*s.q*1e-9/s.epsOut;
 let v=0,vr=0,vm=0,P0=1,P1=mu,D0=0,D1=1;
 if(r===0&&inside){const c1=kq*3*s.epsOut/(s.epsIn+2*s.epsOut)/s.d**2;return {v:kq/s.d,ex:-c1,ey:0};}
 for(let l=0;l<=s.order;l++){
  let P:number,D:number;
  if(l===0){P=1;D=0;}else if(l===1){P=mu;D=1;}else{P=((2*l-1)*mu*P1-(l-1)*P0)/l;D=((2*l-1)*(P1+mu*D1)-(l-1)*D0)/l;[P0,P1]=[P1,P];[D0,D1]=[D1,D];}
  const denom=l*s.epsIn+(l+1)*s.epsOut;
  const c=inside?kq*s.epsOut*(2*l+1)/denom/s.d**(l+1):kq*(s.epsOut-s.epsIn)*l/denom/s.d**(l+1);
  const radial=inside?r**l:r**(-l-1),power=inside?l:-l-1;
  v+=c*radial*P;vr+=c*power*radial/r*P;vm+=c*radial*D;
 }
 const nx=x/r,ny=y/r,gradientX=vr*nx+vm*(1-mu*nx)/r,gradientY=vr*ny-vm*mu*ny/r;
 const value={v,ex:-gradientX,ey:-gradientY};return inside?value:add(value,point(s.q*1e-9/s.epsOut,s.d,x,y));
}
/** Exterior/inner-cavity mathematical expression; only use on its intended side. */
export function conductorVacuum(s:SphereBoundaryModel,x:number,y:number):SphereValue{
 const cavity=s.mode==='cavity',v0=metalVoltage(s),q=s.q*1e-9;
 let value=point(q,s.d,x,y);
 if(s.d===0){if(cavity)value.v-=K*q;}
 else value=add(value,point(-q/s.d,1/s.d,x,y));
 if(cavity){value.v+=v0;return value;}
 return add(value,point(v0/K,0,x,y));
}
export function sphereValue(s:SphereBoundaryModel,x:number,y:number):SphereValue{
 const r=Math.hypot(x,y);
 if(s.mode==='dielectric')return dielectricValue(s,x,y,r<1);
 if(s.mode==='insulator'){
  const kQ=K*s.Q*1e-9;return r<=1?{v:kQ*(3-r*r)/2,ex:kQ*x,ey:kQ*y}:point(s.Q*1e-9,0,x,y);
 }
 const v0=metalVoltage(s);
 if(s.mode==='cavity')return r<1?conductorVacuum(s,x,y):r<=s.outer?{v:v0,ex:0,ey:0}:point(v0*s.outer/K,0,x,y);
 return r<=1?{v:v0,ex:0,ey:0}:conductorVacuum(s,x,y);
}
export function sphereSurface(s:SphereBoundaryModel,t:number){
 const x=Math.cos(t),y=Math.sin(t),normal=(v:SphereValue)=>v.ex*x+v.ey*y;
 if(s.mode==='dielectric'){
  const inside=dielectricValue(s,x,y,true),outside=dielectricValue(s,x,y,false),enIn=normal(inside),enOut=normal(outside);
  return {inside,outside,sigma:(enOut-enIn)/(4*Math.PI*K),displacement:(s.epsOut*enOut-s.epsIn*enIn)/(4*Math.PI*K),tangent:(outside.ey-inside.ey)*x-(outside.ex-inside.ex)*y};
 }
 if(s.mode==='insulator'){const value=sphereValue(s,x,y);return {inside:value,outside:value,sigma:0,displacement:0,tangent:0};}
 const value=conductorVacuum(s,x,y),metal={v:metalVoltage(s),ex:0,ey:0},cavity=s.mode==='cavity';
 return {inside:cavity?value:metal,outside:cavity?metal:value,sigma:(cavity?-1:1)*normal(value)/(4*Math.PI*K),displacement:0,tangent:value.ey*x-value.ex*y};
}
export function sphereLines(s:SphereBoundaryModel){
 const paths:{points:[number,number][];direction:number}[]=[],seeds:{x:number;y:number;direction:number}[]=[];
 if(s.mode==='insulator'){
  if(!s.Q)return paths;
  for(let i=0;i<24;i++){const t=(i+.5)*Math.PI/12;seeds.push({x:.035*Math.cos(t),y:.035*Math.sin(t),direction:Math.sign(s.Q)});}
 }else{
  if(s.q)for(let i=0;i<24;i++){const t=(i+.5)*Math.PI/12,rad=Math.min(.035,s.mode==='cavity'?(1-s.d)*.15:(s.d-1)*.15);seeds.push({x:s.d+rad*Math.cos(t),y:rad*Math.sin(t),direction:Math.sign(s.q)});}
  // Capture surface-originating conductor lines and dielectric external branches too.
  if(s.mode==='conductor'||s.mode==='cavity')for(let i=0;i<32;i++){
   const t=(i+.5)*Math.PI/16,r=s.mode==='cavity'?s.outer+1e-4:1.0001,x=r*Math.cos(t),y=r*Math.sin(t),e=sphereValue(s,x,y),en=e.ex*Math.cos(t)+e.ey*Math.sin(t);
   if(Math.abs(en)>1e-10)seeds.push({x,y,direction:Math.sign(en)});
  }
 }
 const unit=(x:number,y:number,dir:number)=>{const e=sphereValue(s,x,y),h=Math.hypot(e.ex,e.ey);return Number.isFinite(h)&&h>1e-12?[dir*e.ex/h,dir*e.ey/h]:null;};
 for(const seed of seeds){let {x,y}=seed;const points:[number,number][]=[[x,y]];
  for(let j=0;j<1700;j++){
   const r=Math.hypot(x,y),R=Math.hypot(x-s.d,y);if(Math.abs(x)>5.7||Math.abs(y)>5.7||(s.mode!=='insulator'&&R<.008))break;
   const gap=s.mode==='conductor'?Math.abs(r-1):s.mode==='cavity'?Math.min(Math.abs(r-1),Math.abs(r-s.outer)):Infinity;
   const h=Math.min(.04,Math.max(.00002,gap*.3),s.mode==='insulator'?.04:Math.max(.00002,R*.16)),u=unit(x,y,seed.direction);if(!u)break;
   const v=unit(x+h*u[0]/2,y+h*u[1]/2,seed.direction);if(!v)break;
   const next:[number,number]=[x+h*v[0],y+h*v[1]],nr=Math.hypot(...next);
   if(s.mode==='conductor'&&nr<=1)break;
   if(s.mode==='cavity'&&nr>=1&&nr<=s.outer)break;
   [x,y]=next;points.push(next);if(gap<.00005)break;
  }if(points.length>3)paths.push({points,direction:seed.direction});
 }return paths;
}
