import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { translations, Language } from '@/app/translations';
import { Link } from 'react-router';
import { Shield } from 'lucide-react';

interface CookieConsentProps {
  language: Language;
  introComplete?: boolean;
}

export function CookieConsent({ language, introComplete = true }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const t = translations[language].common;

  useEffect(() => {
    if (!introComplete) return;
    const consent = sessionStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  const handleAccept = () => {
    sessionStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Shield className="size-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t.cookieConsent}{' '}
                  <Link to="/datenschutz" className="underline font-medium text-black hover:text-gray-600">
                    {t.datenschutz}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 sm:flex-initial h-10 rounded-full text-sm font-medium border-gray-300 hover:bg-gray-100"
              >
                {t.cookieDecline}
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial h-10 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800"
              >
                {t.cookieAccept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}