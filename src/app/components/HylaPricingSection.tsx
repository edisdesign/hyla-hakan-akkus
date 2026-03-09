import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { motion } from 'motion/react';
import { Check, Flame } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HylaPricingSectionProps {
   language: Language;
}

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
   const t = translations[language].pricing;

   const handleWhatsApp = (model: 'black' | 'white' | 'steamer') => {
      let text = '';
      if (model === 'black') text = t.whatsappBlack;
      else if (model === 'white') text = t.whatsappWhite;
      else text = translations[language].steamerPage?.ctaWhatsapp || 'Hallo! Ich interessiere mich für den HYLA Steamer.';
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
   };

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
                  className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-['Manrope']"
               >
                  {t?.title || "HYLA Editions"}
               </motion.h2>
               <p className="text-xl text-gray-500">
                  {t?.chooseAesthetic || "Choose your aesthetic. Same powerful technology."}
               </p>
            </div>

            {/* 3-column grid — col-span-2 on md for steamer so it's centered below on 2-col layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

               {/* ── BLACK EDITION ── */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col hover:bg-black hover:text-white transition-colors duration-500 border border-gray-100"
               >
                  <div className="relative h-[380px] flex items-center justify-center p-10 overflow-hidden">
                     <div className="absolute inset-0 bg-white group-hover:bg-[#111] transition-colors duration-500" />
                     <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 group-hover:opacity-10 transition-opacity duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[300px] h-[300px] border border-black/5 rounded-full scale-[0.8] group-hover:border-white/10 transition-colors duration-500" />
                        <div className="w-[400px] h-[400px] border border-black/5 rounded-full scale-[0.9] absolute group-hover:border-white/5 transition-colors duration-500" />
                     </div>
                     <img
                        src={imgHylaBlack}
                        alt="HYLA Black"
                        className="relative z-10 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                        style={{ maxHeight: '280px', height: '280px' }}
                     />
                  </div>
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between relative z-20">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-2xl font-bold">{t?.blackTitle || "HYLA Black"}</h3>
                           <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">{t?.bestseller || "BESTSELLER"}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                           <div className="h-px w-8 bg-current" />
                           <p className="text-sm font-bold uppercase tracking-wider">{t?.financing || "Finanzierung ab 39€"}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                           {[t?.featureBlack1 || "Premium Black Finish", t?.featureBlack2 || "Full Accessory Set", t?.featureBlack3 || "Smart Water Technology"].map((f, i) => (
                              <li key={i} className="flex items-center gap-3">
                                 <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors"><Check className="size-3.5" /></span>
                                 <span className="text-base font-medium">{f}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <Button
                        onClick={() => handleWhatsApp('black')}
                        className="w-full h-14 rounded-full bg-black group-hover:bg-white text-white group-hover:text-black text-base font-bold flex items-center justify-center hover:bg-black/80 group-hover:hover:bg-gray-100 hover:scale-[1.02] transition-all px-6 py-2 cursor-pointer"
                     >
                        <span>{t?.ctaBlack || "Order Now"}</span>
                     </Button>
                  </div>
               </motion.div>

               {/* ── WHITE EDITION ── */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col hover:bg-black hover:text-white transition-colors duration-500 border border-gray-100"
               >
                  <div className="relative h-[380px] flex items-center justify-center p-10 overflow-hidden">
                     <div className="absolute inset-0 bg-white group-hover:bg-[#111] transition-colors duration-500" />
                     <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 group-hover:opacity-10 transition-opacity duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[300px] h-[300px] border border-black/5 rounded-full scale-[0.8] group-hover:border-white/10 transition-colors duration-500" />
                        <div className="w-[400px] h-[400px] border border-black/5 rounded-full scale-[0.9] absolute group-hover:border-white/5 transition-colors duration-500" />
                     </div>
                     <img
                        src={imgHylaWhite}
                        alt="HYLA White"
                        className="relative z-10 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                        style={{ maxHeight: '280px', height: '280px', scale: '1.22' }}
                     />
                  </div>
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between relative z-20">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-2xl font-bold">{t?.whiteTitle || "HYLA White"}</h3>
                           <span className="bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">{t?.limited || "LIMITED"}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                           <div className="h-px w-8 bg-current" />
                           <p className="text-sm font-bold uppercase tracking-wider">{t?.financing || "Finanzierung ab 39€"}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                           {[t?.featureWhite1 || "Exclusive White Finish", t?.featureWhite2 || "Full Accessory Set", t?.featureWhite3 || "Collector's Edition"].map((f, i) => (
                              <li key={i} className="flex items-center gap-3">
                                 <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors"><Check className="size-3.5" /></span>
                                 <span className="text-base font-medium">{f}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <Button
                        onClick={() => handleWhatsApp('white')}
                        className="w-full h-14 rounded-full bg-black group-hover:bg-white text-white group-hover:text-black text-base font-bold flex items-center justify-center hover:bg-black/80 group-hover:hover:bg-gray-100 hover:scale-[1.02] transition-all px-6 py-2 cursor-pointer"
                     >
                        <span>{t?.ctaWhite || "Order Now"}</span>
                     </Button>
                  </div>
               </motion.div>

               {/* ── STEAMER ── */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group relative bg-[#0a0a0a] rounded-[3rem] overflow-hidden flex flex-col border border-white/10 md:col-span-2 lg:col-span-1"
               >
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
                     <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                        NEU
                     </div>
                  </div>
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between relative z-20 text-white">
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-2xl font-bold">HYLA Steamer</h3>
                           <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold px-3 py-1 rounded-full">STEAMER</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 opacity-60">
                           <div className="h-px w-8 bg-white" />
                           <p className="text-sm font-bold uppercase tracking-wider text-white/60">{translations[language].steamerSection?.feature1?.split('–')[0]?.trim() || "7 Bar Dampfdruck"}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                           {[
                              translations[language].steamerPage?.noChemicals || "Ohne Chemikalien",
                              translations[language].steamerPage?.professionalGrade || "Professionelle Qualität",
                              translations[language].steamerSection?.feature3?.split('–')[0]?.trim() || "100°C Dampf",
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
                        className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-base font-bold flex items-center justify-center hover:scale-[1.02] transition-all px-6 py-2 cursor-pointer"
                     >
                        <span>{translations[language].steamerPage?.heroButton || "Demo vereinbaren"}</span>
                     </Button>
                  </div>
               </motion.div>

            </div>
         </div>
      </section>
   );
}