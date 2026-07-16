import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Envelope({ onOpen }) {
  const [loading, setLoading] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showLetterButton, setShowLetterButton] = useState(false);

  useEffect(() => {
    // Simulated loading time to build anticipation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const [isClicked, setIsClicked] = useState(false);

  // Delay showing the letter click button until the envelope sliding animation finishes
  useEffect(() => {
    if (envelopeOpened) {
      const timer = setTimeout(() => {
        setShowLetterButton(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [envelopeOpened]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-[#ffe5ec] via-[#ffccd5] to-[#ffafcc] overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {loading ? (
          /* Loading Screen */
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                filter: ['drop-shadow(0 0 5px rgba(251,111,146,0.3))', 'drop-shadow(0 0 25px rgba(251,111,146,0.7))', 'drop-shadow(0 0 5px rgba(251,111,146,0.3))']
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="mb-8"
            >
              <Heart className="w-24 h-24 text-rose-pink fill-rose-pink" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-dancing text-3xl md:text-5xl text-rose-pink font-bold"
            >
              Tunggu sebentar yaaa Bebee, jangann keluar duluu
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-1 bg-rose-pink/40 rounded-full mt-6"
            />
          </motion.div>
        ) : (
          /* Interactive Envelope Screen */
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -200, scale: 0.9 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center p-4 w-full max-w-lg"
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-rose-pink font-bold text-center mb-8 drop-shadow-sm select-none">
              Surat Spesial Untuk Cantiknyaa Akuuu
            </h2>

            {/* 3D Envelope */}
            <div className="envelope-wrapper my-6 cursor-pointer" onClick={() => setEnvelopeOpened(true)}>
              <div className={`envelope ${envelopeOpened ? 'open' : ''}`}>
                
                {/* Back flap */}
                <div className="back" />
                
                {/* The Letter inside */}
                <div className="letter flex flex-col items-center justify-between border border-pink-100">
                  <div className="text-center w-full mt-4">
                    <p className="font-vibes text-3xl md:text-4xl text-rose-pink font-bold">
                      Haloo Bebeee Sayanggg
                    </p>
                    <p className="font-dancing text-lg md:text-xl text-gray-600 mt-2 px-2 leading-relaxed">
                      Aku adaa surprisee untukk kamuu, cobaa klik tombol di bawahh yaaa, semoga kamuu sukaa 😘
                    </p>
                  </div>
                  
                  {/* Open Invitation button - fading in after letter rises */}
                  <div className="h-20 flex items-center justify-center w-full">
                    <AnimatePresence>
                      {showLetterButton && (
                        <motion.button
                          key="open-button"
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={isClicked ? {
                            width: ["160px", "64px", "80px"],
                            height: ["44px", "64px", "80px"],
                            borderRadius: "50%",
                            backgroundColor: "#fb6f92",
                            scale: [1, 0.9, 1.4, 1.2],
                            rotate: [0, -15, 375, 360],
                            boxShadow: "0px 10px 25px rgba(251, 111, 146, 0.6)"
                          } : { 
                            opacity: 1, 
                            scale: 1, 
                            y: 0 
                          }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={isClicked ? {} : { scale: 1.1 }}
                          whileTap={isClicked ? {} : { scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop trigger envelope toggle
                            if (isClicked) return;
                            setIsClicked(true);
                            setTimeout(() => {
                              onOpen();
                            }, 1200);
                          }}
                          className="bg-rose-pink hover:bg-[#fb557f] mt-4 mb-5 text-white text-sm md:text-base font-bold py-2.5 px-6 rounded-full shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 overflow-hidden"
                          style={{
                            minWidth: isClicked ? 'auto' : '160px',
                            minHeight: isClicked ? 'auto' : '44px',
                          }}
                        >
                          {!isClicked ? (
                            <motion.div 
                              key="btn-content"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2 justify-center"
                            >
                              <span>Buka Undangan</span>
                              <Heart className="w-4 h-4 fill-white" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="btn-bouquet"
                              initial={{ opacity: 0, scale: 0.2 }}
                              animate={{ opacity: 1, scale: 1.4 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="text-4xl select-none"
                            >
                              💐
                            </motion.div>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Front face (sides and bottom folder triangles) */}
                <div className="front" />

                {/* Top Flap */}
                <div className="flap" />

                {/* Golden Heart Seal Sticker */}
                {!envelopeOpened && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-amber-100 border border-amber-300 rounded-full p-3 shadow-md flex items-center justify-center hover:bg-amber-50"
                  >
                    <Heart className="w-8 h-8 text-rose-pink fill-rose-pink animate-pulse" />
                  </motion.div>
                )}
              </div>
            </div>

            <p className="text-rose-pink/70 text-xs md:text-sm mt-8 text-center animate-pulse">
              {!envelopeOpened ? "Klik segel hati untuk membuka surat ya, bebeee ❤️" : ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
