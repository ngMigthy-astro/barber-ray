import { useState } from "react";
import { ImageIcon } from "lucide-react";
import SectionHeader from "../shared/ui/SectionHeader";
import Lightbox from "../shared/ui/Lightbox";

interface GalleryImage {
  id: string;
  image_url: string;
  category: string;
  alt?: string;
}

interface Props {
  readonly images: GalleryImage[];
  readonly config: {
    readonly title: string;
    readonly subtitle: string;
  };
}

export default function Gallery({ images, config }: Props) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ["Todos", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    activeCategory === "Todos"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-surface px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={config.title} subtitle={config.subtitle} />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors uppercase tracking-widest ${
                activeCategory === category
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "border-primary/20 text-text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <button
              key={img.id}
              onClick={() => {
                setSelectedImage(img);
                setLightboxOpen(true);
              }}
              className="group aspect-square bg-bg rounded-2xl flex items-center justify-center border border-surface hover:border-primary transition-all overflow-hidden relative shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              {img.image_url ? (
                  <img
                    src={img.image_url}
                    alt={img.alt || "Galería Barber Ray"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
              ) : (
                <ImageIcon className="w-10 h-10 text-primary opacity-30 group-hover:opacity-60 transition-opacity" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-2xs font-black uppercase tracking-ultra">
                  {img.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          setSelectedImage(null);
        }}
        imageUrl={selectedImage?.image_url}
        alt={selectedImage?.alt}
      />
    </section>
  );
}
