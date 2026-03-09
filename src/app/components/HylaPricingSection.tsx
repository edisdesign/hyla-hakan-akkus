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

const STEAM_BG = 'https://images.unsplash.com/photo-1568266783484-f9ebe82015f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

// A model/title contains "steam" → render as dark steamer card
function isSteamerCard(model: string, title: string) {
   return (model + title).toLowerCase().includes('steam');
}

// Try to get a default image for brand products
function brandImage(model: string, title: string): string | undefined {
   const s = (model + title).toLowerCase();
   if (s.includes('white')) return imgHylaWhite;
   if (s.includes('black') || s.includes('hyla')) return imgHylaBlack;
   return undefined;
}

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
   const t = translations[language].pricing;
   const [products, setProducts] = useState<PricingConfig[]>([]);
   // toggleState[id] = 'black' | 'white'
   const [activeVariant, setActiveVariant] = useState<Record<number, 'black' | 'white'>>({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      supabase
         .from('pricing_config')
         .select('*')
         .order('id')
         .then(({ data }) => {
            if (!data) { setLoading(false); return; }
            // Deduplicate by model name
            const seen = new Set<string>();
            const deduped = (data as PricingConfig[]).filter(c => {
               if (seen.has(c.model)) return false;
               seen.add(c.model);
               return true;
            });
            setProducts(deduped);
            setLoading(false);
         });
   }, []);

   const handleWhatsApp = (config: PricingConfig) => {
      const waText = `Hallo! Ich interessiere mich für: ${config.title}.`;
      const txt =
         config.model === 'black' ? (t?.whatsappBlack || waText) :
            config.model === 'white' ? (t?.whatsappWhite || waText) :
               waText;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`, '_blank');
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
                  {t?.chooseAesthetic || 'Wählen Sie Ihr Modell. Professionelle Qualität.'}
               </p>
            </div>

            {/* Cards */}
            <div className={`grid gap-8 ${products.length === 1 ? 'max-w-xl mx-auto' :
                  products.length === 2 ? 'md:grid-cols-2' :
                     'md:grid-cols-2 lg:grid-cols-3'
               }`}>
               {products.map((config, idx) => {
                  // ── STEAMER CARD ──
                  if (isSteamerCard(config.model, config.title)) {
                     return (
                        <motion.div
                           key={config.id}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.12 }}
                           className="group relative bg-[#0a0a0a] rounded-[3rem] overflow-hidden flex flex-col border border-white/10 hover:shadow-2xl transition-all duration-500"
                        >
                           <div className="relative h-[380px] overflow-hidden">
                              {config.image_url ? (
                                 <img src={config.image_url} alt={config.title}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                              ) : (
                                 <>
                                    <ImageWithFallback src={STEAM_BG} alt="Steamer"
                                       className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 group-hover:bg-white/20 transition-colors">
                                          <Flame className="size-12 text-orange-400" />
                                       </div>
                                    </div>
                                 </>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                              {config.badge && (
                                 <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">{config.badge}</div>
                              )}
                           </div>
                           <div className="p-8 pt-6 flex-1 flex flex-col justify-between text-white">
                              <div>
                                 <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{config.title}</h3>
                                 {config.financing_text && (
                                    <div className="flex items-center gap-2 mb-6 opacity-60">
                                       <div className="h-px w-8 bg-white" />
                                       <p className="text-sm font-bold uppercase tracking-wider text-white/60">{config.financing_text}</p>
                                    </div>
                                 )}
                                 <ul className="space-y-3 mb-8">
                                    {[config.feature1, config.feature2, config.feature3].filter(Boolean).map((f, i) => (
                                       <li key={i} className="flex items-center gap-3">
                                          <span className="flex items-center justify-center size-6 rounded-full bg-white/10">
                                             <Check className="size-3.5 text-orange-400" />
                                          </span>
                                          <span className="text-base font-medium text-white/80">{f}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                              <Button onClick={() => handleWhatsApp(config)}
                                 className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-base font-bold hover:scale-[1.02] transition-all cursor-pointer">
                                 {config.cta_text || 'Vorführung buchen'}
                              </Button>
                           </div>
                        </motion.div>
                     );
                  }

                  // ── STANDARD CARD — toggle only when show_toggle=true ──
                  // show_toggle comes from DB column (set via SQL, or from admin toggle)
                  const showToggle = !!(config as PricingConfig & { show_toggle?: boolean }).show_toggle;
                  const variant = activeVariant[config.id] ?? 'black';
                  const isWhite = showToggle && variant === 'white';
                  const img = config.image_url || brandImage(config.model, config.title) || imgHylaBlack;

                  return (
                     <motion.div
                        key={config.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.12 }}
                        className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500"
                     >
                        {/* Toggle */}
                        {showToggle && (
                           <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gray-100 shadow-sm">
                              <button
                                 onClick={() => setActiveVariant(p => ({ ...p, [config.id]: 'black' }))}
                                 className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${variant === 'black' ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                              >
                                 <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />Black
                              </button>
                              <button
                                 onClick={() => setActiveVariant(p => ({ ...p, [config.id]: 'white' }))}
                                 className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${variant === 'white' ? 'bg-gray-100 text-black shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-700'}`}
                              >
                                 <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-400 inline-block" />White
                              </button>
                           </div>
                        )}

                        {/* Image */}
                        <div className="relative h-[380px] flex items-center justify-center p-10 overflow-hidden">
                           <div className="absolute inset-0 bg-white" />
                           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
                           <motion.img
                              key={`${config.id}-${variant}`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.35 }}
                              src={isWhite ? imgHylaWhite : img}
                              alt={config.title}
                              className="relative z-10 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                              style={{ maxHeight: '280px', height: '280px' }}
                           />
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-6 flex-1 flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                    <Droplets className="size-5 text-gray-400" />
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                       {showToggle && isWhite ? config.title.replace(/black/i, 'White Edition') : config.title}
                                    </h3>
                                 </div>
                                 {config.badge && (
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isWhite ? 'bg-gray-200 text-gray-800' : 'bg-black text-white'}`}>
                                       {config.badge}
                                    </span>
                                 )}
                              </div>
                              {config.financing_text && (
                                 <div className="flex items-center gap-2 mb-6 opacity-60">
                                    <div className="h-px w-8 bg-current" />
                                    <p className="text-sm font-bold uppercase tracking-wider">{config.financing_text}</p>
                                 </div>
                              )}
                              <ul className="space-y-3 mb-8">
                                 {[config.feature1, config.feature2, config.feature3].filter(Boolean).map((f, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                       <span className="flex items-center justify-center size-6 rounded-full bg-black/5">
                                          <Check className="size-3.5" />
                                       </span>
                                       <span className="text-base font-medium">{f}</span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <Button
                              onClick={() => handleWhatsApp(config)}
                              className="w-full h-14 rounded-full bg-black text-white text-base font-bold hover:bg-black/80 hover:scale-[1.02] transition-all cursor-pointer"
                           >
                              {config.cta_text || `Jetzt ${config.title} bestellen`}
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