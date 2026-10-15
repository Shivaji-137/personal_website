import { useEffect, useRef, useState } from 'react';
import { anglesFromXYZ, evaluate, xyz, type Harmonic, type analyze, type makeField } from '@/lib/physics/sphericalHarmonics';
type Props = { harmonic: Harmonic; analysis: ReturnType<typeof analyze>; field: ReturnType<typeof makeField>; theta: number; psi: number; continuous: boolean; nodes: boolean; axes: boolean; labels: boolean; point: boolean; lobe?: boolean; reset: number; select: (theta: number, psi: number) => void };
export default function HarmonicSphere(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null), overlay = useRef<HTMLCanvasElement>(null), latest = useRef(props);
  latest.current = props;
  const api = useRef<{ draw: () => void; upload: () => void; reset: () => void }>();
  const [error, setError] = useState('');
  useEffect(() => {
    const c = canvas.current!, o = overlay.current!, gl = c.getContext('webgl2', { antialias: true, alpha: false }), ctx = o.getContext('2d')!;
    if (!gl) { setError('WebGL 2 is unavailable. Use the angular map and sliders to explore the harmonic.'); return; }
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'Shader compilation failed'); return s;
    };
    let program: WebGLProgram, vs: WebGLShader, fs: WebGLShader;
    try {
      vs = shader(gl.VERTEX_SHADER, `#version 300 es
      precision highp float;
      in vec2 uv; uniform mat3 rotation; uniform float zoom; uniform float aspect; uniform bool lobe; uniform sampler2D field; out vec2 coords;
      void main(){float t=uv.y*3.141592653589793,p=(uv.x*2.-1.)*3.141592653589793;vec3 v=vec3(sin(t)*sin(p),sin(t)*cos(p),cos(t));float r=lobe?abs(texture(field,uv).r):1.;vec3 q=rotation*(v*r);gl_Position=vec4(q.x*zoom/aspect,q.y*zoom,-q.z*.45,1.);coords=uv;}`);
      fs = shader(gl.FRAGMENT_SHADER, `#version 300 es
      precision highp float;
      uniform sampler2D field; uniform bool continuous; in vec2 coords; out vec4 color;
      void main(){float v=texture(field,coords).r;vec3 neutral=vec3(25.,34.,52.)/255.;vec3 tint=v>0.?vec3(34.,211.,238.)/255.:vec3(251.,113.,133.)/255.;float a=abs(v)<=1e-9?0.:(continuous?pow(min(1.,abs(v)),.65):1.);color=vec4(mix(neutral,tint,a),1.);}`);
      program = gl.createProgram()!; gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'WebGL program failed');
    } catch (e) { setError(String(e)); return; }
    gl.useProgram(program);
    const vertex = gl.createBuffer()!, index = gl.createBuffer()!, texture = gl.createTexture()!, vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const nx = 512, ny = 256, uv = new Float32Array((nx + 1) * (ny + 1) * 2), indices = new Uint32Array(nx * ny * 6);
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) { const k = 2 * (j * (nx + 1) + i); uv[k] = i / nx; uv[k + 1] = j / ny; }
    let at = 0;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const a = j * (nx + 1) + i, b = a + nx + 1; indices.set([a, b, a + 1, a + 1, b, b + 1], at); at += 6; }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, 'uv'); gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    gl.bindTexture(gl.TEXTURE_2D, texture); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.enable(gl.DEPTH_TEST);
    let yaw = -.65, pitch = .38, zoom = .76, width = 1, height = 1, frame = 0;
    const rotation = () => {
      const a = Math.cos(yaw), b = Math.sin(yaw), s = Math.sin(pitch), d = Math.cos(pitch);
      return [a, -b, 0, -s * b, -s * a, d, d * b, d * a, s];
    };
    const projected = (v: number[]) => {
      const r = rotation(); return { x: width / 2 + (r[0] * v[0] + r[1] * v[1] + r[2] * v[2]) * zoom * height / 2, y: height / 2 - (r[3] * v[0] + r[4] * v[1] + r[5] * v[2]) * zoom * height / 2, depth: r[6] * v[0] + r[7] * v[1] + r[8] * v[2] };
    };
    const dot = (x: number, y: number, r: number, fill: string) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fillStyle = fill; ctx.fill(); };
    const draw = () => {
      const p = latest.current, r = rotation();
      gl.viewport(0, 0, c.width, c.height); gl.clearColor(.025, .04, .07, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.useProgram(program); gl.bindVertexArray(vao);
      gl.uniformMatrix3fv(gl.getUniformLocation(program, 'rotation'), false, [r[0], r[3], r[6], r[1], r[4], r[7], r[2], r[5], r[8]]);
      gl.uniform1f(gl.getUniformLocation(program, 'zoom'), zoom); gl.uniform1f(gl.getUniformLocation(program, 'aspect'), width / height); gl.uniform1i(gl.getUniformLocation(program, 'lobe'), p.lobe ? 1 : 0); gl.uniform1i(gl.getUniformLocation(program, 'continuous'), p.continuous ? 1 : 0); gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
      ctx.clearRect(0, 0, width, height); ctx.font = '11px system-ui'; ctx.textAlign = 'center';
      const curve = (fn: (a: number) => number[], color: string, end = 2 * Math.PI) => {
        ctx.strokeStyle = color; ctx.lineWidth = 1.1; ctx.beginPath(); let previous = false;
        for (let i = 0; i <= 256; i++) { const q = projected(fn(end * i / 256)); if (q.depth >= -.001) { if (previous) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); previous = true; } else previous = false; } ctx.stroke();
      };
      if (p.nodes && !p.analysis.zero && !p.lobe) {
        p.analysis.latitudes.forEach(t => curve(a => xyz(t, a), '#f8fafcbb'));
        // Antipodal rectangle longitudes describe the same full great circle.
        const unique = p.analysis.longitudes.filter(a => a >= -Math.PI / 2 - 1e-10 && a < Math.PI / 2 - 1e-10);
        unique.forEach(a => curve(t => xyz(t, a), '#f8fafcbb'));
        if (p.harmonic.m) for (const t of [0, Math.PI]) { const q = projected(xyz(t, 0)); if (q.depth >= 0) dot(q.x, q.y, 2, '#fff'); }
      }
      if (p.lobe && p.nodes && (p.analysis.zero || p.analysis.latitudes.length > 0 || p.harmonic.m !== 0)) { const origin = projected([0, 0, 0]); dot(origin.x, origin.y, 2.5, '#f8fafc'); }
      if (p.axes) {
        const origin = projected([0, 0, 0]);
        [[1.3, 0, 0], [0, 1.3, 0], [0, 0, 1.3]].forEach((v, i) => { const q = projected(v); ctx.strokeStyle = ['#fbbf24', '#86efac', '#c4b5fd'][i]; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = ctx.strokeStyle; ctx.fillText(['x', 'y', 'z'][i], q.x + 8, q.y - 6); });
      }
      if (!p.lobe) for (const [t, name] of [[0, 'N · θ=0°'], [Math.PI, 'S · θ=180°']] as const) { const q = projected(xyz(t, 0)); ctx.fillStyle = '#e2e8f0'; ctx.fillText(name, q.x, q.y + (t ? 15 : -9)); }
      if (p.labels && !p.analysis.zero && p.analysis.boxes <= 100) {
        const ts = [0, ...p.analysis.latitudes, Math.PI], ps = [-Math.PI, ...p.analysis.longitudes, Math.PI], occupied: { x: number; y: number }[] = [];
        for (let j = 0; j < ts.length - 1; j++) for (let i = 0; i < ps.length - 1; i++) {
          const t = (ts[j] + ts[j + 1]) / 2, a = p.harmonic.m === 0 ? Math.atan2(r[6], r[7]) : (ps[i] + ps[i + 1]) / 2, value = evaluate(p.harmonic, t, a), v = xyz(t, a), radius = p.lobe && p.analysis.scale ? Math.abs(value) / p.analysis.scale : 1;
          const q = projected(v.map(x => x * radius));
          if (q.depth < .12 || occupied.some(b => Math.hypot(b.x - q.x, b.y - q.y) < 25)) continue;
          occupied.push(q); ctx.font = 'bold 15px system-ui'; ctx.lineWidth = 3; ctx.strokeStyle = '#020617'; ctx.strokeText(value > 0 ? '+' : '−', q.x, q.y); ctx.fillStyle = 'white'; ctx.fillText(value > 0 ? '+' : '−', q.x, q.y);
        }
      }
      if (p.point) {
        const v = xyz(p.theta, p.psi), f = evaluate(p.harmonic, p.theta, p.psi), radius = p.lobe && p.analysis.scale ? Math.abs(f) / p.analysis.scale : p.lobe ? 0 : 1, q = projected(v.map(x => x * radius));
        ctx.beginPath(); ctx.arc(q.x, q.y, 6, 0, 2 * Math.PI); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; if (q.depth < 0) ctx.setLineDash([2, 2]); else dot(q.x, q.y, 3, '#fef08a'); ctx.stroke(); ctx.setLineDash([]);
      }
    };
    const requestDraw = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    const upload = () => { const f = latest.current.field; gl.bindTexture(gl.TEXTURE_2D, texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, f.width, f.height, 0, gl.RED, gl.FLOAT, f.data); requestDraw(); };
    const reset = () => { yaw = -.65; pitch = .38; zoom = .76; requestDraw(); };
    api.current = { draw: requestDraw, upload, reset };
    const resize = () => { const box = c.getBoundingClientRect(); width = box.width; height = box.height; const dpr = Math.min(devicePixelRatio || 1, 2); c.width = Math.round(width * dpr); c.height = Math.round(height * dpr); o.width = c.width; o.height = c.height; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); requestDraw(); };
    const observer = new ResizeObserver(resize); observer.observe(c); resize(); upload();
    const pointers = new Map<number, { x: number; y: number }>(); let distance = 0, moved = false, multi = false;
    const down = (e: PointerEvent) => { c.setPointerCapture(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pointers.size === 1) { moved = false; multi = false; } else { multi = true; const [a, b] = Array.from(pointers.values()); distance = Math.hypot(a.x - b.x, a.y - b.y); } };
    let travel = 0;
    const move = (e: PointerEvent) => {
      const old = pointers.get(e.pointerId); if (!old) return;
      const dx = e.clientX - old.x, dy = e.clientY - old.y; pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); travel += Math.hypot(dx, dy); if (travel > 5) moved = true;
      if (pointers.size === 2) { const [a, b] = Array.from(pointers.values()), next = Math.hypot(a.x - b.x, a.y - b.y); if (distance > 0) zoom = Math.max(.42, Math.min(1.3, zoom * next / distance)); distance = next; }
      else { yaw += dx * .008; pitch = Math.max(-1.5, Math.min(1.5, pitch + dy * .008)); } requestDraw();
    };
    const up = (e: PointerEvent) => {
      if (!moved && !multi && !latest.current.lobe) {
        const box = c.getBoundingClientRect(), sx = (e.clientX - box.left - width / 2) / (zoom * height / 2), sy = -(e.clientY - box.top - height / 2) / (zoom * height / 2), d = 1 - sx * sx - sy * sy;
        if (d >= 0) { const r = rotation(), z = Math.sqrt(d), world = [r[0] * sx + r[3] * sy + r[6] * z, r[1] * sx + r[4] * sy + r[7] * z, r[2] * sx + r[5] * sy + r[8] * z], a = anglesFromXYZ(world[0], world[1], world[2], latest.current.psi); latest.current.select(a.theta, a.psi); }
      }
      pointers.delete(e.pointerId); travel = 0;
    };
    const cancel = (e: PointerEvent) => { pointers.delete(e.pointerId); moved = true; travel = 0; };
    const wheel = (e: WheelEvent) => { e.preventDefault(); zoom = Math.max(.42, Math.min(1.3, zoom * Math.exp(-e.deltaY * .001))); requestDraw(); };
    const keys = (e: KeyboardEvent) => { if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','=','0'].includes(e.key)) return; e.preventDefault(); if(e.key==='0')reset();else if(e.key==='ArrowLeft')yaw-=.12;else if(e.key==='ArrowRight')yaw+=.12;else if(e.key==='ArrowUp')pitch=Math.min(1.5,pitch+.12);else if(e.key==='ArrowDown')pitch=Math.max(-1.5,pitch-.12);else zoom=Math.max(.42,Math.min(1.3,zoom*(e.key==='-'?.9:1.1))); requestDraw(); };
    const lost = (e: Event) => { e.preventDefault(); setError('Graphics context interrupted. Reload the page to restore 3D; the angular map remains usable.'); };
    c.addEventListener('pointerdown', down); c.addEventListener('pointermove', move); c.addEventListener('pointerup', up); c.addEventListener('pointercancel', cancel); c.addEventListener('wheel', wheel, { passive: false }); c.addEventListener('keydown', keys); c.addEventListener('webglcontextlost',lost);
    return () => { api.current = undefined; observer.disconnect(); cancelAnimationFrame(frame); c.removeEventListener('pointerdown', down); c.removeEventListener('pointermove', move); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', cancel); c.removeEventListener('wheel', wheel); c.removeEventListener('keydown', keys); c.removeEventListener('webglcontextlost',lost); gl.deleteBuffer(vertex); gl.deleteBuffer(index); gl.deleteTexture(texture); gl.deleteVertexArray(vao); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); };
  }, []);
  useEffect(() => { api.current?.upload(); }, [props.field]);
  useEffect(() => { api.current?.draw(); });
  useEffect(() => { api.current?.reset(); }, [props.reset]);
  return <div><div className="relative h-[320px] overflow-hidden rounded-xl bg-[#060a12] sm:h-[370px]">
    <canvas ref={canvas} tabIndex={0} role="img" aria-label={props.lobe ? 'Rotatable 3D lobe model. Drag to rotate; pinch or wheel to zoom.' : 'Rotatable 3D unit sphere. Tap to select angles; drag to rotate; pinch or wheel to zoom.'} className="absolute inset-0 h-full w-full touch-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"/>
    <canvas ref={overlay} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full"/>
    {error && <p role="status" className="absolute inset-x-4 top-6 rounded bg-slate-950 p-4 text-xs text-amber-200">{error}</p>}
  </div><p className="mt-2 text-[10px] leading-4 text-slate-400">Drag to rotate · wheel / pinch to zoom · arrow keys rotate · + / − zoom · 0 resets. {props.lobe ? 'Pick angles on the unit sphere or map. Nodes collapse to the origin.' : 'Tap to select. A dashed yellow marker is on the far side.'}</p></div>;
}
