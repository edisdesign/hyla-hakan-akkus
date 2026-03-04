import { Instagram, ArrowRight, MoreHorizontal } from 'lucide-react';
import { translations, Language } from '@/app/translations';
import { HylaLogo } from '@/app/components/ui/HylaLogo';
import { Link, useLocation, useNavigate } from 'react-router';
import { WHATSAPP_NUMBER } from '@/app/constants';
import { useAdmin } from '@/app/context/AdminContext';

interface HylaFooterProps {
  language: Language;
}

export function HylaFooter({ language }: HylaFooterProps) {
  const t = translations[language];
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { isAdmin } = useAdmin();

  const handleHashNav = (hash: string) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    const messages: Record<string, string> = {
      de: 'Hallo! Ich möchte eine kostenlose Vorführung buchen.',
      en: 'Hello! I would like to book a free demonstration.',
      tr: 'Merhaba! Ücretsiz bir tanıtım randevusu almak istiyorum.',
    };
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[language] || messages.de)}`,
      '_blank'
    );
  };

  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">

          {/* Brand & CTA */}
          <div className="max-w-xl">
            <Link to="/">
              <HylaLogo variant="light" className="h-[3.75rem] w-auto mb-10" />
            </Link>
            <h3 className="text-4xl font-bold tracking-tight mb-8">
              {t.footerCta.title}
            </h3>
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 text-lg font-bold border-b-2 border-black pb-1 hover:opacity-70 transition-opacity cursor-pointer"
            >
              {t.footerCta.button} <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-400">{t.common.navigation}</h4>
              <ul className="space-y-4">
                {[
                  { hash: '#products', label: t.nav.products },
                  { hash: '#applications', label: t.nav.applications },
                  { hash: '#offers', label: t.nav.offers },
                  { hash: '#career', label: t.nav.career },
                ].map((item) => (
                  <li key={item.hash}>
                    <button
                      onClick={() => handleHashNav(item.hash)}
                      className="text-base font-medium hover:text-gray-500 transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link to="/est" className="text-base font-medium hover:text-gray-500 transition-colors">
                    HYLA EST
                  </Link>
                </li>
                <li>
                  <Link to="/steamer" className="text-base font-medium hover:text-gray-500 transition-colors">
                    HYLA Steamer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-400">{t.common.contact}</h4>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${t.footer.email}`} className="text-base font-medium hover:text-gray-500 transition-colors">
                    {t.footer.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`} className="text-base font-medium hover:text-gray-500 transition-colors">
                    {t.footer.phone}
                  </a>
                </li>
                <li className="text-base text-gray-500">
                  {t.common.frankfurtCity}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-400">{t.common.legal}</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/impressum" className="text-base font-medium hover:text-gray-500 transition-colors">
                    {t.common.impressum}
                  </Link>
                </li>
                <li>
                  <Link to="/datenschutz" className="text-base font-medium hover:text-gray-500 transition-colors">
                    {t.common.datenschutz}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p>&copy; {currentYear} Hakan Akku&#351;. {t.common.copyrightText}</p>
            <span className="hidden sm:inline text-gray-300">|</span>
            <p>Design by <a href="mailto:edis.design@outlook.com" className="hover:text-black transition-colors">Edi</a></p>
            {!isAdmin ? (
              <button
                onClick={() => window.dispatchEvent(new Event('hyla:openlogin'))}
                className="w-6 h-6 flex items-center justify-center text-gray-200 hover:text-gray-400 transition-colors cursor-pointer"
                title="Admin"
              >
                <MoreHorizontal size={14} />
              </button>
            ) : (
              <button
                onClick={() => window.dispatchEvent(new Event('hyla:openpanel'))}
                className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Admin Panel
              </button>
            )}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <Link to="/impressum" className="hover:text-black transition-colors">
              {t.common.impressum}
            </Link>
            <Link to="/datenschutz" className="hover:text-black transition-colors">
              {t.common.datenschutz}
            </Link>
            <a href="https://www.instagram.com/hakanakkush/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}