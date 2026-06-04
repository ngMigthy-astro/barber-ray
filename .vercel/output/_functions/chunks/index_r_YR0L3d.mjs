import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { C as maybeRenderHead, a6 as addAttribute, V as renderTemplate, G as renderSlot } from './sequence_krGa48tk.mjs';
import { s as spreadAttributes, r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { u as useFocusTrap, $ as $$Layout } from './Layout_RTe7k9Oi.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Wind, Sparkles, Brush, Scissors, ChevronLeft, ChevronRight, ShoppingBag, X, ImageIcon, Star as Star$1, UserCircle2, Quote, MapPin, Phone, Clock, MessageCircle, CheckCircle2, Send, Heart } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import { LuInstagram, LuTwitter, LuFacebook } from 'react-icons/lu';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Icon;
  const {
    color = "currentColor",
    size = 24,
    "stroke-width": strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    class: className,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes({
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: color,
    "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
    ...!hasA11yProp(rest) && { "aria-hidden": "true" },
    ...rest
  })}${addAttribute(["lucide", className], "class:list")}> ${iconNode.map(([Tag, attrs]) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs })}`)} ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/node_modules/.pnpm/@lucide+astro@1.8.0_astro@6_f7f5423d980cfdab78e1be44f34354c1/node_modules/@lucide/astro/src/Icon.astro", void 0);

const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const createLucideIcon = (iconName, iconNode) => {
  const Component = createComponent(
    ($$result, $$props, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return renderTemplate`${renderComponent(
        $$result,
        "Icon",
        $$Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className
          ),
          iconNode,
          ...restProps
        },
        { default: () => renderTemplate`${renderSlot($$result, $$slots["default"])}` }
      )}`;
    },
    void 0,
    "none"
  );
  return Component;
};

const Calendar = createLucideIcon("calendar", [["path", { "d": "M8 2v4" }], ["path", { "d": "M16 2v4" }], ["rect", { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }], ["path", { "d": "M3 10h18" }]]);

const ShieldCheck = createLucideIcon("shield-check", [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "m9 12 2 2 4-4" }]]);

const Star = createLucideIcon("star", [["path", { "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }]]);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const { initialData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden"> <div class="max-w-7xl mx-auto px-6 w-full"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"> <div class="space-y-8 relative z-10"> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-primary/10 text-primary text-xs font-black uppercase tracking-ultra animate-in fade-in slide-in-from-left-10 duration-700"> ${renderComponent($$result, "Star", Star, { "class": "w-3 h-3 fill-primary" })} ${initialData.badge || "Estilo & Tradición desde 2014"} </div> <div class="space-y-1"> <h1 class="text-4xl sm:text-5xl md:text-8xl font-black leading-tightest reveal-text"> <span class="block">${initialData.title}</span> <span class="text-gradient block"> ${initialData.subtitle} </span> </h1> </div> <p class="text-base sm:text-lg md:text-xl text-text-muted max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200"> ${initialData.description} </p> <div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300"> ${initialData.ctas.map((cta, index) => renderTemplate`<a${addAttribute(cta.href, "href")}${addAttribute(
    cta.href === "#booking" || cta.text.toLowerCase().includes("reservar") || cta.text.toLowerCase().includes("agendar") ? "true" : "false",
    "data-booking-trigger"
  )}${addAttribute(
    index === 0 ? "btn-premium flex items-center justify-center gap-3 w-full sm:w-auto" : "btn-outline flex items-center justify-center gap-3 w-full sm:w-auto",
    "class"
  )}> ${index === 0 && renderTemplate`${renderComponent($$result, "Calendar", Calendar, { "class": "w-4 h-4" })}`} ${cta.text} </a>`)} </div> <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-primary/10 animate-in fade-in duration-1000 delay-500"> ${initialData.stats.map((stat) => renderTemplate`<div class="space-y-1"> <p class="text-xl sm:text-2xl font-black text-text"> ${stat.value} </p> <p class="text-2xs sm:text-2xs text-text-muted uppercase tracking-ultra font-bold"> ${stat.label} </p> </div>`)} </div> </div> <div class="relative animate-in fade-in zoom-in duration-1000"> <div class="relative rounded-5xl overflow-hidden border border-primary/10 shadow-2xl group"> <img${addAttribute(initialData.image_url || "/barber_hero_premium.webp", "src")}${addAttribute(initialData.title, "alt")} loading="eager" fetchpriority="high" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"> <div class="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-60"></div> </div> <div class="hidden sm:flex absolute -top-10 -right-10 w-32 h-32 bg-surface glass rounded-3xl flex-col items-center justify-center gap-2 p-4 animate-float shadow-2xl"> <div class="p-2 bg-primary/10 rounded-xl text-primary"> ${renderComponent($$result, "ShieldCheck", ShieldCheck, { "class": "w-6 h-6" })} </div> <p class="text-2xs font-black text-center uppercase leading-tight text-text"> ${initialData.guarantee_text || "Garantía de Calidad"} </p> </div> <div class="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 px-4 sm:px-6 py-3 sm:py-4 bg-surface glass rounded-2xl flex items-center gap-3 sm:gap-4 animate-float animate-delay-1000 shadow-2xl scale-90 sm:scale-100"> <div class="flex -space-x-3"> ${[1, 2, 3].map((i) => renderTemplate`<div class="w-10 h-10 rounded-full border-2 border-bg bg-surface-hover flex items-center justify-center text-xs font-bold text-text"> ${String.fromCodePoint(64 + i)} </div>`)} </div> <div> <p class="text-xs font-black text-text">+500</p> <p class="text-2xs text-text-muted font-bold uppercase">
Clientes Felices
</p> </div> </div> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Hero.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppButton;
  const { phone, message = "¡Hola! Me gustaría agendar una cita" } = Astro2.props;
  const cleanPhone = phone.replace(/\s+/g, "").replace("+", "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group" aria-label="Contactar por WhatsApp"> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-current"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.541 4.189 1.57 6.035L0 24l6.105-1.603a11.83 11.83 0 005.94 1.577h.005c6.632 0 12.028-5.398 12.03-12.032.003-3.213-1.242-6.233-3.51-8.503"></path> </svg> <span class="absolute right-full mr-4 bg-stone-900 text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-amber-500/20">
¿Quieres agendar? ¡Escríbenos!
</span> </a>`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/WhatsAppButton.astro", void 0);

