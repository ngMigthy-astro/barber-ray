import type { HeroData } from "../../interfaces/public/hero.interface";

export const heroData: HeroData = {
  title: "Barber",
  subtitle: "Ray",
  description:
    "Cortes de precisión, estilo que define. Tu barbería de confianza en el corazón de la ciudad.",
  ctas: [
    { text: "Reservar cita", href: "#services" },
    { text: "Ver servicios", href: "#services" },
  ],
  stats: [
    { value: "10+", label: "Años de experiencia" },
    { value: "500+", label: "Clientes felices" },
    { value: "5★", label: "Calificación" },
  ],
};
