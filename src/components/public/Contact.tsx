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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulamos el envío por ahora
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-32 bg-stone-950 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-amber-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Columna 1: Info */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                <span className="text-amber-500 font-black uppercase tracking-giga text-xs">
                  {config.subtitle}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-ultra-tight uppercase tracking-tighter">
                {config.title}
              </h2>
              <p className="text-stone-500 text-lg mt-6 max-w-md leading-relaxed">
                Estamos ubicados en el corazón de la ciudad, listos para
                brindarte una experiencia de barbería tradicional con un toque
                moderno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dirección */}
              <div className="bg-stone-900/40 backdrop-blur-sm border border-stone-800/50 p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-white font-black uppercase tracking-widest text-sm mb-3">
                  Dirección
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed font-medium">
                  {initialData.address}
                </p>
              </div>

              {/* Teléfono */}
              <div className="bg-stone-900/40 backdrop-blur-sm border border-stone-800/50 p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-white font-black uppercase tracking-widest text-sm mb-3">
                  Contacto Directo
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed font-medium mb-4">
                  {initialData.phone}
                </p>
                <a
                  href={`tel:${initialData.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-amber-500 text-2xs font-black uppercase tracking-ultra hover:text-white transition-colors"
                >
                  Llamar ahora <span className="text-lg">→</span>
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-800/50 p-10 rounded-6xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                <Clock className="w-32 h-32 rotate-12" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="text-amber-500 w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  Horario de Atención
                </h3>
              </div>
              <div className="space-y-5">
                {initialData.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-stone-800/50 pb-4 last:border-0 last:pb-0 group/item"
                  >
                    <span className="text-stone-400 font-bold uppercase tracking-widest text-2xs group-hover/item:text-stone-300 transition-colors">
                      {item.days}
                    </span>
                    <span className="text-amber-500 font-black tracking-wider group-hover/item:scale-105 transition-transform">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes Sociales Dinámicas */}
            <div className="mt-16 pt-10 border-t border-stone-800/50">
              <p className="text-3xs font-black text-stone-600 uppercase tracking-giga text-center mb-8 italic">
                Síguenos en nuestras redes
              </p>
              <div className="flex justify-center gap-10">
                {initialData.socials.map((social, index) => {
                  const Icon = SOCIAL_ICONS[social.platform] || MessageCircle;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      title={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-stone-950 border border-stone-800 rounded-2xl text-stone-500 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna 2: Formulario */}
          <div className="bg-stone-900 border border-stone-800/80 p-10 md:p-14 rounded-7xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                Hablemos
              </h3>
              <p className="text-stone-500 text-sm mb-10 font-medium">
                Envíanos un mensaje y te responderemos en menos de 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-2xs font-black text-stone-500 uppercase tracking-mega ml-4">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-3xl px-8 py-5 text-white placeholder:text-stone-800 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-2xs font-black text-stone-500 uppercase tracking-mega ml-4">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-3xl px-8 py-5 text-white placeholder:text-stone-800 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-2xs font-black text-stone-500 uppercase tracking-mega ml-4">
                    Tu Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-stone-950/50 border border-stone-800 rounded-3xl px-8 py-5 text-white placeholder:text-stone-800 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 resize-none font-medium"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-mega text-xs transition-all duration-500 flex items-center justify-center gap-4 group disabled:cursor-not-allowed ${
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
