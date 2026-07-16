import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import ConfettiCelebration from '../components/ConfettiCelebration';

export default function SurpriseSection() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (!showBurst) return;

    const timeout = setTimeout(() => {
      setShowBurst(false);
      setShowSurprise(true);
    }, 650);

    return () => clearTimeout(timeout);
  }, [showBurst]);

  const handleSurpriseClick = () => {
    setShowBurst(true);
  };

  const handleCloseSurprise = () => {
    setShowSurprise(false);
    setShowBurst(false);
  };

  return (
    <section className="relative py-24 z-10 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-pink/15 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphic card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="glass-panel border-rose-pink/25 rounded-3xl p-8 md:p-14 shadow-xl max-w-xl mx-auto bg-white/50 relative overflow-hidden group glow-card"
      >
        {/* Floating background elements */}
        <Heart className="absolute -top-6 -left-6 w-16 h-16 text-rose-pink/5 fill-current pointer-events-none transition-transform duration-700 group-hover:scale-110" />
        <Gift className="absolute -bottom-6 -right-6 w-20 h-20 text-rose-pink/5 pointer-events-none transition-transform duration-700 group-hover:rotate-12" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="font-dancing text-2xl text-rose-pink font-semibold mb-2">A Little Mystery</span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            I Have a Little Secret...
          </h2>
          <p className="font-sans text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
            Coba klik buletan nii bee, adaa rahasiaa nii buatt kamuu 😘 Hadiahnya bunganyaa nantii yaa hehe ..
          </p>

          {/* Large Heart-Pulsing Click Me Button */}
          <motion.button
            onClick={handleSurpriseClick}
            animate={showBurst ? {
              scale: [1, 0.9, 1.3, 1.2],
              rotate: [0, -15, 375, 360],
              backgroundColor: "#fb6f92"
            } : {}}
            whileHover={showBurst || showSurprise ? {} : { scale: 1.08 }}
            whileTap={showBurst || showSurprise ? {} : { scale: 0.95 }}
            data-hover="love"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-rose-pink hover:bg-[#fb557f] text-white flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-rose-pink/30 relative select-none overflow-hidden"
            disabled={showBurst || showSurprise}
          >
            {!showBurst ? (
              <motion.div 
                key="click-me-content"
                className="flex flex-col items-center justify-center gap-1.5"
              >
                {/* Pulsing rings */}
                <div className="absolute inset-0 border border-white/30 rounded-full animate-ping opacity-60 scale-105 pointer-events-none" />
                
                <Gift className="w-8 h-8 animate-bounce fill-current/10" />
                <span className="font-sans text-sm font-extrabold uppercase tracking-widest">
                  Click Me
                </span>
                <span className="text-sm">❤️</span>
              </motion.div>
            ) : (
              <motion.div
                key="gift-box"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1.4 }}
                transition={{ duration: 0.3 }}
                className="text-4xl select-none"
              >
                🎁
              </motion.div>
            )}
          </motion.button>

          <AnimatePresence>
            {showBurst && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {[...Array(16)].map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      x: [0, (index % 4 - 1.5) * 90, (index % 4 - 1.5) * 120],
                      y: [0, -120 - (Math.floor(index / 4) * 45), -220 - (Math.floor(index / 4) * 45)],
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute text-2xl md:text-3xl"
                  >
                    💖
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Confetti celebration modal overlay */}
      {/* We reuse ConfettiCelebration; the customized texts are embedded directly inside, or we can use custom overrides if needed */}
      <ConfettiCelebration active={showSurprise} onClose={handleCloseSurprise} />
    </section>
  );
}
