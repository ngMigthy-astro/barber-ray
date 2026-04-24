import type { GalleryData } from "../../interfaces/public/gallery.interface";

export const galleryData: GalleryData = {
  title: "Nuestro trabajo",
  description: "Galería",
  images: [
    { id: 1, alt: "Corte clásico con degradado", category: "Cortes" },
    { id: 2, alt: "Barba perfilada estilo elegante", category: "Barba" },
    { id: 3, alt: "Tinte rubio platinado", category: "Color" },
    { id: 4, alt: "Corte texturizado moderno", category: "Cortes" },
    { id: 5, alt: "Afeitado clásico con navaja", category: "Afeitado" },
    { id: 6, alt: "Fade bajo con diseño", category: "Cortes" },
    { id: 7, alt: "Barba con bigote estilizado", category: "Barba" },
    { id: 8, alt: "Corte pompadour", category: "Cortes" },
  ],
  categories: ["Todos", "Cortes", "Barba", "Color", "Afeitado"],
};
