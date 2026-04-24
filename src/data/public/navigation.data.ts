import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";
import type { NavLink, SocialLink } from "../../interfaces/public/navigation.interface";

export const navigationLinks: NavLink[] = [
  { label: "Servicios", href: "#services" },
  { label: "Productos", href: "#products" },
  { label: "Galería", href: "#gallery" },
  { label: "Equipo", href: "#team" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { icon: LuFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: LuInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: LuTwitter, href: "https://twitter.com", label: "Twitter" },
];
