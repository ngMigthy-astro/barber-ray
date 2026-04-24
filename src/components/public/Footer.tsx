import { Scissors, MapPin, Phone, Clock } from "lucide-react";
import { navigationLinks, socialLinks } from "../../data/public/navigation.data";
import { contactData } from "../../data/public/contact.data";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-surface border-t border-surface pt-16 pb-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="flex items-center gap-2 font-black text-2xl text-primary"
            >
              <Scissors className="w-7 h-7" />
              Barber Ray
            </a>
            <p className="text-text/60 text-sm leading-relaxed">
              Más de 10 años dando los mejores cortes de la ciudad. Precisión,
              estilo y confianza en cada visita.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">
              Navegación
            </h4>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text/60 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">
              Encuéntranos
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-text/60">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{contactData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text/60">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{contactData.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-text/60">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  {contactData.schedule.map((entry) => (
                    <span key={entry.days}>
                      {entry.days}: {entry.hours}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-bg pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text/40">
          <p>
            © {new Date().getFullYear()} Barber Ray. Todos los derechos
            reservados.
          </p>
          <p>Hecho con ❤️ en México</p>
        </div>
      </div>
    </footer>
  );
}
