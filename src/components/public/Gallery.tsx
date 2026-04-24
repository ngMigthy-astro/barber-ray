import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { galleryData } from "../../data/public/gallery.data";
import SectionHeader from "../shared/ui/SectionHeader";
import Lightbox from "../shared/ui/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredImages =
    activeCategory === "Todos"
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-surface px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={galleryData.description}
          subtitle={galleryData.title}
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {galleryData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === category
                  ? "bg-primary border-primary text-white"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setLightboxOpen(true)}
              className="group aspect-square bg-bg rounded-2xl flex items-center justify-center border border-surface hover:border-primary transition-colors overflow-hidden relative"
            >
              <ImageIcon className="w-10 h-10 text-primary opacity-30 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors rounded-2xl" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-xs text-text/50 px-2 truncate">
                {img.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
