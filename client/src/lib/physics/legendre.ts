import { legendre, latitudeNodes, validate, type Harmonic } from './sphericalHarmonics';
import { legendrePolynomial } from './harmonicFormula';
export type Phase = Harmonic['phase'];
export function ordinaryLegendre(l: number, x: number) {
  validate(l,0); if (x < -1 || x > 1 || !Number.isFinite(x)) throw new RangeError('x must be in [-1,1]');
  let a=1,b=x;if(l===0)return a;
  for(let j=2;j<=l;j++)[a,b]=[b,((2*j-1)*x*b-(j-1)*a)/j];return b;
}
export function logFactorial(n:number) { let sum=0;for(let j=2;j<=n;j++)sum+=Math.log(j);return sum; }
export function logNormalization(l:number,q:number) {return .5*(Math.log((2*l+1)/(4*Math.PI))+logFactorial(l-q)-logFactorial(l+q));}
/** Ferrers function on [-1,1], with explicit signed-order and phase conventions. */
export function associatedLegendre(l:number,m:number,x:number,phase:Phase='standard',normalized=false) {
  validate(l,m);if(x < -1 || x > 1 || !Number.isFinite(x))throw new RangeError('x must be in [-1,1]');
  const q=Math.abs(m),theta=Math.acos(x),qvalue=legendre(l,q,theta);
  const convention=(phase==='notes'?(-1)**q:1),negative=m<0?(-1)**q:1;
  if(normalized)return qvalue*negative*convention || 0;
  const logScale=-logNormalization(l,q)+(m<0?logFactorial(l-q)-logFactorial(l+q):0);
  return qvalue*Math.exp(logScale)*negative*convention || 0;
}
export function ordinaryDerivative(l:number,q:number,x:number) {
  validate(l,q);if(x < -1 || x > 1 || !Number.isFinite(x))throw new RangeError('x must be in [-1,1]');
  return legendre(l,q,Math.acos(x),true)*Math.exp(-logNormalization(l,q))*(-1)**q;
}
export function legendreRoots(l:number,m=0) { return latitudeNodes(l,m).map(t=>Math.cos(t)).reverse(); }
export function polynomialExpression(l:number,q=0,variable='x') {
  const p=legendrePolynomial(l,q);
  const terms=p.terms.map(({power,coefficient},i)=>{
    const abs=coefficient<BigInt(0)?-coefficient:coefficient;
    return (coefficient<BigInt(0)?'-':i?'+':'')+(abs===BigInt(1)&&power?'':String(abs))+(power?(power===1?variable:variable===String.raw`\cos\theta`?String.raw`\cos^{${power}}\theta`:`${variable}^{${power}}`):'');
  }).join('');
  const coefficient=p.denominator===BigInt(1)?(p.numerator===BigInt(1)?'':String(p.numerator)):String.raw`\frac{${p.numerator}}{${p.denominator}}`;
  return coefficient+(terms==='1'?(coefficient?'':'1'):String.raw`\left(${terms}\right)`);
}
export function associatedExpression(l:number,m:number,phase:Phase,normalized:boolean,theta=false) {
  const q=Math.abs(m),negative=(q+(m<0?q:0)+(phase==='notes'?q:0))%2;
  const factor=theta?(q?String.raw`\sin^{${q}}\theta\,`:''):(q?String.raw`(1-x^2)^{${q}/2}\,`:'');
  const normalization=normalized?String.raw`\sqrt{\frac{${2*l+1}}{4\pi}\frac{${l-q}!}{${l+q}!}}\,`:m<0?String.raw`\frac{${l-q}!}{${l+q}!}\,`:'';
  return (negative?'-':'')+normalization+factor+polynomialExpression(l,q,theta?String.raw`\cos\theta`:'x');
}
/** Gauss–Legendre quadrature, independent of sampled plot grids. */
export function gaussLegendre(n=96) {
  const result:{x:number;w:number}[]=[];
  for(let i=1;i<=n;i++){
    let x=Math.cos(Math.PI*(i-.25)/(n+.5)),derivative=0;
    for(let k=0;k<30;k++){
      let a=1,b=x;for(let j=2;j<=n;j++)[a,b]=[b,((2*j-1)*x*b-(j-1)*a)/j];
      derivative=n*(x*b-a)/(x*x-1);const dx=b/derivative;x-=dx;if(Math.abs(dx)<2e-15)break;
    }
    // Re-evaluate the derivative at the converged root for the weight.
    let a=1,b=x;for(let j=2;j<=n;j++)[a,b]=[b,((2*j-1)*x*b-(j-1)*a)/j];derivative=n*(x*b-a)/(x*x-1);
    result.push({x,w:2/((1-x*x)*derivative*derivative)});
  }return result;
}
