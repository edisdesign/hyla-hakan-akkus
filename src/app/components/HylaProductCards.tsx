import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Droplets, Flame } from 'lucide-react';
import { translations, Language } from '@/app/translations';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HylaProductCardsProps {
  language: Language;
}

export function HylaProductCards({ language }: HylaProductCardsProps) {
  const t = translations[language];
  const [activeVariant, setActiveVariant] = useState<'black' | 'white'>('black');

  const hylaVariants = {
    black: {
      to: '/est',
      title: 'HYLA Black',
      subtitle: t.estPage.heroSubtitle,
      description: t.estPage.heroDescription,
      image: imgHylaBlack,
      accentColor: 'bg-black',
      tags: [t.estPage.noBags, t.estPage.noFollowUpCosts, t.estPage.madeInEurope],
      gradient: 'from-gray-900/10 via-transparent to-gray-600/10',
      hoverGradient: 'group-hover:from-gray-900/20 group-hover:to-gray-600/20',
    },
    white: {
      to: '/est',
      title: 'HYLA White',
      subtitle: t.estPage.heroSubtitle,
      description: t.estPage.heroDescription,
      image: imgHylaWhite,
      accentColor: 'bg-gray-300',
      tags: [t.estPage.noBags, t.estPage.noFollowUpCosts, t.estPage.madeInEurope],
      gradient: 'from-gray-200/20 via-transparent to-gray-100/20',
      hoverGradient: 'group-hover:from-gray-200/40 group-hover:to-gray-100/40',
    },
  };

  const current = hylaVariants[activeVariant];

  const steamProduct = {
    to: '/steamer',
    title: 'HYLA Steamer',
    subtitle: t.steamerPage.heroSubtitle,
    description: t.steamerPage.heroDescription,
    icon: Flame,
    steamImage: 'https://images.unsplash.com/photo-1568266783484-f9ebe82015f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBzdGVhbSUyMHZhcG9yJTIwZGFyayUyMGRyYW1hdGljJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE0MjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    gradient: 'from-orange-500/10 via-transparent to-red-500/10',
    hoverGradient: 'group-hover:from-orange-500/20 group-hover:to-red-500/20',
    accentColor: 'bg-orange-500',
    tags: [t.steamerPage.noChemicals, t.steamerPage.professionalGrade, t.steamerSection.feature3.split('–')[0].trim()],
  };

  return (
    <section id="products" className="relative py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">{t.nav.products}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            {t.common.ourProducts}
          </motion.h2>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: HYLA Black / White Toggle Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl group">
              {/* Toggle Buttons */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gray-100 shadow-sm">
                <button
                  onClick={() => setActiveVariant('black')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeVariant === 'black'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
                  Black
                </button>
                <button
                  onClick={() => setActiveVariant('white')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeVariant === 'white'
                      ? 'bg-gray-100 text-black shadow-sm border border-gray-200'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-400 inline-block" />
                  White
                </button>
              </div>

              {/* Image Area */}
              <div className={`relative h-[320px] md:h-[380px] overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} ${current.hoverGradient} transition-all duration-500`} />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
                  <motion.img
                    key={activeVariant}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={current.image}
                    alt={current.title}
                    className="relative z-10 max-h-[280px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
                  />
                </div>
              </div>

              {/* Content */}
              <Link to={current.to} className="block">
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Droplets className="size-5 text-gray-400" />
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{current.title}</h3>
                    </div>
                    <div className="flex-shrink-0 size-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-colors group-hover:scale-110 transform duration-300">
                      <ArrowRight className="size-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right: Steamer Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Link to={steamProduct.to} className="block group">
              <div className="relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl">
                {/* Image/Visual Area */}
                <div className="relative h-[320px] md:h-[380px] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${steamProduct.gradient} ${steamProduct.hoverGradient} transition-all duration-500`} />
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={steamProduct.steamImage}
                      alt={steamProduct.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6">
                        <steamProduct.icon className="size-12 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`${steamProduct.accentColor} text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full`}>
                      {steamProduct.subtitle}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{steamProduct.title}</h3>
                    <div className="flex-shrink-0 size-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-colors group-hover:scale-110 transform duration-300">
                      <ArrowRight className="size-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                    {steamProduct.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {steamProduct.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}