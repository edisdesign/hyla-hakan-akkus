import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { translations, type Language } from '@/app/translations';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { FadeUp, StaggerContainer, StaggerItem } from '@/app/components/ui/ScrollReveal';
import { supabase, type Testimonial } from '@/app/lib/supabase';

interface HylaTestimonialsSectionProps {
  language: Language;
}

// Fallback hardcoded testimonials if Supabase is empty
const getFallbacks = (t: any) => [
  { id: -1, name: t.testimonial1.name, text: t.testimonial1.text, rating: t.testimonial1.rating ?? 5, location: '', image_url: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&q=80', sort_order: 0, active: true },
  { id: -2, name: t.testimonial2.name, text: t.testimonial2.text, rating: t.testimonial2.rating ?? 5, location: '', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', sort_order: 1, active: true },
  { id: -3, name: t.testimonial3.name, text: t.testimonial3.text, rating: t.testimonial3.rating ?? 5, location: '', image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', sort_order: 2, active: true },
];

export function HylaTestimonialsSection({ language }: HylaTestimonialsSectionProps) {
  const t = translations[language].testimonials;
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('sort_order');

    if (data && data.length > 0) {
      setTestimonials(data);
    } else {
      // Fallback to hardcoded if DB is empty
      setTestimonials(getFallbacks(t) as Testimonial[]);
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    fetchTestimonials();
    const h = () => fetchTestimonials();
    window.addEventListener('hyla:refresh', h);
    return () => window.removeEventListener('hyla:refresh', h);
  }, [fetchTestimonials]);

  if (loading) return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl" />)}
        </div>
      </div>
    </section>
  );

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">
              {t.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-[#4b5563] mb-6">
              {t.subtitle}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-[#1a1a1a]">{t.averageRating}</span>
            </div>
            <p className="text-sm text-[#6b7280] mt-2">{t.googleReviews}</p>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.id ?? index}>
              <Card className="border-2 border-[#e5e7eb] hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <Quote className="size-12 text-[#1e3a8a] opacity-20" />
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[#4b5563] mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <ImageWithFallback
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a1a]">{testimonial.name}</p>
                      <p className="text-sm text-[#6b7280]">{testimonial.location || t.customerLabel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}