import { ShieldCheck, PhoneCall, Wrench } from 'lucide-react';
import { translations, Language } from '@/app/translations';
import { motion } from 'motion/react';

interface HylaServiceSectionProps {
  language: Language;
}

export function HylaServiceSection({ language }: HylaServiceSectionProps) {
  const t = translations[language].service;

  const services = [
    { icon: ShieldCheck, title: t.warranty },
    { icon: PhoneCall, title: t.support },
    { icon: Wrench, title: t.checkup },
  ];

  return (
    <section className="relative py-20 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-lg text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          &ldquo;{t.text}&rdquo;
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="size-14 rounded-2xl bg-black flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="size-7" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-tight">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
