export interface GalleryImage {
  id: number;
  alt: string;
  category: string;
}

export type GalleryCategory =
  | "Todos"
  | "Cortes"
  | "Barba"
  | "Color"
  | "Afeitado";

export interface GalleryData {
  title: string;
  description: string;
  images: GalleryImage[];
  categories: GalleryCategory[];
}