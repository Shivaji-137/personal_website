export type Harmonic = { l: number; m: number; component: 'real' | 'imaginary'; phase: 'standard' | 'notes' };
export const RAD = Math.PI / 180;
export const POSITIVE = [34, 211, 238] as const, NEGATIVE = [251, 113, 133] as const, NEUTRAL = [25, 34, 52] as const;
export function validate(l: number, m: number) {
  if (!Number.isInteger(l) || !Number.isInteger(m) || l < 0 || l > 64 || Math.abs(m) > l) throw new RangeError('Integer 0 ≤ ℓ ≤ 64 and |m| ≤ ℓ required.');
}
/** Fully normalized associated Legendre recurrence, including Condon–Shortley.
 * stripped=true divides out sin(theta)^q analytically, for robust root finding. */
export function legendre(l: number, q: number, theta: number, stripped = false): number {
  let diagonal = 1 / Math.sqrt(4 * Math.PI);
  const sine = stripped ? 1 : theta === 0 || theta === Math.PI ? 0 : Math.sin(theta);
  for (let j = 1; j <= q; j++) diagonal *= -Math.sqrt((2 * j + 1) / (2 * j)) * sine;
  if (l === q) return diagonal;
  const x = Math.cos(theta);
  let previous = diagonal, current = Math.sqrt(2 * q + 3) * x * diagonal;
  for (let j = q + 2; j <= l; j++) {
    const a = Math.sqrt((4 * j * j - 1) / (j * j - q * q));
    const b = Math.sqrt(((2 * j + 1) * ((j - 1) ** 2 - q * q)) / ((2 * j - 3) * (j * j - q * q)));
    [previous, current] = [current, a * x * current - b * previous];
  }
  return current;
}
export function thetaFactor(h: Harmonic, theta: number): number {
  const q = Math.abs(h.m), odd = q % 2 ? -1 : 1;
  return legendre(h.l, q, theta) * (h.m < 0 ? odd : 1) * (h.phase === 'notes' ? odd : 1);
}
export function angularFactor(h: Harmonic, psi: number): number {
  return h.component === 'real' ? Math.cos(h.m * psi) : Math.sin(h.m * psi);
}
export function evaluate(h: Harmonic, theta: number, psi: number): number {
  return thetaFactor(h, theta) * angularFactor(h, psi) || 0;
}
export function complexHarmonic(l: number, m: number, theta: number, psi: number, phase: Harmonic['phase'] = 'standard') {
  validate(l, m);
  const a = thetaFactor({ l, m, component: 'real', phase }, theta);
  return { re: a * Math.cos(m * psi), im: a * Math.sin(m * psi) };
}
export function latitudeNodes(l: number, m: number): number[] {
  validate(l, m);
  const q = Math.abs(m), count = l - q;
  if (count === 0) return [];
  const nodes: number[] = [], steps = 8192;
  let left = 0, last = legendre(l, q, left, true);
  for (let i = 1; i <= steps; i++) {
    const right = Math.PI * i / steps, value = legendre(l, q, right, true);
    if ((last < 0) !== (value < 0)) {
      let a = left, b = right, fa = last;
      for (let k = 0; k < 52; k++) {
        const mid = (a + b) / 2, fm = legendre(l, q, mid, true);
        if ((fa < 0) !== (fm < 0)) b = mid; else { a = mid; fa = fm; }
      }
      nodes.push((a + b) / 2);
    }
    left = right; last = value;
  }
  if (nodes.length !== count) throw new Error(`Expected ${count} latitude nodes, found ${nodes.length}.`);
  return nodes;
}
export function longitudeNodes(m: number, component: Harmonic['component']): number[] {
  const q = Math.abs(m);
  if (!q) return [];
  const nodes: number[] = [];
  for (let k = -2 * q; k <= 2 * q; k++) {
    const a = (component === 'real' ? (k + .5) : k) * Math.PI / q;
    if (a > -Math.PI + 1e-12 && a < Math.PI - 1e-12) nodes.push(a);
  }
  return nodes;
}
export function analyze(h: Harmonic) {
  validate(h.l, h.m);
  const latitudes = latitudeNodes(h.l, h.m), longitudes = longitudeNodes(h.m, h.component);
  const zero = h.m === 0 && h.component === 'imaginary';
  let scale = 0;
  if (!zero) for (let i = 0; i <= 8192; i++) scale = Math.max(scale, Math.abs(thetaFactor(h, Math.PI * i / 8192)));
  const tolerance = scale * 1e-9;
  const rows = zero ? 0 : latitudes.length + 1, columns = zero ? 0 : longitudes.length + 1;
  const sphereRegions = zero ? 0 : rows * (h.m ? 2 * Math.abs(h.m) : 1);
  const sampleTheta = (latitudes[0] ?? Math.PI) / 2;
  const samplePsi = (-Math.PI + (longitudes[0] ?? Math.PI)) / 2;
  return { latitudes, longitudes, rows, columns, boxes: rows * columns, sphereRegions, zero, scale, tolerance, sampleTheta, samplePsi };
}
export function sign(value: number, tolerance: number): -1 | 0 | 1 { return Math.abs(value) <= tolerance ? 0 : value > 0 ? 1 : -1; }
export function xyz(theta: number, psi: number) { return [Math.sin(theta) * Math.cos(psi), Math.sin(theta) * Math.sin(psi), Math.cos(theta)] as [number, number, number]; }
export function anglesFromXYZ(x: number, y: number, z: number, previousPsi: number) {
  const length = Math.hypot(x, y, z), theta = Math.acos(Math.max(-1, Math.min(1, z / length)));
  return { theta, psi: Math.hypot(x, y) / length < 1e-10 ? previousPsi : Math.atan2(y, x) };
}
export function signedColor(value: number, scale: number, continuous: boolean) {
  if (!scale || Math.abs(value) <= scale * 1e-9) return [...NEUTRAL];
  const color = value > 0 ? POSITIVE : NEGATIVE, mix = continuous ? Math.pow(Math.min(1, Math.abs(value) / scale), .65) : 1;
  return NEUTRAL.map((v, i) => Math.round(v + (color[i] - v) * mix));
}
export function makeField(h: Harmonic, scale: number, continuous: boolean) {
  const width = 1024, height = 513, data = new Float32Array(width * height), rgba = new Uint8ClampedArray(width * height * 4);
  const angular = Array.from({ length: width }, (_, i) => angularFactor(h, -Math.PI + 2 * Math.PI * i / (width - 1)));
  for (let j = 0; j < height; j++) {
    const a = thetaFactor(h, Math.PI * j / (height - 1));
    for (let i = 0; i < width; i++) {
      const k = j * width + i, value = a * angular[i]; data[k] = scale ? value / scale : 0;
      const c = signedColor(value, scale, continuous); rgba.set([...c, 255], 4 * k);
    }
  }
  return { width, height, data, rgba };
}