function SectionHeader({
  title,
  subtitle,
  centered = true
}) {
  return /* @__PURE__ */ jsxs("div", { className: `mb-12 md:mb-24 ${centered ? "text-center" : "text-left"}`, children: [
    /* @__PURE__ */ jsx("div", { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-2xs font-black uppercase tracking-mega mb-6 ${centered ? "mx-auto" : ""}`, children: subtitle }),
    /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl md:text-7xl font-black text-gradient leading-ultra-tight", children: title })
  ] });
}

const ICON_MAP = {
  Scissors,
  Brush,
  Sparkles,
  Wind
};
function Services({ initialData }) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "services",
      className: "py-24 bg-bg px-4 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsx(
            SectionHeader,
            {
              title: initialData.title,
              subtitle: initialData.subtitle
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: initialData.services.map((service) => {
            const IconComponent = typeof service.icon === "function" ? service.icon : ICON_MAP[service.icon_name] || Scissors;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "glass rounded-4xl p-8 flex flex-col gap-6 hover:bg-surface-hover transition-all duration-500 hover:-translate-y-2 group border border-glass-border shadow-xl",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12", children: /* @__PURE__ */ jsx(IconComponent, { className: "w-8 h-8" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-3 flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-text group-hover:text-accent transition-colors", children: service.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm leading-relaxed", children: service.description })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-glass-border", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-primary font-black text-2xl tracking-tighter", children: [
                      "$",
                      String(service.price).replace(/[^0-9]/g, "")
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xs text-text-muted font-bold uppercase tracking-ultra", children: String(service.duration).toLowerCase().includes("min") ? service.duration : `${service.duration} min` })
                  ] })
                ]
              },
              service.id || service.name
            );
          }) })
        ] })
      ]
    }
  );
}

function Products({ products, config }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3e3, stopOnInteraction: true })]
  );
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  return /* @__PURE__ */ jsx("section", { id: "products", className: "py-24 bg-bg px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsx(
        SectionHeader,
        {
          title: config.title,
          subtitle: config.subtitle,
          centered: false
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-14", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollPrev,
            className: "p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors",
            "aria-label": "Anterior",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollNext,
            className: "p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors",
            "aria-label": "Siguiente",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden", ref: emblaRef, children: /* @__PURE__ */ jsx("div", { className: "flex -ml-6", children: products.map((product) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex-none w-full sm:w-80 pl-6",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-surface rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary/30 transition-all duration-300 h-full group shadow-lg shadow-black/5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-48 rounded-xl bg-bg flex items-center justify-center text-primary border border-surface group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden", children: product.image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: product.image_url,
              alt: product.name,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover",
              referrerPolicy: "no-referrer"
            }
          ) : /* @__PURE__ */ jsx(ShoppingBag, { className: "w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xs font-black text-primary uppercase tracking-ultra", children: product.category }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-text uppercase tracking-tighter italic", children: product.name }),
            /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm leading-relaxed line-clamp-3", children: product.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-surface mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary font-black text-2xl tracking-tighter", children: product.price }),
            /* @__PURE__ */ jsx("button", { className: "text-2xs font-black bg-surface border border-surface hover:border-primary/50 text-text px-6 py-3 rounded-xl transition-all uppercase tracking-ultra active:scale-95 shadow-sm", children: "Ver más" })
          ] })
        ] })
      },
      product.name
    )) }) })
  ] }) });
}

function Lightbox({ isOpen, onClose, imageUrl, alt }) {
  const lightboxRef = useFocusTrap(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: lightboxRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Visualizador de imagen",
      className: "fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-all",
            onClick: onClose,
            "aria-label": "Cerrar visualizador",
            children: /* @__PURE__ */ jsx(X, { className: "w-8 h-8" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in duration-300",
            onClick: (e) => e.stopPropagation(),
            children: imageUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: alt || "Vista ampliada",
                className: "w-full h-full object-contain",
                referrerPolicy: "no-referrer"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "bg-surface rounded-2xl w-full max-w-lg aspect-square flex items-center justify-center p-20", children: /* @__PURE__ */ jsx(ImageIcon, { className: "w-20 h-20 text-primary opacity-30" }) })
          }
        )
      ]
    }
  );
}

function Gallery({ images, config }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const categories = ["Todos", ...new Set(images.map((img) => img.category))];
  const filteredImages = activeCategory === "Todos" ? images : images.filter((img) => img.category === activeCategory);
  return /* @__PURE__ */ jsxs("section", { id: "gallery", className: "py-24 bg-surface px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHeader, { title: config.title, subtitle: config.subtitle }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-10", children: categories.map((category) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveCategory(category),
          className: `px-5 py-2 rounded-full text-sm font-semibold border transition-colors uppercase tracking-widest ${activeCategory === category ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-primary/20 text-text/60 hover:border-primary hover:text-primary"}`,
          children: category
        },
        category
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: filteredImages.map((img) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setSelectedImage(img);
            setLightboxOpen(true);
          },
          className: "group aspect-square bg-bg rounded-2xl flex items-center justify-center border border-surface hover:border-primary transition-all overflow-hidden relative shadow-md hover:shadow-xl hover:-translate-y-1",
          children: [
            img.image_url ? /* @__PURE__ */ jsx(
              "img",
              {
                src: img.image_url,
                alt: img.alt || "Galería Barber Ray",
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                referrerPolicy: "no-referrer"
              }
            ) : /* @__PURE__ */ jsx(ImageIcon, { className: "w-10 h-10 text-primary opacity-30 group-hover:opacity-60 transition-opacity" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4", children: /* @__PURE__ */ jsx("span", { className: "text-white text-2xs font-black uppercase tracking-ultra", children: img.category }) })
          ]
        },
        img.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        isOpen: lightboxOpen,
        onClose: () => {
          setLightboxOpen(false);
          setSelectedImage(null);
        },
        imageUrl: selectedImage?.image_url,
        alt: selectedImage?.alt
      }
    )
  ] });
}

function StarRating({ rating, maxStars = 5 }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: maxStars }, (_, i) => /* @__PURE__ */ jsx(
    Star$1,
    {
      className: `w-4 h-4 ${i + 1 <= Math.round(rating) ? "fill-primary text-primary" : "text-text/20"}`
    },
    i
  )) });
}

