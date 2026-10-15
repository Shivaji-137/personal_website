export const G = 6.67430e-11;
export const SOLAR_MASS = 1.98847e30;
export const SOLAR_RADIUS = 6.957e8;
const KB = 1.380649e-23, MU = 1.66053906660e-27;
export type LanePoint = { xi: number; theta: number; v: number };
export function laneEmden(n: number, step = 0.002): LanePoint[] {
  if (!Number.isFinite(n) || n < 0 || n > 4 || !Number.isFinite(step) || step <= 0 || step > 0.02) throw new RangeError('Use 0 ≤ n ≤ 4 and 0 < step ≤ 0.02.');
  const points: LanePoint[] = [{ xi: 0, theta: 1, v: 0 }];
  let xi = step, theta = 1 - xi ** 2 / 6 + n * xi ** 4 / 120, v = xi ** 3 / 3 - n * xi ** 5 / 30;
  points.push({ xi, theta, v });
  const slope = (x: number, t: number, q: number) => [-q / x ** 2, x ** 2 * (n === 0 ? 1 : Math.max(0, t) ** n)];
  for (let i = 0; i < 20000; i++) {
    const a = slope(xi, theta, v), b = slope(xi + step / 2, theta + step * a[0] / 2, v + step * a[1] / 2);
    const c = slope(xi + step / 2, theta + step * b[0] / 2, v + step * b[1] / 2), d = slope(xi + step, theta + step * c[0], v + step * c[1]);
    const nextTheta = theta + step * (a[0] + 2 * b[0] + 2 * c[0] + d[0]) / 6;
    const nextV = v + step * (a[1] + 2 * b[1] + 2 * c[1] + d[1]) / 6;
    if (nextTheta <= 0) {
      const f = theta / (theta - nextTheta);
      points.push({ xi: xi + step * f, theta: 0, v: v + f * (nextV - v) });
      return points;
    }
    xi += step; theta = nextTheta; v = nextV; points.push({ xi, theta, v });
  }
  throw new Error('Finite stellar surface not found.');
}
export function stellarModel(massSolar: number, radiusSolar: number, n: number, meanMolecularWeight = 0.61) {
  if (![massSolar, radiusSolar, meanMolecularWeight].every(x => Number.isFinite(x) && x > 0) || n < 1 || n > 4) throw new RangeError('Positive mass, radius and molecular weight; 1 ≤ n ≤ 4 required.');
  const solution = laneEmden(n), surface = solution.at(-1)!;
  const mass = massSolar * SOLAR_MASS, radius = radiusSolar * SOLAR_RADIUS, a = radius / surface.xi;
  const centralDensity = mass / (4 * Math.PI * a ** 3 * surface.v);
  const centralPressure = 4 * Math.PI * G * a ** 2 * centralDensity ** 2 / (n + 1);
  const centralTemperature = meanMolecularWeight * MU / KB * centralPressure / centralDensity;
  const state = (fraction: number) => {
    if (!Number.isFinite(fraction)) throw new RangeError('Radius fraction must be finite.');
    const u = Math.max(0, Math.min(1, fraction)), xi = u * surface.xi;
    let lo = 0, hi = solution.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (solution[mid].xi <= xi) lo = mid; else hi = mid; }
    const l = solution[lo], h = solution[hi], f = (xi - l.xi) / (h.xi - l.xi);
    const theta = Math.max(0, l.theta + f * (h.theta - l.theta)), v = l.v + f * (h.v - l.v);
    const r = u * radius, density = centralDensity * theta ** n, pressure = centralPressure * theta ** (n + 1);
    const enclosedMass = mass * v / surface.v;
    const gravity = r === 0 ? 0 : G * enclosedMass / r ** 2;
    const pressureGradient = -density * gravity;
    return { u, r, theta, density, pressure, enclosedMass, gravity, pressureGradient, forceDensity: density * gravity, temperature: centralTemperature * theta };
  };
  const samples = Array.from({ length: 501 }, (_, i) => state(i / 500));
  return { n, mass, radius, centralDensity, centralPressure, centralTemperature, meanDensity: mass / (4 * Math.PI * radius ** 3 / 3), xi1: surface.xi, massCoefficient: surface.v, samples, state };
}
