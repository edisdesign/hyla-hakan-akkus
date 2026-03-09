import { useRef } from 'react';
import { translations, type Language } from '@/app/translations';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import igScreenshot from 'figma:asset/0a4a686118787e843bb20ac11c30a749dbef6b61.png';

interface HylaInstagramSectionProps {
  language: Language;
}

function CommentBubble({
  comment,
  index,
}: {
  comment: {
    id: number;
    avatar: string;
    color: string;
    text: string;
    likes: number;
    side: string;
    top: string;
    delay: number;
  };
  index: number;
}) {
  const isLeft = comment.side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: comment.delay + 0.6, duration: 0.7, ease: 'easeOut' }}
      className={`absolute pointer-events-none z-20 max-w-[180px] md:max-w-[210px] ${isLeft ? 'left-0' : 'right-0'
        } hidden md:block`}
      style={{ top: comment.top }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 3.2 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.8,
        }}
        className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-3 ${isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'
          }`}
      >
        <div className="flex items-start gap-2">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${comment.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
          >
            {comment.avatar}
          </div>
          <div>
            <p className="text-[11px] text-gray-600 leading-snug">{comment.text}</p>
            <div className="flex items-center gap-1 mt-2">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              <span className="text-[10px] text-gray-400">{comment.likes}</span>
            </div>
          </div>
        </div>
        {/* Chat tail */}
        <div
          className={`absolute top-4 w-3 h-3 bg-white rotate-45 border-gray-100 ${isLeft ? '-left-1.5 border-l border-b' : '-right-1.5 border-r border-t'
            }`}
        />
      </motion.div>
    </motion.div>
  );
}

export function HylaInstagramSection({ language }: HylaInstagramSectionProps) {
  const t = translations[language].instagramSection;
  const tRoot = translations[language];

  const comments = [
    {
      id: 1,
      avatar: 'SM',
      color: 'from-pink-400 to-rose-500',
      text: tRoot.instagramComment1,
      likes: 48,
      side: 'left',
      top: '32%',
      delay: 0,
    },
    {
      id: 2,
      avatar: 'TB',
      color: 'from-blue-400 to-indigo-500',
      text: tRoot.instagramComment2,
      likes: 31,
      side: 'right',
      top: '62%',
      delay: 0.5,
    },
  ];

  // Scroll-driven animation ref
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth spring — higher stiffness + damping = less bouncy, better on tablet
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 35 });

  // Phone flies up from below + rotates into place
  const phoneY = useTransform(smoothProgress, [0, 1], [80, 0]);
  const phoneRotate = useTransform(smoothProgress, [0, 1], [-12, -3]);
  const phoneScale = useTransform(smoothProgress, [0, 0.4, 1], [0.85, 0.95, 1]);
  const phoneOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#F5F5F7] overflow-hidden">
      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ── Left: Text & CTA ───────────────────────────── */}
          <div className="relative lg:w-1/2 space-y-8 md:space-y-10 text-center lg:text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-6 md:mb-8 shadow-sm"
              >
                <Instagram className="size-4 text-black" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  {t.socialLabel}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[0.95] mb-4 md:mb-6"
              >
                {t.headingLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {t.headingLine2}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                {t.subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <a
                href="https://www.instagram.com/hakanakkush/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 text-xl md:text-2xl font-bold text-black border-b-2 border-black pb-2 hover:opacity-60 transition-opacity"
              >
                @hakanakkush{' '}
                <ArrowUpRight className="size-5 md:size-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* ── Right: Phone + Comments ─────────────────────── */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative w-full">

            {/* Glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-purple-200/40 to-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

            {/* Outer wrapper — responsive sizing */}
            <div className="relative w-full max-w-[280px] md:max-w-[520px] aspect-[520/780] mx-auto lg:mx-0">

              {/* Comment bubbles (hidden on mobile) */}
              {comments.map((c, i) => (
                <CommentBubble key={c.id} comment={c} index={i} />
              ))}

              {/* ── Phone (scroll-driven entrance) ──────────── */}
              <motion.div
                style={{
                  y: phoneY,
                  rotate: phoneRotate,
                  scale: phoneScale,
                  opacity: phoneOpacity,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[85%] md:w-[320px]"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {/* Phone shell — NO notch */}
                  <div
                    className="relative bg-zinc-900"
                    style={{
                      borderRadius: 50,
                      padding: 11,
                      boxShadow:
                        '0 50px 100px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.10)',
                    }}
                  >
                    {/* Power button */}
                    <div className="absolute -right-[6px] top-24 w-[6px] h-12 bg-zinc-700 rounded-r-md" />
                    {/* Volume buttons */}
                    <div className="absolute -left-[6px] top-20 w-[6px] h-8 bg-zinc-700 rounded-l-md" />
                    <div className="absolute -left-[6px] top-32 w-[6px] h-8 bg-zinc-700 rounded-l-md" />
                    <div className="absolute -left-[6px] top-44 w-[6px] h-8 bg-zinc-700 rounded-l-md" />

                    {/* Screen */}
                    <div
                      className="overflow-hidden bg-white"
                      style={{ borderRadius: 40 }}
                    >
                      <img
                        src={igScreenshot}
                        alt="Hakan Akkus Instagram Profile"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                        draggable={false}
                      />
                    </div>

                    {/* Home indicator */}
                    <div className="flex justify-center pt-2.5 pb-1">
                      <div className="w-24 h-1 bg-zinc-600 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
