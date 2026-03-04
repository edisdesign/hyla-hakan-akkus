import { useOutletContext } from 'react-router';
import { motion } from 'motion/react';
import { translations, Language } from '@/app/translations';
import { CONTACT_EMAIL, CONTACT_PHONE, OFFICE_ADDRESS } from '@/app/constants';

export function DatenschutzPage() {
  const { language } = useOutletContext<{ language: Language }>();

  const content = {
    de: {
      title: 'Datenschutzerklärung',
      subtitle: 'Informationen zum Datenschutz gemäß DSGVO',
      sections: [
        {
          heading: '1. Verantwortlicher',
          text: `Hakan Akkuş\n${OFFICE_ADDRESS}\nE-Mail: ${CONTACT_EMAIL}\nTel: ${CONTACT_PHONE}`,
        },
        {
          heading: '2. Erhebung und Speicherung personenbezogener Daten',
          text: 'Beim Besuch unserer Website werden automatisch Informationen durch den Browser übermittelt (Server-Log-Dateien): Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nach 14 Tagen gelöscht.',
        },
        {
          heading: '3. Rechtsgrundlage',
          text: 'Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertragserfüllung) und lit. f (berechtigtes Interesse) DSGVO.',
        },
        {
          heading: '4. SSL/TLS-Verschlüsselung',
          text: 'Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an dem Schloss-Symbol in der Adresszeile des Browsers und daran, dass die Adresszeile von „http://" auf „https://" wechselt.',
        },
        {
          heading: '5. Kontaktaufnahme',
          text: 'Wenn Sie uns per Kontaktformular, E-Mail oder WhatsApp Anfragen zukommen lassen, werden Ihre Angaben (Name, E-Mail, Telefonnummer, Nachricht) zwecks Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet nicht statt. Die Daten werden gelöscht, sobald der Zweck der Speicherung entfällt.',
        },
        {
          heading: '6. WhatsApp-Kommunikation',
          text: 'Auf unserer Website befinden sich Links zur Kontaktaufnahme über WhatsApp (Meta Platforms). Wenn Sie diesen Link nutzen, werden Ihre Nachricht und Telefonnummer an WhatsApp/Meta übermittelt. Es gelten die Datenschutzbestimmungen von Meta Platforms Inc. (https://www.whatsapp.com/legal/privacy-policy).',
        },
        {
          heading: '7. Eingebettete Inhalte',
          text: 'Wir binden YouTube-Videos (Google Ireland Ltd.) und Bilder von Unsplash ein. Beim Laden dieser Inhalte wird Ihre IP-Adresse an die jeweiligen Anbieter übermittelt. YouTube-Videos werden erst nach Ihrer Zustimmung geladen. Es gelten die Datenschutzrichtlinien von Google (https://policies.google.com/privacy) bzw. Unsplash (https://unsplash.com/privacy).',
        },
        {
          heading: '8. Hosting',
          text: 'Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Dies können insbesondere IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, sein.',
        },
        {
          heading: '9. Cookies und Speicherung',
          text: 'Diese Website verwendet technisch notwendige Cookies und sessionStorage für die Spracheinstellung und das Cookie-Consent-Banner. Drittanbieter-Cookies werden nur bei der Einbettung von YouTube-Inhalten geladen. Sie können die Cookie-Einstellungen in Ihrem Browser jederzeit ändern.',
        },
        {
          heading: '10. Ihre Rechte',
          text: 'Sie haben gemäß DSGVO das Recht auf: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Darüber hinaus haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).',
        },
        {
          heading: '11. Externe Links & Soziale Medien',
          text: 'Unsere Website enthält Links zu Instagram und anderen Plattformen. Wir haben keinen Einfluss auf die Datenverarbeitung dieser Dienste. Informieren Sie sich bitte in den jeweiligen Datenschutzerklärungen der Anbieter.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Information on data protection in accordance with GDPR',
      sections: [
        {
          heading: '1. Data Controller',
          text: `Hakan Akkuş\n${OFFICE_ADDRESS}\nEmail: ${CONTACT_EMAIL}\nPhone: ${CONTACT_PHONE}`,
        },
        {
          heading: '2. Collection and Storage of Personal Data',
          text: 'When visiting our website, information is automatically transmitted by the browser (server log files): browser type and version, operating system, referrer URL, hostname, time of server request, and IP address. This data is not attributable to specific persons and is deleted after 14 days.',
        },
        {
          heading: '3. Legal Basis',
          text: 'The processing of personal data is based on Art. 6(1)(a) (consent), (b) (contract performance), and (f) (legitimate interest) GDPR.',
        },
        {
          heading: '4. SSL/TLS Encryption',
          text: 'This website uses SSL/TLS encryption for security reasons. You can recognize an encrypted connection by the lock icon in your browser\'s address bar and the address changing from "http://" to "https://".',
        },
        {
          heading: '5. Contact',
          text: 'When you send us inquiries via contact form, email, or WhatsApp, your data (name, email, phone number, message) is stored for the purpose of processing the request. No data is shared with third parties. Data is deleted once the purpose of storage no longer applies.',
        },
        {
          heading: '6. WhatsApp Communication',
          text: 'Our website contains links for contacting us via WhatsApp (Meta Platforms). When you use this link, your message and phone number are transmitted to WhatsApp/Meta. The privacy policies of Meta Platforms Inc. apply (https://www.whatsapp.com/legal/privacy-policy).',
        },
        {
          heading: '7. Embedded Content',
          text: 'We embed YouTube videos (Google Ireland Ltd.) and images from Unsplash. When loading this content, your IP address is transmitted to the respective providers. YouTube videos are only loaded after your consent. The privacy policies of Google (https://policies.google.com/privacy) and Unsplash (https://unsplash.com/privacy) apply.',
        },
        {
          heading: '8. Hosting',
          text: 'This website is externally hosted. The personal data collected on this website is stored on the host\'s servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access, and other data generated via a website.',
        },
        {
          heading: '9. Cookies and Storage',
          text: 'This website uses technically necessary cookies and sessionStorage for language settings and the cookie consent banner. Third-party cookies are only loaded when embedding YouTube content. You can change the cookie settings in your browser at any time.',
        },
        {
          heading: '10. Your Rights',
          text: 'Under the GDPR, you have the right to: access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection (Art. 21). Furthermore, you have the right to lodge a complaint with a supervisory authority (Art. 77 GDPR).',
        },
        {
          heading: '11. External Links & Social Media',
          text: 'Our website contains links to Instagram and other platforms. We have no influence on the data processing of these services. Please refer to their respective privacy policies.',
        },
      ],
    },
    tr: {
      title: 'Gizlilik Politikası',
      subtitle: 'GDPR uyarınca veri koruma bilgileri',
      sections: [
        {
          heading: '1. Veri Sorumlusu',
          text: `Hakan Akkuş\n${OFFICE_ADDRESS}\nE-posta: ${CONTACT_EMAIL}\nTel: ${CONTACT_PHONE}`,
        },
        {
          heading: '2. Kişisel Verilerin Toplanması ve Saklanması',
          text: 'Web sitemizi ziyaret ettiğinizde tarayıcı tarafından otomatik olarak bilgiler iletilir (sunucu günlük dosyaları): tarayıcı türü ve sürümü, işletim sistemi, yönlendiren URL, ana bilgisayar adı, sunucu isteği zamanı ve IP adresi. Bu veriler belirli kişilere atfedilemez ve 14 gün sonra silinir.',
        },
        {
          heading: '3. Hukuki Dayanak',
          text: 'Kişisel verilerin işlenmesi, GDPR Madde 6(1)(a) (onay), (b) (sözleşme ifası) ve (f) (meşru menfaat) temelinde gerçekleştirilir.',
        },
        {
          heading: '4. SSL/TLS Şifreleme',
          text: 'Bu web sitesi güvenlik nedeniyle SSL/TLS şifreleme kullanmaktadır. Şifrelenmiş bir bağlantıyı tarayıcınızın adres çubuğundaki kilit simgesinden ve adresin "http://"den "https://"ye değişmesinden anlayabilirsiniz.',
        },
        {
          heading: '5. İletişim',
          text: 'İletişim formu, e-posta veya WhatsApp aracılığıyla bize soru gönderdiğinizde, verileriniz (ad, e-posta, telefon numarası, mesaj) talep işleme amacıyla saklanır. Üçüncü taraflarla paylaşılmaz. Saklama amacı ortadan kalktığında veriler silinir.',
        },
        {
          heading: '6. WhatsApp İletişimi',
          text: 'Web sitemizde WhatsApp (Meta Platforms) aracılığıyla iletişim bağlantıları bulunmaktadır. Bu bağlantıyı kullandığınızda mesajınız ve telefon numaranız WhatsApp/Meta\'ya iletilir. Meta Platforms Inc. gizlilik politikaları geçerlidir (https://www.whatsapp.com/legal/privacy-policy).',
        },
        {
          heading: '7. Gömülü İçerik',
          text: 'YouTube videoları (Google Ireland Ltd.) ve Unsplash görüntüleri gömüyoruz. Bu içerikler yüklenirken IP adresiniz ilgili sağlayıcılara iletilir. YouTube videoları yalnızca onayınız sonrasında yüklenir. Google (https://policies.google.com/privacy) ve Unsplash (https://unsplash.com/privacy) gizlilik politikaları geçerlidir.',
        },
        {
          heading: '8. Hosting',
          text: 'Bu web sitesi harici olarak barındırılmaktadır. Bu web sitesinde toplanan kişisel veriler barındırma sağlayıcısının sunucularında saklanır. Bunlar IP adresleri, iletişim talepleri, meta ve iletişim verileri, sözleşme verileri, iletişim bilgileri, isimler, web sitesi erişimleri ve bir web sitesi üzerinden oluşturulan diğer veriler olabilir.',
        },
        {
          heading: '9. Çerezler ve Depolama',
          text: 'Bu web sitesi dil ayarları ve çerez onay banner\'ı için teknik olarak gerekli çerezler ve sessionStorage kullanmaktadır. Üçüncü taraf çerezleri yalnızca YouTube içerikleri gömüldüğünde yüklenir. Çerez ayarlarını tarayıcınızda istediğiniz zaman değiştirebilirsiniz.',
        },
        {
          heading: '10. Haklarınız',
          text: 'GDPR kapsamında şu haklara sahipsiniz: erişim (Madde 15), düzeltme (Madde 16), silme (Madde 17), işleme kısıtlaması (Madde 18), veri taşınabilirliği (Madde 20) ve itiraz (Madde 21). Ayrıca bir denetim makamına şikayette bulunma hakkınız vardır (Madde 77 GDPR).',
        },
        {
          heading: '11. Harici Bağlantılar ve Sosyal Medya',
          text: 'Web sitemiz Instagram ve diğer platformlara bağlantılar içermektedir. Bu hizmetlerin veri işleme süreçleri üzerinde hiçbir etkimiz yoktur. Lütfen ilgili gizlilik politikalarına bakın.',
        },
      ],
    },
    sr: {
      title: 'Politika privatnosti',
      subtitle: 'Informacije o zaštiti podataka u skladu sa GDPR',
      sections: [
        {
          heading: '1. Odgovorni za obradu podataka',
          text: `Hakan Akkuş\n${OFFICE_ADDRESS}\nE-mail: ${CONTACT_EMAIL}\nTel: ${CONTACT_PHONE}`,
        },
        {
          heading: '2. Prikupljanje i čuvanje ličnih podataka',
          text: 'Prilikom posete našem sajtu, pregledač automatski prenosi informacije (serverske log datoteke): tip i verzija pregledača, operativni sistem, referrer URL, ime hosta, vreme serverskog zahteva i IP adresa. Ovi podaci se ne mogu pripisati određenim osobama i brišu se nakon 14 dana.',
        },
        {
          heading: '3. Pravni osnov',
          text: 'Obrada ličnih podataka vrši se na osnovu čl. 6 st. 1 tač. a (saglasnost), b (izvršenje ugovora) i f (legitimni interes) GDPR.',
        },
        {
          heading: '4. SSL/TLS šifrovanje',
          text: 'Ovaj sajt koristi SSL/TLS šifrovanje iz bezbednosnih razloga. Šifrovanu vezu možete prepoznati po ikoni katanca u adresnoj traci pregledača i po tome što se adresa menja sa „http://" na „https://".',
        },
        {
          heading: '5. Kontaktiranje',
          text: 'Kada nam pošaljete upit putem kontakt forme, e-maila ili WhatsApp-a, vaši podaci (ime, e-mail, broj telefona, poruka) se čuvaju u svrhu obrade zahteva. Podaci se ne prosleđuju trećim licima. Podaci se brišu kada svrha čuvanja prestane da važi.',
        },
        {
          heading: '6. WhatsApp komunikacija',
          text: 'Na našem sajtu nalaze se linkovi za kontaktiranje putem WhatsApp-a (Meta Platforms). Kada koristite ovaj link, vaša poruka i broj telefona se prenose WhatsApp/Meta platformi. Važe pravila privatnosti Meta Platforms Inc. (https://www.whatsapp.com/legal/privacy-policy).',
        },
        {
          heading: '7. Ugrađeni sadržaj',
          text: 'Ugrađujemo YouTube video zapise (Google Ireland Ltd.) i slike sa Unsplash-a. Prilikom učitavanja ovog sadržaja, vaša IP adresa se prenosi odgovarajućim provajderima. YouTube video zapisi se učitavaju tek nakon vaše saglasnosti. Važe pravila privatnosti Google-a (https://policies.google.com/privacy) i Unsplash-a (https://unsplash.com/privacy).',
        },
        {
          heading: '8. Hosting',
          text: 'Ovaj sajt je eksterno hostovan. Lični podaci prikupljeni na ovom sajtu čuvaju se na serverima hosting provajdera. To mogu biti IP adrese, kontakt upiti, meta i komunikacioni podaci, ugovorni podaci, kontakt podaci, imena, pristupi sajtu i drugi podaci generisani putem web sajta.',
        },
        {
          heading: '9. Kolačići i skladištenje',
          text: 'Ovaj sajt koristi tehnički neophodne kolačiće i sessionStorage za podešavanje jezika i baner za saglasnost sa kolačićima. Kolačići trećih strana se učitavaju samo pri ugrađivanju YouTube sadržaja. Podešavanja kolačića možete promeniti u svom pregledaču u bilo kom trenutku.',
        },
        {
          heading: '10. Vaša prava',
          text: 'Prema GDPR imate pravo na: pristup (čl. 15), ispravku (čl. 16), brisanje (čl. 17), ograničenje obrade (čl. 18), prenosivost podataka (čl. 20) i prigovor (čl. 21). Pored toga, imate pravo da podnesete žalbu nadzornom organu (čl. 77 GDPR).',
        },
        {
          heading: '11. Eksterni linkovi i društvene mreže',
          text: 'Naš sajt sadrži linkove ka Instagram-u i drugim platformama. Nemamo uticaj na obradu podataka ovih servisa. Molimo vas da se informišete u njihovim politikama privatnosti.',
        },
      ],
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
          {c.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{section.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}