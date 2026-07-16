import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function ConfettiCelebration({ active, onClose }) {
  const canvasRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showCinematicText, setShowCinematicText] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowMessage(false);
      setShowCinematicText(false);
      return;
    }

    // Cinematic Intro Timeline
    setShowCinematicText(true);

    const textTimer = setTimeout(() => {
      setShowCinematicText(false);
    }, 1800);

    const popupTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2450);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let items = [];
    const maxItems = 70;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helper to draw hearts on canvas
    const drawHeart = (context, x, y, size, color) => {
      context.save();
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(x, y - size / 4);
      context.bezierCurveTo(x + size / 2, y - size / 2, x + size, y - size / 6, x + size, y + size / 4);
      context.bezierCurveTo(x + size, y + size * 0.7, x + size * 0.1, y + size * 1.05, x, y + size * 1.3);
      context.bezierCurveTo(x - size * 0.1, y + size * 1.05, x - size, y + size * 0.7, x - size, y + size / 4);
      context.bezierCurveTo(x - size, y - size / 6, x - size / 2, y - size / 2, x, y - size / 4);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to create rose petals, hearts, and confetti
    const createItem = (isInit = false) => {
      const types = ['petal', 'heart', 'confetti'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const size = type === 'petal' 
          ? 8 + Math.random() * 12 
          : type === 'heart'
            ? 6 + Math.random() * 10
            : 4 + Math.random() * 6;

      const colors = {
        petal: ['#fb6f92', '#ff8fab', '#ffb3c6', '#ff4d6d', '#ff758f'],
        heart: ['#ffccd5', '#ffafcc', '#ffc2d1', '#fb6f92', '#ff8fab'],
        confetti: ['#ffe5ec', '#ffccd5', '#ffafcc', '#ffc2d1', '#ffd166', '#f4a261']
      };

      const color = colors[type][Math.floor(Math.random() * colors[type].length)];

      return {
        x: Math.random() * window.innerWidth,
        y: isInit ? Math.random() * window.innerHeight : -20,
        size,
        type,
        color,
        opacity: 0.5 + Math.random() * 0.5,
        speedY: type === 'heart' 
          ? -(0.5 + Math.random() * 1.2) // Hearts float UP
          : 1.5 + Math.random() * 2.5,  // Petals and confetti fall DOWN
        speedX: (Math.random() - 0.5) * 1.5,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.05,
      };
    };

    // Populate explosion items (milder center burst)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      items.push({
        x: centerX,
        y: centerY,
        size: 7 + Math.random() * 9,
        type: Math.random() < 0.7 ? 'petal' : 'heart',
        color: Math.random() < 0.65 ? '#ff4d6d' : '#fb6f92',
        opacity: 0.9 + Math.random() * 0.1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.08,
        isExplosion: true,
        life: 0,
        maxLife: 45 + Math.random() * 25
      });
    }

    // Populate normal falling items
    for (let i = 0; i < maxItems; i++) {
      items.push(createItem(true));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      items.forEach((item, idx) => {
        if (item.isExplosion) {
          // Move explosion particles with friction and gravity
          item.x += item.speedX;
          item.y += item.speedY;
          item.speedX *= 0.96;
          item.speedY *= 0.96;
          item.speedY += 0.04;
          item.angle += item.spinSpeed;
          item.life++;

          // Fade out towards end of life
          if (item.life > item.maxLife) {
            item.opacity -= 0.05;
          }
        } else {
          // Move item
          item.y += item.speedY;
          item.x += item.speedX;
          item.angle += item.spinSpeed;

          // Boundaries checks
          if (item.type === 'heart') {
            // Hearts floating off the top
            if (item.y < -30) {
              items[idx] = createItem(false);
              items[idx].y = window.innerHeight + 30; // Start at bottom
            }
          } else {
            // Petals and confetti falling off the bottom
            if (item.y > window.innerHeight + 30) {
              items[idx] = createItem(false);
            }
          }
        }

        // Skip drawing if invisible
        if (item.opacity <= 0) return;

        if (item.x < -30 || item.x > canvas.width + 30) {
          item.x = Math.random() * canvas.width;
        }

        // Render item
        ctx.save();
        ctx.globalAlpha = item.opacity;
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);

        if (item.type === 'heart') {
          drawHeart(ctx, 0, 0, item.size, item.color);
        } else if (item.type === 'petal') {
          // Draw detailed curved leaf/petal shape
          ctx.fillStyle = item.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, item.size * 0.7, item.size, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Confetti: small rect or circles
          ctx.fillStyle = item.color;
          ctx.fillRect(-item.size / 2, -item.size / 2, item.size, item.size);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(textTimer);
      clearTimeout(popupTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center bg-black/40 backdrop-filter backdrop-blur-sm">
      {/* Love Flash Overlay */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-white z-[1000000] pointer-events-none"
      />

      {/* Canvas Particle Overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Milder Cinematic Text Overlay */}
      <AnimatePresence>
        {showCinematicText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="absolute z-20 text-center px-4 select-none pointer-events-none"
          >
            <h2 className="font-vibes text-5xl md:text-7xl text-white font-extrabold drop-shadow-[0_0_20px_rgba(251,111,146,0.9)] animate-pulse">
              I Love You More! ❤️
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Romantic Greeting Dialog Popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="glass-panel border-white/20 p-8 md:p-12 rounded-3xl text-center max-w-lg mx-4 shadow-2xl relative bg-white/80 z-20"
          >
            {/* Beating Heart Icon */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-rose-pink flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>

            {/* Cursive Romantic Heading */}
            <h2 className="font-vibes text-5xl md:text-7xl text-rose-pink font-bold drop-shadow-sm select-none leading-none">
              Happy Anniversary!
            </h2>
            
            <p className="font-dancing text-2xl text-gray-700 font-semibold mt-4 select-none">
              Here's to a lifetime of loving you ❤️
            </p>
            
            <p className="font-sans text-sm text-gray-500 mt-6 leading-relaxed select-none">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </p>

            {/* Dismiss trigger button */}
            <button
              onClick={onClose}
              data-hover="love"
              className="mt-8 bg-rose-pink hover:bg-[#fb557f] text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 w-full"
            >
              Close and Smile ❤️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
