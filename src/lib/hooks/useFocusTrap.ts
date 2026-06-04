import { useEffect, useRef } from "react";

/**
 * Hook personalizado para atrapar el enfoque (Focus Trap) dentro de un contenedor.
 * Cumple con el principio de Responsabilidad Única (SOLID) al aislar la lógica de accesibilidad.
 * 
 * @param isActive Define si el atrapado de foco debe estar activo (por ejemplo, si el modal está abierto).
 */
export default function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Selector con todos los elementos HTML estándar que pueden recibir foco
    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      "[tabindex='0']",
      "[contenteditable]",
    ].join(",");

    // Guardamos el elemento activo anterior para restaurar el foco cuando el modal se cierre
    const previousActiveElement = document.activeElement as HTMLElement;

    // Auto-enfocar el primer elemento del modal cuando se monta o activa
    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      );
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: si estamos en el primero, mandamos el foco al último
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab: si estamos en el último, mandamos el foco al primero
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Restauramos el foco al elemento que lo tenía antes de abrir el modal (Excelente UX)
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
