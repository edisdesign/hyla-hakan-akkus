import { Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { translations, type Language } from '@/app/translations';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import { supabase, type CoverImage } from '@/app/lib/supabase';

// Fallback cover slike (Figma assets) — koriste se ako nema aktivnih slika u bazi
import imgHakanDesk from "figma:asset/513d774c08c356ff1e9263824516678d91ee0571.png";
import imgHakanCouple from "figma:asset/ec11fc08078092396e04f3c9c696380aace20f16.png";
import imgHylaDevices from "figma:asset/92339057b7e3b1934014428af1f40f296cae5201.png";

const SLIDE_DURATION = 6000; // ms koliko se svaka slika prikazuje

const FALLBACK_SLIDES = [
  { src: imgHakanDesk, alt: "Hakan Akkuş – HYLA Team Leader", position: "center top" },
  { src: imgHakanCouple, alt: "Hakan Akkuş sa suprugom – HYLA Team Akkus", position: "center center" },
  { src: imgHylaDevices, alt: "HYLA Team Akkus – Black & White Edition", position: "center center" },
];

interface Slide {
  src: string;
  alt: string;
  position: string;
}

interface HylaHeroSectionProps {
  language: Language;
}

export function HylaHeroSection({ language }: HylaHeroSectionProps) {
  const t = translations[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);

  // Učitaj cover slike iz Supabase; koristi fallback ako nema aktivnih zapisa
  const loadCovers = useCallback(() => {
    supabase
      .from('cover_images')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }: { data: CoverImage[] | null }) => {
        const filled = (data ?? []).filter((img: CoverImage) => !!img.image_url);
        if (filled.length > 0) {
          setSlides(
            filled.map((img: CoverImage) => ({
              src: img.image_url,
              alt: img.label || 'HYLA Cover',
              position: 'center center',
            }))
          );
        } else {
          setSlides(FALLBACK_SLIDES);
        }
      });
  }, []);

  // Početni fetch + osvježavanje kad admin panel promijeni cover slike
  useEffect(() => {
    loadCovers();
    window.addEventListener('hyla:covers-updated', loadCovers);
    return () => window.removeEventListener('hyla:covers-updated', loadCovers);
  }, [loadCovers]);

  // Reset activeIndex ako se broj slajdova smanji
  useEffect(() => {
    setActiveIndex(0);
  }, [slides]);

  // Automatsko izmjenjivanje slika
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides]);

  // Sigurno dohvatanje trenutnog slajda (zaštita od race condition-a)
  const safeIndex = Math.min(activeIndex, Math.max(0, slides.length - 1));
  const currentSlide = slides[safeIndex] ?? FALLBACK_SLIDES[0];

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full min-h-[100dvh] bg-black overflow-hidden">

      {/* ── SLIDESHOW BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={safeIndex}
            src={currentSlide.src}
            alt={currentSlide.alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.92, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: currentSlide.position }}
          />
        </AnimatePresence>

        {/* Gradijent za čitljivost teksta */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
      </div>

      {/* ── SLIDE INDICATORS ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_: Slide, i: number) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Slika ${i + 1}`}
            className="relative cursor-pointer"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${i === activeIndex
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
            />
            {/* Progress bar za aktivnu sliku */}
            {i === activeIndex && (
              <motion.span
                key={`progress-${activeIndex}`}
                className="absolute inset-0 rounded-full bg-white/50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex flex-col justify-end px-6 py-12 lg:pb-40 container mx-auto lg:px-8 h-full min-h-[100dvh]">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-6 leading-[0.9]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-2xl text-white/80 font-medium max-w-xl mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 w-full sm:w-auto"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  language === 'de' ? 'Hallo! Ich möchte eine kostenlose Vorführung buchen.' :
                    language === 'tr' ? 'Merhaba! Ücretsiz bir tanıtım randevusu almak istiyorum.' :
                      'Hello! I would like to book a free demonstration.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.ctaPrimary}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-14 px-8 w-full sm:w-auto rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <a href="#career">
                <Users className="mr-2 size-5" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

