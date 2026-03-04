import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { translations, Language } from '@/app/translations';
import { Button } from '@/app/components/ui/button';
import { WHATSAPP_NUMBER } from '@/app/constants';
import { supabase } from '@/app/lib/supabase';
import { toast } from 'sonner';

interface HylaContactSectionProps {
  language: Language;
}

export function HylaContactSection({ language }: HylaContactSectionProps) {
  const t = translations[language];
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Save to Supabase leads table
      await supabase.from('leads').insert({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message,
        status: 'new',
      });
      toast.success('Poruka poslata! Kontaktiraćemo vas uskoro.');
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Greška pri slanju. Pokušajte ponovo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-white">
      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="mb-20">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">{t.common.contact}</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            {t.contactPage.titleGetInTouch}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">

          {/* Left: Info & Map Link */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.contactPage.frankfurtHQ}</h3>
              <p className="text-lg text-gray-500 leading-relaxed mb-6">
                Heinrichstraße 9<br />
                60326 Frankfurt am Main<br />
                {t.common.country}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Heinrichstra%C3%9Fe+9,+60326+Frankfurt+am+Main"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition-opacity"
              >
                {t.contactPage.viewOnMap} <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${t.footer.email}`} className="block text-xl font-medium hover:opacity-60 transition-opacity">
                {t.footer.email}
              </a>
              <a href={`tel:${t.footer.phone}`} className="block text-xl font-medium hover:opacity-60 transition-opacity">
                {t.footer.phone}
              </a>
            </div>

            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-gray-100">
              <h4 className="font-bold text-lg mb-2">{t.contactPage.liveDemoEvent}</h4>
              <p className="text-gray-500 mb-4">{t.contactPage.liveDemoDesc}</p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <span className="font-bold">{t.contactPage.mondays}</span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">{t.contactPage.time}</span>
              </div>
            </div>
          </div>

          {/* Right: Minimal Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2 group-focus-within:text-black transition-colors">{t.contactSection.formName}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-medium focus:outline-none focus:border-black transition-colors"
                    placeholder={t.contactPage.placeholderName}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2 group-focus-within:text-black transition-colors">{t.contactSection.formEmail}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-medium focus:outline-none focus:border-black transition-colors"
                    placeholder={t.contactPage.placeholderEmail}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2 group-focus-within:text-black transition-colors">{t.contactSection.formPhone}</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder={t.contactPage.placeholderPhone}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2 group-focus-within:text-black transition-colors">{t.contactSection.formMessage}</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-medium focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder={t.contactPage.placeholderMessage}
                />
              </div>

              <div className="pt-8">
                <Button type="submit" className="h-16 px-10 rounded-full bg-black text-white hover:bg-gray-800 text-lg font-bold flex items-center gap-4 transition-transform hover:scale-105">
                  {t.contactSection.submitButton} <ArrowRight className="size-5" />
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}