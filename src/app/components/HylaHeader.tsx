import { translations, Language } from '@/app/translations';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { HylaLogo } from '@/app/components/ui/HylaLogo';
import { motion, LayoutGroup } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';
import { WHATSAPP_NUMBER } from '@/app/constants';

interface HylaHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function HylaHeader({ language, onLanguageChange }: HylaHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For product pages, always show scrolled (white) header
  const isProductPage = location.pathname !== '/';

  const navLinks = isHome
    ? [
        { href: '/est', label: 'HYLA EST' },
        { href: '/steamer', label: 'HYLA Steamer' },
        { href: '#products', label: t.nav.products },
        { href: '#offers', label: t.nav.offers },
        { href: '#career', label: t.nav.career },
      ]
    : [
        { href: '/', label: t.nav.home },
        { href: '/est', label: 'HYLA EST' },
        { href: '/steamer', label: 'HYLA Steamer' },
      ];

  const isTransparent = !scrolled && !isMenuOpen && !isProductPage;
  const textColor = isTransparent ? 'text-white' : 'text-black';
  const logoVariant = isTransparent ? 'dark' : 'light';

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      // Hash navigation on home page
      if (!isHome) {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleBookDemo = () => {
    if (isHome) {
      handleNavClick('#contact');
    } else {
      const messages: Record<string, string> = {
        de: 'Hallo! Ich möchte eine kostenlose Vorführung buchen.',
        en: 'Hello! I would like to book a free demonstration.',
        tr: 'Merhaba! Ücretsiz bir tanıtım randevusu almak istiyorum.',
      };
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[language] || messages.de)}`,
        '_blank'
      );
    }
  };

  return (
    <LayoutGroup>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isProductPage
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="w-full px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer z-50"
              onClick={handleLogoClick}
            >
              <HylaLogo variant={logoVariant} className="h-16 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center gap-1 ${textColor}`}>
              {navLinks.map((link) => {
                const isActive = !link.href.startsWith('#') && location.pathname === link.href;
                const isProductLink = link.href === '/est' || link.href === '/steamer';
                
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive && isProductLink
                        ? 'text-white'
                        : 'hover:opacity-70'
                    }`}
                  >
                    {/* Animated pill behind active product link */}
                    {isActive && isProductLink && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-black rounded-full"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <div className={`${textColor}`}>
                <LanguageSwitcher
                  currentLanguage={language}
                  onLanguageChange={onLanguageChange}
                />
              </div>
              <Button
                onClick={handleBookDemo}
                className={`rounded-full px-6 h-10 text-sm font-medium transition-colors ${
                  scrolled || isProductPage
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {t.nav.bookDemo}
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-4 z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${textColor}`}
              >
                {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
          animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
          exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 bg-[#FAFAFA]"
        >
          <div className="flex flex-col justify-center h-full px-8 pb-10">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = !link.href.startsWith('#') && location.pathname === link.href;
                const isProductLink = link.href === '/est' || link.href === '/steamer';
                
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={`text-4xl font-bold tracking-tight text-left cursor-pointer transition-colors ${
                      isActive && isProductLink
                        ? 'text-black'
                        : isActive
                        ? 'text-black'
                        : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && isProductLink && (
                        <motion.span
                          layoutId="mobileActiveDot"
                          className="inline-block w-3 h-3 rounded-full bg-black flex-shrink-0"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="mt-12 flex flex-col items-start gap-8">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
              />
              <Button
                onClick={handleBookDemo}
                className="w-full h-14 rounded-full bg-black text-white text-lg font-medium"
              >
                {t.nav.bookDemo}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </LayoutGroup>
  );
}