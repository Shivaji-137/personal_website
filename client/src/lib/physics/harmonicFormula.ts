import type { Harmonic } from './sphericalHarmonics';
const factorial = (n: number) => { let value = BigInt(1); for (let i = 2; i <= n; i++) value *= BigInt(i); return value; };
const gcd = (a: bigint, b: bigint): bigint => b === BigInt(0) ? (a < BigInt(0) ? -a : a) : gcd(b, a % b);
/** Exact differentiated Legendre polynomial: P_l^q = (-1)^q sin^q(theta) times a polynomial in cos(theta). */
export function legendrePolynomial(l: number, q: number) {
  if (!Number.isInteger(l) || !Number.isInteger(q) || l < 0 || l > 64 || q < 0 || q > l) throw new RangeError('Invalid degree/order');
  const terms = Array.from({ length: Math.floor((l-q)/2)+1 }, (_, k) => ({
    power: l-q-2*k,
    coefficient: (k % 2 ? -BigInt(1) : BigInt(1)) * factorial(2*l-2*k) / (factorial(k)*factorial(l-k)*factorial(l-q-2*k)),
  }));
  const common = terms.reduce((v, t) => gcd(v, t.coefficient), BigInt(0));
  const denominator = (BigInt(1) << BigInt(l)), reduction = gcd(common, denominator);
  return { numerator: common/reduction, denominator: denominator/reduction, terms: terms.map(t => ({ ...t, coefficient: t.coefficient/common })) };
}
export function expandedHarmonicFormula(h: Harmonic) {
  const { l, m, component, phase } = h, q = Math.abs(m);
  const y = phase === 'notes' ? String.raw`\widetilde Y` : 'Y';
  const op = component === 'real' ? String.raw`\operatorname{Re}` : String.raw`\operatorname{Im}`;
  const lhs = String.raw`${op}\,${y}_{${l}}^{${m}}(\theta,\psi)=`;
  if (component === 'imaginary' && m === 0) return lhs + '0';
  const polynomial = legendrePolynomial(l,q);
  const negative = (q + (m < 0 ? q : 0) + (phase === 'notes' ? q : 0)) % 2 !== 0;
  const prefactor = polynomial.denominator === BigInt(1) ? (polynomial.numerator === BigInt(1) ? '' : `${polynomial.numerator}`) : String.raw`\frac{${polynomial.numerator}}{${polynomial.denominator}}`;
  const terms = polynomial.terms.map(({power,coefficient}, index) => {
    const abs = coefficient < BigInt(0) ? -coefficient : coefficient;
    return (coefficient < BigInt(0) ? '-' : index ? '+' : '') + (abs === BigInt(1) && power ? '' : String(abs)) + (power ? (power === 1 ? String.raw`\cos\theta` : String.raw`\cos^{${power}}\theta`) : '');
  }).join('');
  const theta = (q ? (q === 1 ? String.raw`\sin\theta\,` : String.raw`\sin^{${q}}\theta\,`) : '') + (terms === '1' ? '' : String.raw`\left(${terms}\right)`);
  const angular = m === 0 ? '' : String.raw`\,` + (component === 'real' ? String.raw`\cos` : String.raw`\sin`) + String.raw`(${m}\psi)`;
  return lhs + (negative ? '-' : '') + prefactor + String.raw`\sqrt{\frac{${2*l+1}}{4\pi}\frac{${l-q}!}{${l+q}!}}\,` + theta + angular;
}