function Team({ members = [], config }) {
  return /* @__PURE__ */ jsx("section", { id: "team", className: "py-24 bg-bg px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        title: config.title,
        subtitle: config.subtitle
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: members.map((member) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-surface rounded-2xl p-6 flex flex-col items-center text-center gap-4 border border-surface hover:border-primary transition-colors group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-bg border-2 border-primary overflow-hidden flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors", children: member.image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: member.image_url,
              alt: member.name,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover",
              referrerPolicy: "no-referrer"
            }
          ) : /* @__PURE__ */ jsx(UserCircle2, { className: "w-14 h-14" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-black group-hover:text-primary transition-colors", children: member.name }),
            /* @__PURE__ */ jsx("p", { className: "text-primary text-sm font-medium", children: member.role })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsx(StarRating, { rating: member.rating }),
            /* @__PURE__ */ jsxs("p", { className: "text-text/50 text-xs", children: [
              member.rating.toFixed(1),
              " · ",
              member.reviews,
              " reseñas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: member.specialties.map((specialty) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-xs bg-bg text-primary border border-primary px-3 py-1 rounded-full",
              children: specialty
            },
            specialty
          )) }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `https://instagram.com/${member.instagram.replace("@", "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 text-sm text-text/50 hover:text-primary transition-colors mt-auto",
              children: [
                /* @__PURE__ */ jsx(LuInstagram, { className: "w-4 h-4" }),
                member.instagram
              ]
            }
          )
        ]
      },
      member.name
    )) })
  ] }) });
}

function Testimonials({ initialData }) {
  const { title, subtitle, testimonials } = initialData;
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "py-24 bg-surface px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeader, { title, subtitle }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-bg rounded-2xl p-6 flex flex-col gap-4 border border-surface hover:border-primary transition-colors",
        children: [
          /* @__PURE__ */ jsx(Quote, { className: "w-8 h-8 text-primary opacity-40" }),
          /* @__PURE__ */ jsxs("p", { className: "text-text/70 text-sm leading-relaxed flex-1", children: [
            '"',
            testimonial.comment,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-surface", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-sm", children: testimonial.name }),
              /* @__PURE__ */ jsx("p", { className: "text-text/40 text-xs", children: testimonial.review_time || testimonial.time })
            ] }),
            /* @__PURE__ */ jsx(StarRating, { rating: testimonial.rating })
          ] })
        ]
      },
      `${testimonial.name}-${index}`
    )) })
  ] }) });
}

const SOCIAL_ICONS$1 = {
  LuInstagram,
  LuFacebook,
  LuTwitter,
  MessageCircle
};
const Contact = ({ initialData, config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4e3);
    }, 1500);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "contact",
      className: "py-32 bg-bg text-text relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-1/2 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-1/4 h-1/2 bg-amber-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" }),
                /* @__PURE__ */ jsx("span", { className: "text-amber-500 font-black uppercase tracking-giga text-xs", children: config.subtitle })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-text leading-ultra-tight uppercase tracking-tighter", children: config.title }),
              /* @__PURE__ */ jsx("p", { className: "text-text-muted text-lg mt-6 max-w-md leading-relaxed", children: "Estamos ubicados en el corazón de la ciudad, listos para brindarte una experiencia de barbería tradicional con un toque moderno." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-surface/40 backdrop-blur-sm border border-glass-border p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5", children: /* @__PURE__ */ jsx(MapPin, { className: "w-7 h-7" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-text font-black uppercase tracking-widest text-sm mb-3", children: "Dirección" }),
                /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm leading-relaxed font-medium", children: initialData.address })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-surface/40 backdrop-blur-sm border border-glass-border p-8 rounded-5xl hover:border-amber-500/30 transition-all duration-500 group", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5", children: /* @__PURE__ */ jsx(Phone, { className: "w-7 h-7" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-text font-black uppercase tracking-widest text-sm mb-3", children: "Contacto Directo" }),
                /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm leading-relaxed font-medium mb-4", children: initialData.phone }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `tel:${initialData.phone.replaceAll(/\s/g, "")}`,
                    className: "inline-flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-ultra hover:text-text transition-colors",
                    children: [
                      "Llamar ahora ",
                      /* @__PURE__ */ jsx("span", { className: "text-lg", children: "→" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-surface/60 backdrop-blur-md border border-glass-border p-10 rounded-6xl relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700", children: /* @__PURE__ */ jsx(Clock, { className: "w-32 h-32 rotate-12" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "text-amber-500 w-5 h-5" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-text uppercase tracking-widest", children: "Horario de Atención" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-5", children: initialData.schedule.map((item) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex justify-between items-center border-b border-glass-border pb-4 last:border-0 last:pb-0 group/item",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-text-muted font-bold uppercase tracking-widest text-xs group-hover/item:text-text transition-colors", children: item.days }),
                    /* @__PURE__ */ jsx("span", { className: "text-amber-500 font-black tracking-wider group-hover/item:scale-105 transition-transform", children: item.hours })
                  ]
                },
                item.days
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-16 pt-10 border-t border-glass-border", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-text-muted/60 uppercase tracking-mega text-center mb-8 italic", children: "Síguenos en nuestras redes" }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-10", children: initialData.socials.map((social) => {
                const Icon = SOCIAL_ICONS$1[social.platform] || MessageCircle;
                return /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: social.href,
                    title: social.label,
                    "aria-label": social.label,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "p-4 bg-bg border border-glass-border rounded-2xl text-text-muted hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2",
                    children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" })
                  },
                  social.platform
                );
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-surface border border-glass-border p-6 sm:p-10 md:p-14 rounded-7xl shadow-2xl relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-text mb-2 uppercase tracking-tighter", children: "Hablemos" }),
            /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm mb-10 font-medium", children: "Envíanos un mensaje y te responderemos en menos de 24 horas." }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "name",
                      className: "text-xs font-black text-text-muted uppercase tracking-mega ml-4",
                      children: "Tu Nombre"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "name",
                      name: "name",
                      type: "text",
                      placeholder: "Ej. Juan Pérez",
                      className: "w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "email",
                      className: "text-xs font-black text-text-muted uppercase tracking-mega ml-4",
                      children: "Correo Electrónico"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "email",
                      name: "email",
                      type: "email",
                      placeholder: "tu@email.com",
                      className: "w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 font-medium",
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "message",
                    className: "text-xs font-black text-text-muted uppercase tracking-mega ml-4",
                    children: "Tu Mensaje"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "message",
                    name: "message",
                    rows: 5,
                    placeholder: "¿En qué podemos ayudarte?",
                    className: "w-full bg-bg/50 border border-glass-border rounded-3xl px-8 py-5 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 resize-none font-medium",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting || status === "success",
                  className: `w-full py-6 rounded-3xl font-black uppercase tracking-mega text-sm transition-all duration-500 flex items-center justify-center gap-4 group disabled:cursor-not-allowed ${status === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-md hover:shadow-amber-lg"}`,
                  children: status === "success" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 animate-bounce" }),
                    "¡Mensaje Enviado!"
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    isSubmitting ? "Enviando..." : "Enviar Mensaje",
                    /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
                  ] })
                }
              )
            ] })
          ] }) })
        ] }) })
      ]
    }
  );
};

