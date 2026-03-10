import { useOutletContext, Link } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import {
  Flame, SprayCan, Bath, Shirt, PanelTop, Car,
  CalendarCheck, MessageCircle, Play, X,
  Shield, Zap, Globe, ChevronRight, Thermometer, Weight, Cable, Gauge,
  FlaskConical, Wind, ZoomIn, Package
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { WHATSAPP_NUMBER } from '@/app/constants';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Steamer Standard Accessories images
import imgStmSchlauch from "figma:asset/299e2fd73f7a08e6092cd6af3bf3223c7cd25c47.png";
import imgStmBodenGross from "figma:asset/ca072b73920f665a5ea2230188d578d7703810ff.png";
import imgStmBodenKlein from "figma:asset/af9fffa175ef0561505c5b96763b5daac5bdee98.png";
import imgStmDetailduesen from "figma:asset/ee64d1b6017eee771cda2647434fcd54cc38caa0.png";
import imgStmRohre from "figma:asset/1950c876d08b5d746b74fd97d7963d0450014fc2.png";
import imgStmRundbuersteNylon from "figma:asset/126eeaf2605e025214e289d93d5af9f385e9914b.png";
import imgStmRundbuersteFilz from "figma:asset/81426b27c09540ea5df68f7e347f5b8ff14ca272.png";
import imgStmAdapter from "figma:asset/4dab600cc80529a35f3b0ff656c60563ab5be6f6.png";
import imgStmPunktNylon from "figma:asset/b47ce57bc9eeae5c74cc530a20f2c996e25d4322.png";
import imgStmPunktNatur from "figma:asset/816fd4c4d92e6a8a65e5641a44faf3a2839249d1.png";
import imgStmRundbuersteStahl from "figma:asset/32163882e76dfa640a86bd71be81671c5634d87e.png";
import imgStmRundbuersteMessin from "figma:asset/589ec9fecf729a789e50cfa589e6d992897c602f.png";
import imgStmEinfuellflasche from "figma:asset/0987b2c7c4db264bc3d23f5eb0b71ea381a86a2f.png";
import imgStmBodentuchGross from "figma:asset/3ea8a6f472b5556afade6a4f65331a3d9a10d877.png";
import imgStmBodentuchKlein from "figma:asset/3e15d386320bd90f19abd8da6c76397f16705ef6.png";
import imgStmFrotteetuecher from "figma:asset/a49938f17f50f39238629d7203d790b0af213cd2.png";

// ── Before/After & result images for the collage ──────────────────────────────
const IMG_VORHER_FUGEN = 'https://images.unsplash.com/photo-1667923869411-f998f790ce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_NACHHER_BAD = 'https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_VORHER_KUECHE = 'https://images.unsplash.com/photo-1646023385379-00d0afb0319c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_NACHHER_KUECHE = 'https://images.unsplash.com/photo-1769259614866-e6f8ed878444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_DAMPF_ACTION = 'https://images.unsplash.com/photo-1768733993357-722d07ffd7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_SOFA = 'https://images.unsplash.com/photo-1594819043886-58bd40725699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_AUTO = 'https://images.unsplash.com/photo-1727940334409-36a3407d623a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const videoIds = [
  'j9-RZr7NIQk', 'rN_66vI98EQ', 'HEnB6dHLdh4',
  '6w9IMl0ORoE', 'Lrz7Jonn8pk', '4fCf4WBUvA4',
  'smlIrQsDMWg', 'P9aZOyf-tmw',
];

