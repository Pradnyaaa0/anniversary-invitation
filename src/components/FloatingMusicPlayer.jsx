import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Heart, ChevronRight 
} from 'lucide-react';
import { playlistData } from '../data/invitationData';

export default function FloatingMusicPlayer({ startPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef(null);
  const currentTrack = playlistData[trackIndex];

  // --- Ketika track berubah: load ulang lalu play jika sebelumnya sedang main ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;

    // Set src baru dan load ulang
    audio.src = currentTrack.url;
    audio.load();
    audio.volume = isMuted ? 0 : volume;

    if (wasPlaying) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn('Audio play failed:', err);
          setIsPlaying(false);
        });
    }
    setCurrentTime(0);
    setDuration(0);
  }, [trackIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Auto-play dipanggil dari envelope ---
  useEffect(() => {
    if (!startPlaying) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => {
        console.warn('Autoplay blocked:', err);
        setIsPlaying(false);
      });
  }, [startPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Event listeners untuk update waktu & durasi ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate  = () => setCurrentTime(audio.currentTime);
    const onLoaded      = () => setDuration(audio.duration || 0);
    const onEnded       = () => handleNext();
    const onError       = (e) => console.warn('Audio error:', e);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Sync volume ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn(err));
    }
  };

  const handleNext = () => {
    setTrackIndex(prev => (prev + 1) % playlistData.length);
  };

  const handlePrev = () => {
    // Kalau sudah lebih dari 3 detik, restart lagu yang sama
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    setTrackIndex(prev => (prev - 1 + playlistData.length) % playlistData.length);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end select-none pointer-events-auto">
      {/* Audio element — src di-set via JS bukan prop supaya load() bisa dipanggil */}
      <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="glass-panel border-rose-pink/20 rounded-2xl p-4 w-72 shadow-xl flex flex-col gap-3"
          >
            {/* Track Info */}
            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 rounded-full bg-rose-pink/20 flex items-center justify-center flex-shrink-0 border border-rose-pink/30 overflow-hidden"
                style={{ animation: isPlaying ? 'spin 6s linear infinite' : 'none' }}
              >
                <div className="absolute w-4 h-4 rounded-full bg-[#ffe5ec] z-10 border border-rose-pink/30" />
                <Heart className="w-6 h-6 text-rose-pink fill-rose-pink opacity-80" />
              </div>
              <div className="overflow-hidden flex-1">
                <h4 className="font-sans text-sm font-bold text-gray-800 truncate">{currentTrack.title}</h4>
                <p className="font-sans text-xs text-gray-500 truncate">{currentTrack.artist}</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-rose-pink/10 rounded-full text-rose-pink transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-1 w-full">
              <input
                type="range" min="0" max={duration || 100} value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-rose-pink/20 rounded-lg appearance-none cursor-pointer accent-rose-pink"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 py-1">
              <button onClick={handlePrev} className="p-1.5 hover:bg-rose-pink/15 rounded-full text-gray-600 hover:text-rose-pink transition-all">
                <SkipBack className="w-4 h-4 fill-current" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-rose-pink hover:bg-[#fb557f] text-white rounded-full shadow-md flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying
                  ? <Pause className="w-5 h-5 fill-current" />
                  : <Play  className="w-5 h-5 fill-current translate-x-[1px]" />
                }
              </button>
              <button onClick={handleNext} className="p-1.5 hover:bg-rose-pink/15 rounded-full text-gray-600 hover:text-rose-pink transition-all">
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 border-t border-rose-pink/10 pt-2 px-1">
              <button onClick={() => setIsMuted(m => !m)} className="text-gray-500 hover:text-rose-pink transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range" min="0" max="1" step="0.05"
                value={isMuted ? 0 : volume}
                onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                className="w-full h-1 bg-rose-pink/20 rounded-lg appearance-none cursor-pointer accent-rose-pink"
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="bubble"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 rounded-full bg-rose-pink shadow-lg flex items-center justify-center relative group overflow-hidden border-2 border-white"
          >
            {isPlaying && (
              <>
                <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                <div className="absolute inset-2 border-2 border-dashed border-white/60 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
              </>
            )}
            <Heart className={`w-6 h-6 text-white fill-white ${isPlaying ? 'animate-pulse' : ''}`} />
            <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[10px] font-sans py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
              Music Player
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
