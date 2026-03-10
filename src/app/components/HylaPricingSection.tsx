import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, Droplets } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { supabase, PricingConfig } from '@/app/lib/supabase';

interface HylaPricingSectionProps {
   language: Language;
}

const STEAM_BG = 'https://images.unsplash.com/photo-1568266783484-f9ebe82015f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

// A model/title contains "steam" → render as dark steamer card
function isSteamerCard(model: string, title: string) {
   return (model + title).toLowerCase().includes('steam');
}

// Try to get a default image for brand products
function brandImage(title: string): string | undefined {
   const s = title.toLowerCase();
   if (s.includes('white')) return imgHylaWhite;
   if (s.includes('black') || s.includes('hyla')) return imgHylaBlack;
   return undefined;
}

interface ProductVariant {
   name: string;
   title: string;
   badge: string;
   financing_text: string;
   feature1: string;
   feature2: string;
   feature3: string;
   cta_text: string;
   image_url?: string;
}

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
   const t = translations[language].pricing;
   const [products, setProducts] = useState<PricingConfig[]>([]);
   const [variants, setVariants] = useState<Record<number, ProductVariant>>({});
   const [actions, setActions] = useState<Record<number, { label: string; extra: string }>>({});
   const [images, setImages] = useState<Record<number, string>>({});
   // Which version is active? 'main' or 'variant'
   const [activeView, setActiveView] = useState<Record<number, 'main' | 'variant'>>({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const load = async () => {
         const { data: raw } = await supabase.from('pricing_config').select('*').order('id');
         if (!raw) { setLoading(false); return; }
         setProducts(raw as PricingConfig[]);

         // Load ALL site_settings to get variants, actions, and overriding main images
         const { data: settings } = await supabase.from('site_settings').select('key, value');
         const varMap: Record<number, ProductVariant> = {};
         const actMap: Record<number, { label: string; extra: string }> = {};
         const imgMap: Record<number, string> = {};

         if (settings) {
            settings.forEach((row: { key: string; value: string }) => {
               if (row.key.startsWith('product_variant_')) {
                  const id = parseInt(row.key.replace('product_variant_', ''));
                  try { varMap[id] = JSON.parse(row.value); } catch { /* ignore */ }
               }
               if (row.key === 'product_actions') {
                  try { Object.assign(actMap, JSON.parse(row.value)); } catch { /* ignore */ }
               }
               if (row.key.startsWith('product_image_')) {
                  const id = parseInt(row.key.replace('product_image_', ''));
                  imgMap[id] = row.value;
               }
            });
         }
         setVariants(varMap);
         setActions(actMap);
         setImages(imgMap);
         setLoading(false);
      };
      load();
   }, []);

   const handleWhatsApp = (title: string) => {
      const waText = t?.whatsappBlack ? t.whatsappBlack.replace('HYLA Black', title) : `Hallo! Ich interessiere mich für: ${title}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
   };

   if (loading) {
      return (
         <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
               {[1, 2].map(i => <div key={i} className="h-[600px] bg-gray-100 animate-pulse rounded-[3rem]" />)}
            </div>
         </section>
      );
   }

   if (products.length === 0) return null;

   return (
      <section id="pricing" className="relative py-32 bg-white">
         <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

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
                  {t?.chooseAesthetic || 'Entdecken Sie unsere Produkte. Professionelle Qualität.'}
               </p>
            </div>

            {/* Cards */}
            <div className={`grid gap-8 ${products.length === 1 ? 'max-w-xl mx-auto' :
               products.length === 2 ? 'md:grid-cols-2' :
                  'md:grid-cols-2 lg:grid-cols-3'
               }`}>
               {products.map((config, idx) => {
                  const act = actions[config.id];
                  const hasAction = act && act.label !== '';
                  const variant = variants[config.id];
                  const hasVariant = !!variant;
                  const view = activeView[config.id] ?? 'main';

                  // Select current data based on view
                  const currentData = view === 'variant' && variant ? variant : config;
                  // Main image logic: check images[id] overriding from site_settings, then original config.image_url, then fallback brand
                  const mainImageURL = images[config.id] || config.image_url || brandImage(config.title) || imgHylaBlack;
                  const currentImg = view === 'variant' && variant ? (variant.image_url || brandImage(variant.title) || imgHylaWhite) : mainImageURL;

                  // ── STANDARD CARD — switch between main and variant if exists ──
                  const isVariantView = view === 'variant';

                  return (
                     <motion.div
                        key={config.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.12 }}
                        className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500"
                     >
                        {/* Action Banner */}
                        {hasAction && (
                           <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 px-6 shadow-lg z-40 transform origin-top hover:scale-y-105 transition-transform flex items-center justify-between pointer-events-none">
                              <span className="text-[11px] font-black uppercase tracking-widest">{act.label}</span>
                              {act.extra && <span className="text-[10px] font-bold opacity-90">{act.extra}</span>}
                           </div>
                        )}

                        {/* Switcher (if variant exists) */}
                        {hasVariant && (
                           <div className={`absolute left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 border shadow-sm transition-all duration-300 ${hasAction ? 'top-12 border-orange-100' : 'top-6 border-gray-100'}`}>
                              <button
                                 onClick={() => setActiveView(p => ({ ...p, [config.id]: 'main' }))}
                                 className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${!isVariantView ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                              >
                                 Original
                              </button>
                              <button
                                 onClick={() => setActiveView(p => ({ ...p, [config.id]: 'variant' }))}
                                 className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isVariantView ? 'bg-gray-100 text-black shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-700'}`}
                              >
                                 {variant.name || 'Variante'}
                              </button>
                           </div>
                        )}

                        {/* Image */}
                        <div className={`relative h-[380px] flex items-center justify-center p-10 overflow-hidden ${hasAction ? 'mt-4' : ''}`}>
                           <div className="absolute inset-0 bg-white" />
                           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
                           <AnimatePresence mode="wait">
                              <motion.img
                                 key={`${config.id}-${view}`}
                                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                 animate={{ opacity: 1, scale: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                 transition={{ duration: 0.35, ease: "easeOut" }}
                                 src={currentImg}
                                 alt={currentData.title}
                                 className="relative z-10 object-contain group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                                 style={{ maxHeight: '280px', height: '280px' }}
                              />
                           </AnimatePresence>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-6 flex-1 flex flex-col justify-between relative z-10">
                           <AnimatePresence mode="wait">
                              <motion.div
                                 key={`${config.id}-${view}-content`}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 10 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                       <Droplets className="size-5 text-gray-400" />
                                       <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                          {currentData.title}
                                       </h3>
                                    </div>
                                    {currentData.badge && !hasAction && (
                                       <span className={`text-xs font-bold px-3 py-1 rounded-full ${isVariantView ? 'bg-gray-200 text-gray-800' : 'bg-black text-white'}`}>
                                          {currentData.badge}
                                       </span>
                                    )}
                                 </div>
                                 {currentData.financing_text && (
                                    <div className="flex items-center gap-2 mb-6 opacity-60">
                                       <div className="h-px w-8 bg-current" />
                                       <p className="text-sm font-bold uppercase tracking-wider">{currentData.financing_text}</p>
                                    </div>
                                 )}
                                 <ul className="space-y-3 mb-8">
                                    {[currentData.feature1, currentData.feature2, currentData.feature3].filter(Boolean).map((f, i) => (
                                       <li key={i} className="flex items-center gap-3">
                                          <span className="flex items-center justify-center size-6 rounded-full bg-black/5">
                                             <Check className="size-3.5" />
                                          </span>
                                          <span className="text-base font-medium">{f}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </motion.div>
                           </AnimatePresence>
                           <Button
                              onClick={() => handleWhatsApp(currentData.title)}
                              className="w-full h-14 rounded-full bg-black text-white text-base font-bold hover:bg-black/80 hover:scale-[1.02] transition-all cursor-pointer mt-auto"
                           >
                              {currentData.cta_text || `Jetzt bestellen`}
                           </Button>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>
   );
}