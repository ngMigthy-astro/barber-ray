import { Scissors, Calendar, Star, ShieldCheck, Award } from "lucide-react";
import type { HeroData } from "../../interfaces/public/hero.interface";

interface Props {
  initialData: HeroData;
}

export default function Hero({ initialData }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/5 text-primary text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-10 duration-700">
              <Star className="w-3 h-3 fill-primary" />
              Estilo & Tradición desde 2014
            </div>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] reveal-text">
                <span className="block">{initialData.title}</span>
                <span className="text-gradient block">{initialData.subtitle}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              {initialData.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-5 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              {initialData.ctas.map((cta, index) => (
                <a
                  key={cta.href + cta.text}
                  href={cta.href}
                  className={index === 0 ? "btn-premium flex items-center gap-3" : "btn-outline flex items-center gap-3"}
                >
                  {index === 0 && <Calendar className="w-4 h-4" />}
                  {cta.text}
                </a>
              ))}
            </div>

            {/* Stats bar (Simplified and elegant) */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
              {initialData.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Visuals */}
          <div className="relative animate-in fade-in zoom-in duration-1000">
            {/* Main Image Container */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/5 shadow-2xl group">
              <img 
                src="/barber_hero_premium.png" 
                alt="Barber Professional"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-surface glass rounded-3xl flex flex-col items-center justify-center gap-2 p-4 animate-float shadow-2xl">
              <div className="p-2 bg-primary/20 rounded-xl text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-center uppercase leading-tight">Garantía de Calidad</p>
            </div>

            <div className="absolute -bottom-6 -left-6 px-6 py-4 bg-surface glass rounded-2xl flex items-center gap-4 animate-float [animation-delay:1s] shadow-2xl">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-bg bg-surface-hover flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-black text-white">+500</p>
                <p className="text-[10px] text-text-muted font-bold uppercase">Clientes Felices</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
