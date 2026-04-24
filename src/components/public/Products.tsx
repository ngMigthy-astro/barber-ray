import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { productsData } from "../../data/public/products.data";
import SectionHeader from "../shared/ui/SectionHeader";

export default function Products() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: true })],
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="products" className="py-24 bg-bg px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with navigation buttons */}
        <div className="flex items-end justify-between">
          <SectionHeader
            title={productsData.title}
            subtitle={productsData.subtitle}
            centered={false}
          />
          <div className="flex gap-2 mb-14">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {productsData.products.map((product) => (
              <div
                key={product.name}
                className="flex-none w-72 bg-surface rounded-2xl p-6 flex flex-col gap-3 border border-surface hover:border-primary transition-colors"
              >
                {/* Product image placeholder */}
                <div className="w-full h-40 rounded-xl bg-bg flex items-center justify-center text-primary border border-surface">
                  <ShoppingBag className="w-12 h-12 opacity-40" />
                </div>

                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-text/60 text-sm flex-1">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-bg">
                  <span className="text-primary font-black text-xl">
                    {product.price}
                  </span>
                  <button className="text-sm font-semibold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
