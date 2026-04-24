import { Quote } from "lucide-react";
import { testimonialsData } from "../../data/public/testimonials.data";
import SectionHeader from "../shared/ui/SectionHeader";
import StarRating from "../shared/ui/StarRating";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-surface px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={testimonialsData.subtitle}
          subtitle={testimonialsData.title}
        />

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-bg rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary transition-colors"
            >
              <Quote className="w-8 h-8 text-primary opacity-40" />

              <p className="text-text/70 text-sm leading-relaxed flex-1">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-surface">
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-text/40 text-xs">{testimonial.time}</p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
