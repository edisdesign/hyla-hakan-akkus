import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { motion } from 'motion/react';
import { Check, Flame, Droplets } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { supabase, PricingConfig } from '@/app/lib/supabase';

interface HylaPricingSectionProps {
   language: Language;
}

// Default images per known model
const DEFAULT_IMAGES: Record<string, string> = {
   black: imgHylaBlack,
   white: imgHylaWhite,
};
const STEAM_BG = 'https://images.unsplash.com/photo-1568266783484-f9ebe82015f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
   const t = translations[language].pricing;
   const [products, setProducts] = useState<PricingConfig[]>([]);
   const [toggleState, setToggleState] = useState<Record<number, 'black' | 'white'>>({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      supabase
         .from('pricing_config')
         .select('*')
         .order('id')
         .then(({ data }) => {
            if (!data) { setLoading(false); return; }
            // Deduplicate by model
            const seen = new Set<string>();
            const deduped = data.filter((c: PricingConfig) => {
               if (seen.has(c.model)) return false;
               seen.add(c.model);
               return true;
            });
            setProducts(deduped);
            setLoading(false);
         });
   }, []);

   const handleWhatsApp = (config: PricingConfig) => {
      const text = config.cta_text || config.title;
      const waText = `Hallo! Ich interessiere mich für: ${config.title}.`;
      if (config.model === 'black') window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappBlack || waText)}`, '_blank');
      else if (config.model === 'white') window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappWhite || waText)}`, '_blank');
      else window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
   };

   // Split products: black+white pair together (toggle), rest are standalone
   const blackConfig = products.find(p => p.model === 'black');
   const whiteConfig = products.find(p => p.model === 'white');
   const otherProducts = products.filter(p => p.model !== 'black' && p.model !== 'white');

   // Has Black OR White (or both) → one combined card
   const hasBlackWhite = blackConfig || whiteConfig;

   // Toggle: which variant is active per "group 0"
   const activeVariant = toggleState[0] ?? 'black';
   const activeBW = activeVariant === 'white' && whiteConfig ? whiteConfig : (blackConfig ?? whiteConfig);

   if (loading) {
      return (
         <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
               {[1, 2].map(i => <div key={i} className="h-[600px] bg-gray-100 animate-pulse rounded-[3rem]" />)}
            </div>
         </section>
      );
   }

   // Build rendered cards list — at most 3 total
   const cards: React.ReactNode[] = [];

   // Card 1: Black/White (always first if exists)
   if (hasBlackWhite && activeBW) {
      const showToggle = !!(blackConfig && whiteConfig); // only show toggle if BOTH exist
      const currentImg = activeBW.image_url || DEFAULT_IMAGES[activeBW.model] || imgHylaBlack;

      cards.push(
         <motion.div
            key="bw-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500"
         >
            {/* Toggle (only when both black and white exist) */}
            {showToggle && (
               <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gray-100 shadow-sm">
                  <button
                     onClick={() => setToggleState(p => ({ ...p, 0: 'black' }))}
                     className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVariant === 'black' ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                  >
                     <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
                     Black
                  </button>
                  <button
                     onClick={() => setToggleState(p => ({ ...p, 0: 'white' }))}
                     className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVariant === 'white' ? 'bg-gray-100 text-black shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-700'}`}
                  >
                     <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-400 inline-block" />
                     White
                  </button>
               </div>
            )}

            {/* Image Area */}
            <div className="relative h-[380px] flex items-center justify-center p-10 overflow-hidden">
               <div className="absolute inset-0 bg-white" />
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
               <motion.img
                  key={activeBW.model}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  src={currentImg}
                  alt={activeBW.title}
                  className="relative z-10 w-auto object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                  style={{ maxHeight: '280px', height: '280px' }}
               />
            </div>

            {/* Content */}
            <div className="p-8 pt-6 flex-1 flex flex-col justify-between">
               <div>
                  {/* Action label */}
                  {activeBW.action_label && (
                     <div className="mb-3 inline-flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-3 py-1 text-xs font-bold">
                        🏷️ {activeBW.action_label}
                     </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <Droplets className="size-5 text-gray-400" />
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{activeBW.title}</h3>
                     </div>
                     {activeBW.badge && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeBW.model === 'black' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>
                           {activeBW.badge}
                        </span>
                     )}
                  </div>
                  {activeBW.financing_text && (
                     <div className="flex items-center gap-2 mb-6 opacity-60">
                        <div className="h-px w-8 bg-current" />
                        <p className="text-sm font-bold uppercase tracking-wider">{activeBW.financing_text}</p>
                     </div>
                  )}
                  {/* Extra for action */}
                  {activeBW.action_extra && (
                     <div className="mb-4 flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl px-3 py-2 text-sm font-bold">
                        🎁 {activeBW.action_extra}
                     </div>
                  )}
                  <ul className="space-y-3 mb-8">
                     {[activeBW.feature1, activeBW.feature2, activeBW.feature3].filter(Boolean).map((f, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <span className="flex items-center justify-center size-6 rounded-full bg-black/5"><Check className="size-3.5" /></span>
                           <span className="text-base font-medium">{f}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <Button
                  onClick={() => handleWhatsApp(activeBW)}
                  className="w-full h-14 rounded-full bg-black text-white text-base font-bold hover:bg-black/80 hover:scale-[1.02] transition-all px-6 cursor-pointer"
               >
                  {activeBW.cta_text || `Jetzt ${activeBW.title} bestellen`}
               </Button>
            </div>
         </motion.div>
      );
   }

   // Cards for other products (Steamer, etc.)
   otherProducts.forEach((config, idx) => {
      const isSteamer = config.model === 'steamer';
      const img = config.image_url;

      cards.push(
         <motion.div
            key={config.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx + 1) * 0.12 }}
            className={`group relative rounded-[3rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 ${isSteamer ? 'bg-[#0a0a0a] border border-white/10' : 'bg-[#F5F5F7] border border-gray-100'
               }`}
         >
            {/* Image / Visual Area */}
            <div className="relative h-[380px] overflow-hidden flex items-center justify-center">
               {img ? (
                  <>
                     <img src={img} alt={config.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                  </>
               ) : isSteamer ? (
                  <>
                     <ImageWithFallback src={STEAM_BG} alt="Steamer" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 group-hover:bg-white/20 transition-colors">
                           <Flame className="size-12 text-orange-400" />
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                     <span className="text-gray-300 text-6xl font-black">{config.title?.[0] ?? '?'}</span>
                  </div>
               )}
               {config.action_label && (
                  <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                     {config.action_label}
                  </div>
               )}
            </div>

            {/* Content */}
            <div className={`p-8 pt-6 flex-1 flex flex-col justify-between ${isSteamer ? 'text-white' : ''}`}>
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{config.title}</h3>
                     {config.badge && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isSteamer
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                              : 'bg-gray-200 text-gray-800 border-gray-200'
                           }`}>{config.badge}</span>
                     )}
                  </div>
                  {config.financing_text && (
                     <div className={`flex items-center gap-2 mb-6 opacity-60`}>
                        <div className="h-px w-8 bg-current" />
                        <p className="text-sm font-bold uppercase tracking-wider">{config.financing_text}</p>
                     </div>
                  )}
                  {config.action_extra && (
                     <div className={`mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${isSteamer ? 'bg-orange-500/10 text-orange-300 border border-orange-500/20' : 'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                        🎁 {config.action_extra}
                     </div>
                  )}
                  <ul className="space-y-3 mb-8">
                     {[config.feature1, config.feature2, config.feature3].filter(Boolean).map((f, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <span className={`flex items-center justify-center size-6 rounded-full ${isSteamer ? 'bg-white/10' : 'bg-black/5'}`}>
                              <Check className={`size-3.5 ${isSteamer ? 'text-orange-400' : ''}`} />
                           </span>
                           <span className={`text-base font-medium ${isSteamer ? 'text-white/80' : ''}`}>{f}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <Button
                  onClick={() => handleWhatsApp(config)}
                  className={`w-full h-14 rounded-full text-base font-bold hover:scale-[1.02] transition-all px-6 cursor-pointer ${isSteamer
                        ? 'bg-orange-500 hover:bg-orange-400 text-white'
                        : 'bg-black hover:bg-black/80 text-white'
                     }`}
               >
                  {config.cta_text || `Jetzt ${config.title} bestellen`}
               </Button>
            </div>
         </motion.div>
      );
   });

   if (cards.length === 0) return null;

   return (
      <section id="pricing" className="relative py-32 bg-white">
         <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
               >
                  {t?.title || 'Unsere Angebote'}
               </motion.h2>
               <p className="text-xl text-gray-500">
                  {t?.chooseAesthetic || 'Wählen Sie Ihr Modell. Professionelle Qualität.'}
               </p>
            </div>

            {/* Cards grid — adapts to number of cards */}
            <div className={`grid gap-8 ${cards.length === 1 ? 'max-w-xl mx-auto' : cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
               {cards}
            </div>

         </div>
      </section>
   );
}