import { useOutletContext, Link } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import {
  Droplets, Wind, Sparkles, Waves, PanelTop, ShieldCheck,
  ArrowRight, Check, MessageCircle, CalendarCheck,
  Zap, Leaf, Flame, Package
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { WHATSAPP_NUMBER } from '@/app/constants';
import imgHylaBlack from "figma:asset/530f7de98967da95b9e6033bf208ed468548a1c6.png";
import imgHylaWhite from "figma:asset/68e32133e2495e6ccc39713280afd42b976943a5.png";
import imgAccKombiduese from "figma:asset/839f977163399f2b6b08c6b612d2445cbf452af4.png";
import imgAccFugenduese from "figma:asset/889271d2e61646ee13aedf5e7a5806fa34d77f46.png";
import imgAccPinselNylon from "figma:asset/a2cfdf96cd4defd0da60dab09e31e8028e8edea0.png";
import imgAccPinselNatur from "figma:asset/f6af8dc84a37ede1f5ddf3646674c673c0a689b4.png";
import imgAccPolsterduese from "figma:asset/f698745279e804715ab9089ebbb35d54bbcfbbee.png";
import imgAccRohre from "figma:asset/6e73df9cb8c2d9b4f9bef0a218a2fd0262085ec9.png";
import imgAccKomplett from "figma:asset/b44c939043134f68ebd3484f4c4b041ad4529d85.png";
import imgAccSchlauch from "figma:asset/fa29cc05b401c41b809a6b2b744ee0333fc3462e.png";
import imgOptRapida from "figma:asset/2c3049f7be09c6befc2635f618fb6efc794c6a4e.png";
import imgOptVentus from "figma:asset/e32d3960e9e715f82cb35272ad9cb0de9b9ec572.png";
import imgOptNimbus from "figma:asset/95955cb457c51608629bcbddbaacde3bafe0b7aa.png";
import imgOptSchlauch from "figma:asset/39de3b13774fec081e48d8c11e34595e57cea2d9.png";
import imgOptHartboden from "figma:asset/9142685bbb911d0c166654b59e8877c09c1bf60f.png";
import imgOptFenster from "figma:asset/9450a0d4639c8686fc2ca60eba845a67b6a49c0e.png";
import imgOptManschette from "figma:asset/b64a2dfce2c445076652eda1e447ab0c02e82dcc.png";
import imgOptSchutzbeutel from "figma:asset/e045cb8efcc32469fefc0fa3334f54d301fcce85.png";
import imgOptHalter from "figma:asset/ea356d53fb6d5519707356214d88f67193233cc6.png";
import imgOptNymbus from "figma:asset/c526dc6a438a7b05ddee9a6e2d2a87bde1053394.png";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function HylaEstPage() {
  const { language } = useOutletContext<{ language: Language }>();
  const t = translations[language].estPage;
  const tCommon = translations[language].common;
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleWhatsApp = () => {
    const messages: Record<string, string> = {
      de: 'Hallo! Ich interessiere mich für den HYLA EST. Bitte kontaktieren Sie mich.',
      en: 'Hello! I am interested in the HYLA EST. Please contact me.',
      tr: 'Merhaba! HYLA EST ile ilgileniyorum. Lütfen benimle iletişime geçin.',
    };
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[language] || messages.de)}`, '_blank');
  };

  const features = [
    { icon: Droplets, title: t.featureWater, desc: t.featureWaterDesc, color: 'from-blue-500 to-cyan-400' },
    { icon: Wind, title: t.featureAir, desc: t.featureAirDesc, color: 'from-sky-500 to-blue-400' },
    { icon: Sparkles, title: t.featureDeep, desc: t.featureDeepDesc, color: 'from-indigo-500 to-purple-400' },
    { icon: Waves, title: t.featureWet, desc: t.featureWetDesc, color: 'from-teal-500 to-emerald-400' },
    { icon: PanelTop, title: t.featureWindow, desc: t.featureWindowDesc, color: 'from-cyan-500 to-sky-400' },
    { icon: ShieldCheck, title: t.featureAllergy, desc: t.featureAllergyDesc, color: 'from-green-500 to-emerald-400' },
  ];

  const specs = [
    { label: t.specMotor, value: t.specMotorValue },
    { label: t.specSuction, value: t.specSuctionValue },
    { label: t.specTank, value: t.specTankValue },
    { label: t.specFilter, value: t.specFilterValue },
    { label: t.specWeight, value: t.specWeightValue },
    { label: t.specWarranty, value: t.specWarrantyValue },
  ];

  const applications = [
    {
      title: t.appLiving,
      desc: t.appLivingDesc,
      image: 'https://images.unsplash.com/photo-1680503397107-475907e4f3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGZyZXNoJTIwbGl2aW5nJTIwcm9vbSUyMGJyaWdodCUyMGludGVyaW9yJTIwc29mYXxlbnwxfHx8fDE3NzE0Mjk3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      title: t.appBedroom,
      desc: t.appBedroomDesc,
      image: 'https://images.unsplash.com/photo-1721738860451-2a0533cec21a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxlcmd5JTIwZnJlZSUyMGNsZWFuJTIwYmVkcm9vbSUyMHdoaXRlJTIwZnJlc2glMjBhaXJ8ZW58MXx8fHwxNzcxNDI5NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      span: '',
    },
    {
      title: t.appWindow,
      desc: t.appWindowDesc,
      image: 'https://images.unsplash.com/photo-1602612996819-3cd306f68b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBjbGVhbmluZyUyMHN0cmVhayUyMGZyZWUlMjBzdW5saWdodxlbnwxfHx8fDE3NzE0Mjk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      span: '',
    },
    {
      title: t.appFloor,
      desc: t.appFloorDesc,
      image: 'https://images.unsplash.com/photo-1673924968581-c18b53d64e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGhhcmR3b29kJTIwZmxvb3IlMjBzaGlueSUyMHBvbGlzaGVkfGVufDF8fHx8MTc3MTQyOTcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      span: 'md:col-span-2',
    },
  ];

  const [selectedColor, setSelectedColor] = useState<'black' | 'white'>('black');
  const [accessoryTab, setAccessoryTab] = useState<'standard' | 'optional'>('standard');

  const standardAccessories: Record<string, { name: string; desc: string }[]> = {
    de: [
      { name: 'HYLA EST Komplett', desc: 'Das komplette System mit Separator, Trolley und Saugschlauch – sofort einsatzbereit.' },
      { name: 'Saugschlauch', desc: 'Hochwertiger flexibler Saugschlauch mit ergonomischem Handgriff.' },
      { name: 'Kombidüse', desc: 'Für alle Hartböden und Teppiche mit umschaltbarer Sohle.' },
      { name: 'Fugendüse & Reduzierstück', desc: 'Für schwer zugängliche Stellen, Ritzen und enge Bereiche.' },
      { name: 'Möbelpinsel (Nylon)', desc: 'Schonende Reinigung von Möbeln und empfindlichen Oberflächen.' },
      { name: 'Möbelpinsel (Naturhaar)', desc: 'Extra sanft für hochwertige Möbel und empfindliche Oberflächen.' },
      { name: 'Polsterdüse mit Fadenheber', desc: 'Für Sofas, Sessel und Textilien – mit integriertem Fadenheber.' },
      { name: 'Verlängerungsrohre (2×)', desc: 'Robuste Verlängerungsrohre für optimale Reichweite.' },
    ],
    en: [
      { name: 'HYLA EST Complete', desc: 'The complete system with separator, trolley and suction hose – ready to use.' },
      { name: 'Suction Hose', desc: 'High-quality flexible suction hose with ergonomic handle.' },
      { name: 'Combination Nozzle', desc: 'For all hard floors and carpets with switchable sole.' },
      { name: 'Crevice Tool & Reducer', desc: 'For hard-to-reach areas, crevices, and tight spaces.' },
      { name: 'Furniture Brush (Nylon)', desc: 'Gentle cleaning of furniture and delicate surfaces.' },
      { name: 'Furniture Brush (Natural Hair)', desc: 'Extra gentle for high-quality furniture and sensitive surfaces.' },
      { name: 'Upholstery Nozzle with Thread Lifter', desc: 'For sofas, armchairs, and textiles – with integrated thread lifter.' },
      { name: 'Extension Tubes (2×)', desc: 'Robust extension tubes for optimal reach.' },
    ],
    tr: [
      { name: 'HYLA EST Komple', desc: 'Separatör, taşıma arabası ve emiş hortumu ile komple sistem – kullanıma hazır.' },
      { name: 'Emiş Hortumu', desc: 'Ergonomik tutma sapına sahip yüksek kaliteli esnek emiş hortumu.' },
      { name: 'Kombi Başlık', desc: 'Tüm sert zeminler ve halılar için değiştirilebilir tabanlı.' },
      { name: 'Dar Alan Başlığı & Redüktör', desc: 'Ulaşılması zor alanlar, çatlaklar ve dar bölgeler için.' },
      { name: 'Mobilya Fırçası (Naylon)', desc: 'Mobilya ve hassas yüzeylerin nazik temizliği.' },
      { name: 'Mobilya Fırçası (Doğal Kıl)', desc: 'Yüksek kaliteli mobilya ve hassas yüzeyler için ekstra nazik.' },
      { name: 'Döşeme Başlığı (İplik Kaldırıcılı)', desc: 'Koltuklar ve tekstiller için – entegre iplik kaldırıcılı.' },
      { name: 'Uzatma Boruları (2×)', desc: 'Optimum erişim için sağlam uzatma boruları.' },
    ],
    sr: [
      { name: 'HYLA EST Komplet', desc: 'Kompletan sistem sa separatorom, kolicima i usisnim crevom – spreman za upotrebu.' },
      { name: 'Usisno crevo', desc: 'Visokokvalitetno fleksibilno usisno crevo sa ergonomskom ručkom.' },
      { name: 'Kombi nastavak', desc: 'Za sve tvrde podove i tepihe sa preklopivom talpom.' },
      { name: 'Nastavak za fuge i reduktor', desc: 'Za teško dostupna mesta, pukotine i uske prostore.' },
      { name: 'Četka za nameštaj (najlon)', desc: 'Nežno čišćenje nameštaja i osetljivih površina.' },
      { name: 'Četka za nameštaj (prirodna dlaka)', desc: 'Ekstra nežna za kvalitetan nameštaj i osetljive površine.' },
      { name: 'Nastavak za tapacirung', desc: 'Za sofe, fotelje i tekstil – sa integrisanim podizačem niti.' },
      { name: 'Produžne cevi (2×)', desc: 'Robusne produžne cevi za optimalan domet.' },
    ],
  };

  const standardImages = [
    imgAccKomplett,
    imgAccSchlauch,
    imgAccKombiduese,
    imgAccFugenduese,
    imgAccPinselNylon,
    imgAccPinselNatur,
    imgAccPolsterduese,
    imgAccRohre,
  ];

  const optionalAccessories: Record<string, { name: string; desc: string }[]> = {
    de: [
      { name: 'HYLA Nymbus', desc: 'Kompaktes Wasserfilter-Reinigungssystem für die schnelle tägliche Reinigung – ideal als Ergänzung zum HYLA EST.' },
      { name: 'HYLA Rapida', desc: 'Akkubetriebener Handstaubsauger für schnelle Reinigung zwischendurch.' },
      { name: 'Ventus Brush', desc: 'Elektrische Turbobürste für die tiefste Teppichreinigung.' },
      { name: 'Nimbus Wischset', desc: 'Wischmopp-Set für die professionelle Nassreinigung von Hartböden.' },
      { name: 'Hartbodendüse (Naturhaar)', desc: 'Extra breite Düse mit Naturhaarborsten für empfindliche Böden.' },
      { name: 'Fensterreinigungsset', desc: 'Komplett-Set mit Abzieher, Schlauch und HYLA Cleanser.' },
      { name: 'Flexibler Saugschlauch', desc: 'Verlängerter flexibler Schlauch für schwer erreichbare Stellen.' },
      { name: 'Gummimanschette', desc: 'Adapter-Manschette für verschiedene Düsenaufsätze.' },
      { name: 'Schutzbeutel (2×)', desc: 'Transparente Aufbewahrungsbeutel zum Schutz Ihres Zubehörs.' },
      { name: 'Zubehörhalter', desc: 'Praktische Wandhalterung für die organisierte Aufbewahrung.' },
    ],
    en: [
      { name: 'HYLA Nymbus', desc: 'Compact water filtration cleaning system for quick daily cleaning – ideal complement to the HYLA EST.' },
      { name: 'HYLA Rapida', desc: 'Battery-powered handheld vacuum for quick cleaning in between.' },
      { name: 'Ventus Brush', desc: 'Electric turbo brush for the deepest carpet cleaning.' },
      { name: 'Nimbus Mopping Set', desc: 'Mop set for professional wet cleaning of hard floors.' },
      { name: 'Hard Floor Nozzle (Natural)', desc: 'Extra wide nozzle with natural hair bristles for delicate floors.' },
      { name: 'Window Cleaning Set', desc: 'Complete set with squeegee, hose and HYLA Cleanser.' },
      { name: 'Flexible Suction Hose', desc: 'Extended flexible hose for hard-to-reach areas.' },
      { name: 'Rubber Sleeve Adapter', desc: 'Adapter sleeve for various nozzle attachments.' },
      { name: 'Storage Bags (2×)', desc: 'Transparent storage bags to protect your accessories.' },
      { name: 'Accessory Holder', desc: 'Practical wall mount for organized storage.' },
    ],
    tr: [
      { name: 'HYLA Nymbus', desc: 'Hızlı günlük temizlik için kompakt su filtreli temizlik sistemi – HYLA EST\'e ideal tamamlayıcı.' },
      { name: 'HYLA Rapida', desc: 'Ara temizlik için akülü el süpürgesi.' },
      { name: 'Ventus Brush', desc: 'En derin halı temizliği için elektrikli turbo fırça.' },
      { name: 'Nimbus Silme Seti', desc: 'Sert zeminlerin profesyonel ıslak temizliği için paspas seti.' },
      { name: 'Sert Zemin Başlığı (Doğal)', desc: 'Hassas zeminler için doğal kıl fırçalı geniş başlık.' },
      { name: 'Cam Temizlik Seti', desc: 'Çekçek, hortum ve HYLA Cleanser ile komple set.' },
      { name: 'Esnek Emiş Hortumu', desc: 'Ulaşılması zor alanlar için uzatılmış esnek hortum.' },
      { name: 'Kauçuk Manşon Adaptör', desc: 'Çeşitli başlık ataşmanları için adaptör manşonu.' },
      { name: 'Koruma Poşetleri (2×)', desc: 'Aksesuarlarınızı korumak için şeffaf saklama poşetleri.' },
      { name: 'Aksesuar Tutucusu', desc: 'Düzenli depolama için pratik duvar askısı.' },
    ],
    sr: [
      { name: 'HYLA Nymbus', desc: 'Kompaktni sistem za čišćenje sa vodenim filterom za brzo svakodnevno čišćenje – idealna dopuna za HYLA EST.' },
      { name: 'HYLA Rapida', desc: 'Bežični ručni usisivač za brzo čišćenje u međuvremenu.' },
      { name: 'Ventus Brush', desc: 'Električna turbo četka za najdublje čišćenje tepiha.' },
      { name: 'Nimbus set za brisanje', desc: 'Set za profesionalno mokro čišćenje tvrdih podova.' },
      { name: 'Nastavak za tvrde podove', desc: 'Ekstra široki nastavak sa prirodnom dlakom za osetljive podove.' },
      { name: 'Set za čišćenje prozora', desc: 'Komplet sa brisačem, crevom i HYLA Cleanser-om.' },
      { name: 'Fleksibilno crevo', desc: 'Produženo fleksibilno crevo za teško dostupna mesta.' },
      { name: 'Gumena manšetna', desc: 'Adapter manšetna za različite nastavke.' },
      { name: 'Zaštitne vrećice (2×)', desc: 'Transparentne vrećice za čuvanje vašeg pribora.' },
      { name: 'Držač za pribor', desc: 'Praktičan zidni nosač za organizovano čuvanje.' },
    ],
  };

  const optionalImages = [
    imgOptNymbus,
    imgOptRapida,
    imgOptVentus,
    imgOptNimbus,
    imgOptHartboden,
    imgOptFenster,
    imgOptSchlauch,
    imgOptManschette,
    imgOptSchutzbeutel,
    imgOptHalter,
  ];

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
        
        {/* Decorative Gradient */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-50/80 via-transparent to-transparent" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <span className="w-8 h-px bg-black" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{t.sectionLabel}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-4"
              >
                {t.heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl text-gray-400 font-medium tracking-tight mb-6"
              >
                {t.heroSubtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-500 max-w-lg mb-10 leading-relaxed"
              >
                {t.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleWhatsApp}
                  className="h-14 px-8 text-base font-bold rounded-full bg-black text-white hover:bg-gray-800 shadow-xl transition-all hover:scale-[1.03] cursor-pointer"
                >
                  <CalendarCheck className="size-5 mr-3" />
                  {t.heroButton}
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="h-14 px-8 text-base font-bold rounded-full border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <MessageCircle className="size-5 mr-3" />
                  WhatsApp
                </Button>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mt-10"
              >
                {[t.noBags, t.noFollowUpCosts, t.madeInEurope].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="size-4 text-green-500" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] border border-gray-100 rounded-full" />
                <div className="w-[300px] h-[300px] border border-gray-100 rounded-full absolute" />
                <div className="w-[200px] h-[200px] border border-gray-100 rounded-full absolute" />
              </div>

              <img
                src={imgHylaBlack}
                alt="HYLA EST"
                className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-8 right-0 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3"
              >
                <div className="text-2xl font-bold text-black">100%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.specSuction}</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute bottom-12 left-0 z-20 bg-black text-white rounded-2xl shadow-xl px-5 py-3"
              >
                <div className="text-2xl font-bold">850W</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.specMotor}</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== SEPARATOR TECHNOLOGY SECTION ===== */}
      <section className="relative py-24 lg:py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762333261452-f42d7538c505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBwdXJlJTIwYmx1ZSUyMG1hY3JvJTIwY2xlYW58ZW58MXx8fHwxNzcxNDI5NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Droplets className="size-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">{tCommon.waterTechnology}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
              >
                {t.separatorTitle}
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              {t.separatorDesc}
            </motion.p>
          </div>

          {/* USP Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-0">
            {[
              { icon: Droplets, label: t.noBags },
              { icon: Zap, label: t.noFollowUpCosts },
              { icon: Leaf, label: t.madeInEurope },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6"
              >
                <div className="flex-shrink-0 size-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <item.icon className="size-6 text-blue-400" />
                </div>
                <span className="text-lg font-bold">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="relative py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500"
              >
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="size-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATION AREAS WITH IMAGES ===== */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-px bg-black" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{t.sectionLabel}</span>
              <span className="w-8 h-px bg-black" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              {t.applicationsTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              {t.applicationsSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative rounded-3xl overflow-hidden cursor-default ${app.span}`}
              >
                <ImageWithFallback
                  src={app.image}
                  alt={app.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg font-bold mb-1">{app.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{app.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECS + COLOR TOGGLE ===== */}
      <section className="relative py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — Product Image with Color Toggle */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="relative bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

                {/* Color Toggle */}
                <div className="relative z-20 flex justify-center mb-8">
                  <div className="inline-flex bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setSelectedColor('black')}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                        selectedColor === 'black'
                          ? 'text-white'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {selectedColor === 'black' && (
                        <motion.div
                          layoutId="colorToggle"
                          className="absolute inset-0 bg-black rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="size-3 rounded-full bg-gray-900 border border-gray-600" />
                        {t.blackEdition}
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedColor('white')}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                        selectedColor === 'white'
                          ? 'text-white'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {selectedColor === 'white' && (
                        <motion.div
                          layoutId="colorToggle"
                          className="absolute inset-0 bg-black rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="size-3 rounded-full bg-white border border-gray-300" />
                        {t.whiteEdition}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Product Image */}
                <div className="relative w-full" style={{ paddingBottom: '120%' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedColor}
                      src={selectedColor === 'black' ? imgHylaBlack : imgHylaWhite}
                      alt={`HYLA EST ${selectedColor === 'black' ? 'Black' : 'White'}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: selectedColor === 'white' ? 1.22 : 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-10 w-full h-full object-contain drop-shadow-2xl"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right — Specs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">{t.specTitle}</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">HYLA EST Defender</h3>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-10">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between py-4 ${index < specs.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-sm font-medium text-gray-500">{spec.label}</span>
                    <span className="text-sm font-bold text-black text-right">{spec.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full h-16 text-base font-bold rounded-2xl bg-black hover:bg-gray-900 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                >
                  <CalendarCheck className="size-5 mr-3" />
                  {t.ctaButton}
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full h-14 text-base font-bold rounded-2xl border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <MessageCircle className="size-5 mr-3" />
                  {t.ctaWhatsapp}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ACCESSORIES SECTION ===== */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Package className="size-4 text-gray-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{t.sectionLabel}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              {t.accessoriesTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-10"
            >
              {t.accessoriesSubtitle}
            </motion.p>

            {/* Standard / Optional Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-flex bg-gray-100 rounded-full p-1"
            >
              <button
                onClick={() => setAccessoryTab('standard')}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  accessoryTab === 'standard' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {accessoryTab === 'standard' && (
                  <motion.div
                    layoutId="accToggle"
                    className="absolute inset-0 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Check className="size-4" />
                  {t.standardTab}
                </span>
              </button>
              <button
                onClick={() => setAccessoryTab('optional')}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  accessoryTab === 'optional' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {accessoryTab === 'optional' && (
                  <motion.div
                    layoutId="accToggle"
                    className="absolute inset-0 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="size-4" />
                  {t.optionalTab}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Included / Optional note */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <span className={`size-2 rounded-full ${accessoryTab === 'standard' ? 'bg-green-500' : 'bg-blue-500'}`} />
              {accessoryTab === 'standard' ? t.includedNote : t.optionalNote}
            </span>
          </div>

          {/* Standard Accessories Grid */}
          <AnimatePresence mode="wait">
            {accessoryTab === 'standard' ? (
              <motion.div
                key="standard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              >
                {(standardAccessories[language] || standardAccessories.de).map((acc, i) => (
                  <motion.div
                    key={acc.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-[#FAFAFA] rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-white flex items-center justify-center p-6 md:p-8 overflow-hidden">
                      <img
                        src={standardImages[i]}
                        alt={acc.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <h4 className="text-sm md:text-base font-bold mb-1 tracking-tight">{acc.name}</h4>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">{acc.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="optional"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              >
                {(optionalAccessories[language] || optionalAccessories.de).map((acc, i) => (
                  <motion.div
                    key={acc.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-[#FAFAFA] rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-white flex items-center justify-center p-6 md:p-8 overflow-hidden">
                      <img
                        src={optionalImages[i]}
                        alt={acc.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <h4 className="text-sm md:text-base font-bold mb-1 tracking-tight">{acc.name}</h4>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">{acc.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CROSS-LINK: DISCOVER STEAMER ===== */}
      <section className="relative py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{t.alsoDiscover}</span>
          </motion.div>

          <Link to="/steamer" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2rem] overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl bg-black"
            >
              <div className="absolute inset-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1604838656896-171d9d737cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBzdGVhbSUyMHZhcG9yJTIwY2xvc2UlMjB1cCUyMGRhcmslMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzE0Mjk3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt=""
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between p-10 md:p-16 min-h-[250px]">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Flame className="size-4 text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">{tCommon.steamPower}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">{t.discoverSteamer}</h3>
                  <p className="text-lg text-gray-300 max-w-lg">{t.discoverSteamerDesc}</p>
                </div>
                <div className="flex-shrink-0 hidden md:flex size-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight className="size-7 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ===== BOTTOM CTA BANNER ===== */}
      <section className="relative overflow-hidden py-32 bg-black text-white">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1577897113292-3b95936e5206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBoZWFsdGh5JTIwaG9tZSUyMGNoaWxkcmVuJTIwcGxheWluZyUyMGNsZWFufGVufDF8fHx8MTc3MTQyOTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {t.ctaTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 mb-10"
          >
            {t.ctaDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleWhatsApp}
              className="h-14 px-10 text-base font-bold rounded-full bg-white text-black hover:bg-gray-200 shadow-xl transition-all cursor-pointer"
            >
              <CalendarCheck className="size-5 mr-3" />
              {t.ctaButton}
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="h-14 px-10 text-base font-bold rounded-full border-white text-white hover:bg-white hover:text-black transition-all bg-transparent cursor-pointer"
            >
              <MessageCircle className="size-5 mr-3" />
              WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}