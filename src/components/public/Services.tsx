import SectionHeader from "../shared/ui/SectionHeader";
import { Scissors, Brush, Sparkles, Wind } from "lucide-react";

// Mapeo de iconos para servicios dinámicos
const ICON_MAP = {
  Scissors: Scissors,
  Brush: Brush,
  Sparkles: Sparkles,
  Wind: Wind
};

interface Props {
  initialData: {
    title: string;
    subtitle: string;
    services: any[];
  };
}

export default function Services({ initialData }: Props) {
  return (
    <section id="services" className="py-24 bg-bg px-4 relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={initialData.title}
          subtitle={initialData.subtitle}
        />

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialData.services.map((service) => {
            // Determinar qué icono usar
            const IconComponent = typeof service.icon === 'function' 
              ? service.icon 
              : (ICON_MAP[service.icon_name as keyof typeof ICON_MAP] || Scissors);

            return (
              <div
                key={service.id || service.name}
                className="glass rounded-4xl p-8 flex flex-col gap-6 hover:bg-surface-hover transition-all duration-500 hover:-translate-y-2 group border border-glass-border shadow-xl"
              >
                <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-bold text-text group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-glass-border">
                  <span className="text-primary font-black text-2xl tracking-tighter">
                    {service.price}
                  </span>
                  <span className="text-2xs text-text-muted font-bold uppercase tracking-ultra">
                    {service.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
