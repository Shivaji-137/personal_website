import { solveKepler } from './binary';
export const keplerPeriod = (a: number, stellarMass = 1) => Math.sqrt(a ** 3 / stellarMass);
export function keplerState(phase: number, a: number, b: number, stellarMass = 1) {
  const e = Math.sqrt(Math.max(0, 1 - (b / a) ** 2));
  const M = phase * 2 * Math.PI, E = solveKepler(M, e);
  const period = keplerPeriod(a, stellarMass), n = 2 * Math.PI / period;
  const x = a * (Math.cos(E) - e), y = b * Math.sin(E), r = a * (1 - e * Math.cos(E));
  const dEdt = n / (1 - e * Math.cos(E));
  const vx = -a * Math.sin(E) * dEdt, vy = b * Math.cos(E) * dEdt;
  return { x, y, r, e, E, vx, vy, speed: Math.hypot(vx, vy), period, areaRate: Math.PI * a * b / period };
}
// Continuous swept area, including whole revolutions. Avoid anomaly wrap discontinuities.
export function sweptArea(startPhase: number, endPhase: number, a: number, b: number) {
  return Math.PI * a * b * (endPhase - startPhase);
}
