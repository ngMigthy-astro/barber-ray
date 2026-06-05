import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";
import SectionHeader from "../shared/ui/SectionHeader";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image_url: string;
  stock: number;
  available_stock: number;
}

interface Props {
  products: Product[];
  config: {
    title: string;
    subtitle: string;
  };
  isLoggedIn?: boolean;
}

// Helper puro de formateo de precio para cumplir SRP
const formatPrice = (price: string | number): string => {
  if (price === undefined || price === null) return "$0";
  const cleanPrice = String(price).trim();
  return cleanPrice.startsWith("$") ? cleanPrice : `$${cleanPrice}`;
};

export default function Products({ products, config, isLoggedIn = false }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: true })],
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="products" className="py-24 bg-bg px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <SectionHeader
            title={config.title}
            subtitle={config.subtitle}
            centered={false}
          />
          <div className="flex gap-2 mb-6 sm:mb-14 justify-start sm:justify-end">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {products.map((product) => (
              <div
                key={product.id || product.name}
                className="flex-none w-full sm:w-80 pl-6"
              >
                <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary/30 transition-all duration-300 h-full group shadow-lg shadow-black/5">
                  <div className="w-full h-48 rounded-xl bg-bg flex items-center justify-center text-primary border border-surface group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <ShoppingBag className="w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xs font-black text-primary uppercase tracking-ultra">
                        {product.category}
                      </span>
                      {product.available_stock <= 0 && (
                        <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                          Agotado
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-text uppercase tracking-tighter italic">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-surface mt-4">
                    <span className="text-primary font-black text-2xl tracking-tighter">
                      {formatPrice(product.price)}
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        setQuantity(1);
                        setMessage(null);
                      }}
                      className="text-2xs font-black bg-surface border border-surface hover:border-primary/50 text-text px-6 py-3 rounded-xl transition-all uppercase tracking-ultra active:scale-95 shadow-sm cursor-pointer"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalle de Producto y Apartado */}
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-bg/85 backdrop-blur-sm transition-opacity w-full h-full border-none cursor-default"
            onClick={() => setSelectedProduct(null)}
            aria-label="Cerrar modal"
          />

          {/* Contenido del modal */}
          <div className="relative bg-surface border border-glass-border w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300 text-text">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Imagen */}
              <div className="w-full h-48 sm:h-56 bg-bg border border-glass-border rounded-2xl flex items-center justify-center overflow-hidden">
                {selectedProduct.image_url ? (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="w-16 h-16 opacity-25" />
                )}
              </div>

              {/* Textos */}
              <div className="space-y-2">
                <span className="text-2xs font-black text-primary uppercase tracking-ultra">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-black text-text uppercase tracking-tighter italic">
                  {selectedProduct.name}
                </h3>
                <p className="text-primary font-black text-2xl tracking-tighter">
                  {formatPrice(selectedProduct.price)}
                </p>
              </div>

              <p className="text-text-muted text-sm leading-relaxed max-h-24 overflow-y-auto pr-1">
                {selectedProduct.description}
              </p>

              {/* Estado de Stock */}
              <div className="flex items-center justify-between text-xs py-3 border-y border-glass-border">
                <span className="text-text-muted font-bold">Stock Disponible:</span>
                <span className={`font-black uppercase tracking-wider px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 ${
                  selectedProduct.available_stock > 0
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {selectedProduct.available_stock > 0
                    ? `${selectedProduct.available_stock} unidades`
                    : "Agotado"}
                </span>
              </div>

              {/* Mensajes de feedback */}
              {message && (
                <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  message.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                }`}>
                  {message.text}
                </div>
              )}

              {/* Acciones */}
              {selectedProduct.available_stock > 0 ? (
                isLoggedIn ? (
                  <div className="space-y-4">
                    {/* Selector de cantidad */}
                    <div className="flex items-center justify-between gap-4">
                      <label htmlFor="qty" className="text-xs font-bold text-text-muted">Cantidad a apartar:</label>
                      <div className="flex items-center border border-glass-border rounded-xl bg-bg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3.5 py-2 text-text-muted hover:text-primary hover:bg-surface-hover transition-colors font-black text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-sm font-bold text-text min-w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(selectedProduct.available_stock, quantity + 1))}
                          className="px-3.5 py-2 text-text-muted hover:text-primary hover:bg-surface-hover transition-colors font-black text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        setIsSubmitting(true);
                        setMessage(null);
                        try {
                          const res = await fetch("/api/products/reserve", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              productId: selectedProduct.id,
                              quantity,
                            }),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error || "Error al apartar.");

                          setMessage({ type: "success", text: data.message });
                          setTimeout(() => {
                            window.location.reload();
                          }, 1500);
                        } catch (err: any) {
                          setMessage({ type: "error", text: err.message });
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      className="w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs bg-primary text-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? "Apartando..." : "Apartar ahora"}
                    </button>
                    <p className="text-[10px] text-center text-text-muted italic leading-relaxed">
                      * Tienes un plazo de 3 días para recogerlo en sucursal y pagar físicamente.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/?login=true";
                      }}
                      className="w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs bg-primary text-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center block"
                    >
                      Iniciar sesión para apartar
                    </button>
                    <p className="text-[10px] text-center text-text-muted italic leading-relaxed">
                      * Debes autenticarte con tu cuenta de Google para poder apartar.
                    </p>
                  </div>
                )
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs bg-stone-900 border border-stone-800 text-stone-600 cursor-not-allowed text-center"
                >
                  Temporalmente Agotado
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
