import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { motion } from 'motion/react';
import { Check, Flame, Droplets } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HylaPricingSectionProps {
   language: Language;
}

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
   const t = translations[language].pricing;
   const [activeVariant, setActiveVariant] = useState<'black' | 'white'>('black');

   const handleWhatsApp = (model: 'black' | 'white' | 'steamer') => {
      let text = '';
      if (model === 'black') text = t.whatsappBlack;
      else if (model === 'white') text = t.whatsappWhite;
      else text = translations[language].steamerPage?.ctaWhatsapp || 'Hallo! Ich interessiere mich für den HYLA Steamer.';
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
   };

   const variants = {
      black: {
         image: imgHylaBlack,
         title: t?.blackTitle || 'HYLA Black',
         badge: t?.bestseller || 'BESTSELLER',
         badgeClass: 'bg-black text-white',
         features: [
            t?.featureBlack1 || 'Premium Black Finish',
            t?.featureBlack2 || 'Komplettes Zubehör-Set',
            t?.featureBlack3 || 'Smart Water Technologie',
         ],
         cta: t?.ctaBlack || 'Jetzt HYLA Black bestellen',
         model: 'black' as const,
      },
      white: {
         image: imgHylaWhite,
         title: t?.whiteTitle || 'HYLA White Edition',
         badge: t?.limited || 'LIMITIERT',
         badgeClass: 'bg-gray-200 text-gray-800',
         features: [
            t?.featureWhite1 || 'Exklusives White Finish',
            t?.featureWhite2 || 'Komplettes Zubehör-Set',
            t?.featureWhite3 || "Collector's Edition",
         ],
         cta: t?.ctaWhite || 'Jetzt HYLA White bestellen',
         model: 'white' as const,
      },
   };

   const current = variants[activeVariant];
   const steamImg = 'https://images.unsplash.com/photo-1568266783484-f9ebe82015f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBzdGVhbSUyMHZhcG9yJTIwZGFyayUyMGRyYW1hdGljJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE0MjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080';

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
                  {t?.title || 'HYLA Black und HYLA White Edition'}
               </motion.h2>
               <p className="text-xl text-gray-500">
                  {t?.chooseAesthetic || 'Wählen Sie Ihre Ästhetik. Gleiche leistungsstarke Technologie.'}
               </p>
            </div>

            {/* 2-card grid */}
            <div className="grid md:grid-cols-2 gap-8">

               {/* ── LEFT: Black / White Toggle ── */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500"
               >
                  {/* Toggle */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gray-100 shadow-sm">
                     <button
                        onClick={() => setActiveVariant('black')}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVariant === 'black'
                              ? 'bg-black text-white shadow-sm'
                              : 'text-gray-400 hover:text-gray-700'
                           }`}
                     >
                        <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
                        Black
                     </button>
                     <button
                        onClick={() => setActiveVariant('white')}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVariant === 'white'
                              ? 'bg-gray-100 text-black shadow-sm border border-gray-200'
                              : 'text-gray-400 hover:text-gray-700'
                           }`}
                     >
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-400 inline-block" />
                        White
                     </button>
                  </div>

                  {/* Image Area */}
                  <div className="relative h-[380px] flex items-center justify-center p-10 overflow-hidden">
                     <div className="absolute inset-0 bg-white" />
                     <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
                     <motion.img
                        key={activeVariant}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        src={current.image}
                        alt={current.title}
                        className="relative z-10 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
                        style={{ maxHeight: '280px', height: '280px' }}
                     />
                  </div>

                  {/* Content */}
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <Droplets className="size-5 text-gray-400" />
                              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{current.title}</h3>
                           </div>
                           <span className={`text-xs font-bold px-3 py-1 rounded-full ${current.badgeClass}`}>{current.badge}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                           <div className="h-px w-8 bg-current" />
                           <p className="text-sm font-bold uppercase tracking-wider">{t?.financing || 'Finanzierung bereits ab 39,00 € pro Monat'}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                           {current.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-3">
                                 <span className="flex items-center justify-center size-6 rounded-full bg-black/5"><Check className="size-3.5" /></span>
                                 <span className="text-base font-medium">{f}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <Button
                        onClick={() => handleWhatsApp(current.model)}
                        className="w-full h-14 rounded-full bg-black text-white text-base font-bold hover:bg-black/80 hover:scale-[1.02] transition-all px-6 cursor-pointer"
                     >
                        {current.cta}
                     </Button>
                  </div>
               </motion.div>

               {/* ── RIGHT: Steamer ── */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="group relative bg-[#0a0a0a] rounded-[3rem] overflow-hidden flex flex-col border border-white/10 hover:shadow-2xl transition-all duration-500"
               >
                  {/* Image/Visual Area */}
                  <div className="relative h-[380px] overflow-hidden">
                     <ImageWithFallback
                        src={steamImg}
                        alt="HYLA Steamer"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 group-hover:bg-white/20 transition-colors duration-300">
                           <Flame className="size-12 text-orange-400" />
                        </div>
                     </div>
                     <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">NEU</div>
                  </div>

                  {/* Content */}
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between text-white">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-2xl md:text-3xl font-bold tracking-tight">HYLA Steamer</h3>
                           <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold px-3 py-1 rounded-full">STEAMER</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                           <div className="h-px w-8 bg-white" />
                           <p className="text-sm font-bold uppercase tracking-wider text-white/60">{translations[language].steamerSection?.feature1?.split('–')[0]?.trim() || '7 Bar Dampfdruck'}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                           {[
                              translations[language].steamerPage?.noChemicals || 'Keine Chemie',
                              translations[language].steamerPage?.professionalGrade || 'Profi-Qualität',
                              translations[language].steamerSection?.feature3?.split('–')[0]?.trim() || 'Made in Europe',
                           ].map((f, i) => (
                              <li key={i} className="flex items-center gap-3">
                                 <span className="flex items-center justify-center size-6 rounded-full bg-white/10"><Check className="size-3.5 text-orange-400" /></span>
                                 <span className="text-base font-medium text-white/80">{f}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <Button
                        onClick={() => handleWhatsApp('steamer')}
                        className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-base font-bold hover:scale-[1.02] transition-all px-6 cursor-pointer"
                     >
                        {translations[language].steamerPage?.heroButton || 'Vorführung buchen'}
                     </Button>
                  </div>
               </motion.div>

            </div>
         </div>
      </section>
   );
}