import { useOutletContext, Link } from 'react-router';
import { motion } from 'motion/react';
import { translations, Language } from '@/app/translations';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  const { language } = useOutletContext<{ language: Language }>();

  const content = {
    de: {
      title: '404',
      subtitle: 'Seite nicht gefunden',
      description: 'Die angeforderte Seite existiert nicht oder wurde verschoben.',
      backHome: 'Zur Startseite',
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'The requested page does not exist or has been moved.',
      backHome: 'Back to Home',
    },
    tr: {
      title: '404',
      subtitle: 'Sayfa Bulunamadı',
      description: 'İstenen sayfa mevcut değil veya taşınmış.',
      backHome: 'Ana Sayfaya Dön',
    },
  };

  const c = content[language];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[12rem] font-bold tracking-tighter leading-none text-gray-100 select-none"
        >
          {c.title}
        </motion.h1>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 -mt-12">
          {c.subtitle}
        </h2>

        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          {c.description}
        </p>

        <Link to="/">
          <Button className="h-14 px-8 rounded-full bg-black text-white hover:bg-gray-800 font-bold shadow-xl transition-all hover:scale-[1.03]">
            <Home className="size-5 mr-3" />
            {c.backHome}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
