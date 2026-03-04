import { motion } from 'motion/react';
import { Check, CreditCard, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaTransparent from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgAccessory from "figma:asset/e6ce15d44ec53e778fef2484d66112ee87309517.png";
import { FadeUp } from '@/app/components/ui/ScrollReveal';

interface HylaProductsSectionProps {
  language: Language;
}

export function HylaProductsSection({ language }: HylaProductsSectionProps) {
  const t = translations[language];

  return (
    <section className="relative py-32 bg-white text-black">
      <div id="offers" className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-[20px] gap-10 border-b border-gray-100 pb-[24px] mt-[0px] mr-[0px] ml-[0px] pt-[0px] pr-[0px] pl-[0px]">
           <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 mb-6">
                <Star className="size-4 fill-black text-black" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">{t.products.limitedOffer}</span>
             </div>
             <h2 className="text-6xl md:text-8xl font-bold font-['Manrope'] tracking-tighter leading-[0.9] text-black">
               {t.products.heroTitle.split('\n').map((line: string, i: number) => (
                 <span className="text-[64px] text-[96px]" key={i}>{line}{i === 0 && <br/>}</span>
               ))}
             </h2>
           </div>
           <div className="flex flex-col items-end text-right">
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-sm leading-normal mb-4">
                {t.products.heroSubtitle}
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-300">{t.products.availableGlobally}</span>
           </div>
        </div>

        {/* The Card */}
        <FadeUp className="relative bg-[#F5F5F7] rounded-[3rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
            
            {/* Image Side */}
            <div className="relative p-12 lg:p-0 flex items-center justify-center bg-white/50">
               {/* Technical Grid Background */}
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
               
               {/* Main Product Image - Transparent */}
               <img 
                 src={imgHylaTransparent} 
                 alt="HYLA EST Defender Bundle" 
                 className="w-full max-w-[500px] h-auto relative z-10 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
               />

               {/* Decorative Circles */}
               <div className="absolute inset-0 border-[1px] border-black/5 rounded-full scale-[0.8]" />
               <div className="absolute inset-0 border-[1px] border-black/5 rounded-full scale-[0.6]" />

               {/* Floating Accessory Badge */}
               <motion.div
                 initial={{ opacity: 0, y: 16, scale: 0.92 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute bottom-6 right-6 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 px-4 py-3"
               >
                 <div className="shrink-0 size-7 rounded-full bg-black text-white flex items-center justify-center">
                   <span style={{ fontSize: 18, lineHeight: 1, fontWeight: 700 }}>+</span>
                 </div>
                 <img
                   src={imgAccessory}
                   alt="Accessory included"
                   className="h-14 w-auto object-contain"
                   draggable={false}
                 />
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.common.accessorySet}</span>
                   <span className="text-sm font-bold text-black leading-tight">Nimbus</span>
                 </div>
               </motion.div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center bg-[#F5F5F7] px-6 md:px-12 lg:px-[96px] py-10 md:py-[50px]">
              
              <div className="mx-[0px] mt-[0px] mb-[36px]">
                <h3 className="text-4xl font-bold text-black mb-6 tracking-tight">
                  {t.deal.title}
                </h3>
                <p className="text-xl text-gray-500 leading-relaxed">
                  {t.products.intro2}
                </p>
              </div>

              {/* Financing Block */}
              <div className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-sm border border-gray-100 mx-[0px] mt-[0px] mb-[36px]">
                 <div className="size-14 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                   <CreditCard className="size-6" />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.products.financingOption}</p>
                   <p className="font-bold text-black text-xl">{t.products.financing}</p>
                 </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/50 border border-gray-200/50">
                   <Check className="size-6 text-black" />
                   <span className="font-bold text-gray-900">{t.products.includesAccessories}</span>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/50 border border-gray-200/50">
                   <Check className="size-6 text-black" />
                   <span className="font-bold text-gray-900">{t.products.freeShipping}</span>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/50 border border-gray-200/50 md:col-span-2">
                   <ShieldCheck className="size-6 text-black" />
                   <span className="font-bold text-gray-900">{t.products.warranty}</span>
                </div>
              </div>

              {/* CTA Area */}
              <div className="space-y-6">
                 <a 
                   href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                     language === 'de' ? 'Hallo! Ich interessiere mich für das HYLA Angebot.' :
                     language === 'tr' ? 'Merhaba! HYLA teklifi ile ilgileniyorum.' :
                     'Hello! I am interested in the HYLA Offer.'
                   )}`}
                   target="_blank" 
                   rel="noopener noreferrer"
                 >
                   <Button className="w-full h-20 rounded-full bg-black hover:bg-gray-800 text-white text-xl font-bold tracking-wide transition-all hover:scale-[1.01] flex items-center justify-between px-[24px] py-[8px]">
                     <span>{t.products.cta}</span>
                     <ArrowRight className="size-6" />
                   </Button>
                 </a>
              </div>

            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}