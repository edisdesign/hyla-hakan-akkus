import { translations, type Language } from '@/app/translations';
import { motion } from 'motion/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ArrowLeftRight, ImageIcon } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface HylaResultsSectionProps {
  language: Language;
}

interface ResultItem {
  id: number;
  title_de: string;
  title_tr: string;
  before_image: string;
  after_image: string;
  sort_order: number;
  active: boolean;
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  dragLabel: string;
  title?: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel, afterLabel, dragLabel, title }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div className="group">
      {title && (
        <p className="text-sm font-bold text-gray-700 mb-2 text-center uppercase tracking-wider">{title}</p>
      )}
      <div
        ref={containerRef}
        className="relative aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (background) */}
        <div className="absolute inset-0">
          <ImageWithFallback src={afterImage} alt="After" className="w-full h-full object-cover" />
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <ImageWithFallback src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {afterLabel}
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <ArrowLeftRight className="size-4 text-black" />
          </div>
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
          {dragLabel}
        </div>
      </div>
    </div>
  );
}

// Fallback slike ako baza nema podataka
const FALLBACK_BEFORE = 'https://images.unsplash.com/photo-1634445255359-963c85dbd26d?w=1200&q=80';
const FALLBACK_AFTER = 'https://images.unsplash.com/photo-1625044364652-c841c1ae31b1?w=1200&q=80';

const FALLBACK_GALLERY = [
  'https://images.unsplash.com/photo-1616450088319-ff2ea6e7cc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1625044364652-c841c1ae31b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1705989463748-d5935d51ae48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1589999405517-d19e4c105649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1661348544208-c91fb7e56843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1631035255691-7e40af32f2ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
];

export function HylaResultsSection({ language }: HylaResultsSectionProps) {
  const t = translations[language].resultsSection;
  const tCommon = translations[language].common;
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadResults = useCallback(() => {
    supabase
      .from('results')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        setResults((data ?? []) as ResultItem[]);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    loadResults();
    window.addEventListener('hyla:results-updated', loadResults);
    return () => window.removeEventListener('hyla:results-updated', loadResults);
  }, [loadResults]);

  // Rezultati sa OBJE slike — prikazujemo kao before/after slider
  const sliderResults = results.filter(r => r.before_image && r.after_image);
  // Rezultati sa samo jednom slikom — prikazujemo u galeriji
  const galleryResults = results.filter(r => r.before_image || r.after_image);

  // Fallback: koristi hardkodirani content ako DB nema podataka
  const mainBefore = sliderResults[0]?.before_image ?? FALLBACK_BEFORE;
  const mainAfter = sliderResults[0]?.after_image ?? FALLBACK_AFTER;
  const mainTitle = sliderResults[0]?.title_de;

  const galleryImages = galleryResults.length > 0
    ? galleryResults.map(r => r.after_image || r.before_image)
    : FALLBACK_GALLERY;

  return (
    <section className="relative py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
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
            className="text-4xl md:text-6xl font-bold text-black tracking-tight mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Before/After sliders — jedan po jedan ako ima više */}
        {sliderResults.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sliderResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BeforeAfterSlider
                  beforeImage={result.before_image}
                  afterImage={result.after_image}
                  beforeLabel={t.before}
                  afterLabel={t.after}
                  dragLabel={t.dragToCompare}
                  title={result.title_de}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <BeforeAfterSlider
              beforeImage={mainBefore}
              afterImage={mainAfter}
              beforeLabel={t.before}
              afterLabel={t.after}
              dragLabel={t.dragToCompare}
              title={mainTitle}
            />
          </motion.div>
        )}

        {/* Results Gallery */}
        {loaded && galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/70 group"
              >
                {src ? (
                  <ImageWithFallback
                    src={src}
                    alt={`Result ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className="size-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="size-5 text-gray-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">{tCommon.photo}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}