const SOCIAL_ICONS = {
  LuInstagram,
  LuFacebook,
  LuTwitter,
  MessageCircle
};
function Footer({ navLinks, contactData }) {
  const brandName = contactData.brand_name || "Barber Ray";
  const brandDesc = contactData.brand_description || "Elevando el estándar del cuidado masculino desde hace más de una década.";
  return /* @__PURE__ */ jsx("footer", { className: "bg-surface border-t border-glass-border pt-24 pb-12 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:col-span-1", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "flex items-center gap-2 font-black text-2xl text-text uppercase tracking-tighter",
            children: [
              /* @__PURE__ */ jsx(Scissors, { className: "w-8 h-8 text-amber-500" }),
              brandName,
              /* @__PURE__ */ jsx("span", { className: "text-amber-500", children: "." })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm leading-relaxed font-medium", children: brandDesc }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-4 mt-2", children: contactData.socials.map((social) => {
          const Icon = SOCIAL_ICONS[social.platform] || MessageCircle;
          return /* @__PURE__ */ jsx(
            "a",
            {
              href: social.href,
              title: social.label,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-2.5 rounded-xl bg-bg border border-glass-border text-text-muted hover:text-amber-500 hover:bg-surface-hover transition-all",
              children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
            },
            social.id || social.platform
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-black text-sm uppercase tracking-mega text-text italic", children: "Navegación" }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-4", children: (navLinks || []).map((link) => /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-text-muted hover:text-amber-500 transition-colors text-sm font-bold uppercase tracking-ultra",
            children: link.label
          },
          link.href
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 md:col-span-2", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-black text-sm uppercase tracking-mega text-text italic", children: "Encuéntranos" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 text-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-amber-500" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-text-muted font-medium leading-relaxed", children: contactData.address })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-amber-500" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-text-muted font-bold", children: contactData.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 text-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-amber-500" }) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: (contactData?.schedule || []).map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-text-muted/70 uppercase tracking-ultra", children: entry.days }),
              /* @__PURE__ */ jsx("span", { className: "text-text-muted font-bold tracking-wider", children: entry.hours })
            ] }, entry.days)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-glass-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-black text-text-muted/70 uppercase tracking-mega", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        brandName,
        ". Todos los derechos reservados."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/privacy",
            className: "hover:text-amber-500 transition-colors",
            children: "Privacidad"
          }
        ),
        /* @__PURE__ */ jsx("a", { href: "/terms", className: "hover:text-amber-500 transition-colors", children: "Términos" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1", children: [
        "Hecho con",
        " ",
        /* @__PURE__ */ jsx(Heart, { className: "w-3 h-3 text-red-500 fill-red-500 mx-0.5" }),
        " en México"
      ] })
    ] })
  ] }) });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  let hasError = false;
  let dbData = {};
  try {
    const [
      { data: allConfigs, error: errConfigs },
      { data: dbHeroData, error: errHero },
      { data: dbServices, error: errServices },
      { data: dbTeam, error: errTeam },
      { data: dbProducts, error: errProducts },
      { data: dbGallery, error: errGallery },
      { data: dbTestimonials, error: errTestimonials },
      { data: dbContact, error: errContact },
      { data: dbSchedule, error: errSchedule },
      { data: dbSocials, error: errSocials },
      { data: dbNavLinks, error: errNav }
    ] = await Promise.all([
      supabase.from("section_configs").select("*"),
      supabase.from("hero_content").select("*").single(),
      supabase.from("services").select("*").order("sort_order", { ascending: true }),
      supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_images").select("*").order("sort_order", { ascending: true }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_info").select("*").eq("id", "default").single(),
      supabase.from("schedule_entries").select("*").order("sort_order", { ascending: true }),
      supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
      supabase.from("nav_links").select("*").order("sort_order", { ascending: true })
    ]);
    if (errServices || errTeam || errProducts || errConfigs) {
      console.error(
        "Database connection error:",
        errServices || errTeam || errProducts || errConfigs
      );
      hasError = true;
    }
    dbData = {
      allConfigs,
      dbHeroData,
      dbServices,
      dbTeam,
      dbProducts,
      dbGallery,
      dbTestimonials,
      dbContact,
      dbSchedule,
      dbSocials,
      dbNavLinks
    };
  } catch (error) {
    console.error("Critical error fetching database data:", error);
    hasError = true;
  }
  const getConfig = (id, defaultTitle, defaultSubtitle) => {
    const config = dbData.allConfigs?.find((c) => c.id === id);
    return {
      title: config?.title || defaultTitle,
      subtitle: config?.subtitle || defaultSubtitle
    };
  };
  const heroData = dbData.dbHeroData || null;
  const servicesData = {
    ...getConfig("services", "Nuestros Servicios", "Experiencia Premium"),
    services: dbData.dbServices || []
  };
  const teamMembers = dbData.dbTeam?.length ? dbData.dbTeam.reduce((acc, current) => {
    if (!acc.find((item) => item.name === current.name)) acc.push(current);
    return acc;
  }, []) : [];
  const contactData = {
    ...dbData.dbContact || { email: "", phone: "", address: "", map_url: "" },
    schedule: dbData.dbSchedule || [],
    socials: dbData.dbSocials || []
  };
  const products = dbData.dbProducts || [];
  const gallery = dbData.dbGallery || [];
  const testimonials = dbData.dbTestimonials || [];
  const navLinks = dbData.dbNavLinks || [];
  return renderTemplate`${hasError ? renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Barber Ray | Error de Conexión" }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-center px-4"><div class="space-y-6 max-w-md"><h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
Conexión Interrumpida
</h1><p class="text-stone-400 text-sm md:text-base leading-relaxed">
Ocurrió un problema al conectar con nuestra base de datos para
            cargar el sitio. Por favor, intenta recargar la página.
</p><button onclick="window.location.reload()" class="inline-block bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
Recargar Página
</button></div></div>` })}` : renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Barber Ray | Estilo y Tradición", "services": servicesData.services, "team": teamMembers, "lcpImage": heroData?.image_url || "/barber_hero_premium.webp", "navLinks": navLinks }, { "default": async ($$result2) => renderTemplate`${heroData && renderTemplate`${renderComponent($$result2, "Hero", $$Hero, { "initialData": heroData })}`}${servicesData.services.length > 0 && renderTemplate`${renderComponent($$result2, "Services", Services, { "initialData": servicesData })}`}${products.length > 0 && renderTemplate`${renderComponent($$result2, "Products", Products, { "products": products, "config": getConfig(
    "products",
    "Nuestros Productos",
    "Calidad Garantizada"
  ), "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Products", "client:component-export": "default" })}`}${gallery.length > 0 && renderTemplate`${renderComponent($$result2, "Gallery", Gallery, { "images": gallery, "config": getConfig("gallery", "Galería", "Nuestro Trabajo"), "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Gallery", "client:component-export": "default" })}`}${teamMembers.length > 0 && renderTemplate`${renderComponent($$result2, "Team", Team, { "members": teamMembers, "config": getConfig("team", "El Equipo", "Maestros Barberos"), "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Team", "client:component-export": "default" })}`}${testimonials.length > 0 && renderTemplate`${renderComponent($$result2, "Testimonials", Testimonials, { "initialData": {
    ...getConfig(
      "testimonials",
      "Testimonios",
      "Lo Que Dicen Nuestros Clientes"
    ),
    testimonials
  }, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Testimonials", "client:component-export": "default" })}`}${renderComponent($$result2, "Contact", Contact, { "initialData": contactData, "config": getConfig("contact", "Visítanos", "Ubicación y Horarios"), "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Contact", "client:component-export": "default" })}${renderComponent($$result2, "Footer", Footer, { "navLinks": navLinks, "contactData": contactData })}${isLoggedIn && renderTemplate`${renderComponent($$result2, "WhatsAppButton", $$WhatsAppButton, { "phone": "+5214626009179", "message": "¡Hola! Me gustaría agendar una cita" })}`}` })}`}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/index.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
