import { useEffect, useMemo, useRef, useState } from 'react';
import { evaluate, type Harmonic, type analyze, type makeField } from '@/lib/physics/sphericalHarmonics';
export default function HarmonicMap({ harmonic, analysis, field, theta, psi, nodes, labels, point, select }: {
  harmonic: Harmonic; analysis: ReturnType<typeof analyze>; field: ReturnType<typeof makeField>; theta: number; psi: number;
  nodes: boolean; labels: boolean; point: boolean; select: (theta: number, psi: number) => void;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const [textScale, setTextScale] = useState(1);
  useEffect(() => { const node = svg.current!; const observer = new ResizeObserver(() => setTextScale(740 / Math.max(1, node.getBoundingClientRect().width))); observer.observe(node); return () => observer.disconnect(); }, []);
  const readableLabels = analysis.boxes <= 120 && 625 / textScale / Math.max(1, analysis.columns) >= 18 && 325 / textScale / Math.max(1, analysis.rows) >= 18;
  const image = useMemo(() => { const c = document.createElement('canvas'); c.width = field.width; c.height = field.height; c.getContext('2d')!.putImageData(new ImageData(field.rgba, field.width, field.height), 0, 0); return c.toDataURL(); }, [field]);
  const x = (p: number) => 75 + (p + Math.PI) / (2 * Math.PI) * 625, y = (t: number) => 30 + t / Math.PI * 325;
  const pick = (event: React.PointerEvent<SVGSVGElement>) => {
    const c = svg.current!, matrix = c.getScreenCTM(); if (!matrix) return;
    const p = c.createSVGPoint(); p.x = event.clientX; p.y = event.clientY; const q = p.matrixTransform(matrix.inverse());
    if (q.x < 75 || q.x > 700 || q.y < 30 || q.y > 355) return;
    select((q.y - 30) / 325 * Math.PI, (q.x - 75) / 625 * 2 * Math.PI - Math.PI);
  };
  const ts = [0, ...analysis.latitudes, Math.PI], ps = [-Math.PI, ...analysis.longitudes, Math.PI];
  return <div><svg ref={svg} viewBox="0 0 740 410" role="img" aria-label="Angular map: azimuth psi from minus 180 to 180 degrees; colatitude theta from zero at top to 180 degrees below. Tap to select angles." className="w-full touch-none rounded-xl bg-[#060a12]" onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); pick(e); }} onPointerMove={e => { if (e.buttons) pick(e); }}>
    <image href={image} x="75" y="30" width="625" height="325" preserveAspectRatio="none"/>
    {[-180,-90,0,90,180].map(degree => <text key={degree} x={x(degree * Math.PI / 180)} y="377" textAnchor="middle" fill="#94a3b8" fontSize={Math.max(12, 10 * textScale)}>{degree}°</text>)}
    {[0,45,90,135,180].map(degree => <text key={degree} x="67" y={y(degree * Math.PI / 180) + 4} textAnchor="end" fill="#94a3b8" fontSize={Math.max(12, 10 * textScale)}>{degree}°</text>)}
    <text x="375" y="400" textAnchor="middle" fill="#cbd5e1" fontSize={Math.max(13, 10 * textScale)}>Azimuth ψ (commonly φ)</text><text x="14" y="190" transform="rotate(-90 14 190)" textAnchor="middle" fill="#cbd5e1" fontSize={Math.max(13, 10 * textScale)}>Colatitude θ ↓</text>
    <rect x="75" y="30" width="625" height="325" fill="none" stroke="#64748b"/>
    {nodes && !analysis.zero && <g stroke="#ffffffb0" strokeWidth="1">{analysis.latitudes.map(t => <line key={t} x1="75" x2="700" y1={y(t)} y2={y(t)}/>)}{analysis.longitudes.map(p => <line key={p} y1="30" y2="355" x1={x(p)} x2={x(p)}/>)}{harmonic.m !== 0 && harmonic.component === 'imaginary' && <g strokeDasharray="3 3"><line x1="75" x2="75" y1="30" y2="355"/><line x1="700" x2="700" y1="30" y2="355"/></g>}</g>}
    {labels && !analysis.zero && readableLabels && ts.slice(0, -1).flatMap((t, j) => ps.slice(0, -1).map((p, i) => { const a = (t + ts[j + 1]) / 2, b = (p + ps[i + 1]) / 2; return <text key={`${j}-${i}`} x={x(b)} y={y(a) + 4} textAnchor="middle" fill="white" stroke="#020617" strokeWidth="2.5" paintOrder="stroke" fontSize={Math.max(16, 12 * textScale)} fontWeight="bold">{evaluate(harmonic, a, b) > 0 ? '+' : '−'}</text>; }))}
    {point && <g stroke="#fde047" strokeWidth="2"><circle cx={x(psi)} cy={y(theta)} r="6" fill="#0f172a"/><line x1={x(psi) - 10} x2={x(psi) + 10} y1={y(theta)} y2={y(theta)}/><line x1={x(psi)} x2={x(psi)} y1={y(theta) - 10} y2={y(theta) + 10}/></g>}
  </svg><p className="mt-2 text-[10px] leading-4 text-slate-400">Tap or drag the map to select angles. The left and right edges are the same meridian. {!readableLabels && labels ? 'Dense sign labels are automatically hidden for readability.' : 'White lines mark nodes; yellow marks your selected point.'}</p></div>;
}
