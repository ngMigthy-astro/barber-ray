import { Quote } from "lucide-react";
import SectionHeader from "../shared/ui/SectionHeader";
import StarRating from "../shared/ui/StarRating";

interface Testimonial {
  name: string;
  review_time: string;
  rating: number;
  comment: string;
}

interface Props {
  initialData: {
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
  };
}

export default function Testimonials({ initialData }: Props) {
  const { title, subtitle, testimonials } = initialData;

  return (
    <section id="testimonials" className="py-24 bg-surface px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="bg-bg rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary transition-colors"
            >
              <Quote className="w-8 h-8 text-primary opacity-40" />

              <p className="text-text-muted text-sm leading-relaxed flex-1">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-surface">
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-text/70 text-xs">
                    {testimonial.review_time || (testimonial as any).time}
                  </p>
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
