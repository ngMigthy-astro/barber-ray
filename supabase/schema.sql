-- Section configs (title/subtitle for each section)
CREATE TABLE section_configs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hero CTAs
CREATE TABLE hero_ctas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Hero Stats
CREATE TABLE hero_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Gallery Images
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Gallery Categories
CREATE TABLE gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 5,
  reviews INT NOT NULL DEFAULT 0,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  instagram TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  time_label TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Contact Info
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  phone TEXT NOT NULL
);

-- Schedule Entries
CREATE TABLE schedule_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  days TEXT NOT NULL,
  hours TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Navigation Links
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Social Links
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  href TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Allowed admin emails
CREATE TABLE allowed_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL
);

-- Add public read access to all content tables
ALTER TABLE section_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_ctas ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON section_configs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON hero_ctas FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON hero_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON schedule_entries FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nav_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON social_links FOR SELECT USING (true);
