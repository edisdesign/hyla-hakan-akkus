import { translations, type Language } from '@/app/translations';
import { Droplets, Flame, ShieldCheck, ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import imgHylaBlack from "figma:asset/1d04fb11b9f22d2cdf07bd986e1538095ee69955.png";
import imgSteamer from "figma:asset/fb7a464f38fa99ae124d6d48735bb47590bcaafd.png";
import YouTube, { YouTubeProps } from 'react-youtube';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface HylaWhySectionProps {
  language: Language;
}

export function HylaWhySection({ language }: HylaWhySectionProps) {
  const t = translations[language].whyHyla;

  // === EST Water Tech Video (Card 2) ===
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVideoId, setModalVideoId] = useState('');
  const [bgVideoReady, setBgVideoReady] = useState(false);
  const bgPlayerRef = useRef<any>(null);

  const estVideoId = "gpB_u_Y4deo";
  const estLoopStart = 87;
  const estLoopEnd = 107;

  // === Steamer Video (Card 3) ===
  const [steamerBgReady, setSteamerBgReady] = useState(false);
  const steamerPlayerRef = useRef<any>(null);

  const steamerVideoId = "j9-RZr7NIQk";
  const steamerLoopStart = 0;
  const steamerLoopEnd = 20;

  // Shared background video options factory
  const makeBgOpts = (vidId: string, start: number): YouTubeProps['opts'] => ({
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      playlist: vidId,
      start,
      playsinline: 1,
      modestbranding: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      origin: window.location.origin,
    },
  });

  const modalOpts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      playsinline: 1,
      modestbranding: 1,
    },
  };

  // EST video handlers
  const onEstBgReady: YouTubeProps['onReady'] = (event) => {
    bgPlayerRef.current = event.target;
    event.target.mute();
    event.target.seekTo(estLoopStart);
    event.target.playVideo();
  };

  const onEstBgStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === 1 && !bgVideoReady) setBgVideoReady(true);
    if (event.data === 0 && bgPlayerRef.current) {
      bgPlayerRef.current.seekTo(estLoopStart);
      bgPlayerRef.current.playVideo();
    }
  };

  // Steamer video handlers
  const onSteamerBgReady: YouTubeProps['onReady'] = (event) => {
    steamerPlayerRef.current = event.target;
    event.target.mute();
    event.target.seekTo(steamerLoopStart);
    event.target.playVideo();
  };

  const onSteamerBgStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === 1 && !steamerBgReady) setSteamerBgReady(true);
    if (event.data === 0 && steamerPlayerRef.current) {
      steamerPlayerRef.current.seekTo(steamerLoopStart);
      steamerPlayerRef.current.playVideo();
    }
  };

  // Loop EST video segment
  useEffect(() => {
    if (!bgPlayerRef.current) return;
    const interval = setInterval(() => {
      try {
        const currentTime = bgPlayerRef.current?.getCurrentTime();
        if (currentTime !== undefined && currentTime >= estLoopEnd) {
          bgPlayerRef.current.seekTo(estLoopStart);
          bgPlayerRef.current.playVideo();
        }
      } catch (e) { /* ignore */ }
    }, 100);
    return () => clearInterval(interval);
  }, [bgVideoReady]);

  // Loop Steamer video segment
  useEffect(() => {
    if (!steamerPlayerRef.current) return;
    const interval = setInterval(() => {
      try {
        const currentTime = steamerPlayerRef.current?.getCurrentTime();
        if (currentTime !== undefined && currentTime >= steamerLoopEnd) {
          steamerPlayerRef.current.seekTo(steamerLoopStart);
          steamerPlayerRef.current.playVideo();
        }
      } catch (e) { /* ignore */ }
    }, 100);
    return () => clearInterval(interval);
  }, [steamerBgReady]);

  const openModal = (videoId: string) => {
    setModalVideoId(videoId);
    setShowVideoModal(true);
  };

  return (
    <>
      <section className="relative py-24 bg-[#FAFAFA]">
        <div id="products" className="relative container mx-auto px-6 lg:px-8 max-w-7xl">

          {/* Section Header */}
          <div className="relative flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-sm font-bold tracking-widest uppercase text-gray-500 mb-4"
              >
                {t.label}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-black tracking-tight leading-[1.05]"
              >
                {t.title}
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-md leading-relaxed"
            >
              {t.comparisonTitle}
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">

            {/* ===== Card 1: HYLA EST Product — Large ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative bg-white rounded-[2.5rem] overflow-hidden p-8 md:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-shadow duration-500"
              style={{ isolation: 'isolate' }}
            >
              {/* Image first in DOM → paints first → serves as backdrop for blend */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-[120%] translate-y-10 translate-x-10 group-hover:translate-x-5 transition-transform duration-700">
                  <img src={imgHylaBlack} alt="HYLA EST System" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content on top — no z-index so blend sees the full backdrop */}
              <div className="relative max-w-md">
                <div className="inline-flex p-3 rounded-2xl bg-gray-100 mb-6 text-black">
                  <ShieldCheck className="size-6" />
                </div>
                <div className="mix-blend-difference">
                  <h3 className="text-3xl font-bold mb-4 text-white">{t.hylaSystem}</h3>
                  <p className="text-white/80 text-lg mb-6">{t.benefit}</p>
                  <Link
                    to="/est"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/70 transition-colors group/link"
                  >
                    {t.learnMore}
                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ===== Card 2: EST Water Tech Video ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-black rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-end group cursor-pointer"
              onClick={() => openModal(estVideoId)}
            >
              {/* YouTube Background (muted, looping) */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute w-[300%] h-[300%] pointer-events-none transition-opacity duration-1000"
                  style={{
                    top: '50%',
                    left: 'calc(50% - 80px)',
                    transform: 'translate(-50%, -50%)',
                    opacity: bgVideoReady ? 1 : 0
                  }}
                >
                  <YouTube
                    videoId={estVideoId}
                    opts={makeBgOpts(estVideoId, estLoopStart)}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                    onReady={onEstBgReady}
                    onStateChange={onEstBgStateChange}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              </div>

              {/* Fallback image */}
              {!bgVideoReady && (
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759679778382-811109ca383a?w=800&q=80"
                    alt="Water"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}

              {/* Play arrow */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="size-4 text-white" />
                </div>
              </div>

              <div className="relative z-10 text-white">
                <Droplets className="size-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.waterTech}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{t.card3Text}</p>
              </div>
            </motion.div>

            {/* ===== Card 3: Steamer Video ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-black rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-end group cursor-pointer"
              onClick={() => openModal(steamerVideoId)}
            >
              {/* YouTube Background (muted, looping) */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute w-[300%] h-[300%] pointer-events-none transition-opacity duration-1000"
                  style={{
                    top: '50%',
                    left: 'calc(50% - 80px)',
                    transform: 'translate(-50%, -50%)',
                    opacity: steamerBgReady ? 1 : 0
                  }}
                >
                  <YouTube
                    videoId={steamerVideoId}
                    opts={makeBgOpts(steamerVideoId, steamerLoopStart)}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                    onReady={onSteamerBgReady}
                    onStateChange={onSteamerBgStateChange}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              </div>

              {/* Fallback image */}
              {!steamerBgReady && (
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1742483359033-13315b247c74?w=800&q=80"
                    alt="Steam Cleaning"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}

              {/* Play arrow */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="size-4 text-white" />
                </div>
              </div>

              <div className="relative z-10 text-white">
                <Flame className="size-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.steamerVideoTitle}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{t.steamerVideoDesc}</p>
              </div>
            </motion.div>

            {/* ===== Card 4: HYLA Steamer Product — Large ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 relative bg-white rounded-[2.5rem] overflow-hidden p-8 md:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-shadow duration-500"
              style={{ isolation: 'isolate' }}
            >
              {/* Image first in DOM → paints first → serves as backdrop for blend */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-[110%] translate-y-5 translate-x-10 group-hover:translate-x-5 transition-transform duration-700">
                  <img src={imgSteamer} alt="HYLA Steamer" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content on top — no z-index so blend sees the full backdrop */}
              <div className="relative max-w-md">
                <div className="inline-flex p-3 rounded-2xl bg-gray-100 mb-6 text-black">
                  <Flame className="size-6" />
                </div>
                <div className="mix-blend-difference">
                  <h3 className="text-3xl font-bold mb-4 text-white">{t.steamerCardTitle}</h3>
                  <p className="text-white/80 text-lg mb-6">{t.steamerCardDesc}</p>
                  <Link
                    to="/steamer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/70 transition-colors group/link"
                  >
                    {t.learnMore}
                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <YouTube
                videoId={modalVideoId}
                opts={modalOpts}
                className="w-full h-full"
                iframeClassName="w-full h-full"
              />
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}