import { Language, translations } from '@/app/translations';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

// Phase images
import imgExploded from "figma:asset/65e0b451e369591030eb13cde9527ba0d6456a3c.png";
import imgHighlightBase from "figma:asset/5585fffeba10ef498cd76a5af0172e68dded21cf.png";
import imgHighlightTank from "figma:asset/e035e2bd02dc3ec606948ba0590c56f7c34c710a.png";
import imgFilter from "figma:asset/3414c103e92fd1a69cf8813cf91305219f554ca0.png";
import imgInternal from "figma:asset/f64c5f1e15d7cb8ab38a2cd3a3d7710229566687.png";
import imgAssembled from "figma:asset/4e39444d58ecdbf3ce72283a19fa1627a3f2229e.png";

interface HylaAssemblySectionProps {
  language: Language;
}

export function HylaAssemblySection({ language }: HylaAssemblySectionProps) {
  const t = translations[language].assemblySection;

  const parts = [
    { label: t.part1Label, title: t.part1Title, desc: t.part1Desc, link: t.part1Link },
    { label: t.part3Label, title: t.part3Title, desc: t.part3Desc, link: t.part3Link },
    { label: t.part2Label, title: t.part2Title, desc: t.part2Desc, link: t.part2Link },
    { label: t.part4Label, title: t.part4Title, desc: t.part4Desc, link: t.part4Link },
    { label: t.part5Label, title: t.part5Title, desc: t.part5Desc, link: t.part5Link },
    { label: t.part6Label, title: t.part6Title, desc: t.part6Desc, link: t.part6Link },
  ];

  return (
    <section className="assembly-scroll-container h-[600vh] bg-white relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">

        {/* Background Ambient Text */}
        <div className="assembly-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-gray-100/40 pointer-events-none select-none tracking-tighter leading-none">
          HYLA
        </div>

        {/* Main Layout Container */}
        <div className="h-full w-full flex flex-col lg:flex-row items-stretch max-w-[1440px] mx-auto">

          {/* ===== LEFT: Vertical Scroll Progress ===== */}
          <div className="hidden lg:flex items-center justify-center w-20 flex-shrink-0 pl-8">
            <div className="relative w-px h-[55vh] bg-gray-200/60 rounded-full">
              {/* Animated fill line */}
              <div className="assembly-scrollbar-fill absolute top-0 left-0 w-full h-full bg-black rounded-full" />
            </div>
          </div>

          {/* ===== CENTER: Text Content ===== */}
          <div className="w-full lg:flex-1 flex flex-col justify-start lg:justify-center pt-24 lg:pt-0 px-6 lg:pl-10 lg:pr-4 z-10 lg:max-w-xl">

            {/* Phase Titles (grouped across phases) */}
            <div className="relative h-[80px] lg:h-[130px]">
              <div className="assembly-text-1 absolute inset-0">
                <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1]">{t.title1}</h2>
                <p className="text-sm lg:text-base text-gray-400 mt-2 lg:mt-3">{t.subtitle1}</p>
              </div>
              <div className="assembly-text-2 absolute inset-0">
                <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1]">{t.title2}</h2>
                <p className="text-sm lg:text-base text-gray-400 mt-2 lg:mt-3">{t.subtitle2}</p>
              </div>
              <div className="assembly-text-3 absolute inset-0">
                <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1]">{t.title3}</h2>
                <p className="text-sm lg:text-base text-gray-400 mt-2 lg:mt-3">{t.subtitle3}</p>
              </div>
            </div>

            {/* Part-Specific Descriptions (6 phases, crossfade) */}
            <div className="relative h-[150px] lg:h-[210px] mt-4 lg:mt-8">
              {parts.map((part, i) => (
                <div key={i} className={`assembly-desc-${i + 1} absolute inset-0`}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 lg:mb-4 block">
                    0{i + 1} — {part.label}
                  </span>
                  <h3 className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3">{part.title}</h3>
                  <p className="text-sm lg:text-base text-gray-500 leading-relaxed mb-4 lg:mb-5">{part.desc}</p>
                  <Link
                    to="/est"
                    className="inline-flex items-center gap-2 text-xs lg:text-sm font-bold text-black hover:text-gray-600 transition-colors group"
                  >
                    {part.link}
                    <ArrowRight className="size-3 lg:size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT: Large Product Image Stage ===== */}
          <div className="flex-1 lg:w-[50%] xl:w-[55%] lg:flex-none flex items-center justify-center relative">
            <div className="relative w-[65vw] max-w-xs lg:w-full lg:max-w-lg xl:max-w-xl aspect-square">

              {/* Phase 1: Exploded Full Color */}
              <div className="assembly-img-1 absolute inset-0 flex items-center justify-center">
                <img src={imgExploded} alt="HYLA Exploded View" className="w-full h-full object-contain mix-blend-multiply" />
                {/* Component Labels */}
                <div className="assembly-labels absolute inset-0 pointer-events-none hidden lg:block">
                  <div className="absolute top-[15%] left-[-8%]">
                    <div className="flex items-center gap-2">
                      <span className="w-12 h-px bg-gray-300"></span>
                      <span className="text-[10px] font-bold uppercase text-gray-400 whitespace-nowrap tracking-wider">{t.labelMotor}</span>
                    </div>
                  </div>
                  <div className="absolute top-[48%] right-[-8%]">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <span className="w-12 h-px bg-gray-300"></span>
                      <span className="text-[10px] font-bold uppercase text-gray-400 whitespace-nowrap tracking-wider">{t.labelTank}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-[12%] left-[-8%]">
                    <div className="flex items-center gap-2">
                      <span className="w-12 h-px bg-gray-300"></span>
                      <span className="text-[10px] font-bold uppercase text-gray-400 whitespace-nowrap tracking-wider">{t.labelBase}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2: Tank Highlighted */}
              <div className="assembly-img-2 absolute inset-0 flex items-center justify-center">
                <img src={imgHighlightTank} alt="HYLA Tank Highlight" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Phase 3: Base Highlighted */}
              <div className="assembly-img-3 absolute inset-0 flex items-center justify-center">
                <img src={imgHighlightBase} alt="HYLA Base Highlight" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Phase 4: HEPA Filter Detail */}
              <div className="assembly-img-4 absolute inset-0 flex items-center justify-center">
                <img src={imgFilter} alt="HYLA HEPA Separator" className="w-[70%] h-[70%] object-contain mix-blend-multiply" />
              </div>

              {/* Phase 5: Internal Cross-Section */}
              <div className="assembly-img-5 absolute inset-0 flex items-center justify-center">
                <img src={imgInternal} alt="HYLA Internal View" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Phase 6: Fully Assembled */}
              <div className="assembly-img-6 absolute inset-0 flex items-center justify-center">
                <img src={imgAssembled} alt="HYLA Assembled" className="w-[85%] h-[85%] object-contain mix-blend-multiply" />
              </div>

            </div>
          </div>

        </div>

        {/* Mobile: Vertical Scroll Progress Line (left edge, aligned with image area) */}
        <div className="lg:hidden absolute left-5 bottom-[8%] z-20">
          <div className="relative w-[2px] h-[30vh] bg-gray-200/60 rounded-full">
            <div className="assembly-scrollbar-fill absolute top-0 left-0 w-full h-full bg-black rounded-full" />
          </div>
        </div>

        {/* Scroll Indicator (desktop only) */}
        <div className="assembly-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-400">
          <span className="text-[10px] font-bold uppercase tracking-widest">{t.scrollCta}</span>
          <div className="w-px h-8 bg-gray-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-600 animate-slide-down" />
          </div>
        </div>

      </div>
    </section>
  );
}