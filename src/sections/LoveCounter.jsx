import { useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from 'react-countup';
import { Calendar, Heart, Clock, Award } from 'lucide-react';

// Individual animated counter card using useCountUp hook
function CounterCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const { start } = useCountUp({
    ref,
    start: 0,
    end: stat.value,
    duration: 2.5,
    decimals: stat.decimals || 0,
    startOnMount: false,
  });

  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  const Icon = stat.icon;

  return (
    <motion.div
      key={stat.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel border-rose-pink/20 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group glow-card"
    >
      {/* Decorative faint background heart icon */}
      <Heart className="absolute -bottom-4 -right-4 w-20 h-20 text-rose-pink/5 group-hover:scale-110 transition-transform duration-500 fill-current pointer-events-none" />

      {/* Top Floating Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-rose-pink/10 flex items-center justify-center mb-4 text-rose-pink group-hover:bg-rose-pink group-hover:text-white transition-colors duration-300 border border-rose-pink/20">
        <Icon className="w-5 h-5" />
      </div>

      {/* Number display — countUp writes directly into this span via ref */}
      <div className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2 flex items-baseline justify-center">
        <span ref={ref}>0</span>
        {stat.id === 'years' && <span className="text-xl font-bold ml-0.5">+</span>}
      </div>

      {/* Label */}
      <span className="font-sans text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function LoveCounter() {
  // Target anniversary start date: 18 July 2025
  const startDate = useMemo(() => new Date('2025-07-18T00:00:00'), []);

  // Compute live differences
  const stats = useMemo(() => {
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.437));
    const years = parseFloat((diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1));

    return [
      { id: 'days',   label: 'Hari Bersama',   value: days,   icon: Clock,     decimals: 0 },
      { id: 'weeks',  label: 'Minggu Bersama',  value: weeks,  icon: Heart,     decimals: 0 },
      { id: 'months', label: 'Bulan Bersama',   value: months, icon: Calendar,  decimals: 0 },
      { id: 'years',  label: 'Tahun Bersama',   value: years,  icon: Award,     decimals: 0 },
    ];
  }, [startDate]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative py-20 z-10 px-4 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-pink/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-dancing text-2xl text-rose-pink font-semibold">Sudah selamaa ini lhoo kita pacarann</span>
          <h2 className="font-vibes text-5xl md:text-6xl text-rose-pink font-bold mt-2">
            Waktu Yang Telah Kita Lewati Bersamaaa
          </h2>
          <div className="w-16 h-0.5 bg-rose-pink/40 mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* Grid of counter cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <CounterCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
