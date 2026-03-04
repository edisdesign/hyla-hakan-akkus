import { translations, type Language } from '@/app/translations';
import teamImage from 'figma:asset/32286f7f090c6e4d8c66d41f88fd1592343d71e1.png';
import { Button } from '@/app/components/ui/button';
import { Users, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_NUMBER } from '@/app/constants';

interface HylaTeamSectionProps {
  language: Language;
}

export function HylaTeamSection({ language }: HylaTeamSectionProps) {
  const t = translations[language].team;
  const tCommon = translations[language].common;

  const handleWhatsAppPartner = () => {
    const message = encodeURIComponent(t.whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-[2rem] overflow-hidden">
              <img
                src={teamImage}
                alt="Team AKKUS"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-black" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                {tCommon.team}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black tracking-tight">
              {t.title}
            </h2>
            <div className="space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>{t.description1}</p>
              <p>{t.description2}</p>
              <p>{t.description3}</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100">
                <div className="text-4xl font-bold text-black mb-1 tracking-tight">
                  {t.stat1Value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {t.stat1Label}
                </div>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100">
                <div className="text-4xl font-bold text-black mb-1 tracking-tight">
                  {t.stat2Value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {t.stat2Label}
                </div>
              </div>
            </div>

            {/* Join CTA */}
            <div className="mt-10 bg-black rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Users className="size-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t.joinUsTitle}</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t.joinUsDesc}
              </p>
              <Button
                onClick={handleWhatsAppPartner}
                className="w-full h-14 rounded-full bg-white text-black hover:bg-gray-200 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="size-5 mr-2" />
                {t.joinUsCta}
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}