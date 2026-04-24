export interface Testimonial {
  name: string;
  time: string;
  rating: number;
  comment: string;
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}
