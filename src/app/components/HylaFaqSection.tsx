import { useState, useEffect, useCallback } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { translations, type Language } from '@/app/translations';
import { FadeUp, StaggerContainer, StaggerItem } from '@/app/components/ui/ScrollReveal';
import { supabase, type FaqItem } from '@/app/lib/supabase';

interface HylaFaqSectionProps {
  language: Language;
}

export function HylaFaqSection({ language }: HylaFaqSectionProps) {
  const t = translations[language].faq;
  const common = translations[language].common;
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = useCallback(async () => {
    const { data } = await supabase
      .from('faq')
      .select('*')
      .eq('active', true)
      .order('sort_order');

    const langKey = language === 'de' ? 'de' : language === 'tr' ? 'tr' : 'sr';

    if (data && data.length > 0) {
      setFaqs(data.map((item: FaqItem) => ({
        question: (item as any)[`question_${langKey}`] || item.question_de || '',
        answer: (item as any)[`answer_${langKey}`] || item.answer_de || '',
      })));
    } else {
      // Fallback to hardcoded translations
      setFaqs([
        { question: t.q1, answer: t.a1 },
        { question: t.q2, answer: t.a2 },
        { question: t.q3, answer: t.a3 },
        { question: t.q4, answer: t.a4 },
        { question: t.q5, answer: t.a5 },
        { question: t.q6, answer: t.a6 },
        { question: t.q7, answer: t.a7 },
        { question: t.q8, answer: t.a8 },
        { question: t.q9, answer: t.a9 },
      ]);
    }
    setLoading(false);
  }, [language, t]);

  useEffect(() => {
    fetchFaqs();
    const h = () => fetchFaqs();
    window.addEventListener('hyla:refresh', h);
    return () => window.removeEventListener('hyla:refresh', h);
  }, [fetchFaqs]);

  return (
    <section className="relative py-32 bg-[#F5F5F7]">
      <div className="relative container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <FadeUp>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">{common.support}</span>
            <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tighter leading-[0.9]">
              {t.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-8 md:mt-0">
            <p className="text-xl text-gray-500 max-w-sm leading-relaxed">
              {t.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="max-w-4xl">
          <Accordion type="single" collapsible className="space-y-0">
            <StaggerContainer>
              {faqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-b border-black/10 py-6 data-[state=open]:py-8 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left hover:no-underline group">
                      <span className="text-2xl md:text-3xl font-bold text-black group-hover:text-gray-600 transition-colors pr-8">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-gray-500 leading-relaxed pt-4 max-w-2xl">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Accordion>
        </div>
      </div>
    </section>
  );
}