import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicTransition({ active, onComplete }) {
  const canvasRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [textExit, setTextExit] = useState(false);
  const [fadeOutBG, setFadeOutBG] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Timeline steps
    // 1. Text reveals after 1.2s
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1200);

    // 2. Text starts fading out at 4.2s
    const textExitTimer = setTimeout(() => {
      setTextExit(true);
    }, 4200);

    // 3. Whole background starts fading out at 5.0s
    const bgExitTimer = setTimeout(() => {
      setFadeOutBG(true);
    }, 5000);

    // 4. Complete transition at 5.6s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5600);

    // Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let explosionParticles = [];
    let fallingPetals = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pre-render rose emoji on an offscreen canvas for high performance
    const offscreenRose = document.createElement('canvas');
    offscreenRose.width = 64;
    offscreenRose.height = 64;
    const oCtxRose = offscreenRose.getContext('2d');
    oCtxRose.font = '48px serif';
    oCtxRose.textAlign = 'center';
    oCtxRose.textBaseline = 'middle';
    oCtxRose.fillText('🌹', 32, 32);

    // Pre-render heart emoji
    const offscreenHeart = document.createElement('canvas');
    offscreenHeart.width = 64;
    offscreenHeart.height = 64;
    const oCtxHeart = offscreenHeart.getContext('2d');
    oCtxHeart.font = '48px serif';
    oCtxHeart.textAlign = 'center';
    oCtxHeart.textBaseline = 'middle';
    oCtxHeart.fillText('❤️', 32, 32);

    // 1. Initialize 300+ Exploding 3D Roses
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const numRoses = 320;

    for (let i = 0; i < numRoses; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      // Speed distribution: some fast, some slow
      const speed = 2 + Math.random() * 12;

      // 3D velocity vectors
      const vx = Math.sin(phi) * Math.cos(theta) * speed;
      const vy = Math.sin(phi) * Math.sin(theta) * speed;
      // Negative vz means coming towards the screen/camera
      const vz = Math.cos(phi) * speed - 1.5; // push forward bias

      explosionParticles.push({
        x: 0,
        y: 0,
        z: 320, // Start depth in 3D
        vx,
        vy,
        vz,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.08,
        type: Math.random() < 0.85 ? 'rose' : 'heart',
        size: 16 + Math.random() * 16,
        opacity: 0.9 + Math.random() * 0.1,
        life: 0,
        maxLife: 120 + Math.random() * 80
      });
    }

    // 2. Helper to create continuous falling petals
    const createFallingPetal = (initY = false) => {
      const colors = ['#ff4d6d', '#ff758f', '#ff8fab', '#fb6f92', '#c9184a'];
      return {
        x: Math.random() * window.innerWidth,
        y: initY ? Math.random() * window.innerHeight : -20,
        size: 8 + Math.random() * 12,
        speedY: 1.5 + Math.random() * 2.0,
        speedX: (Math.random() - 0.5) * 1.5,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.6 + Math.random() * 0.4,
        swingRange: 1 + Math.random() * 2,
        swingSpeed: 0.02 + Math.random() * 0.03,
        swingOffset: Math.random() * 10
      };
    };

    // Populate initial falling petals
    for (let i = 0; i < 80; i++) {
      fallingPetals.push(createFallingPetal(true));
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw and update Exploding Particles
      explosionParticles.forEach((p, idx) => {
        // Move particle in 3D space
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.angle += p.spinSpeed;
        p.life++;

        // Apply friction and gravity
        p.vx *= 0.97;
        p.vy *= 0.97;
        // Gravity pulls them down slightly over time
        p.vy += 0.04;

        // Projection
        const perspective = 300;
        
        // Skip drawing if particle has passed behind the camera
        if (p.z <= 15) return;

        const scale = perspective / p.z;
        const screenX = centerX + p.x * scale;
        const screenY = centerY + p.y * scale;
        const currentSize = p.size * scale;

        // Check if out of bounds or dead
        const isDead = p.life > p.maxLife || screenX < -100 || screenX > canvas.width + 100 || screenY < -100 || screenY > canvas.height + 100;
        
        if (!isDead) {
          ctx.save();
          // Fade out particle as it ages or approaches camera boundary
          let finalOpacity = p.opacity;
          if (p.life > p.maxLife * 0.7) {
            finalOpacity *= (1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
          }
          // Also fade out if it gets extremely close to screen to avoid giant blocky emojis
          if (p.z < 80) {
            finalOpacity *= (p.z - 15) / 65;
          }

          ctx.globalAlpha = Math.max(0, Math.min(1, finalOpacity));
          ctx.translate(screenX, screenY);
          ctx.rotate(p.angle);
          
          const img = p.type === 'rose' ? offscreenRose : offscreenHeart;
          ctx.drawImage(img, -currentSize / 2, -currentSize / 2, currentSize, currentSize);
          ctx.restore();
        }
      });

      // Spawn new falling petals to maintain density
      if (fallingPetals.length < 150) {
        fallingPetals.push(createFallingPetal(false));
      }

      // Draw and update Falling Petals
      fallingPetals.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * p.swingSpeed + p.swingOffset) * 0.4;
        p.angle += p.spinSpeed;

        // Wrap around bottom
        if (p.y > canvas.height + 20) {
          fallingPetals[idx] = createFallingPetal(false);
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          
          // Draw detailed petal ellipse
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
          
          // Add a subtle darker pink vein to the petal
          ctx.strokeStyle = 'rgba(0,0,0,0.06)';
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.2, 0, 0, p.size);
          ctx.stroke();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearTimeout(textTimer);
      clearTimeout(textExitTimer);
      clearTimeout(bgExitTimer);
      clearTimeout(completeTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active]);

  if (!active) return null;

  // Splitting text for staggered cinematic reveal
  const sentence = "For My Favorite Person ❤️";
  const words = sentence.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 90,
      },
    },
  };

  return (
    <div 
      className={`fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-[600ms] ease-out ${
        fadeOutBG ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #2d0714 0%, #140207 70%, #080002 100%)'
      }}
    >
      {/* 3D Flower Explosion & Petals Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Love Flash Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="absolute inset-0 bg-white z-[1000000] pointer-events-none"
      />

      {/* Cinematic Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 text-center select-none">
        <AnimatePresence>
          {showText && !textExit && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                filter: "blur(12px)", 
                transition: { duration: 0.6, ease: "easeInOut" } 
              }}
              className="flex flex-col items-center justify-center"
            >
              {/* Backglow element behind text */}
              <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] bg-rose-pink/25 rounded-full blur-[80px] -z-10 animate-pulse pointer-events-none" />

              <h1 className="font-vibes text-6xl md:text-8xl lg:text-9xl text-white font-extrabold tracking-wide leading-tight drop-shadow-[0_0_35px_rgba(251,111,146,0.95)] flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                {words.map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