// ── Interactive Video Grid — original hero hover/click behaviour ───────────────
const InteractiveVideoGrid = ({
  videos,
  initialActiveIndex = 0,
  language,
}: {
  videos: string[];
  initialActiveIndex?: number;
  language: Language;
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
      {videos.map((id, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.div
            layout
            key={id}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            className={`relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer transition-colors duration-300 ${isActive
                ? 'col-span-2 row-span-2 ring-1 ring-white/20 z-10'
                : 'col-span-1 row-span-1 hover:ring-1 hover:ring-white/30 hover:bg-white/5 opacity-80 hover:opacity-100'
              }`}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full bg-black"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&playsinline=1`}
                    title={`HYLA Steamer ${id}`}
                    className="absolute inset-0 w-full h-full object-cover border-0"
                    allow="autoplay; encrypted-media"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              ) : (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/maxresdefault.jpg)` }}
                >
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 left-4 z-20"
              >
                <div className="bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 px-[12px] py-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    {translations[language].common.liveDemo}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// ── Video Lightbox ─────────────────────────────────────────────────────────────
function VideoLightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="HYLA Steamer"
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Schließen"
      >
        <X className="size-8" />
      </button>
    </motion.div>
  );
}

// ── Image Lightbox ─────────────────────────────────────────────────────────────
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={src.replace('w=800', 'w=1600')}
          alt={alt}
          className="w-full h-auto object-contain"
          style={{ maxHeight: '85vh' }}
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Schließen"
      >
        <X className="size-8" />
      </button>
    </motion.div>
  );
}

// ── Collage types ──────────────────────────────────────────────────────────────
type CollageItem =
  | { kind: 'video'; videoId: string }
  | { kind: 'image'; src: string; alt: string; badge?: 'vorher' | 'nachher'; label?: string };

function CollageCell({
  item,
  onVideoClick,
  onImageClick,
}: {
  item: CollageItem;
  onVideoClick: (id: string) => void;
  onImageClick: (src: string, alt: string) => void;
}) {
  if (item.kind === 'video') {
    const thumb = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
    return (
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group bg-black"
        onClick={() => onVideoClick(item.videoId)}
      >
        <img
          src={thumb}
          alt="HYLA Steamer Video"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
            <Play className="size-6 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-white">Video</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden group bg-gray-900 cursor-zoom-in"
      onClick={() => onImageClick(item.src, item.alt)}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Zoom hint overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <ZoomIn className="size-4 text-white" />
        </div>
      </div>
      {item.badge && (
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-sm ${item.badge === 'vorher'
              ? 'bg-red-500/90 text-white border border-red-400/50'
              : 'bg-emerald-500/90 text-white border border-emerald-400/50'
            }`}
        >
          {item.badge === 'vorher' ? '● Vorher' : '✓ Nachher'}
        </div>
      )}
      {item.label && (
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-white text-xs font-bold tracking-wide drop-shadow">{item.label}</span>
        </div>
      )}
    </div>
  );
}

function SteamerCollage({
  onVideoClick,
  onImageClick,
}: {
  onVideoClick: (id: string) => void;
  onImageClick: (src: string, alt: string) => void;
}) {
  const items: CollageItem[] = [
    { kind: 'video', videoId: videoIds[0] },
    { kind: 'video', videoId: videoIds[1] },
    { kind: 'video', videoId: videoIds[2] },
    { kind: 'video', videoId: videoIds[3] },
  ];

  // For 4 videos, let's just make a simple 2x2 grid
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 300px)',
      }}
    >
      {items.map((item, i) => {
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full h-full"
          >
            <CollageCell item={item} onVideoClick={onVideoClick} onImageClick={onImageClick} />
          </motion.div>
        );
      })}
    </div>
  );
}

