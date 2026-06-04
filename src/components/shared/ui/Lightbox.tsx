import { X, ImageIcon } from "lucide-react";
import { useEffect } from "react";
import useFocusTrap from "../../../lib/hooks/useFocusTrap";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  alt?: string;
}

export default function Lightbox({ isOpen, onClose, imageUrl, alt }: LightboxProps) {
  // Activamos el focus trap cuando el lightbox está abierto
  const lightboxRef = useFocusTrap(isOpen);

  // Cerrar lightbox al presionar la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de imagen"
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-all"
        onClick={onClose}
        aria-label="Cerrar visualizador"
      >
        <X className="w-8 h-8" />
      </button>
      <div 
        className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic para evitar que se cierre al tocar la imagen
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={alt || "Vista ampliada"} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="bg-surface rounded-2xl w-full max-w-lg aspect-square flex items-center justify-center p-20">
            <ImageIcon className="w-20 h-20 text-primary opacity-30" />
          </div>
        )}
      </div>
    </div>
  );
}

