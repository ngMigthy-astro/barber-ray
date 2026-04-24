import { X, ImageIcon } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ isOpen, onClose }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white p-2 hover:text-primary transition-colors"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="bg-surface rounded-2xl w-full max-w-lg aspect-square flex items-center justify-center">
        <ImageIcon className="w-20 h-20 text-primary opacity-30" />
      </div>
    </div>
  );
}
