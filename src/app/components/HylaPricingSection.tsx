import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png"; // Transparent Full Black
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png"; // New White

interface HylaPricingSectionProps {
  language: Language;
}

export function HylaPricingSection({ language }: HylaPricingSectionProps) {
  const t = translations[language].pricing;

  const handleWhatsApp = (model: 'black' | 'white') => {
    const text = model === 'black' ? t.whatsappBlack : t.whatsappWhite;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

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

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* BLACK EDITION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col hover:bg-black hover:text-white transition-colors duration-500 border border-gray-100"
          >
            {/* Image Area with Decorative Container */}
            <div className="relative h-[450px] flex items-center justify-center p-10 overflow-hidden">
               {/* Background transition */}
               <div className="absolute inset-0 bg-white group-hover:bg-[#111] transition-colors duration-500" />
               
               {/* Technical Grid Background */}
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 group-hover:opacity-10 transition-opacity duration-500" />

               {/* Decorative Circles */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] border border-black/5 rounded-full scale-[0.8] group-hover:border-white/10 transition-colors duration-500" />
                  <div className="w-[400px] h-[400px] border border-black/5 rounded-full scale-[0.9] absolute group-hover:border-white/5 transition-colors duration-500" />
               </div>

               {/* Product Image - BLACK */}
               <img 
                 src={imgHylaBlack} 
                 alt="HYLA Black" 
                 className="relative z-10 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                 style={{ maxHeight: '340px', height: '340px' }}
               />
            </div>

            {/* Content Area */}
            <div className="p-10 pt-8 flex-1 flex flex-col justify-between relative z-20">
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-3xl font-bold">{t?.blackTitle || "HYLA Black"}</h3>
                     <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">{t?.bestseller || "BESTSELLER"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-8 opacity-60">
                     <div className="h-px w-8 bg-current" />
                     <p className="text-sm font-bold uppercase tracking-wider">{t?.financing || "Finanzierung ab 39€"}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureBlack1 || "Premium Black Finish"}</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureBlack2 || "Full Accessory Set"}</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureBlack3 || "Smart Water Technology"}</span>
                     </li>
                  </ul>
               </div>

               <Button 
                 onClick={() => handleWhatsApp('black')}
                 className="w-full h-16 rounded-full bg-black group-hover:bg-white text-white group-hover:text-black text-lg font-bold flex items-center justify-center hover:bg-black/80 group-hover:hover:bg-gray-100 hover:scale-[1.02] transition-all m-[0px] px-[24px] py-[8px]"
               >
                 <span>{t?.ctaBlack || "Order Now"}</span>
               </Button>
            </div>
          </motion.div>

          {/* WHITE EDITION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden flex flex-col hover:bg-black hover:text-white transition-colors duration-500 border border-gray-100"
          >
            {/* Image Area with Decorative Container */}
            <div className="relative h-[450px] flex items-center justify-center p-10 overflow-hidden">
               {/* Background transition */}
               <div className="absolute inset-0 bg-white group-hover:bg-[#111] transition-colors duration-500" />
               
               {/* Technical Grid Background */}
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 group-hover:opacity-10 transition-opacity duration-500" />

               {/* Decorative Circles */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] border border-black/5 rounded-full scale-[0.8] group-hover:border-white/10 transition-colors duration-500" />
                  <div className="w-[400px] h-[400px] border border-black/5 rounded-full scale-[0.9] absolute group-hover:border-white/5 transition-colors duration-500" />
               </div>

               {/* Product Image - WHITE */}
               <img 
                 src={imgHylaWhite} 
                 alt="HYLA White" 
                 className="relative z-10 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                 style={{ maxHeight: '340px', height: '340px', scale: '1.22' }}
               />
            </div>

            {/* Content Area */}
            <div className="p-10 pt-8 flex-1 flex flex-col justify-between relative z-20">
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-3xl font-bold">{t?.whiteTitle || "HYLA White"}</h3>
                     <span className="bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">{t?.limited || "LIMITED"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-8 opacity-60">
                     <div className="h-px w-8 bg-current" />
                     <p className="text-sm font-bold uppercase tracking-wider">{t?.financing || "Finanzierung ab 39€"}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureWhite1 || "Exclusive White Finish"}</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureWhite2 || "Full Accessory Set"}</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
                            <Check className="size-3.5" />
                        </span>
                        <span className="text-lg font-medium">{t?.featureWhite3 || "Collector's Edition"}</span>
                     </li>
                  </ul>
               </div>

               <Button 
                 onClick={() => handleWhatsApp('white')}
                 className="w-full h-16 rounded-full bg-black group-hover:bg-white text-white group-hover:text-black text-lg font-bold flex items-center justify-center hover:bg-black/80 group-hover:hover:bg-gray-100 hover:scale-[1.02] transition-all px-[24px] py-[8px]"
               >
                 <span>{t?.ctaWhite || "Order Now"}</span>
               </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}