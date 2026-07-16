import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 60;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates for parallax
    const handleMouseMove = (e) => {
      // Calculate normalized mouse positions (-0.5 to 0.5)
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Custom helper to draw hearts on canvas
    const drawHeart = (context, x, y, size) => {
      context.beginPath();
      context.moveTo(x, y - size / 4);
      // Top right curve
      context.bezierCurveTo(x + size / 2, y - size / 2, x + size, y - size / 6, x + size, y + size / 4);
      // Bottom point
      context.bezierCurveTo(x + size, y + size * 0.7, x + size * 0.1, y + size * 1.05, x, y + size * 1.3);
      // Bottom left point and curve
      context.bezierCurveTo(x - size * 0.1, y + size * 1.05, x - size, y + size * 0.7, x - size, y + size / 4);
      // Top left curve
      context.bezierCurveTo(x - size, y - size / 6, x - size / 2, y - size / 2, x, y - size / 4);
      context.closePath();
      context.fill();
    };

    // Helper to draw sparkles (4-pointed stars)
    const drawSparkle = (context, x, y, size) => {
      context.beginPath();
      context.moveTo(x, y - size);
      context.quadraticCurveTo(x, y, x + size, y);
      context.quadraticCurveTo(x, y, x, y + size);
      context.quadraticCurveTo(x, y, x - size, y);
      context.quadraticCurveTo(x, y, x, y - size);
      context.closePath();
      context.fill();
    };

    // Initialize particles
    const createParticle = (initY = false) => {
      const typeRand = Math.random();
      let type = 'heart';
      if (typeRand < 0.45) type = 'sparkle';
      else if (typeRand < 0.7) type = 'bokeh';

      const size = type === 'bokeh' 
        ? 15 + Math.random() * 25 
        : type === 'heart'
          ? 6 + Math.random() * 10 
          : 4 + Math.random() * 6;

      return {
        x: Math.random() * window.innerWidth,
        y: initY ? Math.random() * window.innerHeight : window.innerHeight + 20,
        size,
        type,
        opacity: type === 'bokeh' ? 0.05 + Math.random() * 0.08 : 0.2 + Math.random() * 0.45,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        // Depth factor (0.2 = background, 1.0 = foreground)
        depth: 0.2 + Math.random() * 0.8,
      };
    };

    // Populate initial state
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    // Main Draw Loop
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.forEach((p, idx) => {
        // Apply upward floating speed and drift
        p.y -= p.speedY * p.depth;
        p.x += p.speedX * p.depth;
        p.angle += p.spinSpeed;

        // Apply mouse parallax offset based on depth
        // The further away (smaller depth), the less it shifts
        const parallaxX = mouse.x * 60 * p.depth;
        const parallaxY = mouse.y * 60 * p.depth;

        // Wrap around borders
        if (p.y < -30) {
          particles[idx] = createParticle();
        }
        if (p.x < -30 || p.x > window.innerWidth + 30) {
          p.x = Math.random() * window.innerWidth;
        }

        // Draw particle based on its type
        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.type === 'heart') {
          ctx.fillStyle = '#ffc2d1';
          // Draw rotated heart
          ctx.translate(p.x + parallaxX, p.y + parallaxY);
          ctx.rotate(p.angle);
          drawHeart(ctx, 0, 0, p.size);
        } else if (p.type === 'sparkle') {
          ctx.fillStyle = '#ffffff';
          // Twinkle effect (sine wave modulation)
          const currentOpacity = p.opacity * (0.3 + 0.7 * Math.abs(Math.sin(Date.now() * p.twinkleSpeed)));
          ctx.globalAlpha = Math.max(0.1, Math.min(1, currentOpacity));
          drawSparkle(ctx, p.x + parallaxX, p.y + parallaxY, p.size);
        } else if (p.type === 'bokeh') {
          // Soft glowing circle
          const grad = ctx.createRadialGradient(
            p.x + parallaxX, p.y + parallaxY, 0, 
            p.x + parallaxX, p.y + parallaxY, p.size
          );
          grad.addColorStop(0, 'rgba(255, 175, 204, 0.4)');
          grad.addColorStop(1, 'rgba(255, 175, 204, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x + parallaxX, p.y + parallaxY, p.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] select-none overflow-hidden">
      {/* Shifting Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#ffe5ec] via-[#ffccd5] to-[#ffe5ec] opacity-60 mix-blend-multiply"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientMove 15s ease infinite',
        }}
      />
      
      {/* Canvas Element */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
}
