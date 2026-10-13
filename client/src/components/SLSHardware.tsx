/** SLS-inspired stage geometry; the homepage's recovery is fictional. */
export default function SLSHardware({ id }: { id: string }) {
  return <g>
    <defs>
      <linearGradient id={`${id}-foam`}><stop stopColor="#74391b"/><stop offset="0.2" stopColor="#bb652d"/><stop offset="0.45" stopColor="#ecaa65"/><stop offset="0.7" stopColor="#c57b3e"/><stop offset="1" stopColor="#713c24"/></linearGradient>
      <linearGradient id={`${id}-white`}><stop stopColor="#6b7886"/><stop offset="0.28" stopColor="#d9e1e7"/><stop offset="0.48" stopColor="#ffffff"/><stop offset="0.74" stopColor="#d4dce3"/><stop offset="1" stopColor="#687585"/></linearGradient>
      <linearGradient id={`${id}-engine`}><stop stopColor="#101820"/><stop offset="0.5" stopColor="#64717e"/><stop offset="1" stopColor="#161e27"/></linearGradient>
    </defs>
    <path d="M37 49 L59 49 L61 55 V108 L58 114 H38 L35 108 V55 Z" fill={`url(#${id}-foam)`} stroke="#7a462b" strokeWidth="0.6"/>
    {[57, 72, 79, 105].map(y => <path key={y} d={`M35 ${y} H61`} stroke="#764626" strokeWidth="0.65" opacity="0.75"/>)}
    <path d="M39 54 V103" stroke="#f5c899" strokeWidth="0.6" opacity="0.6"/>
    <rect x="54" y="56" width="2" height="46" rx="0.5" fill="#a8582b"/>
    {[42, 50].map(x => <path key={x} d={`M${x} 111 L${x + 5} 111 L${x + 7} 120 L${x - 2} 120 Z`} fill={`url(#${id}-engine)`} stroke="#94a3b8" strokeWidth="0.5"/>)}
    {[22, 64].map((x, side) => <g key={x}>
      <path d={`M${x} 109 V62 Q${x} 55 ${x + 5} 50 Q${x + 10} 55 ${x + 10} 62 V109 Z`} fill={`url(#${id}-white)`} stroke="#94a3b8" strokeWidth="0.6"/>
      {[64, 73, 82, 91, 100].map(y => <g key={y}><path d={`M${x} ${y} H${x + 10}`} stroke="#475569" strokeWidth="0.8"/><path d={`M${x} ${y + 1.5} H${x + 10}`} stroke="#f8fafc" strokeWidth="0.6"/></g>)}
      <path d={`M${x + 2} 108 H${x + 8} L${x + 12} 119 H${x - 2} Z`} fill={`url(#${id}-engine)`} stroke="#94a3b8" strokeWidth="0.6"/>
      <path d={side === 0 ? 'M32 68 H35 M32 103 H35' : 'M61 68 H64 M61 103 H64'} stroke="#cbd5e1" strokeWidth="2"/>
      <rect x={x + 2} y="63" width="3" height="3" fill="#111827"/>
    </g>)}
    <text x="48" y="89" textAnchor="middle" fill="#fff4e5" fontSize="4" fontFamily="Arial, sans-serif" letterSpacing="1">USA</text>
    <rect x="44" y="61" width="8" height="5" fill="#f8fafc"/>
    {[62, 63.5, 65].map(y => <path key={y} d={`M44 ${y} H52`} stroke="#b91c1c" strokeWidth="0.6"/>)}
    <rect x="44" y="61" width="3.5" height="2.7" fill="#1e3a8a"/>
  </g>;
}
