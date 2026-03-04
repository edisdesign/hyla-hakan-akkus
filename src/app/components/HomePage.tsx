import { useOutletContext } from 'react-router';
import { HylaHeroSection } from '@/app/components/HylaHeroSection';
import { HylaWhySection } from '@/app/components/HylaWhySection';
import { HylaPricingSection } from '@/app/components/HylaPricingSection';
import { HylaInstagramSection } from '@/app/components/HylaInstagramSection';
import { HylaTestimonialsSection } from '@/app/components/HylaTestimonialsSection';
import { HylaFaqSection } from '@/app/components/HylaFaqSection';
import { HylaContactSection } from '@/app/components/HylaContactSection';
import { HylaTeamSection } from '@/app/components/HylaTeamSection';
import { HylaServiceSection } from '@/app/components/HylaServiceSection';
import { HylaAssemblySection } from '@/app/components/HylaAssemblySection';
import { HylaMondayGallery } from '@/app/components/HylaMondayGallery';
import { HylaResultsSection } from '@/app/components/HylaResultsSection';
import type { Language } from '@/app/translations';

export function HomePage() {
  const { language } = useOutletContext<{ language: Language }>();

  return (
    <main className="relative pt-0">
      <HylaHeroSection language={language} />
      <HylaWhySection language={language} />
      <HylaAssemblySection language={language} />

      {/* Black & White Edition */}
      <div id="offers">
        <HylaPricingSection language={language} />
      </div>

      <div className="bg-[#FAFAFA] relative">
        <HylaServiceSection language={language} />
      </div>

      <HylaResultsSection language={language} />

      <div id="career" className="bg-white relative">
        <HylaTeamSection language={language} />
      </div>

      <HylaMondayGallery language={language} />
      <HylaInstagramSection language={language} />
      <HylaTestimonialsSection language={language} />
      <HylaFaqSection language={language} />
      <HylaContactSection language={language} />
    </main>
  );
}