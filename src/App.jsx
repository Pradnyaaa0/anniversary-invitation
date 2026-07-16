import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Envelope from './components/Envelope';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import CinematicTransition from './components/CinematicTransition';
import LoveGate from './components/LoveGate';

// Section imports
import Hero from './sections/Hero';

import Memories from './sections/Memories';
import LoveCounter from './sections/LoveCounter';
import Countdown from './sections/Countdown';
import EventDetails from './sections/EventDetails';
import LoveLetter from './sections/LoveLetter';
import SurpriseSection from './sections/SurpriseSection';
import Footer from './sections/Footer';

function App() {
  const [hasAcceptedLoveGate, setHasAcceptedLoveGate] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleOpenInvitation = () => {
    setIsTransitioning(true);
    // Auto start the background music
    setMusicStarted(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setIsOpened(true);
  };

  return (
    <>
      {/* Premium Custom Mouse Cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!hasAcceptedLoveGate ? (
          <motion.div
            key="love-gate"
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <LoveGate onAccept={() => setHasAcceptedLoveGate(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            {/* Cinematic Transition Scene */}
            <CinematicTransition active={isTransitioning} onComplete={handleTransitionComplete} />

            <AnimatePresence mode="wait">
        {!isOpened ? (
          /* Introduction Screen: Loading & 3D Envelope opening */
          <motion.div 
            key="envelope-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Envelope onOpen={handleOpenInvitation} />
          </motion.div>
        ) : (
          /* Main Invitation Content */
          <motion.div
            key="main-website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative min-h-screen flex flex-col w-full text-gray-800"
          >
            {/* Ambient Background Canvas Particles (Hearts & Sparkles) */}
            <BackgroundEffects />

            {/* Floating Music Player (Bottom Right) */}
            <FloatingMusicPlayer startPlaying={musicStarted} />

            {/* Content Sections */}
            <main className="flex-1 w-full relative z-10">
              <Hero />
              
              {/* Divider lines or layout flow */}
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <Memories />
              
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <LoveCounter />
              
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <Countdown />
              
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <EventDetails />
              
              
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <LoveLetter />
              
              <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-rose-pink/15 to-transparent" />
              
              <SurpriseSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
