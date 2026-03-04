import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { HylaHeader } from '@/app/components/HylaHeader';
import { HylaFooter } from '@/app/components/HylaFooter';
import { ScrollToTop } from '@/app/components/ui/ScrollToTop';
import { WhatsAppButton } from '@/app/components/ui/WhatsAppButton';
import { Toaster } from '@/app/components/ui/sonner';
import { HylaIntroScreen } from '@/app/components/HylaIntroScreen';
import { CookieConsent } from '@/app/components/CookieConsent';
import { motion } from 'motion/react';
import { ThemeProvider } from '@/app/context/ThemeContext';
import type { Language } from '@/app/translations';

export function Layout() {
  const [language, setLanguage] = useState<Language>('de');
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hylaIntroSeen') === 'true';
    }
    return false;
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['de', 'en', 'tr', 'sr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (mounted) {
      localStorage.setItem('language', lang);
    }
  };

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem('hylaIntroSeen', 'true');
  };

  // Only show intro on home page
  const showIntro = isHome && !introComplete;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {showIntro && (
        <HylaIntroScreen onComplete={handleIntroComplete} language={language} />
      )}
      {(!showIntro || !isHome) && (
        <HylaHeader
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}
      <motion.div
        className="relative w-full min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#111111] selection:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: (!isHome || introComplete) ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Outlet context={{ language }} />
        <HylaFooter language={language} />
      </motion.div>
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent language={language} introComplete={!showIntro} />
      <Toaster />
    </ThemeProvider>
  );
}