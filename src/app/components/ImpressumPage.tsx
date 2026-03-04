import { useOutletContext } from 'react-router';
import { motion } from 'motion/react';
import { translations, Language } from '@/app/translations';
import { CONTACT_EMAIL, CONTACT_PHONE, OFFICE_ADDRESS } from '@/app/constants';

export function ImpressumPage() {
  const { language } = useOutletContext<{ language: Language }>();
  const t = translations[language].common;

  const content = {
    de: {
      title: 'Impressum',
      subtitle: 'Angaben gemäß § 5 TMG',
      name: 'Hakan Akkuş',
      role: 'Selbstständiger HYLA Vertriebspartner / Team Leader',
      address: OFFICE_ADDRESS,
      country: 'Deutschland',
      contactTitle: 'Kontakt',
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      whatsapp: '+49 172 6134835 (WhatsApp)',
      responsibleTitle: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
      responsibleName: 'Hakan Akkuş',
      responsibleAddress: OFFICE_ADDRESS,
      disputeTitle: 'Streitschlichtung',
      disputeContent: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerContent: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
      disclaimerLinks: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
      copyrightTitle: 'Urheberrecht',
      copyrightContent: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      brandNote: 'HYLA® ist eine eingetragene Marke. Diese Website wird von einem unabhängigen HYLA Vertriebspartner betrieben und ist keine offizielle Website der HYLA Marke.',
      designNote: 'Webdesign & Entwicklung: Edis Muminovic — edis.design@outlook.com',
    },
    en: {
      title: 'Legal Notice',
      subtitle: 'Information according to § 5 TMG (German Telemedia Act)',
      name: 'Hakan Akkuş',
      role: 'Independent HYLA Sales Partner / Team Leader',
      address: OFFICE_ADDRESS,
      country: 'Germany',
      contactTitle: 'Contact',
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      whatsapp: '+49 172 6134835 (WhatsApp)',
      responsibleTitle: 'Responsible for content according to § 55 Abs. 2 RStV',
      responsibleName: 'Hakan Akkuş',
      responsibleAddress: OFFICE_ADDRESS,
      disputeTitle: 'Dispute Resolution',
      disputeContent: 'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      disclaimerTitle: 'Disclaimer',
      disclaimerContent: 'The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.',
      disclaimerLinks: 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents.',
      copyrightTitle: 'Copyright',
      copyrightContent: 'The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator.',
      brandNote: 'HYLA® is a registered trademark. This website is operated by an independent HYLA sales partner and is not an official website of the HYLA brand.',
      designNote: 'Web Design & Development: Edis Muminovic — edis.design@outlook.com',
    },
    tr: {
      title: 'Yasal Bilgiler',
      subtitle: '§ 5 TMG (Alman Telemedya Yasası) uyarınca bilgiler',
      name: 'Hakan Akkuş',
      role: 'Bağımsız HYLA Satış Ortağı / Takım Lideri',
      address: OFFICE_ADDRESS,
      country: 'Almanya',
      contactTitle: 'İletişim',
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      whatsapp: '+49 172 6134835 (WhatsApp)',
      responsibleTitle: '§ 55 Abs. 2 RStV uyarınca içerikten sorumlu',
      responsibleName: 'Hakan Akkuş',
      responsibleAddress: OFFICE_ADDRESS,
      disputeTitle: 'Uyuşmazlık Çözümü',
      disputeContent: 'Avrupa Komisyonu çevrimiçi uyuşmazlık çözümü (ODR) için bir platform sunmaktadır: https://ec.europa.eu/consumers/odr/. Bir tüketici tahkim kurulu önünde uyuşmazlık çözüm süreçlerine katılma isteğimiz veya yükümlülüğümüz bulunmamaktadır.',
      disclaimerTitle: 'Sorumluluk Reddi',
      disclaimerContent: 'Sayfalarımızın içeriği büyük özenle hazırlanmıştır. Ancak içeriğin doğruluğunu, eksiksizliğini ve güncelliğini garanti edemeyiz.',
      disclaimerLinks: 'Teklifimiz, içerikleri üzerinde hiçbir etkimizin olmadığı üçüncü taraf web sitelerine bağlantılar içermektedir. Bu nedenle bu harici içerikler için sorumluluk üstlenemeyiz.',
      copyrightTitle: 'Telif Hakkı',
      copyrightContent: 'Bu sayfalarda site operatörleri tarafından oluşturulan içerik ve eserler Alman telif hakkı yasasına tabidir. Telif hakkı sınırları dışında çoğaltma, düzenleme, dağıtım ve her türlü kullanım, ilgili yazarın veya yaratıcının yazılı iznini gerektirir.',
      brandNote: 'HYLA® tescilli bir markadır. Bu web sitesi bağımsız bir HYLA satış ortağı tarafından işletilmektedir ve HYLA markasının resmi bir web sitesi değildir.',
      designNote: 'Web Tasarım & Geliştirme: Edis Muminovic — edis.design@outlook.com',
    },
    sr: {
      title: 'Impressum',
      subtitle: 'Podaci u skladu sa § 5 TMG (Nemački zakon o telemedijima)',
      name: 'Hakan Akkuş',
      role: 'Samostalni HYLA prodajni partner / Tim lider',
      address: OFFICE_ADDRESS,
      country: 'Nemačka',
      contactTitle: 'Kontakt',
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      whatsapp: '+49 172 6134835 (WhatsApp)',
      responsibleTitle: 'Odgovoran za sadržaj prema § 55 Abs. 2 RStV',
      responsibleName: 'Hakan Akkuş',
      responsibleAddress: OFFICE_ADDRESS,
      disputeTitle: 'Rešavanje sporova',
      disputeContent: 'Evropska komisija obezbeđuje platformu za onlajn rešavanje sporova (ODR): https://ec.europa.eu/consumers/odr/. Nismo spremni niti obavezni da učestvujemo u postupcima rešavanja sporova pred potrošačkim arbitražnim telom.',
      disclaimerTitle: 'Odricanje od odgovornosti',
      disclaimerContent: 'Sadržaj naših stranica je kreiran sa najvećom pažnjom. Međutim, ne možemo garantovati tačnost, potpunost i aktuelnost sadržaja.',
      disclaimerLinks: 'Naša ponuda sadrži linkove ka eksternim web stranicama trećih lica na čiji sadržaj nemamo uticaj. Stoga ne možemo preuzeti nikakvu odgovornost za te eksterne sadržaje.',
      copyrightTitle: 'Autorska prava',
      copyrightContent: 'Sadržaj i dela koja su kreirali operatori sajta na ovim stranicama podležu nemačkom zakonu o autorskim pravima. Reprodukcija, obrada, distribucija i svaka vrsta korišćenja van granica autorskog prava zahtevaju pisanu saglasnost autora ili kreatora.',
      brandNote: 'HYLA® je registrovani zaštitni znak. Ovu web stranicu vodi nezavisni HYLA prodajni partner i nije zvanična web stranica HYLA brenda.',
      designNote: 'Web dizajn i razvoj: Edis Muminovic — edis.design@outlook.com',
    },
  };

  const c = content[language];

  return (
    <div className="relative pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{c.title}</h1>
          <p className="text-lg text-gray-500 mb-12">{c.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-10"
        >
          <div>
            <p className="text-lg font-bold">{c.name}</p>
            <p className="text-gray-600">{c.role}</p>
            <p className="text-gray-600 mt-2">{c.address}</p>
            <p className="text-gray-600">{c.country}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">{c.contactTitle}</h2>
            <p className="text-gray-600">E-Mail: <a href={`mailto:${c.email}`} className="underline hover:text-black">{c.email}</a></p>
            <p className="text-gray-600">Tel: <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="underline hover:text-black">{c.phone}</a></p>
            <p className="text-gray-600">WhatsApp: <a href={`https://wa.me/${c.whatsapp.replace(/\s/g, '')}`} className="underline hover:text-black">{c.whatsapp}</a></p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">{c.responsibleTitle}</h2>
            <p className="text-gray-600">{c.responsibleName}</p>
            <p className="text-gray-600">{c.responsibleAddress}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">{c.disputeTitle}</h2>
            <p className="text-gray-600">{c.disputeContent}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">{c.disclaimerTitle}</h2>
            <p className="text-gray-600 mb-3">{c.disclaimerContent}</p>
            <p className="text-gray-600">{c.disclaimerLinks}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">{c.copyrightTitle}</h2>
            <p className="text-gray-600">{c.copyrightContent}</p>
          </div>

          <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">{c.brandNote}</p>
            <p className="text-sm text-gray-500 mt-2">{c.designNote}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}