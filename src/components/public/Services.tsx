import { servicesData } from "../../data/public/services.data";
import SectionHeader from "../shared/ui/SectionHeader";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg px-4 relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={servicesData.title}
          subtitle={servicesData.subtitle}
        />

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.services.map((service) => (
            <div
              key={service.name}
              className="glass rounded-[32px] p-8 flex flex-col gap-6 hover:bg-surface-hover transition-all duration-500 hover:-translate-y-2 group border border-white/5 shadow-xl"
            >
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                <service.icon className="w-8 h-8" />
              </div>
              
              <div className="space-y-3 flex-1">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-primary font-black text-2xl tracking-tighter">
                  {service.price}
                </span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  {service.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
