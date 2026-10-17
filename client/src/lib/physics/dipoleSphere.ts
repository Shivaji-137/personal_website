import { K } from './imageSphere';
export type Vec3 = [number,number,number];
export type DipoleSphere = {a:number;d:number;p:number;angle:number;neutral:boolean};
const dot=(a:Vec3,b:Vec3)=>a.reduce((v,x,i)=>v+x*b[i],0);
export function dipoleImages(s:DipoleSphere){
 const c=Math.cos(s.angle),t=Math.sin(s.angle);
 const p:Vec3=[s.p*(Math.abs(c)<1e-14?0:c),s.p*(Math.abs(t)<1e-14?0:t),0];
 const f=(s.a/s.d)**3, image:Vec3=[f*p[0],-f*p[1],0],q=s.a*p[0]/s.d**2;
 return {p,image,b:s.a*s.a/s.d,q,center:s.neutral?-q:0};
}
/** Mathematical exterior extension. Never use its interior singularities as physical fields. */
export function dipoleRaw(s:DipoleSphere,r:Vec3){
 const im=dipoleImages(s);let v=0;const e:Vec3=[0,0,0];
 for(const [x,p,q] of [[s.d,im.p,0],[im.b,im.image,im.q],[0,[0,0,0],im.center]] as [number,Vec3,number][]){
  if(q===0&&p.every(v=>v===0))continue;
  const R:Vec3=[r[0]-x,r[1],r[2]],h=Math.hypot(...R),pr=dot(p,R);
  v+=K*(q/h+pr/h**3);
  for(let j=0;j<3;j++)e[j]+=K*(q*R[j]/h**3+3*R[j]*pr/h**5-p[j]/h**3);
 }
 return {v,e};
}
export function dipolePhysical(s:DipoleSphere,r:Vec3){return Math.hypot(...r)<=s.a?{v:K*dipoleImages(s).center/s.a,e:[0,0,0] as Vec3}:dipoleRaw(s,r);}
export function dipoleDensity(s:DipoleSphere,n:Vec3){return dot(dipoleRaw(s,n.map(x=>x*s.a) as Vec3).e,n)/(4*Math.PI*K);}
export function dipoleLines(s:DipoleSphere){
 if(!s.p)return [];
 const paths:Vec3[][]=[];
 for(let i=0;i<40;i++)for(const direction of [-1,1]){
  const t=2*Math.PI*(i+.3)/40;let r:Vec3=[s.d+.035*Math.cos(t),.035*Math.sin(t),0];const path=[r];
  for(let j=0;j<1600;j++){
   const step=(at:Vec3)=>{const e=dipoleRaw(s,at).e,h=Math.hypot(...e);return e.map(x=>direction*x/(h||1)) as Vec3;};
   const h=Math.min(.025,Math.max(.002,Math.hypot(r[0]-s.d,r[1])*.12)),u=step(r),mid=r.map((x,k)=>x+h*u[k]/2) as Vec3,w=step(mid);
   const next=r.map((x,k)=>x+h*w[k]) as Vec3;
   if(Math.hypot(...next)<=s.a*1.001||Math.hypot(next[0]-s.d,next[1])<.015||next[0]<-2.4||next[0]>7.7||Math.abs(next[1])>2.9)break;
   r=next;path.push(r);
  }
  if(path.length>4)paths.push(direction===1?path:path.reverse());
 }
 return paths;
}
