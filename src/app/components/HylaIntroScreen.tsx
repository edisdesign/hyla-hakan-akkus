import { motion, AnimatePresence } from 'motion/react';
import { HylaLogo } from '@/app/components/ui/HylaLogo';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRef, useEffect, useState, useCallback } from 'react';
import { translations, Language } from '@/app/translations';

interface HylaIntroScreenProps {
  onComplete: () => void;
  language?: Language;
}

export function HylaIntroScreen({ onComplete, language = 'de' }: HylaIntroScreenProps) {
  const playerRef = useRef<any>(null);
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing');
  const [videoReady, setVideoReady] = useState(false);
  const hasCalledComplete = useRef(false);
  const t = translations[language].common;
  const tIntro = translations[language].intro;

  const videoId = "gpB_u_Y4deo";
  const loopStart = 87;  // 1:27
  const loopEnd = 91;    // 1:31

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 0,
      playsinline: 1,
      modestbranding: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
    },
  };

  const handleComplete = useCallback(() => {
    if (hasCalledComplete.current) return;
    hasCalledComplete.current = true;
    setPhase('fading');
  }, []);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    event.target.mute();
    event.target.seekTo(loopStart);
    event.target.playVideo();
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    // YouTube state 1 = PLAYING — video is buffered and actually rendering frames
    if (event.data === 1 && !videoReady) {
      setVideoReady(true);
    }
  };

  // Check video time to trigger fade-out
  useEffect(() => {
    if (phase !== 'playing') return;

    const checkTime = () => {
      if (!playerRef.current) return;
      
      try {
        const currentTime = playerRef.current.getCurrentTime();
        
        if (currentTime >= loopEnd) {
          playerRef.current.pauseVideo();
          handleComplete();
        }
      } catch (error) {
        // Ignore errors
      }
    };

    const interval = setInterval(checkTime, 100);
    return () => clearInterval(interval);
  }, [phase, handleComplete]);

  // Fallback timeout — if video never loads or plays, auto-skip after 8 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 8000);
    return () => clearTimeout(fallbackTimer);
  }, [handleComplete]);

  // When fading completes, notify parent
  const handleFadeComplete = () => {
    if (phase === 'fading') {
      setPhase('done');
      onComplete();
    }
  };

  if (phase === 'done') return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={handleFadeComplete}
      className="fixed inset-0 z-[100] bg-black"
    >
      {/* VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
        >
          <YouTube
            videoId={videoId}
            opts={opts}
            className="w-full h-full opacity-100 scale-110 pointer-events-none"
            iframeClassName="w-full h-full object-cover"
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        </motion.div>
      </div>

      {/* LOGO OVERLAY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute bottom-12 left-8 md:bottom-16 md:left-12 flex flex-col items-start pointer-events-none"
      >
        <HylaLogo className="w-56 md:w-72 lg:w-80 h-auto drop-shadow-2xl" variant="dark" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-2 ml-2 text-white/60 text-xs tracking-[0.3em] uppercase"
        >
          {tIntro.tagline}
        </motion.p>
      </motion.div>

      {/* SKIP BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={handleComplete}
        className="absolute bottom-8 right-8 z-10 text-white/40 hover:text-white/80 text-xs tracking-[0.2em] uppercase transition-colors duration-300 pointer-events-auto cursor-pointer"
      >
        {tIntro.skip} →
      </motion.button>

      {/* LOADING BAR */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-white/30"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />
    </motion.div>
  );
}