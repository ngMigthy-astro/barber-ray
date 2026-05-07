import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { productsData } from "../../data/public/products.data";
import SectionHeader from "../shared/ui/SectionHeader";

interface Product {
  name: string;
  category: string;
  description: string;
  price: string;
  image_url: string;
}

interface Props {
  products: Product[];
  config: {
    title: string;
    subtitle: string;
  };
}

export default function Products({ products, config }: Props) {
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
            title={config.title}
            subtitle={config.subtitle}
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
          <div className="flex -ml-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="flex-none w-full sm:w-80 pl-6"
              >
                <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary/30 transition-all duration-300 h-full group shadow-lg shadow-black/5">
                  {/* Product image */}
                  <div className="w-full h-48 rounded-xl bg-bg flex items-center justify-center text-primary border border-surface group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <ShoppingBag className="w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <span className="text-2xs font-black text-primary uppercase tracking-ultra">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-black text-text uppercase tracking-tighter italic">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-surface mt-4">
                    <span className="text-primary font-black text-2xl tracking-tighter">
                      {product.price}
                    </span>
                    <button className="text-2xs font-black bg-surface border border-surface hover:border-primary/50 text-text px-6 py-3 rounded-xl transition-all uppercase tracking-ultra active:scale-95 shadow-sm">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
