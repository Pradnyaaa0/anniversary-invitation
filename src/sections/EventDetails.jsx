import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Shirt, Heart } from 'lucide-react';

export default function EventDetails() {
  return (
    <section id="event" className="relative py-20 z-10 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-pink/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-dancing text-2xl text-rose-pink font-semibold">Special Dinner Invitation</span>
          <h2 className="font-vibes text-5xl md:text-6xl text-rose-pink font-bold mt-2">
            Detail Acara Kita
          </h2>
          <div className="w-16 h-0.5 bg-rose-pink/40 mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* Premium Glassmorphic Ticket Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="glass-panel border-rose-pink/25 rounded-3xl p-8 md:p-12 shadow-xl max-w-2xl mx-auto bg-white/50 relative overflow-hidden group glow-card"
      >
        {/* Heart background decorations */}
        <Heart className="absolute -top-6 -right-6 w-20 h-20 text-rose-pink/5 fill-current pointer-events-none" />
        <Heart className="absolute -bottom-6 -left-6 w-20 h-20 text-rose-pink/5 fill-current pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Left Column: Date & Time */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink border border-rose-pink/20 flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</h4>
                <p className="font-sans text-lg font-bold text-gray-800 mt-1">Sabtu, 18 Juli 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink border border-rose-pink/20 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">Jam</h4>
                <p className="font-sans text-lg font-bold text-gray-800 mt-1">19:00 WITA</p>
              </div>
            </div>
          </div>

          {/* Right Column: Place & Dresscode */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink border border-rose-pink/20 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">Tempat</h4>
                <p className="font-sans text-lg font-bold text-gray-800 mt-1">The Brass, Renon</p>
                <a 
                  href="https://maps.google.com/?q=The+Brass+Renon" 
                  target="_blank" 
                  rel="noreferrer"
                  data-hover="love"
                  className="text-xs text-rose-pink font-semibold hover:underline mt-1 inline-block"
                >
                  Buka Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink border border-rose-pink/20 flex-shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">Dresscode</h4>
                <p className="font-sans text-lg font-bold text-gray-800 mt-1">Brown (Cokelat)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outer ticket dash borders */}
        <div className="w-full h-[1px] border-t border-dashed border-rose-pink/30 my-8" />

        <div className="text-center font-dancing text-2xl text-rose-pink font-bold">
          Tepatt waktuu yeaahh cayangggg ❤️
        </div>
      </motion.div>
    </section>
  );
}
