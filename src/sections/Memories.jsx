import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { galleryData } from '../data/invitationData';

export default function Memories() {
  const [activeIdx, setActiveIdx] = useState(null);

  const openLightbox = (index) => {
    setActiveIdx(index);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % galleryData.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  return (
    <section id="gallery" className="relative py-24 z-10 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-dancing text-2xl text-rose-pink font-semibold">Album Foto Kita</span>
          <h2 className="font-vibes text-5xl md:text-6xl text-rose-pink font-bold mt-2">
            Kenangan Indah kitaa Selama Setahunn
          </h2>
          <div className="w-16 h-0.5 bg-rose-pink/40 mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* CSS Columns Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {galleryData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            onClick={() => openLightbox(index)}
            className="break-inside-avoid overflow-hidden rounded-2xl border border-rose-pink/15 shadow-md relative group cursor-pointer bg-white"
          >
            {/* The Photo */}
            <img 
              src={item.image} 
              alt={`Memory ${item.id}`} 
              className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700 select-none"
              style={{ height: item.size === 'tall' ? '360px' : '220px' }}
              data-hover="memory"
            />

            {/* Romantic Overlay on Hover */}
            <div className="absolute inset-0 bg-[#fb6f92]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <Heart className="w-8 h-8 text-white fill-white animate-heartbeat" />
                <span className="font-dancing text-2xl text-white font-bold drop-shadow-md">
                  Kenangan Kita ❤️
                </span>
                <p className="font-sans text-xs text-white/90 drop-shadow-sm max-w-xs mt-1">
                  {item.caption}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/85 backdrop-filter backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 select-none pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Carousel Content */}
            <div className="relative max-w-4xl w-full flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Centered Image Card */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()} // Stop closing click
                className="glass-panel border-white/15 p-2 md:p-3 rounded-2xl flex flex-col max-h-[85vh] max-w-[90vw] overflow-hidden shadow-2xl bg-white/10"
              >
                <img
                  src={galleryData[activeIdx].image}
                  alt={`Expanded Memory ${galleryData[activeIdx].id}`}
                  className="rounded-xl object-contain max-h-[60vh] max-w-full"
                />
                <div className="p-4 text-center">
                  <p className="font-dancing text-xl md:text-2xl text-rose-pink font-bold">
                    Kenangan #{galleryData[activeIdx].id}
                  </p>
                  <p className="font-sans text-sm text-white/80 mt-1 max-w-lg mx-auto">
                    {galleryData[activeIdx].caption}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="flex gap-2 mt-6">
              {galleryData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'w-6 bg-rose-pink' : 'w-2.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
