import {gaussLegendre} from './legendre';
import {prepareDipole} from './greenDipole';
import {prepareResponse} from './greenSuperposition';
export type V3=[number,number,number];
export type LabParams={a:number;b:number;c:number;d:number;n:number;angle:number;basis:number;degree:number;option:string};
export type LabModule={id:string;assignment:number;problems:string;title:string;question:string;note:string;equations:string[]};
export const assignmentUrl=(n:number)=>`https://www.pa.uky.edu/~straley/PHY611/${n<3?n+'Assignment.docx':n===3?'3Assignment.pdf':n+'Assnt.pdf'}`;
export const modules:LabModule[]=[
 {id:'vectors',assignment:1,problems:'1 and 3',title:'Vector geometry & triple products',question:'Explore the cross-product magnitude and the parallelepiped in Question 3.',note:'The Q3 preset uses the vectors in the assignment. Question 2 is not silently replaced with a different identity.',equations:[String.raw`|\mathbf A\times\mathbf B|^2=A^2B^2-(\mathbf A\cdot\mathbf B)^2`,String.raw`\mathcal V=|\mathbf A\cdot(\mathbf B\times\mathbf C)|`]},
 {id:'solid-angle',assignment:2,problems:'1–3; optional final prompt',title:'Solid angle, Stokes & the cone apex',question:'Compare a surface solid-angle integral with a boundary integral and examine the cone construction.',note:'The numerical example is a square. The cone apex lies at the singular observation point; Gauss’s theorem cannot be applied through it without excision. Cone sides have zero radial flux.',equations:[String.raw`\Omega=\int_S\frac{(\mathbf r-\mathbf r_0)\cdot d\mathbf S}{|\mathbf r-\mathbf r_0|^3}`,String.raw`\Omega=\oint_{\partial S}\frac{[\mathbf p\times(\mathbf r-\mathbf r_0)]\cdot d\mathbf r}{R^2+R\,\mathbf p\cdot(\mathbf r-\mathbf r_0)}`]},
 {id:'distorted',assignment:3,problems:'1–3',title:'Almost-spherical conductor',question:'Deform an equipotential conductor and inspect where its surface charge concentrates.',note:'The source prints F ≤ 1 as the conducting region, which is unbounded at infinity. Here the bounded, near-unit outer surface F = 1 is explicitly selected, its interior is metal, and the exterior has V = F. This interpretation needs confirmation from the instructor.',equations:[String.raw`V_{\rm out}=F=\frac1r+\eta\frac{3\cos^2\theta-1}{r^3},\quad F(r_s,\theta)=1`,String.raw`\sigma=\epsilon_0\mathbf E\cdot\hat{\mathbf n},\quad V_{\rm metal}=1`]},
 {id:'wire',assignment:4,problems:'1–3',title:'Infinite line: field and potential reference',question:'Why does integrating the free-space kernel for an infinite wire produce a divergent absolute potential?',note:'A finite reference radius is essential. The potential difference converges as the wire cutoff increases; V(∞) = 0 is unavailable for an infinite charged wire.',equations:[String.raw`E_R=\frac{\lambda}{2\pi\epsilon_0 R},\quad V(R)-V(R_0)=-\frac{\lambda}{2\pi\epsilon_0}\ln\frac R{R_0}`]},
 {id:'neumann',assignment:4,problems:'4–5',title:'Neumann disk boundary',question:'Impose a normal potential derivative on a disk in a plane and compare the numerical solution with its axis formula.',note:'Domain z > 0. The prescribed derivative is +∂V/∂z, opposite to the outward-normal derivative on the lower boundary. The gauge is fixed by decay at infinity. Quadrature is not reliable arbitrarily close to the disk rim; the map excludes z < 0.08.',equations:[String.raw`V(\mathbf R)=-\frac1{2\pi}\int_{s<1}\frac{dS}{|\mathbf R-\mathbf s|},\quad V(0,0,z)=z-\sqrt{1+z^2}`,String.raw`\partial_zV(z=0^+)=\begin{cases}1&s<1\\0&s>1\end{cases}`]},
 {id:'polynomials',assignment:5,problems:'A–C',title:'Harmonic polynomials & Kelvin inversion',question:'Build harmonic polynomials of degrees 1–3, compare angular patterns, and switch to decaying exterior solutions.',note:'There are 2N + 1 independent homogeneous harmonic polynomials of degree N. The exterior functions are singular at the origin, which is excluded.',equations:[String.raw`\nabla^2F_N=0,\quad F_N(\lambda\mathbf r)=\lambda^NF_N(\mathbf r),\quad \nabla^2\left(\frac{F_N}{r^{2N+1}}\right)=0\ (r>0)`]},
 {id:'cube',assignment:6,problems:'A',title:'Grounded cube: Poisson sine modes',question:'Reconstruct the cube charge density and potential, including the requested body diagonal.',note:'The source is x(1−x)y(1−y)z(1−z). The finite sine expansion satisfies all six grounded faces exactly, while its Poisson source approaches the prescribed density.',equations:[String.raw`\rho=x(1-x)y(1-y)z(1-z),\quad V|_{\partial\Omega}=0`,String.raw`V=\sum_{k,m,n\ {\rm odd}}\frac{512\sin(k\pi x)\sin(m\pi y)\sin(n\pi z)}{\pi^{11}k^3m^3n^3(k^2+m^2+n^2)}`]},
 {id:'octahedron',assignment:6,problems:'B; also Assignment 11 B',title:'Six charges & cubic symmetry',question:'Compare the exact six-charge potential with its leading nonconstant harmonic near the center.',note:'The leading correction has degree 4; dipole and quadrupole terms cancel by symmetry. The approximation is restricted to r < 1. Assignment 11 B revisits the same configuration using spherical harmonics.',equations:[String.raw`V=\sum_{j=1}^6\frac1{|\mathbf r-\mathbf r_j|}=6+\frac74\left[5(x^4+y^4+z^4)-3r^4\right]+O(r^6)`]},
 {id:'legendre',assignment:7,problems:'A–D',title:'Legendre generating function & orthogonality',question:'Compare interior/exterior partial sums, normalization integrals and polynomial projections.',note:'The two expansions have different convergence domains. The integral of F² diverges at r = 1; a finite partial sum does not remove that divergence.',equations:[String.raw`F=(1-2r\mu+r^2)^{-1/2}=\sum_{\ell\ge0}r^\ell P_\ell(\mu)\ (r<1)`,String.raw`F=\sum_{\ell\ge0}r^{-\ell-1}P_\ell(\mu)\ (r>1),\quad\int_{-1}^1P_\ell P_m\,d\mu=\frac{2\delta_{\ell m}}{2\ell+1}`]},
 {id:'bump',assignment:8,problems:'A–B',title:'Grounded hemispherical bump',question:'Move a charge above a hemispherical bump and compare four image charges with the Legendre solution.',note:'The plane and hemispherical bump are taken to be grounded. The physical domain is z > 0 and r > 1. Only odd Legendre degrees survive. The appropriate radial expansion changes at r = D.',equations:[String.raw`V=\frac1{|\mathbf r-D\hat z|}-\frac1{|\mathbf r+D\hat z|}-\frac{1/D}{|\mathbf r-D^{-1}\hat z|}+\frac{1/D}{|\mathbf r+D^{-1}\hat z|}`,String.raw`V=2\sum_{\ell\ {\rm odd}}D^{-\ell-1}(r^\ell-r^{-\ell-1})P_\ell(\cos\theta),\quad1<r<D`]},
 {id:'balls',assignment:9,problems:'A–C',title:'Two charged balls: potential & interaction energy',question:'Compare inside/outside ball potentials, nonoverlapping interaction energy, and the field cross term.',note:'These are uniformly charged insulating balls, not conductors. The separation is constrained to D ≥ 2a. The local E₁·E₂ can be negative even when its all-space integral is positive.',equations:[String.raw`V_1(r)=\begin{cases}(3-r^2)/2&r\le1\\1/r&r>1\end{cases},\quad U_{12}=1/D`,String.raw`\epsilon_0\int_{\mathbb R^3}\mathbf E_1\cdot\mathbf E_2\,d^3r=U_{12}\quad\Longrightarrow\quad\int\mathbf E_1\cdot\mathbf E_2\,d^3r=4\pi/D\ \ (k=1)`]},
 {id:'plane-mode',assignment:10,problems:'A and C',title:'Sinusoidal surface voltage & evanescent decay',question:'How does an imposed spatial voltage pattern decay away from a plane?',note:'The half-space solution is selected by decay at infinity. Using |z| displays a two-sided continuation with a charged sheet at z = 0.',equations:[String.raw`V=\cos(\pi x)\cos(2\pi y)e^{-\pi\sqrt5|z|}`]},
 {id:'box-green',assignment:10,problems:'B–D',title:'Long rectangular box: images vs. eigenmodes',question:'Inspect the centered Green function in the long box and compare finite image sums with a spectral reference.',note:'Homogeneous Dirichlet conditions are selected explicitly. Widths are 1 and the end faces are z = ±100, as assigned. Finite sums have truncation errors; the image cutoff is not a convergence proof.',equations:[String.raw`\nabla^2G_C=-4\pi\delta,\quad G_C|_{\partial\Omega}=0,\quad-\tfrac12<x,y<\tfrac12,\ |z|<100`]},
 {id:'box-boundary',assignment:10,problems:'E; F as a reading prompt',title:'Nonzero box boundary V = z²',question:'Solve the empty box with nonconstant boundary voltage and see why z² alone is not harmonic.',note:'Write V = z² + w, so ∇²w = −2 and w = 0 on every face. The numerical series is truncated. Part F refers to Jackson Eq. 1.46; its exact wording is not in the assignment and is left as a reading prompt rather than guessed.',equations:[String.raw`V=z^2+w,\quad\nabla^2w=-2,\quad w|_{\partial\Omega}=0`]},
 {id:'reciprocity',assignment:11,problems:'A and C',title:'Green reciprocity: exchange source & observer',question:'Exchange two source/observer points and test the charge-weighted reciprocity relation.',note:'Unequal source charges produce unequal voltages. Compare kernels, or compare QV(B;q at A) with qV(A;Q at B). Assignment 11 B is available in the six-charge module.',equations:[String.raw`G(\mathbf A,\mathbf B)=G(\mathbf B,\mathbf A),\quad QV(\mathbf B;q@\mathbf A)=qV(\mathbf A;Q@\mathbf B)`]},
 {id:'triangle',assignment:12,problems:'A, B and D (printed labels)',title:'Three dipoles: constrained energy landscape',question:'Rotate the three outward-pointing dipoles together, find energy minima, and compare perpendicular dipoles.',note:'The equal-angle, in-plane family is exactly the restriction in the assignment. Its minima are not a proof of a global minimum over all independent 3D orientations. The document prints A, B, D, and an otherwise empty second page with a stray C.',equations:[String.raw`U=\sum_{i<j}\frac{\mathbf p_i\cdot\mathbf p_j-3(\mathbf p_i\cdot\hat r_{ij})(\mathbf p_j\cdot\hat r_{ij})}{r_{ij}^3}`,String.raw`U(\Theta)=\frac{21\cos^2\Theta-15\sin^2\Theta}{4},\quad U_\perp=3\quad(k=p=\text{side length}=1)`]},
 {id:'dipole-series',assignment:13,problems:'A',title:'Displaced dipole: Legendre expansion',question:'Compare the exact potential of an axial dipole with its regular expansion for r < D.',note:'The source is p ẑ at z = D. The series is a derivative with respect to source position, giving a minus sign in every coefficient. The comparison is restricted to r < D.',equations:[String.raw`V=\frac{z-D}{|\mathbf r-D\hat z|^3}=-\sum_{\ell=0}^{\infty}\frac{(\ell+1)r^\ell}{D^{\ell+2}}P_\ell(\cos\theta)`]},
 {id:'dipole-images',assignment:13,problems:'B–C',title:'Dipole images: plane & sphere',question:'Rotate a dipole near a grounded plane or sphere and inspect its induced response.',note:'For a sphere, an image dipole alone is generally insufficient: the image point charge vanishes only for tangential orientation. The plane reflects the tangential components and preserves the normal component.',equations:[String.raw`\mathbf p_i=(a/d)^3[2\mathbf n(\mathbf n\cdot\mathbf p)-\mathbf p],\quad q_i=a(\mathbf n\cdot\mathbf p)/d^2`]},
];
export const dot=(a:V3,b:V3)=>a.reduce((v,x,i)=>v+x*b[i],0);
export const cross=(a:V3,b:V3):V3=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export function P(l:number,x:number){let a=1,b=x;if(!l)return a;for(let i=2;i<=l;i++)[a,b]=[b,((2*i-1)*x*b-(i-1)*a)/i];return b;}
export function laplacian(f:(p:V3)=>number,p:V3,h=1e-4){return p.reduce((s,_,i)=>{const a=[...p] as V3,b=[...p] as V3;a[i]+=h;b[i]-=h;return s+(f(a)-2*f(p)+f(b))/h**2;},0);}
export function gradientField(f:(p:V3)=>number,p:V3,h=1e-4):V3{return p.map((_,i)=>{const a=[...p] as V3,b=[...p] as V3;a[i]+=h;b[i]-=h;return -(f(a)-f(b))/(2*h);}) as V3;}
export function solidAngleTriangle(a:V3,b:V3,c:V3){return 2*Math.atan2(dot(a,cross(b,c)),Math.hypot(...a)*Math.hypot(...b)*Math.hypot(...c)+dot(a,b)*Math.hypot(...c)+dot(b,c)*Math.hypot(...a)+dot(c,a)*Math.hypot(...b));}
export function squareAngle(height:number,halfwidth=1){const a:V3=[-halfwidth,-halfwidth,height],b:V3=[halfwidth,-halfwidth,height],c:V3=[halfwidth,halfwidth,height],d:V3=[-halfwidth,halfwidth,height];return solidAngleTriangle(a,b,c)+solidAngleTriangle(a,c,d);}
export function solidAngleQuadratures(height:number,N:number){
 let surface=0,line=0;const step=2/N;
 for(let i=0;i<N;i++)for(let j=0;j<N;j++){const x=-1+(i+.5)*step,y=-1+(j+.5)*step;surface+=height*step**2/(x*x+y*y+height*height)**1.5;}
 const vertices=[[-1,-1],[1,-1],[1,1],[-1,1]];
 for(let e=0;e<4;e++)for(let i=0;i<N;i++){const a=vertices[e],b=vertices[(e+1)%4],t=(i+.5)/N,x=a[0]+t*(b[0]-a[0]),y=a[1]+t*(b[1]-a[1]),dx=(b[0]-a[0])/N,dy=(b[1]-a[1])/N,R=Math.hypot(x,y,height);line+=(-y*dx+x*dy)/(R*R+R*height);}
 return {surface,line,exact:squareAngle(height)};
}
export function distortedRadius(mu:number,eta:number){let lo=.7,hi=1.3;for(let i=0;i<60;i++){const r=(lo+hi)/2;if(1/r+eta*(3*mu*mu-1)/r**3>1)lo=r;else hi=r;}return (lo+hi)/2;}
export const harmonicNames=[['x','y','z'],['xy','xz','yz','x² − y²','2z² − x² − y²'],['z(2z² − 3x² − 3y²)','x(4z² − x² − y²)','y(4z² − x² − y²)','z(x² − y²)','xyz','x(x² − 3y²)','y(3x² − y²)']];
export function harmonicValue(degree:number,basis:number,[x,y,z]:V3){const list=degree===1?[x,y,z]:degree===2?[x*y,x*z,y*z,x*x-y*y,2*z*z-x*x-y*y]:[z*(2*z*z-3*x*x-3*y*y),x*(4*z*z-x*x-y*y),y*(4*z*z-x*x-y*y),z*(x*x-y*y),x*y*z,x*(x*x-3*y*y),y*(3*x*x-y*y)];return list[basis%list.length];}
export function cubeSource(p:V3){return p.reduce((v,x)=>v*x*(1-x),1);}
export function cubePotential(p:V3,N:number){let v=0;for(let k=1;k<=N;k+=2)for(let m=1;m<=N;m+=2)for(let n=1;n<=N;n+=2)v+=512*Math.sin(k*Math.PI*p[0])*Math.sin(m*Math.PI*p[1])*Math.sin(n*Math.PI*p[2])/(Math.PI**11*k**3*m**3*n**3*(k*k+m*m+n*n));return v;}
export function cubeSourceApprox(p:V3,N:number){let v=1;for(const x of p){let s=0;for(let n=1;n<=N;n+=2)s+=8*Math.sin(n*Math.PI*x)/(Math.PI**3*n**3);v*=s;}return v;}
export const sixSources:V3[]=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
export function sixExact(p:V3){return sixSources.reduce((v,s)=>v+1/Math.hypot(...p.map((x,i)=>x-s[i])),0);}
export function sixApprox([x,y,z]:V3){const r2=x*x+y*y+z*z;return 6+7/4*(5*(x**4+y**4+z**4)-3*r2*r2);}
export function ballPotential(p:V3,center:V3=[0,0,0]){const r=Math.hypot(...p.map((v,i)=>v-center[i]));return r<=1?(3-r*r)/2:1/r;}
export function ballField(p:V3,center:V3=[0,0,0]):V3{const R=p.map((v,i)=>v-center[i]) as V3,r=Math.hypot(...R);return R.map(v=>r<=1?v:v/r**3) as V3;}
export function triangleConfig(angle:number,perpendicular=false){return Array.from({length:3},(_,i)=>{const t=i*2*Math.PI/3;return {position:[Math.cos(t)/Math.sqrt(3),Math.sin(t)/Math.sqrt(3),0] as V3,moment:perpendicular?[0,0,1] as V3:[Math.cos(t+angle),Math.sin(t+angle),0] as V3};});}
export function triangleEnergy(angle:number,perpendicular=false){const c=triangleConfig(angle,perpendicular);let u=0;for(let i=0;i<3;i++)for(let j=i+1;j<3;j++){const R=c[j].position.map((v,k)=>v-c[i].position[k]) as V3,r=Math.hypot(...R),n=R.map(v=>v/r) as V3;u+=(dot(c[i].moment,c[j].moment)-3*dot(c[i].moment,n)*dot(c[j].moment,n))/r**3;}return u;}
export function bumpExact(p:V3,D:number){let v=0;for(const [z,q] of [[D,1],[-D,-1],[1/D,-1/D],[-1/D,1/D]])v+=q/Math.hypot(p[0],p[1],p[2]-z);return v;}
export function bumpSeries(p:V3,D:number,N:number){const r=Math.hypot(...p),mu=p[2]/r;let v=0;for(let l=1;l<=N;l+=2)v+=2*P(l,mu)*(r<D?(r**l-r**(-l-1))/D**(l+1):(D**l-D**(-l-1))/r**(l+1));return v;}
export function boxSpectral([x,y,z]:V3,N:number,H=100){let v=0;for(let k=1;k<=N;k+=2)for(let m=1;m<=N;m+=2){const kap=Math.PI*Math.hypot(k,m);v+=8*Math.PI/kap*Math.sin(k*Math.PI*(x+.5))*Math.sin(m*Math.PI*(y+.5))*Math.sin(k*Math.PI/2)*Math.sin(m*Math.PI/2)*Math.exp(-kap*Math.abs(z))*(1-Math.exp(-2*kap*(H-Math.abs(z))))/(1+Math.exp(-2*kap*H));}return v;}
export function boxImages([x,y,z]:V3,N:number,H=100){let v=0;for(let i=-N;i<=N;i++)for(let j=-N;j<=N;j++)for(let k=-N;k<=N;k++)v+=(-1)**(i+j+k)/Math.hypot(x-i,y-j,z-2*H*k);return v;}
export function boxNonzero([x,y,z]:V3,N:number,H=100){let w=0;for(let k=1;k<=N;k+=2)for(let m=1;m<=N;m+=2){const kap=Math.PI*Math.hypot(k,m),ratio=Math.exp(kap*(Math.abs(z)-H))*(1+Math.exp(-2*kap*Math.abs(z)))/(1+Math.exp(-2*kap*H));w+=32*Math.sin(k*Math.PI*(x+.5))*Math.sin(m*Math.PI*(y+.5))*(1-ratio)/(Math.PI**4*k*m*(k*k+m*m));}return z*z+w;}
const diskNodes=gaussLegendre(16).flatMap(({x,w})=>Array.from({length:40},(_,j)=>{const r=(x+1)/2,t=(j+.5)*Math.PI/20;return {p:[r*Math.cos(t),r*Math.sin(t),0] as V3,q:-w*r/80};}));
export function neumannDisk(p:V3){let v=0;const e:V3=[0,0,0];for(const s of diskNodes){const R=p.map((v,i)=>v-s.p[i]),r=Math.hypot(...R);v+=s.q/r;for(let i=0;i<3;i++)e[i]+=s.q*R[i]/r**3;}return {v,e};}
export function createModel(id:string,s:LabParams){
 let extent=3,unit='Normalized potential',sources:V3[]=[],valid=(p:V3)=>true;
 const exact=(p:V3):number=>{
  const [x,y,z]=p,r=Math.hypot(...p);
  switch(id){
   case 'distorted':return r<=distortedRadius(r?z/r:0,s.a)?1:1/r+s.a*(3*(z/r)**2-1)/r**3;
   case 'wire':return -2*Math.log(Math.max(1e-12,Math.hypot(x,y))/s.d);
   case 'neumann':return neumannDisk(p).v;
   case 'polynomials':return harmonicValue(s.degree,s.basis,p)/(s.option==='exterior'?r**(2*s.degree+1):1);
   case 'cube':return cubePotential(p,s.n);
   case 'octahedron':return sixExact(p);
   case 'legendre':return 1/Math.hypot(x,y,z-1);
   case 'bump':return bumpExact(p,s.d);
   case 'balls':return ballPotential(p,[0,0,-s.d/2])+ballPotential(p,[0,0,s.d/2]);
   case 'plane-mode':return Math.cos(Math.PI*x)*Math.cos(2*Math.PI*y)*Math.exp(-Math.PI*Math.sqrt(5)*Math.abs(z));
   case 'box-green':return boxSpectral(p,s.n);
   case 'box-boundary':return boxNonzero(p,s.n);
   case 'dipole-series':return (z-s.d)/Math.hypot(x,y,z-s.d)**3;
   default:return 0;
  }
 };
 const approx=(p:V3)=>{const r=Math.hypot(...p),mu=r?p[2]/r:0;
  if(id==='wire'){const R=Math.hypot(p[0],p[1]);return 2*(Math.asinh(s.a/R)-Math.asinh(s.a/s.d));}
  if(id==='octahedron')return sixApprox(p);
  if(id==='bump')return bumpSeries(p,s.d,s.n);
  if(id==='box-green')return boxImages(p,Math.min(5,Math.max(1,Math.round(s.n/3))));
  if(id==='legendre'){let v=0;for(let l=0;l<=s.n;l++)v+=(r<1?r**l:r**(-l-1))*P(l,mu);return v;}
  if(id==='dipole-series'){let v=0;for(let l=0;l<=s.n;l++)v-=(l+1)*r**l/s.d**(l+2)*P(l,mu);return v;}
  return exact(p);
 };
 if(id==='cube'){extent=1;valid=([x,y,z])=>[x,y,z].every(v=>v>=0&&v<=1);unit='V / (ρ₀a²/ε₀)';}
 if(id==='neumann'){extent=2.5;valid=([,,z])=>z>=.08;unit='V / (specified derivative × disk radius)';}
 if(id==='wire'){extent=3;valid=([x,y])=>Math.hypot(x,y)>.08;unit='V / (kλ), relative to R₀';}
 if(id==='octahedron'){extent=.9;valid=p=>Math.hypot(...p)<.9;}
 if(id==='polynomials')valid=p=>s.option!=='exterior'||Math.hypot(...p)>.3;
 if(id==='legendre'){extent=2;sources=[[0,0,1]];}
 if(id==='bump'){extent=Math.max(3,s.d+1);valid=p=>p[2]>=0&&Math.hypot(...p)>=1;sources=[[0,0,s.d]];}
 if(id==='balls')extent=Math.max(3,s.d/2+1.5);
 if(id==='box-green'||id==='box-boundary'){extent=2;valid=([x,y,z])=>Math.abs(x)<=.5&&Math.abs(y)<=.5&&Math.abs(z)<=100;if(id==='box-green')sources=[[0,0,0]];}
 if(id==='dipole-series'){extent=s.d;valid=p=>Math.hypot(...p)<s.d*.9;sources=[[0,0,s.d]];}
 let v=exact,other=approx;
 if(id==='dipole-images'){
  extent=Math.max(3,s.d+1);sources=[[0,0,s.d]];const plane=s.option==='plane',source={position:[0,0,s.d] as V3,moment:[Math.sin(s.angle),0,Math.cos(s.angle)] as V3};
  const response=prepareDipole(plane?{position:[s.d,0,0],moment:[Math.cos(s.angle),0,Math.sin(s.angle)]}:source,{kind:plane?'plane':'sphere',gap:6,cutoff:12});
  // Existing engine accepts nC m; divide physical volts by k*1 nC for normalized kp=1.
  v=p=>response.evaluate(plane?[p[2],p[1],p[0]]:p).total/8.9875517923;other=v;valid=p=>plane?p[2]>=0:Math.hypot(...p)>=1;
 }
 if(id==='reciprocity'){
  unit='Green kernel G (inverse length), independent of source charge';extent=3;const b={kind:s.option==='plane'?'plane' as const:s.option==='free'?'free' as const:'sphere' as const,gap:6,cutoff:12},response=prepareResponse([{id:'A',position:[s.d,0,0],q:1}],b);
  v=p=>response.evaluate(p).voltage/8.9875517923;other=v;sources=[[s.d,0,0]];valid=p=>b.kind==='plane'?p[0]>=0:b.kind==='sphere'?Math.hypot(...p)>=1:true;
 }
 const safe=(p:V3)=>valid(p)&&sources.every(q=>Math.hypot(...p.map((x,i)=>x-q[i]))>.07);
 return {v,other,valid:safe,extent,unit,sources,field:(p:V3)=>id==='neumann'?neumannDisk(p).e:gradientField(v,p)};
}
