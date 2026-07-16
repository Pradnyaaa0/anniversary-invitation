import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Target: Anniversary date July 18, 2026
  const getNextAnniversary = () => {
    return new Date('2026-07-18T19:00:00');
  };

  useEffect(() => {
    const targetDate = getNextAnniversary();

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(newTimeLeft);
      }
    };

    calculateTimeLeft(); // initial run
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCelebrateClick = () => {
    const eventSection = document.getElementById('event');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const timerItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ];

  return (
    <section className="relative py-24 z-10 px-4 max-w-6xl mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-pink/20 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-dancing text-2xl text-rose-pink font-semibold">Detik Demi Detik</span>
          <h2 className="font-vibes text-5xl md:text-6xl text-rose-pink font-bold mt-2">
            Hitung Mundur Menuju Anniversary Kita
          </h2>
          <div className="w-16 h-0.5 bg-rose-pink/40 mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* Timer Cards Container */}
      <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap mb-12">
        {timerItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, stiffness: 150, delay: index * 0.1 }}
            className="glass-panel border-rose-pink/20 rounded-2xl p-4 md:p-6 w-20 md:w-28 text-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group glow-card bg-white/40"
          >
            {/* Heart hover pulse inside card */}
            <Heart className="absolute -bottom-4 -left-4 w-12 h-12 text-rose-pink/5 group-hover:scale-110 fill-current transition-transform duration-500 pointer-events-none" />
            
            <span className="block text-2xl md:text-4xl font-extrabold text-rose-pink tracking-tight drop-shadow-sm mb-1 select-none">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="block font-sans text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider select-none">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Manual Celebrate Trigger button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={handleCelebrateClick}
          data-hover="love"
          className="bg-rose-pink hover:bg-[#fb557f] text-white font-bold py-3.5 px-10 rounded-full shadow-lg flex items-center gap-2 mx-auto transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 fill-white/20 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Rayakan Hari Kita 🌹</span>
        </button>
      </motion.div>
    </section>
  );
}
