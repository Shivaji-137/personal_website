import fs from 'node:fs';
import { gzipSync } from 'node:zlib';
import {analyze, evaluate, RAD,thetaFactor, type Harmonic} from '../../../client/src/lib/physics/sphericalHarmonics';
import {expandedHarmonicFormula} from '../../../client/src/lib/physics/harmonicFormula';
import katex from 'katex';
const root=new URL('../',import.meta.url).pathname;
const deg=(v:number)=>(v/RAD).toFixed(6)+'°';
let out=`# Complete spherical-harmonic degree/order atlas\n\n[Read the step-by-step guide first](./README.md).\n\nThis appendix covers every signed pair with $0\\le\\ell\\le64$ and $-\\ell\\le m\\le\\ell$: **4,225 pairs**. Formulas below are **standard Condon–Shortley**, using real/imaginary parts of normalized complex harmonics, with no extra real-basis square-root-of-two factor.\n\nFor **every entry**, the explorer’s notes convention is obtained by multiplying both formulas by $(-1)^{|m|}$. Thus odd absolute orders reverse all signs; even orders stay unchanged. Nodes and region counts are identical in both conventions. This explicitly defines both conventions for all positive and negative orders without repeating thousands of identical phase statements.\n\nAngles in formulas are variables in radians; listed roots and sample points are in degrees. Displayed root angles are rounded to six decimal places; use the exact formulas or recurrence when more precision is required. “Latitude nodes” means colatitude values in the open interval $(0,180^\\circ)$. Nonzero orders also vanish at both poles. Listed longitude nodes exclude the seam edges; imaginary nonzero orders additionally vanish at both seam edges. Real zero-order modes do not have longitudinal nodes. Imaginary zero-order modes vanish everywhere, so ordinary nodal-region counts do not apply.\n\nEach formula is expanded in sine/cosine powers, with exact integer coefficients and factorial normalization. Large-degree expressions may be long. Use the recurrence for numerical evaluation; direct floating-point summation of expanded high-degree polynomials can suffer cancellation.\n\nEach sample point is strictly inside the top-left rectangle region for the real component; signs in notes phase are the standard signs multiplied by $(-1)^{|m|}$. Sine samples are chosen from their own first rectangle interval. Counts and sample signs refer to the selected component, not zeros of the full complex function.\n\n## Degree index\n\n`;
for(let l=0;l<=64;l++)out+=`[${l}](#degree-${l})${l===64?'\n\n':' · '}`;
let count=0,rendered=0;
for(let l=0;l<=64;l++){
 out+=`## Degree ${l}\n\nThere are ${2*l+1} signed orders at this degree.\n\n`;
 for(let m=-l;m<=l;m++){
  const h:Harmonic={l,m,phase:'standard',component:'real'},a=analyze(h),b=analyze({...h,component:'imaginary'});
  const re=expandedHarmonicFormula(h),im=expandedHarmonicFormula({...h,component:'imaginary'});
  for(const tex of [re,im]){katex.renderToString(tex,{throwOnError:true,strict:'error'});rendered++;}
  out+=`### ℓ = ${l}, m = ${m}\n\n`;
  out+=`$q=|m|=${Math.abs(m)}$, so $\\ell-q=${l-Math.abs(m)}$ interior latitude nodes.\n\n$$\n${re}\n$$\n\n$$\n${im}\n$$\n\n`;
  out+=`- Interior latitude nodes: ${a.latitudes.length?a.latitudes.map(deg).join(', '):'none'}.\n`;
  out+=`- Real longitude nodes: ${a.longitudes.length?a.longitudes.map(deg).join(', '):'none'}.\n`;
  out+=`- Real counts: ${a.rows} rows × ${a.columns} columns = ${a.boxes} rectangle boxes; ${a.sphereRegions} connected sphere regions.\n`;
  if(m===0)out+='- Imaginary component: identically zero; the entire sphere is its zero set. Positive/negative region counting is not applicable.\n';
  else out+=`- Imaginary interior longitude nodes: ${b.longitudes.map(deg).join(', ')}. Both seam edges are also nodes.\n- Imaginary counts: ${b.rows} rows × ${b.columns} columns = ${b.boxes} rectangle boxes; ${b.sphereRegions} connected sphere regions.\n`;
  const sign=(x:number)=>x>0?'positive (+)':'negative (−)';
  out+=`- Real first-region sample: θ = ${deg(a.sampleTheta)}, ψ = ${deg(a.samplePsi)} → ${sign(evaluate(h,a.sampleTheta,a.samplePsi))}.\n`;
  if(m!==0)out+=`- Imaginary first-region sample: θ = ${deg(b.sampleTheta)}, ψ = ${deg(b.samplePsi)} → ${sign(evaluate({...h,component:'imaginary'},b.sampleTheta,b.samplePsi))}.\n`;
  out+=`- Notes phase: ${Math.abs(m)%2?'reverse every nonzero sign in both formulas and sample tests':'same formulas and sample signs as standard phase'}.\n\n`;
  count++;
 }
}
fs.writeFileSync(root+'all-degree-order-pairs.md',out);
const field=(h:Harmonic,nt=181,np=361)=>Array.from({length:nt},(_,i)=>Array.from({length:np},(_,j)=>evaluate(h,i*Math.PI/(nt-1),-Math.PI+j*2*Math.PI/(np-1))));
const defaults:Harmonic={l:5,m:3,phase:'notes',component:'real'};
const models=[[0,0],[1,0],[1,1],[2,0],[2,1],[2,2],[3,1],[3,2],[3,3]].map(([l,m])=>({l,m,field:field({l,m,phase:'standard',component:'real'})}));
const a=analyze(defaults);
fs.writeFileSync(root+'figures/plot-data.json.gz',gzipSync(JSON.stringify({models,worked:field(defaults),latitudes:a.latitudes,longitudes:a.longitudes,thetaFactor:Array.from({length:721},(_,i)=>thetaFactor(defaults,i*Math.PI/720))})));
console.log(`Wrote ${count} pairs, validated ${rendered} formula renderings, ${(out.length/1e6).toFixed(2)} MB atlas and plot data.`);
