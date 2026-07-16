import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoveGate({ onAccept }) {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const handleNoClick = () => {
    setClickCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.65);
    setNoScale((prev) => Math.max(0.4, prev - 0.08));

    // After 2 clicks, start randomly moving the "g." button around to make it playful
    if (clickCount >= 1) {
      const randomX = (Math.random() - 0.5) * 240;
      const randomY = (Math.random() - 0.5) * 240;
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onAccept();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-gradient-to-br from-[#ffe5ec] via-[#ffccd5] to-[#ffafcc] overflow-hidden select-none">
      {/* Decorative Floating Hearts in Background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0.15,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: 0.5 + Math.random() * 0.8
          }}
          animate={{
            y: -100,
            x: `calc(${Math.random() * 100}vw)`,
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute text-rose-pink/20 text-3xl pointer-events-none"
        >
          ❤️
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            className="glass-panel border-white/40 p-8 md:p-12 rounded-3xl text-center max-w-md w-[90%] shadow-2xl relative bg-white/70 flex flex-col items-center justify-center z-10"
          >
            {/* Pulsing Header Icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-rose-pink flex items-center justify-center text-white shadow-md mb-6"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>

            {/* Question Text */}
            <h2 className="font-dancing text-4xl md:text-5xl text-rose-pink font-bold drop-shadow-sm mb-10 select-none leading-normal">
              Kamu sayang ga sama akuuu? 🥺
            </h2>

            {/* Interactive Decision Buttons */}
            <div className="relative flex flex-col items-center justify-center gap-6 w-full min-h-[160px]">
              {/* YES Button */}
              <motion.button
                onClick={handleYesClick}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  scale: yesScale,
                  boxShadow: yesScale > 1.5 ? `0 0 ${yesScale * 8}px rgba(251,111,146,0.6)` : "0 4px 6px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="bg-rose-pink hover:bg-[#fb557f] text-white font-extrabold py-3 px-8 rounded-full z-20 transition-colors duration-300 select-none active:scale-95 text-base md:text-lg flex items-center justify-center gap-2"
              >
                <span>Iyaa Sayangg ❤️</span>
              </motion.button>

              {/* NO Button */}
              {yesScale < 5 && (
                <motion.button
                  onClick={handleNoClick}
                  animate={{
                    scale: noScale,
                    x: noButtonPosition.x,
                    y: noButtonPosition.y
                  }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-full text-sm select-none active:scale-90 z-10"
                >
                  g. 😢
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-6 z-30"
          >
            {/* Huge exploding and spinning heart */}
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1.1, 1.3, 1],
                rotate: [0, 15, -15, 360, 360]
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-8xl md:text-9xl mb-8 filter drop-shadow-lg"
            >
              😘
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-vibes text-5xl md:text-7xl text-rose-pink font-bold drop-shadow-[0_2px_10px_rgba(251,111,146,0.3)] select-none"
            >
              Wopyuuu tooo bebeee! ❤️
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
