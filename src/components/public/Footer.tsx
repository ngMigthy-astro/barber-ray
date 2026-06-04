import React from "react";
import {
  Scissors,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Heart,
} from "lucide-react";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

interface FooterProps {
  readonly navLinks: { readonly label: string; readonly href: string }[];
  readonly contactData: {
    readonly brand_name?: string;
    readonly brand_description?: string;
    readonly address: string;
    readonly phone: string;
    readonly schedule: { days: string; hours: string }[];
    readonly socials: { id?: string; platform: string; href: string; label: string }[];
  };
}

const SOCIAL_ICONS: Record<string, any> = {
  LuInstagram,
  LuFacebook,
  LuTwitter,
  MessageCircle,
};

export default function Footer({ navLinks, contactData }: FooterProps) {
  const brandName = contactData.brand_name || "Barber Ray";
  const brandDesc =
    contactData.brand_description ||
    "Elevando el estándar del cuidado masculino desde hace más de una década.";

  return (
    <footer className="bg-surface border-t border-glass-border pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
          <div className="flex flex-col gap-6 md:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2 font-black text-2xl text-text uppercase tracking-tighter"
            >
              <Scissors className="w-8 h-8 text-amber-500" />
              {brandName}
              <span className="text-amber-500">.</span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed font-medium">
              {brandDesc}
            </p>
            <div className="flex gap-4 mt-2">
              {contactData.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] || MessageCircle;

                return (
                  <a
                    key={social.id || social.platform}
                    href={social.href}
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-bg border border-glass-border text-text-muted hover:text-amber-500 hover:bg-surface-hover transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="font-black text-sm uppercase tracking-mega text-text italic">
              Navegación
            </h4>
            <nav className="flex flex-col gap-4">
              {(navLinks || []).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-muted hover:text-amber-500 transition-colors text-sm font-bold uppercase tracking-ultra"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-8 md:col-span-2">
            <h4 className="font-black text-sm uppercase tracking-mega text-text italic">
              Encuéntranos
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-sm">
                  <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                    <MapPin className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-text-muted font-medium leading-relaxed">
                    {contactData.address}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-text-muted font-bold">
                    {contactData.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex flex-col gap-3">
                  {(contactData?.schedule || []).map((entry) => (
                    <div key={entry.days} className="flex flex-col">
                      <span className="text-xs font-black text-text-muted/70 uppercase tracking-ultra">
                        {entry.days}
                      </span>
                      <span className="text-text-muted font-bold tracking-wider">
                        {entry.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-black text-text-muted/70 uppercase tracking-mega">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-8">
            <a
              href="/privacy"
              className="hover:text-amber-500 transition-colors"
            >
              Privacidad
            </a>
            <a href="/terms" className="hover:text-amber-500 transition-colors">
              Términos
            </a>
          </div>
          <p className="flex items-center gap-1">
            Hecho con{" "}
            <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-0.5" /> en
            México
          </p>
        </div>
      </div>
    </footer>
  );
}
