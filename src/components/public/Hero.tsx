import { Calendar, Star, ShieldCheck } from "lucide-react";
import type { HeroData } from "../../interfaces/public/hero.interface";

interface Props {
  readonly initialData: HeroData;
}

export default function Hero({ initialData }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-primary/10 text-primary text-xs font-black uppercase tracking-ultra animate-in fade-in slide-in-from-left-10 duration-700">
              <Star className="w-3 h-3 fill-primary" />
              {initialData.badge || "Estilo & Tradición desde 2014"}
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-tightest reveal-text">
                <span className="block">{initialData.title}</span>
                <span className="text-gradient block">
                  {initialData.subtitle}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              {initialData.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              {initialData.ctas.map((cta, index) => (
                <a
                  key={cta.href + cta.text}
                  href={cta.href}
                  onClick={(e) => {
                    const isBookingAction = 
                      cta.href === "#booking" || 
                      cta.text.toLowerCase().includes("reservar") || 
                      cta.text.toLowerCase().includes("agendar");

                    if (isBookingAction) {
                      e.preventDefault();
                      globalThis.dispatchEvent(new CustomEvent("open-booking"));
                    }
                  }}
                  className={
                    index === 0
                      ? "btn-premium flex items-center justify-center gap-3 w-full sm:w-auto"
                      : "btn-outline flex items-center justify-center gap-3 w-full sm:w-auto"
                  }
                >
                  {index === 0 && <Calendar className="w-4 h-4" />}
                  {cta.text}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-primary/10 animate-in fade-in duration-1000 delay-500">
              {initialData.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-text">
                    {stat.value}
                  </p>
                  <p className="text-2xs sm:text-2xs text-text-muted uppercase tracking-ultra font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000">
            <div className="relative rounded-5xl overflow-hidden border border-primary/10 shadow-2xl group">
              <img
                src={initialData.image_url || "/barber_hero_premium.png"}
                alt={initialData.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="hidden sm:flex absolute -top-10 -right-10 w-32 h-32 bg-surface glass rounded-3xl flex-col items-center justify-center gap-2 p-4 animate-float shadow-2xl">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-2xs font-black text-center uppercase leading-tight text-text">
                {initialData.guarantee_text || "Garantía de Calidad"}
              </p>
            </div>

            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 px-4 sm:px-6 py-3 sm:py-4 bg-surface glass rounded-2xl flex items-center gap-3 sm:gap-4 animate-float animate-delay-1000 shadow-2xl scale-90 sm:scale-100">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-bg bg-surface-hover flex items-center justify-center text-xs font-bold text-text"
                  >
                    {String.fromCodePoint(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-black text-text">+500</p>
                <p className="text-2xs text-text-muted font-bold uppercase">
                  Clientes Felices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
