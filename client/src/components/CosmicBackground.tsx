import { useEffect, useRef, useState } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<{ x: number; y: number; size: number }[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 300 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
      }));
    }

    const blackHoles = [
      { x: width * 0.4, y: height * 0.5, radius: 60 },
      { x: width * 0.6, y: height * 0.5, radius: 60 },
    ];

    const particles = Array.from({ length: 200 }).map((_, i) => {
      const bhIndex = i % 2;
      const angle = Math.random() * Math.PI * 2;
      const radius = 80 + Math.random() * 120;
      return {
        bh: bhIndex,
        angle,
        radius,
        colorOffset: Math.random(),
        shrunk: false,
      };
    });

    let t = 0;
    let rippleEmitted = false;
    let rippleRadius = 0;
    let rippleOpacity = 1;
    let zoom = 1;

    const draw = () => {
      const merging = t > 500;
      const centerX = width / 2;
      const centerY = height / 2;

      if (merging && !rippleEmitted) {
        rippleEmitted = true;
        rippleRadius = 0;
        rippleOpacity = 1;
        setShowText(true);
        setTimeout(() => setShowText(false), 1000);
      }

      // Apply zoom effect
      if (merging && zoom < 1.15) zoom += 0.0008;

      ctx.save();
      ctx.setTransform(zoom, 0, 0, zoom, width / 2 * (1 - zoom), height / 2 * (1 - zoom));

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'white';
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!merging) {
        blackHoles[0].x = centerX + Math.cos(t / 100) * (200 - t * 0.3);
        blackHoles[0].y = centerY + Math.sin(t / 100) * (200 - t * 0.3);
        blackHoles[1].x = centerX + Math.cos(t / 100 + Math.PI) * (200 - t * 0.3);
        blackHoles[1].y = centerY + Math.sin(t / 100 + Math.PI) * (200 - t * 0.3);
      }

      if (rippleEmitted && rippleOpacity > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rippleOpacity})`;
        ctx.lineWidth = Math.max(0.5, 4 * rippleOpacity);
        ctx.stroke();
        rippleRadius += 6;
        rippleOpacity -= 0.007;
      }

      if (!merging) {
        blackHoles.forEach((bh) => {
          ctx.beginPath();
          ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#000';
          ctx.shadowColor = '#ff6600';
          ctx.shadowBlur = 30;
          ctx.fill();
        });
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 40;
        ctx.fill();

        // Lensing ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 10;
        ctx.stroke();
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p) => {
        const bh = merging ? { x: centerX, y: centerY } : blackHoles[p.bh];
        p.angle += 0.015;
        if (merging && !p.shrunk) {
          p.radius *= 0.9;
          p.shrunk = true;
        }

        const px = bh.x + Math.cos(p.angle) * p.radius;
        const py = bh.y + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        const red = Math.floor(200 + 55 * Math.sin(p.angle + p.colorOffset));
        const green = Math.floor(100 + 100 * Math.cos(p.angle + p.colorOffset));
        ctx.fillStyle = `rgba(${red}, ${green}, 60, 0.5)`;
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();

      t++;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      {showText && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold drop-shadow-lg z-10">

        </div>
      )}
    </>
  );
};

export default CosmicBackground;
