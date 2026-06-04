import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

interface ContactProps {
  initialData: {
    address: string;
    phone: string;
    schedule: Array<{ days: string; hours: string }>;
    socials: Array<{ platform: string; href: string; label: string }>;
  };
  config: {
    title: string;
    subtitle: string;
  };
}

const SOCIAL_ICONS: Record<string, any> = {
  LuInstagram,
  LuFacebook,
  LuTwitter,
  MessageCircle,
};

const Contact: React.FC<ContactProps> = ({ initialData, config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-32 bg-bg text-text relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-amber-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                <span className="text-amber-500 font-black uppercase tracking-giga text-xs">
                  {config.subtitle}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text leading-ultra-tight uppercase tracking-tighter">
                {config.title}
              </h2>
              <p className="text-text-muted text-lg mt-6 max-w-md leading-relaxed">
                Estamos ubicados en el corazón de la ciudad, listos para
                brindarte una experiencia de barbería tradicional con un toque
                moderno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface/40 backdrop-blur-sm border border-glass-border p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-text font-black uppercase tracking-widest text-sm mb-3">
                  Dirección
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-medium">
                  {initialData.address}
                </p>
              </div>

              <div className="bg-surface/40 backdrop-blur-sm border border-glass-border p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-text font-black uppercase tracking-widest text-sm mb-3">
                  Contacto Directo
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-medium mb-4">
                  {initialData.phone}
                </p>
                <a
                  href={`tel:${initialData.phone.replaceAll(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-ultra hover:text-text transition-colors"
                >
                  Llamar ahora <span className="text-lg">→</span>
                </a>
              </div>
            </div>

            <div className="bg-surface/60 backdrop-blur-md border border-glass-border p-10 rounded-6xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                <Clock className="w-32 h-32 rotate-12" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="text-amber-500 w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-text uppercase tracking-widest">
                  Horario de Atención
                </h3>
              </div>
              <div className="space-y-5">
                {initialData.schedule.map((item) => (
                  <div
                    key={item.days}
                    className="flex justify-between items-center border-b border-glass-border pb-4 last:border-0 last:pb-0 group/item"
                  >
                    <span className="text-text-muted font-bold uppercase tracking-widest text-xs group-hover/item:text-text transition-colors">
                      {item.days}
                    </span>
                    <span className="text-amber-500 font-black tracking-wider group-hover/item:scale-105 transition-transform">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-glass-border">
              <p className="text-xs font-black text-text-muted uppercase tracking-mega text-center mb-8 italic">
                Síguenos en nuestras redes
              </p>
              <div className="flex justify-center gap-10">
                {initialData.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform] || MessageCircle;
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      title={social.label}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-bg border border-glass-border rounded-2xl text-text-muted hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-surface border border-glass-border p-6 sm:p-10 md:p-14 rounded-7xl shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-text mb-2 uppercase tracking-tighter">
                Hablemos
              </h3>
              <p className="text-text-muted text-sm mb-10 font-medium">
                Envíanos un mensaje y te responderemos en menos de 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-xs font-black text-text-muted uppercase tracking-mega ml-4"
                    >
                      Tu Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-xs font-black text-text-muted uppercase tracking-mega ml-4"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="text-xs font-black text-text-muted uppercase tracking-mega ml-4"
                  >
                    Tu Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 resize-none font-medium"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-mega text-sm transition-all duration-500 flex items-center justify-center gap-4 group disabled:cursor-not-allowed ${
                    status === "success"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-md hover:shadow-amber-lg"
                  }`}
                >
                  {status === "success" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 animate-bounce" />
                      ¡Mensaje Enviado!
                    </>
                  ) : (
                    <>
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
