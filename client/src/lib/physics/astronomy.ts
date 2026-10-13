export const TAU = 2 * Math.PI;
export const rad = (d: number) => d * Math.PI / 180;
export const deg = (r: number) => r * 180 / Math.PI;
export const wrap = (v: number, period: number) => ((v % period) + period) % period;
export type Vec = { x: number; y: number; z: number };
// East, north, up basis. Hour angle is positive west of the meridian.
export function horizontal(latitude: number, declination: number, hourAngle: number): Vec {
  const p = rad(latitude), d = rad(declination), h = rad(hourAngle * 15);
  return { x: -Math.cos(d) * Math.sin(h), y: Math.cos(p) * Math.sin(d) - Math.sin(p) * Math.cos(d) * Math.cos(h), z: Math.sin(p) * Math.sin(d) + Math.cos(p) * Math.cos(d) * Math.cos(h) };
}
export function altaz(v: Vec) {
  return { altitude: deg(Math.asin(Math.max(-1, Math.min(1, v.z)))), azimuth: Math.hypot(v.x, v.y) < 1e-10 ? null : wrap(deg(Math.atan2(v.x, v.y)), 360) };
}
export function orbit(t: number, a: number, e = 0) {
  const n = TAU / Math.pow(a, 1.5), m = wrap(n * t, TAU);
  let E = m;
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - m) / (1 - e * Math.cos(E));
  const rate = n / (1 - e * Math.cos(E));
  return { x: a * (Math.cos(E) - e), y: a * Math.sqrt(1 - e * e) * Math.sin(E), vx: -a * Math.sin(E) * rate, vy: a * Math.sqrt(1 - e * e) * Math.cos(E) * rate };
}
// Superior-planet epicycle: its absolute phase follows the mean Sun (Earth + pi).
export function equant(t: number, a: number, offset: number) {
  const A = TAU * t / Math.pow(a, 1.5), q = offset * a;
  const distance = -q * Math.cos(A) + Math.sqrt(a * a - q * q * Math.sin(A) ** 2);
  const cx = q + distance * Math.cos(A), cy = distance * Math.sin(A);
  return { x: cx - Math.cos(TAU * t), y: cy - Math.sin(TAU * t), cx, cy, earthX: -q, equantX: q };
}
