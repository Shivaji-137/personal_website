import { useEffect, useRef } from 'react';

interface BgStar {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
}

interface StreamParticle {
  t: number;
  speed: number;
  offset: number;
  size: number;
}

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    let stars: BgStar[] = [];
    let streamParticles: StreamParticle[] = [];

    let isHovering = false;
    let phase = 0.15;
    let targetPhase = 0.15;
    let inclination = 76;
    let targetInclination = 76;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let smoothPointerX = 0.5;
    let smoothPointerY = 0.5;
    let lastPointerMove = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const starCount = Math.min(320, Math.max(150, Math.floor((width * height) / 6000)));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 0.85 + 0.15, // Depth factor for parallax
        radius: Math.random() * 1.35 + 0.25,
        baseAlpha: Math.random() * 0.55 + 0.15,
        twinkleSpeed: Math.random() * 2.2 + 0.6,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.75 ? 35 : Math.random() > 0.4 ? 215 : 200,
      }));

      streamParticles = Array.from({ length: 38 }, () => ({
        t: Math.random(),
        speed: Math.random() * 0.35 + 0.25,
        offset: (Math.random() - 0.5) * 14,
        size: Math.random() * 1.8 + 0.6,
      }));
    };

    window.addEventListener('resize', resize);
    resize();

    let lastFrame = performance.now();

    const handlePointerMove = (event: PointerEvent) => {
      isHovering = true;
      lastPointerMove = performance.now();
      pointerX = event.clientX / Math.max(width, 1);
      pointerY = event.clientY / Math.max(height, 1);
      targetPhase = (pointerX + 1) % 1;
      targetInclination = 22 + pointerY * 68; // 22° to 90°
    };

    const handlePointerLeave = () => {
      isHovering = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);

    const drawGlow = (x: number, y: number, radius: number, colorStart: string, colorMid?: string) => {
      if (radius <= 0) return;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, colorStart);
      if (colorMid) gradient.addColorStop(0.45, colorMid);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const drawCelestialStar = (
      x: number,
      y: number,
      radius: number,
      coreColor: string,
      haloColor: string,
      glowColor: string,
      time: number
    ) => {
      const pulse = 1 + Math.sin(time * 3.2) * 0.035;
      const r = radius * pulse;

      // Outer atmospheric corona
      drawGlow(x, y, r * 4.2, glowColor, 'rgba(0, 0, 0, 0)');

      // Diffraction spikes
      ctx.save();
      ctx.translate(x, y);
      const spikeLen = r * 3.8;
      const spikeGradH = ctx.createLinearGradient(-spikeLen, 0, spikeLen, 0);
      spikeGradH.addColorStop(0, 'rgba(255, 255, 255, 0)');
      spikeGradH.addColorStop(0.5, haloColor);
      spikeGradH.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = spikeGradH;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-spikeLen, 0);
      ctx.lineTo(spikeLen, 0);
      ctx.stroke();

      const spikeGradV = ctx.createLinearGradient(0, -spikeLen, 0, spikeLen);
      spikeGradV.addColorStop(0, 'rgba(255, 255, 255, 0)');
      spikeGradV.addColorStop(0.5, haloColor);
      spikeGradV.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = spikeGradV;
      ctx.beginPath();
      ctx.moveTo(0, -spikeLen);
      ctx.lineTo(0, spikeLen);
      ctx.stroke();
      ctx.restore();

      // Shimmering limb-darkened photosphere
      const bodyGrad = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.08, x, y, r);
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.45, coreColor);
      bodyGrad.addColorStop(0.88, haloColor);
      bodyGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
    };

    const getFlux = (value: number, currentInclination: number) => {
      const eclipseStrength = Math.max(0, Math.min(1, (currentInclination - 32) / 58));
      // Ellipsoidal tidal variation
      const tidal = Math.cos(value * Math.PI * 4) * 0.018 * eclipseStrength;
      // The moving companion crosses the fixed star at phases 0.25 and 0.75.
      const primary = Math.exp(-Math.pow((value - 0.25) / 0.068, 2)) * 0.39 * eclipseStrength;
      const distanceToSecondaryEclipse = Math.min(Math.abs(value - 0.75), 1 - Math.abs(value - 0.75));
      const secondary = Math.exp(-Math.pow(distanceToSecondaryEclipse / 0.042, 2)) * 0.18 * eclipseStrength;
      return 0.9 + tidal - primary - secondary;
    };

    const drawCurve = (
      x: number,
      y: number,
      plotWidth: number,
      plotHeight: number,
      currentInclination: number
    ) => {
      const left = x + 36;
      const top = y + 34;
      const w = plotWidth - 54;
      const h = plotHeight - 62;

      // HUD Backdrop
      ctx.fillStyle = 'rgba(7, 10, 19, 0.76)';
      ctx.fillRect(x, y, plotWidth, plotHeight);
      ctx.strokeStyle = 'rgba(153, 182, 216, 0.14)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, plotWidth, plotHeight);

      // Corner HUD brackets
      const bLen = 8;
      ctx.strokeStyle = 'rgba(231, 184, 120, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y + bLen); ctx.lineTo(x, y); ctx.lineTo(x + bLen, y);
      ctx.moveTo(x + plotWidth - bLen, y); ctx.lineTo(x + plotWidth, y); ctx.lineTo(x + plotWidth, y + bLen);
      ctx.moveTo(x, y + plotHeight - bLen); ctx.lineTo(x, y + plotHeight); ctx.lineTo(x + bLen, y + plotHeight);
      ctx.moveTo(x + plotWidth - bLen, y + plotHeight); ctx.lineTo(x + plotWidth, y + plotHeight); ctx.lineTo(x + plotWidth, y + plotHeight - bLen);
      ctx.stroke();

      // Header Telemetry
      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(213, 225, 240, 0.78)';
      ctx.fillText('RELATIVE FLUX // LC-01', x + 14, y + 18);

      const currentFlux = getFlux(phase, currentInclination);
      ctx.fillStyle = 'rgba(231, 184, 120, 0.85)';
      ctx.fillText(`F = ${currentFlux.toFixed(2)}`, left + w - 115, y + 18);
      ctx.fillStyle = 'rgba(213, 225, 240, 0.48)';
      ctx.fillText(`i = ${Math.round(currentInclination)}°`, left + w - 42, y + 18);

      // Grid lines
      for (let grid = 0; grid <= 4; grid += 1) {
        const gridY = top + (h * grid) / 4;
        ctx.beginPath();
        ctx.moveTo(left, gridY);
        ctx.lineTo(left + w, gridY);
        ctx.strokeStyle = 'rgba(153, 182, 216, 0.09)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const mapY = (f: number) => top + (1 - (f - 0.42) / 0.56) * h;

      // Area fill under light curve
      ctx.beginPath();
      for (let index = 0; index <= 160; index += 1) {
        const pointPhase = index / 160;
        const pointX = left + pointPhase * w;
        const pointY = mapY(getFlux(pointPhase, currentInclination));
        if (index === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.lineTo(left + w, top + h);
      ctx.lineTo(left, top + h);
      ctx.closePath();
      const areaGrad = ctx.createLinearGradient(0, top, 0, top + h);
      areaGrad.addColorStop(0, 'rgba(231, 184, 120, 0.22)');
      areaGrad.addColorStop(1, 'rgba(231, 184, 120, 0.0)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Light Curve Stroke
      ctx.beginPath();
      for (let index = 0; index <= 160; index += 1) {
        const pointPhase = index / 160;
        const pointX = left + pointPhase * w;
        const pointY = mapY(getFlux(pointPhase, currentInclination));
        if (index === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.strokeStyle = '#e7b878';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(231, 184, 120, 0.55)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Active Phase Cursor
      const cursorX = left + phase * w;
      const cursorY = mapY(currentFlux);

      ctx.beginPath();
      ctx.moveTo(cursorX, top);
      ctx.lineTo(cursorX, top + h);
      ctx.strokeStyle = 'rgba(238, 241, 247, 0.45)';
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      drawGlow(cursorX, cursorY, 12, 'rgba(244, 212, 158, 0.45)');
      ctx.fillStyle = '#fff5e4';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Footer Phase Label
      ctx.fillStyle = 'rgba(153, 182, 216, 0.4)';
      ctx.fillText(`PHASE φ = ${phase.toFixed(3)}`, left, top + h + 18);
    };

    const draw = () => {
      const now = performance.now();
      const time = now / 1000;
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (isHovering) {
        const pointerIsMoving = now - lastPointerMove < 220;
        if (pointerIsMoving) {
          const phaseDifference = ((targetPhase - phase + 1.5) % 1) - 0.5;
          phase = (phase + phaseDifference * Math.min(delta * 5.5, 1) + 1) % 1;
        } else if (!reduceMotion.matches) {
          phase = (phase + delta * 0.055 + 1) % 1;
        }
        inclination += (targetInclination - inclination) * Math.min(delta * 8, 1);
        smoothPointerX += (pointerX - smoothPointerX) * Math.min(delta * 4, 1);
        smoothPointerY += (pointerY - smoothPointerY) * Math.min(delta * 4, 1);
      } else if (!reduceMotion.matches) {
        phase = (phase + delta * 0.06) % 1;
        smoothPointerX += (0.5 - smoothPointerX) * Math.min(delta * 2, 1);
        smoothPointerY += (0.5 - smoothPointerY) * Math.min(delta * 2, 1);
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Cosmic Backdrop
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#04060b');
      background.addColorStop(0.5, '#090d18');
      background.addColorStop(1, '#110d17');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // Ambient drifting nebula clouds
      const nebDriftX = Math.sin(time * 0.12) * 30;
      const nebDriftY = Math.cos(time * 0.1) * 20;
      drawGlow(width * 0.28 + nebDriftX, height * 0.42 + nebDriftY, Math.max(width, height) * 0.45, 'rgba(38, 73, 122, 0.11)');
      drawGlow(width * 0.72 - nebDriftX, height * 0.6 - nebDriftY, Math.max(width, height) * 0.38, 'rgba(112, 48, 78, 0.08)');

      // Twinkling Parallax Starfield
      const parallaxX = (smoothPointerX - 0.5) * 28;
      const parallaxY = (smoothPointerY - 0.5) * 28;

      stars.forEach((star) => {
        const sx = (star.x * width + parallaxX * star.z + width) % width;
        const sy = (star.y * height + parallaxY * star.z + height) % height;
        const twinkle = reduceMotion.matches
          ? 1
          : 0.65 + 0.35 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(sx, sy, star.radius * star.z, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 55%, 85%, ${alpha})`;
        ctx.fill();
      });

      // Binary System Scene Layout
      const compact = width < 720;
      const scene = compact
        ? { x: width * 0.08, y: height * 0.06, width: width * 0.84, height: height * 0.5 }
        : { x: width * 0.06, y: height * 0.14, width: width * 0.54, height: height * 0.72 };

      const centerX = scene.x + scene.width * 0.5;
      const centerY = scene.y + scene.height * 0.5;
      const orbitX = scene.width * (compact ? 0.24 : 0.26);
      const cosInc = Math.cos((inclination * Math.PI) / 180);
      const orbitY = orbitX * cosInc * 0.75;

      const angle = phase * Math.PI * 2;
      // Depth (Z): sin(angle) > 0 means the smaller star is closer to the observer
      const secondaryZ = Math.sin(angle);

      // Keep the large star fixed while the smaller companion orbits it.
      const secondaryOrbitX = orbitX * 1.08;
      const secondaryOrbitY = orbitY * 1.08;

      const primary = {
        x: centerX,
        y: centerY,
        z: 0,
        baseRadius: Math.max(22, scene.width * 0.072),
      };

      const secondary = {
        x: centerX + Math.cos(angle) * secondaryOrbitX,
        y: centerY - Math.sin(angle) * secondaryOrbitY,
        z: secondaryZ,
        baseRadius: Math.max(7, scene.width * 0.022),
      };

      // Central System Glow & Barycenter Crosshair
      drawGlow(centerX, centerY, scene.width * 0.46, 'rgba(49, 93, 143, 0.12)');
      ctx.strokeStyle = 'rgba(157, 188, 218, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 5, centerY); ctx.lineTo(centerX + 5, centerY);
      ctx.moveTo(centerX, centerY - 5); ctx.lineTo(centerX, centerY + 5);
      ctx.stroke();

      // Dashed Orbital Paths
      ctx.strokeStyle = 'rgba(221, 140, 115, 0.15)';
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, secondaryOrbitX, Math.abs(secondaryOrbitY), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sweeping Orbital Motion Trails
      const drawTrail = (ox: number, oy: number, startAngle: number, color: string) => {
        const segments = 24;
        const trailSpan = 0.85;
        for (let i = 0; i < segments; i++) {
          const a1 = startAngle - (i / segments) * trailSpan;
          const a2 = startAngle - ((i + 1) / segments) * trailSpan;
          const alpha = (1 - i / segments) * 0.38;
          ctx.beginPath();
          ctx.moveTo(centerX + Math.cos(a1) * ox, centerY - Math.sin(a1) * oy);
          ctx.lineTo(centerX + Math.cos(a2) * ox, centerY - Math.sin(a2) * oy);
          ctx.strokeStyle = color.replace('ALPHA', alpha.toFixed(3));
          ctx.lineWidth = (1 - i / segments) * 2.5;
          ctx.stroke();
        }
      };

      drawTrail(secondaryOrbitX, secondaryOrbitY, angle, 'rgba(232, 135, 114, ALPHA)');

      // Accretion / Mass-Transfer Plasma Stream (Secondary -> Primary)
      const ctrlX = centerX + Math.sin(angle) * orbitX * 0.28;
      const ctrlY = centerY + Math.cos(angle) * orbitY * 0.28 - scene.height * 0.04;

      const streamGrad = ctx.createLinearGradient(secondary.x, secondary.y, primary.x, primary.y);
      streamGrad.addColorStop(0, 'rgba(232, 135, 114, 0.28)');
      streamGrad.addColorStop(0.5, 'rgba(245, 175, 118, 0.18)');
      streamGrad.addColorStop(1, 'rgba(247, 201, 120, 0.35)');

      ctx.beginPath();
      ctx.moveTo(secondary.x, secondary.y);
      ctx.quadraticCurveTo(ctrlX, ctrlY, primary.x, primary.y);
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = Math.max(1.2, scene.width * 0.0045);
      ctx.stroke();

      // Flowing Plasma Particles along Bézier Stream
      streamParticles.forEach((p) => {
        if (!reduceMotion.matches) {
          p.t = (p.t + delta * p.speed) % 1;
        }
        const t = p.t;
        const invT = 1 - t;
        const bx = invT * invT * secondary.x + 2 * invT * t * ctrlX + t * t * primary.x;
        const by = invT * invT * secondary.y + 2 * invT * t * ctrlY + t * t * primary.y;
        const spread = Math.sin(t * Math.PI) * p.offset;

        const px = bx + spread * 0.5;
        const py = by + spread * 0.5;
        const pAlpha = Math.sin(t * Math.PI) * 0.75;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 214, 153, ${pAlpha})`;
        ctx.fill();
      });

      // Depth-Sort Stars for Realistic Eclipse Occlusion
      const renderPrimary = () => {
        const depthScale = 1 + primary.z * 0.08;
        drawCelestialStar(
          primary.x,
          primary.y,
          primary.baseRadius * depthScale,
          '#fff0d4',
          '#f7c978',
          'rgba(246, 187, 102, 0.24)',
          time
        );
      };

      const renderSecondary = () => {
        const depthScale = 1 + secondary.z * 0.08;
        drawCelestialStar(
          secondary.x,
          secondary.y,
          secondary.baseRadius * depthScale,
          '#ffe0d6',
          '#e88772',
          'rgba(221, 119, 100, 0.2)',
          time + 1.5
        );
      };

      if (primary.z < secondary.z) {
        renderPrimary();
        renderSecondary();
      } else {
        renderSecondary();
        renderPrimary();
      }

      // Render Light Curve Telemetry Panel
      const plot = compact
        ? { x: width * 0.08, y: height * 0.61, width: width * 0.84, height: height * 0.29 }
        : { x: width * 0.65, y: height * 0.27, width: width * 0.29, height: height * 0.36 };
      drawCurve(plot.x, plot.y, plot.width, plot.height, inclination);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default CosmicBackground;