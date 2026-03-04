-- ═══════════════════════════════════════════════════════
-- HYLA by Akkus — Supabase SQL Schema v2
-- Kopiere alles hier und führe es im SQL Editor aus
-- ═══════════════════════════════════════════════════════

-- 1. LEADS
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TESTIMONIALS (Bewertungen)
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT DEFAULT '',
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 3. FAQ (Deutsch + Türkisch)
CREATE TABLE IF NOT EXISTS faq (
  id BIGSERIAL PRIMARY KEY,
  question_de TEXT DEFAULT '',
  question_tr TEXT DEFAULT '',
  question_sr TEXT DEFAULT '',
  answer_de TEXT DEFAULT '',
  answer_tr TEXT DEFAULT '',
  answer_sr TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 4. GALLERY (Montags-Treffen Galerie)
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 5. RESULTS (Vorher/Nachher Ergebnisse)
CREATE TABLE IF NOT EXISTS results (
  id BIGSERIAL PRIMARY KEY,
  title_de TEXT DEFAULT '',
  title_tr TEXT DEFAULT '',
  before_image TEXT DEFAULT '',
  after_image TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 6. COVER IMAGES (Hero / Banner Bilder)
CREATE TABLE IF NOT EXISTS cover_images (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL DEFAULT '',
  label TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 7. PRICING CONFIG (Produkte)
CREATE TABLE IF NOT EXISTS pricing_config (
  id BIGSERIAL PRIMARY KEY,
  model TEXT NOT NULL CHECK (model IN ('black', 'white')),
  title TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  financing_text TEXT DEFAULT '',
  feature1 TEXT DEFAULT '',
  feature2 TEXT DEFAULT '',
  feature3 TEXT DEFAULT '',
  cta_text TEXT DEFAULT ''
);

-- 8. SETTINGS (Einstellungen)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT ''
);

-- ═══════════════════════════════════════
-- RLS POLICIES
-- ═══════════════════════════════════════

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (safe to re-run)
DROP POLICY IF EXISTS "Anon all leads" ON leads;
DROP POLICY IF EXISTS "Anon all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anon all faq" ON faq;
DROP POLICY IF EXISTS "Anon all gallery" ON gallery;
DROP POLICY IF EXISTS "Anon all results" ON results;
DROP POLICY IF EXISTS "Anon all cover_images" ON cover_images;
DROP POLICY IF EXISTS "Anon all pricing_config" ON pricing_config;
DROP POLICY IF EXISTS "Anon all settings" ON settings;

-- Full access via anon key (admin panel uses anon key)
CREATE POLICY "Anon all leads" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all faq" ON faq FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all results" ON results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all cover_images" ON cover_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all pricing_config" ON pricing_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════

-- Bewertungen (Testimonials)
INSERT INTO testimonials (name, location, text, rating, sort_order, active) VALUES
('Familie Schmidt', 'Frankfurt', 'Wir sind absolut begeistert vom HYLA! Die Luftqualität in unserem Zuhause hat sich deutlich verbessert. Besonders für unsere Kinder mit Allergien ist das ein Segen.', 5, 1, true),
('Michael B.', 'Frankfurt', 'Als ich den HYLA das erste Mal gesehen habe, war ich skeptisch. Aber nach der Demonstration war ich überzeugt. Beste Investition für unser Zuhause!', 5, 2, true),
('Sarah K.', 'Frankfurt', 'Der HYLA ist einfach genial! Staubsaugen, Wischen, Luftreinigung - alles in einem Gerät. Spart Zeit und Geld.', 5, 3, true)
ON CONFLICT DO NOTHING;

-- FAQ (Deutsch + Türkisch)
INSERT INTO faq (question_de, question_tr, answer_de, answer_tr, sort_order, active) VALUES
(
  'Wie funktioniert der HYLA?',
  'HYLA nasıl çalışır?',
  'Der HYLA nutzt Wasser als Filter. Schmutz und Staub werden im Wasser gebunden, während gereinigte Luft wieder ausgestoßen wird.',
  'HYLA filtre olarak su kullanır. Kir ve toz suda hapsedilirken temiz hava dışarı atılır.',
  1, true
),
(
  'Braucht man Filter oder Beutel?',
  'Filtre veya torba gerekli mi?',
  'Nein, der HYLA arbeitet komplett ohne Filter oder Staubsaugerbeutel. Das spart Folgekosten und ist umweltfreundlich.',
  'Hayır, HYLA tamamen filtre veya süpürge torbası olmadan çalışır. Bu masrafsız ve çevre dostudur.',
  2, true
),
(
  'Ist der HYLA für Allergiker geeignet?',
  'HYLA alerjisi olanlar için uygun mu?',
  'Ja, durch die Wasserfiltration werden Allergene effektiv gebunden und nicht wieder in die Raumluft abgegeben.',
  'Evet, su filtrasyonu alerjenleri etkili bir şekilde hapseder ve havaya geri karışmasını önler.',
  3, true
),
(
  'Wie oft muss das Wasser gewechselt werden?',
  'Su ne sıklıkla değiştirilmelidir?',
  'Das Wasser sollte nach jeder Anwendung gewechselt werden.',
  'Su her kullanımdan sonra değiştirilmelidir.',
  4, true
),
(
  'Welche Garantie gibt es?',
  'Garanti süresi nedir?',
  'Der HYLA kommt mit einer umfassenden Herstellergarantie von 4 Jahren auf den Motor.',
  'HYLA, motor için 4 yıllık kapsamlı bir üretici garantisi ile gelir.',
  5, true
),
(
  'Kann man den HYLA finanzieren?',
  'HYLA taksitle alınabilir mi?',
  'Ja, wir bieten flexible Finanzierungsmöglichkeiten ab 39,00 € pro Monat an.',
  'Evet, ayda 39,00 €''dan başlayan esnek finansman seçenekleri sunuyoruz.',
  6, true
),
(
  'Wie funktioniert der HYLA Steamer?',
  'HYLA Steamer nasıl çalışır?',
  'Der HYLA Steamer reinigt mit heißem Dampf bei bis zu 7 Bar Druck. Bei Temperaturen über 100°C werden 99,99% aller Bakterien eliminiert – ganz ohne Chemie.',
  'HYLA Steamer, 7 bar basınçta sıcak buharla temizler. 100°C üzerindeki sıcaklıklarda tüm bakterilerin %99,99''u yok edilir – tamamen kimyasalsız.',
  7, true
),
(
  'Braucht der Steamer destilliertes Wasser?',
  'Steamer için damıtılmış su gerekli mi?',
  'Nein, normales Leitungswasser ist ausreichend. Bei sehr kalkhaltigem Wasser empfehlen wir gelegentliches Entkalken.',
  'Hayır, normal musluk suyu yeterlidir. Çok sert su durumunda ara sıra kireç temizleme önerilir.',
  8, true
),
(
  'Wie schnell ist der Steamer einsatzbereit?',
  'Steamer ne kadar hızlı hazır olur?',
  'Der HYLA Steamer ist nach ca. 6 Minuten Aufheizzeit einsatzbereit und hat einen 1,5 Liter Tank.',
  'HYLA Steamer yaklaşık 6 dakikalık ısınma süresinden sonra hazırdır ve 1,5 litrelik bir depoya sahiptir.',
  9, true
)
ON CONFLICT DO NOTHING;

-- Vorher/Nachher Ergebnisse
INSERT INTO results (title_de, title_tr, sort_order, active) VALUES
('Teppichreinigung', 'Halı Temizliği', 1, true),
('Matratzenreinigung', 'Yatak Temizliği', 2, true),
('Polsterreinigung', 'Döşeme Temizliği', 3, true),
('Fensterreinigung', 'Cam Temizliği', 4, true)
ON CONFLICT DO NOTHING;

-- Produkte (Pricing Config)
INSERT INTO pricing_config (model, title, badge, financing_text, feature1, feature2, feature3, cta_text) VALUES
('black', 'HYLA Black', 'BESTSELLER', 'Finanzierung ab 39€ / Monat', 'Premium Black Finish', 'Komplettes Zubehör-Set', 'Smart Water Technologie', 'JETZT HYLA BLACK BESTELLEN'),
('white', 'HYLA White Edition', 'LIMITIERT', 'Finanzierung ab 39€ / Monat', 'Exklusives White Finish', 'Komplettes Zubehör-Set', 'Collector''s Edition', 'JETZT HYLA WHITE BESTELLEN')
ON CONFLICT DO NOTHING;

-- Einstellungen
INSERT INTO settings (key, value) VALUES
('whatsapp_number', '491726134835'),
('email', 'hakanakkus@mailbox.org'),
('phone', '+49 172 6134835'),
('address', 'Heinrichstraße 9, 60326 Frankfurt am Main'),
('event_day', 'Montag / Pazartesi'),
('event_time', '19:00')
ON CONFLICT (key) DO NOTHING;

-- Cover Images — 3 prazna slota (uploadati slike kroz admin panel)
INSERT INTO cover_images (image_url, label, sort_order, active) VALUES
('', 'Cover 1 – Hakan am Schreibtisch', 1, true),
('', 'Cover 2 – Hakan mit Frau', 2, true),
('', 'Cover 3 – HYLA Geräte', 3, true)
ON CONFLICT DO NOTHING;

-- Gallery (Montags-Treffen — aktuelle Platzhalter-Bilder)
INSERT INTO gallery (image_url, caption, sort_order, active) VALUES
('https://images.unsplash.com/photo-1690191793747-0a8636edbf24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', 'Team meeting presentation', 1, true),
('https://images.unsplash.com/photo-1582183591295-9a2fe0170e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', 'Networking event with drinks', 2, true),
('https://images.unsplash.com/photo-1641998148499-cb6b55a3c0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', 'Modern office space', 3, true),
('https://images.unsplash.com/photo-1676276374429-3902f2666824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', 'Team gathering workspace', 4, true),
('https://images.unsplash.com/photo-1758691736545-5c33b6255dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', 'Business presentation', 5, true)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════
-- STORAGE BUCKET + POLICIES
-- ═══════════════════════════════════════

-- Bucket kreirati
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop postojećih policies (safe to re-run)
DROP POLICY IF EXISTS "Public read images" ON storage.objects;
DROP POLICY IF EXISTS "Anon upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anon update images" ON storage.objects;
DROP POLICY IF EXISTS "Anon delete images" ON storage.objects;

-- Svi mogu čitati (javno dostupne slike)
CREATE POLICY "Public read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Anon key može uploadati (admin panel)
CREATE POLICY "Anon upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Anon key može brisati (admin panel)
CREATE POLICY "Anon delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

-- Anon key može ažurirati (zamjena fajla)
CREATE POLICY "Anon update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');
