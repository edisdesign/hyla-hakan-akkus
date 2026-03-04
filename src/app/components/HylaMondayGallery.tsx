import { useState, useEffect, useCallback } from 'react';
import { Language, translations } from '@/app/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICE_ADDRESS } from '@/app/constants';
import { supabase } from '@/app/lib/supabase';

interface HylaMondayGalleryProps {
  language: Language;
}

interface GalleryImage {
  url: string;
  alt: string;
}

// Fallback slike — koriste se dok baza nije popunjena
const FALLBACK_IMAGES: GalleryImage[] = [
  { url: 'https://images.unsplash.com/photo-1690191793747-0a8636edbf24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Team meeting presentation' },
  { url: 'https://images.unsplash.com/photo-1582183591295-9a2fe0170e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Networking event with drinks' },
  { url: 'https://images.unsplash.com/photo-1641998148499-cb6b55a3c0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Modern office space' },
  { url: 'https://images.unsplash.com/photo-1676276374429-3902f2666824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Team gathering workspace' },
  { url: 'https://images.unsplash.com/photo-1758691736545-5c33b6255dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Business presentation' },
];

export function HylaMondayGallery({ language }: HylaMondayGalleryProps) {
  const t = translations[language];
  const [activeId, setActiveId] = useState<number>(0);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(FALLBACK_IMAGES);

  const loadGallery = useCallback(() => {
    supabase
      .from('gallery')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        const images = (data ?? [])
          .filter((item: { image_url: string }) => !!item.image_url)
          .map((item: { image_url: string; caption: string }) => ({
            url: item.image_url,
            alt: item.caption || 'HYLA Gallery',
          }));
        if (images.length > 0) {
          setGalleryImages(images);
        } else {
          setGalleryImages(FALLBACK_IMAGES);
        }
      });
  }, []);

  useEffect(() => {
    loadGallery();
    window.addEventListener('hyla:gallery-updated', loadGallery);
    return () => window.removeEventListener('hyla:gallery-updated', loadGallery);
  }, [loadGallery]);

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Calendar className="w-4 h-4" />
              {t.mondayGallery.label}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {t.mondayGallery.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto md:mx-0">
              {t.mondayGallery.subtitle}
            </p>
          </div>

          {/* CTA Info */}
          <div className="flex-shrink-0 self-center md:self-end">
            <div className="inline-flex items-center gap-5 bg-black text-white rounded-2xl px-7 py-5">
              <div className="flex flex-col items-center border-r border-white/20 pr-5">
                <span className="text-3xl font-bold tracking-tight leading-none">19:00</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1">{t.mondayGallery.time.includes('PM') ? 'PM' : 'Uhr'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Location</span>
                <span className="text-sm font-medium leading-snug">{OFFICE_ADDRESS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Bento Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {galleryImages.map((image, index) => {
            const isActive = activeId === index;

            return (
              <motion.div
                layout
                key={index}
                onClick={() => setActiveId(index)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-500 ${isActive
                    ? 'md:col-span-2 md:row-span-2'
                    : 'col-span-1 row-span-1 opacity-80 hover:opacity-100'
                  }`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  layout
                  className="w-full h-full relative"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />

                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 text-white"
                    >
                      <p className="text-lg font-bold">{image.alt}</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}