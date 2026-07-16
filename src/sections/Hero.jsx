import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import coupleHero from '../assets/photo_6.jpg';
import teddyBear from '../assets/teddy_bear.png';
import roseFlower from '../assets/rose_flower.png';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Akhirnaa kitaa setahun yaaa Wopyuuu, bebeee. ❤️";

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden z-10 px-4 md:px-8">
      {/* Background soft glow behind couple */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-rose-pink/20 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Drifting Elements (Teddy Bears & Roses) */}
      <motion.img
        src={teddyBear}
        alt="Teddy Bear Left"
        animate={{ 
          y: [0, -15, 0],
          rotate: [-5, 8, -5],
          scale: [1, 1.05, 1]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute left-6 top-1/4 w-16 md:w-28 opacity-75 hidden md:block select-none pointer-events-none filter drop-shadow-md"
      />
      <motion.img
        src={teddyBear}
        alt="Teddy Bear Right"
        animate={{ 
          y: [0, -18, 0],
          rotate: [5, -8, 5],
          scale: [0.95, 1.02, 0.95]
        }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute right-6 top-1/3 w-16 md:w-28 opacity-75 hidden md:block select-none pointer-events-none filter drop-shadow-md transform scale-x-[-1]"
      />
      <motion.img
        src={roseFlower}
        alt="Rose Corner Left"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute left-10 bottom-24 w-12 md:w-20 opacity-70 hidden md:block select-none pointer-events-none"
      />
      <motion.img
        src={roseFlower}
        alt="Rose Corner Right"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-12 top-20 w-12 md:w-20 opacity-70 hidden md:block select-none pointer-events-none"
      />

      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        {/* Heart Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.3 }}
          className="relative mb-8"
        >
          {/* Beating outer rings */}
          <div className="absolute inset-0 border-2 border-rose-pink/30 rounded-full animate-ping opacity-40 scale-105 pointer-events-none" />
          
          {/* Main frame shape */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white p-4 rounded-full shadow-2xl relative z-10 flex items-center justify-center overflow-hidden border border-rose-pink/20">
            {/* Heart clip mask wrapper */}
            <div 
              className="w-full h-full relative overflow-hidden bg-pink-50"
              style={{
                clipPath: 'path("M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z")',
                transform: 'scale(10.5)',
                transformOrigin: 'top left'
              }}
            />
            {/* Overlay actual image directly over the clip */}
            <div className="absolute inset-0 p-3 rounded-full overflow-hidden flex items-center justify-center">
              <div 
                className="w-full h-full overflow-hidden flex items-center justify-center bg-cover bg-center border-4 border-[#ffe5ec] shadow-inner"
                style={{ 
                  clipPath: 'ellipse(49% 49% at 50% 50%)',
                }}
              >
                <img 
                  src={coupleHero} 
                  alt="Foto Bebeee" 
                  className="w-full h-full object-cover transform scale-105 hover:scale-115 transition-transform duration-700" 
                  data-hover="memory"
                />
              </div>
            </div>

            {/* Little floating hearts on the border */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -top-1 right-12 z-20 text-rose-pink text-xl"
            >
              ❤️
            </motion.div>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
              className="absolute bottom-6 -left-1 z-20 text-rose-pink text-lg"
            >
              💖
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-vibes text-5xl md:text-7xl text-rose-pink font-bold drop-shadow-sm select-none"
        >
          Happy Anniversary Bebeee ❤️
        </motion.h1>

        {/* Typewriter Subtitle */}
        <div className="h-10 md:h-12 flex items-center justify-center mb-10 px-4">
          <p className="font-dancing text-xl md:text-3xl text-gray-700 font-semibold tracking-wide select-none">
            {typedText}
            <span className="animate-pulse text-rose-pink font-bold border-r-2 border-rose-pink ml-0.5" />
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => scrollToSection('gallery')}
            data-hover="love"
            className="glass-panel border-rose-pink/20 hover:border-rose-pink/50 text-rose-pink font-semibold py-3 px-8 rounded-full shadow-md flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all duration-300 bg-white/60 hover:bg-rose-50/80"
          >
            <Heart className="w-4 h-4 fill-rose-pink" />
            <span>Galeri Foto</span>
          </button>

          <button
            onClick={() => scrollToSection('letter')}
            data-hover="love"
            className="bg-rose-pink hover:bg-[#fb557f] text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Surat Cinta</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