function SteamerCollageMobile({
  onVideoClick,
  onImageClick,
}: {
  onVideoClick: (id: string) => void;
  onImageClick: (src: string, alt: string) => void;
}) {
  const items: CollageItem[] = [
    { kind: 'video', videoId: videoIds[0] },
    { kind: 'video', videoId: videoIds[1] },
    { kind: 'video', videoId: videoIds[2] },
    { kind: 'video', videoId: videoIds[3] },
  ];

  // Mobile layout for 4 videos
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="h-[220px] w-full"
        >
          <CollageCell item={item} onVideoClick={onVideoClick} onImageClick={onImageClick} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function HylaSteamerPage() {
  const { language } = useOutletContext<{ language: Language }>();
  const t = translations[language].steamerPage;
  const tSteamer = translations[language].steamerSection;
  const tCommon = translations[language].common;
  const heroRef = useRef<HTMLDivElement>(null);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const handleWhatsApp = (type: 'demo' | 'contact' = 'demo') => {
    const demoMsg: Record<string, string> = {
      de: 'Hallo! Ich möchte gerne eine Vorführung des HYLA Steamers vereinbaren.',
      en: 'Hello! I would like to schedule a HYLA Steamer demonstration.',
      tr: 'Merhaba! HYLA Steamer için bir tanıtım randevusu almak istiyorum.',
    };
    const contactMsg: Record<string, string> = {
      de: 'Hallo! Ich interessiere mich für den HYLA Steamer. Bitte kontaktieren Sie mich.',
      en: 'Hello! I am interested in the HYLA Steamer. Please contact me.',
      tr: 'Merhaba! HYLA Steamer ile ilgileniyorum. Lütfen benimle iletişime geçin.',
    };
    const msg = type === 'demo' ? demoMsg : contactMsg;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg[language] || msg.de)}`, '_blank');
  };

  const features = [
    { icon: SprayCan, title: t.featureFloor, desc: t.featureFloorDesc },
    { icon: Flame, title: t.featureKitchen, desc: t.featureKitchenDesc },
    { icon: Bath, title: t.featureBath, desc: t.featureBathDesc },
    { icon: Shirt, title: t.featureTextile, desc: t.featureTextileDesc },
    { icon: PanelTop, title: t.featureWindow, desc: t.featureWindowDesc },
    { icon: Car, title: t.featureAuto, desc: t.featureAutoDesc },
  ];

  const mainStats = [
    { value: '7 Bar', label: tSteamer.specPressure, icon: Gauge },
    { value: '100°C+', label: t.bacteria, icon: Thermometer },
    { value: '~6 Min', label: tSteamer.specHeatup, icon: Zap },
    { value: 'INOX', label: tSteamer.specMaterial, icon: Shield },
  ];

  const extraSpecs = [
    { icon: FlaskConical, label: tSteamer.specTank, value: tSteamer.specTankValue },
    { icon: Cable, label: tSteamer.specCable, value: tSteamer.specCableValue },
    { icon: Weight, label: tSteamer.specWeight, value: tSteamer.specWeightValue },
    { icon: Wind, label: tSteamer.specAccessories, value: tSteamer.specAccessoriesValue },
  ];

  const heroVideosSet = videoIds.slice(0, 6);

  const sectionVideoTitle: Record<Language, string> = {
    de: 'Sehen Sie den Steamer in Aktion.',
    en: 'See the Steamer in Action.',
    tr: 'Steameri İş Başında Görün.',
    sr: 'Pogledajte Steamer u akciji.',
  };
  const sectionResultsSubtitle: Record<Language, string> = {
    de: 'Videos, Vorher-Nachher-Bilder und Ergebnisse aus dem echten Einsatz.',
    en: 'Videos, before-and-after images and results from real use.',
    tr: 'Videolar, önce-sonra görseller ve gerçek kullanım sonuçları.',
    sr: 'Video snimci, pre-posle slike i rezultati iz stvarne upotrebe.',
  };

  const steamerAccessories: Record<string, { name: string; desc: string }[]> = {
    de: [
      { name: 'Dampfschlauch', desc: 'Flexibler Schlauch mit ergonomischem Pistolengriff für komfortable Bedienung.' },
      { name: 'Große Bodendüse', desc: 'Breite Bodendüse mit Bürstenleiste für großflächige Reinigung.' },
      { name: 'Kleine Bodendüse', desc: 'Kompakte Handbodenduese für kleinere Flächen und Detailarbeit.' },
      { name: 'Detaildüsen (2×)', desc: 'Spitze Präzisionsdüsen für Fugen, Ecken und schwer zugängliche Stellen.' },
      { name: 'Verlängerungsrohre (2×)', desc: 'Robuste Verlängerungsrohre für optimale Reichweite bei der Bodenreinigung.' },
      { name: 'Rundbürste (Nylon)', desc: 'Runde Nylonbürste für hartnäckige Verschmutzungen auf robusten Oberflächen.' },
      { name: 'Rundbürste (Filz)', desc: 'Weicher Filzaufsatz für empfindliche Oberflächen und sanfte Dampfpflege.' },
      { name: 'Düsenadapter', desc: 'Metallischer Adapter für den Anschluss verschiedener Aufsätze.' },
      { name: 'Punktstrahldüse (Nylon)', desc: 'Kleine Rundbürste mit Nylonborsten für punktuelles Dampfreinigen.' },
      { name: 'Punktstrahldüse (Naturhaar)', desc: 'Kleine Rundbürste mit Naturhaarborsten für schonende Punktreinigung.' },
      { name: 'Rundbürste (Edelstahl)', desc: 'Edelstahl-Rundbürste für besonders hartnäckige Verkrustungen und Kalkablagerungen.' },
      { name: 'Rundbürste (Messing)', desc: 'Messingbürste für gründliche Reinigung empfindlicher metallischer Oberflächen.' },
      { name: 'Einfüllflasche', desc: 'Praktische Nachfüllflasche zum sicheren und sauberen Befüllen des Wassertanks.' },
      { name: 'Bodentuch (groß)', desc: 'Mikrofaser-Bodentuch für die große Bodendüse – waschbar und wiederverwendbar.' },
      { name: 'Bodentuch (klein)', desc: 'Mikrofaser-Bodentuch für die kleine Bodendüse – ideal für enge Bereiche.' },
      { name: 'Frotteetücher (3×)', desc: 'Drei hochwertige Frotteetücher zum Nachwischen und Trocknen nach der Dampfreinigung.' },
    ],
    en: [
      { name: 'Steam Hose', desc: 'Flexible hose with ergonomic pistol grip for comfortable operation.' },
      { name: 'Large Floor Nozzle', desc: 'Wide floor nozzle with brush strip for large-area cleaning.' },
      { name: 'Small Floor Nozzle', desc: 'Compact hand floor nozzle for smaller areas and detail work.' },
      { name: 'Detail Nozzles (2×)', desc: 'Pointed precision nozzles for grout, corners and hard-to-reach spots.' },
      { name: 'Extension Tubes (2×)', desc: 'Robust extension tubes for optimal reach during floor cleaning.' },
      { name: 'Round Brush (Nylon)', desc: 'Round nylon brush for stubborn dirt on robust surfaces.' },
      { name: 'Round Brush (Felt)', desc: 'Soft felt attachment for delicate surfaces and gentle steam care.' },
      { name: 'Nozzle Adapter', desc: 'Metal adapter for connecting various attachments.' },
      { name: 'Point Jet Brush (Nylon)', desc: 'Small round brush with nylon bristles for targeted steam cleaning.' },
      { name: 'Point Jet Brush (Natural)', desc: 'Small round brush with natural bristles for gentle spot cleaning.' },
      { name: 'Round Brush (Steel)', desc: 'Stainless steel round brush for particularly stubborn encrustations and limescale.' },
      { name: 'Round Brush (Brass)', desc: 'Brass brush for thorough cleaning of sensitive metallic surfaces.' },
      { name: 'Filling Bottle', desc: 'Practical refill bottle for safe and clean filling of the water tank.' },
      { name: 'Floor Cloth (Large)', desc: 'Microfiber floor cloth for the large floor nozzle – washable and reusable.' },
      { name: 'Floor Cloth (Small)', desc: 'Microfiber floor cloth for the small floor nozzle – ideal for tight areas.' },
      { name: 'Terry Towels (3×)', desc: 'Three high-quality terry towels for wiping and drying after steam cleaning.' },
    ],
    tr: [
      { name: 'Buhar Hortumu', desc: 'Rahat kullanım için ergonomik tabancalı tutma sapıyla esnek hortum.' },
      { name: 'Büyük Zemin Başlığı', desc: 'Geniş alan temizliği için fırça şeritli geniş zemin başlığı.' },
      { name: 'Küçük Zemin Başlığı', desc: 'Küçük alanlar ve detay çalışmaları için kompakt el zemin başlığı.' },
      { name: 'Detay Başlıkları (2×)', desc: 'Derz, köşe ve ulaşılması zor noktalar için sivri hassas başlıklar.' },
      { name: 'Uzatma Boruları (2×)', desc: 'Zemin temizliğinde optimum erişim için sağlam uzatma boruları.' },
      { name: 'Yuvarlak Fırça (Naylon)', desc: 'Sağlam yüzeylerdeki inatçı kirler için yuvarlak naylon fırça.' },
      { name: 'Yuvarlak Fırça (Keçe)', desc: 'Hassas yüzeyler ve nazik buharlı bakım için yumuşak keçe ataşmanı.' },
      { name: 'Başlık Adaptörü', desc: 'Çeşitli ataşmanların bağlantısı için metal adaptör.' },
      { name: 'Nokta Püskürtme (Naylon)', desc: 'Hedefli buharlı temizlik için naylon kıllı küçük yuvarlak fırça.' },
      { name: 'Nokta Püskürtme (Doğal)', desc: 'Nazik nokta temizliği için doğal kıllı küçük yuvarlak fırça.' },
      { name: 'Yuvarlak Fırça (Çelik)', desc: 'Özellikle inatçı kabuklar ve kireç birikintileri için paslanmaz çelik fırça.' },
      { name: 'Yuvarlak Fırça (Pirinç)', desc: 'Hassas metalik yüzeylerin kapsamlı temizliği için pirinç fırça.' },
      { name: 'Doldurma Şişesi', desc: 'Su tankının güvenli ve temiz doldurulması için pratik doldurma şişesi.' },
      { name: 'Zemin Bezi (Büyük)', desc: 'Büyük zemin başlığı için mikrofiber zemin bezi – yıkanabilir ve yeniden kullanılabilir.' },
      { name: 'Zemin Bezi (Küçük)', desc: 'Küçük zemin başlığı için mikrofiber zemin bezi – dar alanlar için ideal.' },
      { name: 'Havlu Bezleri (3×)', desc: 'Buharlı temizlik sonrası silme ve kurutma için üç adet kaliteli havlu.' },
    ],
    sr: [
      { name: 'Parno crevo', desc: 'Fleksibilno crevo sa ergonomskom pištolj ručkom za udobnu upotrebu.' },
      { name: 'Veliki nastavak za pod', desc: 'Široki nastavak sa četkom za čišćenje velikih površina.' },
      { name: 'Mali nastavak za pod', desc: 'Kompaktni ručni nastavak za manje površine i detaljni rad.' },
      { name: 'Detaljne mlaznice (2×)', desc: 'Precizne mlaznice za fuge, uglove i teško dostupna mesta.' },
      { name: 'Produžne cevi (2×)', desc: 'Robusne produžne cevi za optimalan domet pri čišćenju podova.' },
      { name: 'Okrugla četka (najlon)', desc: 'Okrugla najlon četka za tvrdokornu prljavštinu na čvrstim površinama.' },
      { name: 'Okrugla četka (filc)', desc: 'Meki filc nastavak za osetljive površine i nežnu parnu negu.' },
      { name: 'Adapter za mlaznicu', desc: 'Metalni adapter za priključak raznih nastavaka.' },
      { name: 'Tačkasta mlaznica (najlon)', desc: 'Mala okrugla četka sa najlon vlaknima za ciljano parno čišćenje.' },
      { name: 'Tačkasta mlaznica (prirodna)', desc: 'Mala okrugla četka sa prirodnom dlakom za nežno tačkasto čišćenje.' },
      { name: 'Okrugla četka (čelik)', desc: 'Četka od nerđajućeg čelika za posebno tvrdokorne naslage i kamenac.' },
      { name: 'Okrugla četka (mesing)', desc: 'Mesing četka za temeljno čišćenje osetljivih metalnih površina.' },
      { name: 'Boca za punjenje', desc: 'Praktična boca za sigurno i čisto punjenje rezervoara za vodu.' },
      { name: 'Krpa za pod (velika)', desc: 'Mikrofiberna krpa za veliki nastavak – periva i višekratna upotreba.' },
      { name: 'Krpa za pod (mala)', desc: 'Mikrofiberna krpa za mali nastavak – idealna za uske prostore.' },
      { name: 'Frotir peškiri (3×)', desc: 'Tri kvalitetna frotir peškira za brisanje i sušenje nakon parnog čišćenja.' },
    ],
  };

  const steamerAccImages = [
    imgStmSchlauch,
    imgStmBodenGross,
    imgStmBodenKlein,
    imgStmDetailduesen,
    imgStmRohre,
    imgStmRundbuersteNylon,
    imgStmRundbuersteFilz,
    imgStmAdapter,
    imgStmPunktNylon,
    imgStmPunktNatur,
    imgStmRundbuersteStahl,
    imgStmRundbuersteMessin,
    imgStmEinfuellflasche,
    imgStmBodentuchGross,
    imgStmBodentuchKlein,
    imgStmFrotteetuecher,
  ];

  return (
    <div className="relative">
      <AnimatePresence>
        {lightboxVideo && (
          <VideoLightbox key="vlb" videoId={lightboxVideo} onClose={() => setLightboxVideo(null)} />
        )}
        {lightboxImage && (
          <ImageLightbox
            key="ilb"
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1604838656896-171d9d737cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left Content ── */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full mb-8"
              >
                {/* Green pulse dot — like the HYLA power LED */}
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">{tSteamer.newInPortfolio}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
              >
                HYLA
                <br />
                {/* Modern green — electric, like the HYLA power button when ON */}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #00e676 0%, #69f0ae 50%, #b9f6ca 100%)',
                    filter: 'drop-shadow(0 0 28px rgba(0,230,118,0.4))',
                  }}
                >
                  Steamer.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-400 mb-8 max-w-lg"
              >
                {t.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                {[
                  { icon: Shield, text: t.noChemicals },
                  { icon: Zap, text: t.professionalGrade },
                  { icon: Globe, text: tSteamer.feature3.split('–')[0].trim() },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <item.icon className="size-4" />
                    {item.text}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  onClick={() => handleWhatsApp('demo')}
                  className="h-14 px-8 text-base font-bold rounded-full bg-white text-black hover:bg-gray-200 shadow-2xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  <CalendarCheck className="size-5 mr-2" />
                  {t.heroButton}
                </Button>
                <Button
                  onClick={() => handleWhatsApp('contact')}
                  variant="outline"
                  className="h-14 px-8 text-base font-bold rounded-full border-white/30 text-white hover:bg-white hover:text-black transition-all bg-transparent cursor-pointer"
                >
                  <MessageCircle className="size-5 mr-2" />
                  {t.ctaWhatsapp}
                </Button>
              </motion.div>
            </div>

            {/* ── Right: Original Interactive Video Grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0 order-1 lg:order-2 mb-10 lg:mb-0"
            >
              {/* Green glow instead of orange */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-500/10 rounded-[3rem] blur-3xl scale-125" />
              <div className="relative p-2 md:p-4">
                <InteractiveVideoGrid
                  videos={heroVideosSet}
                  initialActiveIndex={0}
                  language={language}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURES STRIP ══════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[tSteamer.feature1, tSteamer.feature2, tSteamer.feature3].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center">
                    {(() => { const Icon = [Shield, Zap, Globe][i]; return <Icon className="size-5 text-white/60" />; })()}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIE KRAFT DES DAMPFES ═══════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Flame className="size-4 text-green-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">{tCommon.steamPower}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
              >
                {t.powerTitle}
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              {t.powerDesc}
            </motion.p>
          </div>

          {/* 4 Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {mainStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative group bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 text-center overflow-hidden"
              >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <stat.icon className="size-10 text-green-500" />
                </div>
                <div className="text-3xl md:text-4xl font-black tracking-tight mb-1 text-black">{stat.value}</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Extra Specs pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
          >
            {extraSpecs.map((spec, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm hover:border-green-200 hover:bg-green-50/50 transition-colors duration-300"
              >
                <spec.icon className="size-3.5 text-green-500 flex-shrink-0" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{spec.label}:</span>
                <span className="text-xs font-black text-black">{spec.value}</span>
              </div>
            ))}
          </motion.div>

          {/* 6 Application Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group bg-[#FAFAFA] rounded-3xl p-7 border border-gray-100 hover:bg-white hover:border-green-100 hover:shadow-xl transition-all duration-500"
              >
                <div className="size-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => handleWhatsApp('demo')}
              className="h-14 px-10 text-base font-bold rounded-full bg-black text-white hover:bg-gray-900 shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              <CalendarCheck className="size-5 mr-2" />
              {t.ctaButton}
            </Button>
            <Button
              onClick={() => handleWhatsApp('contact')}
              variant="outline"
              className="h-14 px-10 text-base font-bold rounded-full border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              <MessageCircle className="size-5 mr-2" />
              {t.ctaWhatsapp}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══ STEAMER IN AKTION — Mixed Media Collage ════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-8 h-px bg-green-500/60" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-500/80">{t.videoSectionTitle}</span>
              <span className="w-8 h-px bg-green-500/60" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4"
            >
              {sectionVideoTitle[language]}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 max-w-xl mx-auto"
            >
              {sectionResultsSubtitle[language]}
            </motion.p>
          </div>

          {/* Desktop collage */}
          <div className="hidden lg:block">
            <SteamerCollage
              onVideoClick={setLightboxVideo}
              onImageClick={(src, alt) => setLightboxImage({ src, alt })}
            />
          </div>

          {/* Mobile collage */}
          <div className="lg:hidden">
            <SteamerCollageMobile
              onVideoClick={setLightboxVideo}
              onImageClick={(src, alt) => setLightboxImage({ src, alt })}
            />
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-14"
          >
            <Button
              onClick={() => handleWhatsApp('demo')}
              className="h-14 px-10 text-base font-bold rounded-full bg-white text-black hover:bg-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              <CalendarCheck className="size-5 mr-2" />
              {t.ctaButton}
            </Button>
            <Button
              onClick={() => handleWhatsApp('contact')}
              variant="outline"
              className="h-14 px-10 text-base font-bold rounded-full border-white/20 text-white hover:bg-white hover:text-black transition-all bg-transparent cursor-pointer"
            >
              <MessageCircle className="size-5 mr-2" />
              {t.ctaWhatsapp}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══ STANDARD ACCESSORIES ════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Package className="size-4 text-green-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">{t.sectionLabel}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              {t.accessoriesTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-10"
            >
              {t.accessoriesSubtitle}
            </motion.p>
          </div>

          {/* Included note */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <span className="size-2 rounded-full bg-green-500" />
              {t.includedNote}
            </span>
          </div>

          {/* Accessories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {(steamerAccessories[language] || steamerAccessories.de).map((acc, i) => (
              <motion.div
                key={acc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div className="relative aspect-square bg-white flex items-center justify-center p-6 md:p-8 overflow-hidden">
                  <img
                    src={steamerAccImages[i]}
                    alt={acc.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h4 className="text-sm md:text-base font-bold mb-1 tracking-tight">{acc.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">{acc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CROSS-LINK: DISCOVER EST ════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              {t.alsoDiscover}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl bg-black overflow-hidden p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="absolute inset-0 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 text-center lg:text-left">
              <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">HYLA EST</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t.discoverEst}</h3>
            </div>
            <div className="relative z-10">
              <Button
                asChild
                className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              >
                <Link to="/est">
                  {t.discoverEst}
                  <ChevronRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}