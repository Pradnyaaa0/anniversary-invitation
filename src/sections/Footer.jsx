import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-16 bg-white/20 border-t border-rose-pink/10 backdrop-filter backdrop-blur-sm z-10 text-center overflow-hidden select-none">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-rose-pink/10 rounded-full blur-3xl pointer-events-none" />

      {/* Little floating sparkles on sides */}
      <Star className="absolute left-10 bottom-10 w-4 h-4 text-rose-pink/30 animate-pulse pointer-events-none" />
      <Star className="absolute right-12 top-10 w-4 h-4 text-rose-pink/30 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        {/* Animated Double Beating Hearts */}
        <div className="flex items-center gap-1.5 text-rose-pink mb-2">
          <Heart className="w-6 h-6 fill-current animate-heartbeat" />
          <Heart className="w-4 h-4 fill-current animate-heartbeat text-pink-400" style={{ animationDelay: '0.3s' }} />
        </div>

        {/* Dedication Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-dancing text-2xl md:text-3xl text-rose-pink font-bold drop-shadow-sm select-none"
        >
          Made with <Heart className="inline w-5 h-5 fill-current animate-heartbeat mx-1 text-rose-pink" /> for the Love of My Life
        </motion.p>

        {/* Copyright info */}
        <p className="font-sans text-xs text-gray-500 mt-2 tracking-wide uppercase">
          &copy; {currentYear} &bull; Our Forever Journey &bull; All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
