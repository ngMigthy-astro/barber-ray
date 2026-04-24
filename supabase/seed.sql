-- Initial seed data for Barber Ray
-- Taken from src/data/*.ts

-- Section Configs
INSERT INTO section_configs (id, title, subtitle, description) VALUES
('hero', 'Barber', 'Ray', 'Cortes de precisión, estilo que define. Tu barbería de confianza en el corazón de la ciudad.'),
('services', 'Nuestros Servicios', 'Lo que ofrecemos', NULL),
('products', 'Nuestros Productos', 'Lo que ofrecemos', NULL),
('gallery', 'Nuestro trabajo', 'Galería', NULL),
('team', 'Los mejores del oficio', 'Nuestro Equipo', NULL),
('testimonials', 'Lo que dicen nuestros clientes', 'Testimonios', NULL);

-- Hero
INSERT INTO hero_ctas (text, href, sort_order) VALUES
('Reservar cita', '#services', 1),
('Ver servicios', '#services', 2);

INSERT INTO hero_stats (value, label, sort_order) VALUES
('10+', 'Años de experiencia', 1),
('500+', 'Clientes felices', 2),
('5★', 'Calificación', 3);

-- Services
INSERT INTO services (icon_name, name, description, price, duration, sort_order) VALUES
('Scissors', 'Corte Clásico', 'Corte tradicional con acabado perfecto a tijera o maquina', '$80', '30 min', 1),
('Brush', 'Corte + Barba', 'Combo completo: corte de cabello y perfilado de barba', '$130', '50 min', 2),
('Sparkles', 'Afeitado Clásico', 'Afeitado tradicional con navaja, toalla caliente y crema premium', '$90', '40 min', 3),
('Wind', 'Tinte + Corte', 'Color personalizado con productos profesionales y corte incluido', '$200', '90 min', 4);

-- Products
INSERT INTO products (name, description, price, category, sort_order) VALUES
('Pomada Mate', 'Fijación fuerte con acabado mate. Control todo el día', '$120', 'Fijación', 1),
('Aceite de Barba', 'Hidrata y suaviza la barba. Aroma cítrico fresco', '$95', 'Barba', 2),
('Shampoo Premium', 'Limpieza profunda con extracto de menta y queratina', '$110', 'Cabello', 3),
('Cera Brillante', 'Acabado brillante con fijación media. Fórmula flexible', '$100', 'Fijación', 4),
('Bálsamo Post-Afeitado', 'Calma la piel sensible después del afeitado con navaja.', '$85', 'Afeitado', 5),
('Gel Modelador', 'Control extremo para peinados definidos y duraderos', '$75', 'Fijación', 6);

-- Gallery
INSERT INTO gallery_categories (name, sort_order) VALUES
('Todos', 1), ('Cortes', 2), ('Barba', 3), ('Color', 4), ('Afeitado', 5);

INSERT INTO gallery_images (alt, category, sort_order) VALUES
('Corte clásico con degradado', 'Cortes', 1),
('Barba perfilada estilo elegante', 'Barba', 2),
('Tinte rubio platinado', 'Color', 3),
('Corte texturizado moderno', 'Cortes', 4),
('Afeitado clásico con navaja', 'Afeitado', 5),
('Fade bajo con diseño', 'Cortes', 6),
('Barba con bigote estilizado', 'Barba', 7),
('Corte pompadour', 'Cortes', 8);

-- Team
INSERT INTO team_members (name, role, rating, reviews, specialties, instagram, sort_order) VALUES
('Ray Gomez', 'Fundador & Master Barber', 5, 142, '{"Fade","Diseños","Barba"}', '@ray.barber', 1),
('Carlos Vega', 'Senior Barber', 3.9, 98, '{"Clásicos","Color","Pompadour"}', '@carlos.cuts', 2),
('Diego Ruiz', 'Barber Specialist', 4.8, 76, '{"Texturizados","Afeitado","Cejas"}', '@diego.style', 3);

-- Testimonials
INSERT INTO testimonials (name, time_label, rating, comment, sort_order) VALUES
('Cesar Alejandro Jaramillo', 'Hace 2 días', 5, 'El mejor corte que me han dado en años. Ray tiene una precisión increíble con el fade, quedé impresionado. Ya tengo mi próxima cita agendada.', 1),
('Roberto Sánchez', 'Hace 1 semana', 5, 'Fui por primera vez y no me voy a ningún otro lado. El ambiente es increíble, música buena y el servicio de primera. Carlos es un crack.', 2),
('Andrés Jiménez', 'Hace 2 semanas', 5, 'El afeitado clásico con navaja es una experiencia única. La toalla caliente, la crema artesanal... vale cada peso. Totalmente recomendado.', 3),
('Luis Herrera', 'Hace 3 semanas', 4, 'Muy buena atención y resultados. Diego supo exactamente lo que quería con solo describirlo. Lugar limpio y profesional.', 4),
('Fernando Mora', 'Hace 1 mes', 5, 'Los productos que venden también son excelentes. Llevo usando la pomada mate dos meses y no cambio nada. Calidad real.', 5),
('Sebastián Castro', 'Hace 1 mes', 5, 'Llevo 3 años viniendo y nunca me han fallado. Siempre salen resultados increíbles sin importar qué barbero te toque.', 6);

-- Contact & Schedule
INSERT INTO contact_info (address, phone) VALUES
('Calle Principal #123, Col. Centro, Ciudad de México', '+52 55 1234 5678');

INSERT INTO schedule_entries (days, hours, sort_order) VALUES
('Lun – Vie', '9:00am – 8:00pm', 1),
('Sáb', '9:00am – 6:00pm', 2),
('Dom', '10:00am – 3:00pm', 3);

-- Navigation & Socials
INSERT INTO nav_links (label, href, sort_order) VALUES
('Servicios', '#services', 1),
('Productos', '#products', 2),
('Galería', '#gallery', 3),
('Equipo', '#team', 4),
('Testimonios', '#testimonials', 5),
('Contacto', '#contact', 6);

INSERT INTO social_links (platform, href, label, sort_order) VALUES
('LuFacebook', 'https://facebook.com', 'Facebook', 1),
('LuInstagram', 'https://instagram.com', 'Instagram', 2),
('LuTwitter', 'https://twitter.com', 'Twitter', 3);
