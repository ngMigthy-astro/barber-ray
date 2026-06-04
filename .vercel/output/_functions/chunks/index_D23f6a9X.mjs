import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { Scissors, Package, Users, MessageSquare, Image } from 'lucide-react';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseClient(Astro2.request, Astro2.cookies);
  const [
    { count: servicesCount },
    { count: teamCount },
    { count: testimonialsCount },
    { count: galleryCount },
    { count: productsCount }
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true })
  ]);
  const stats = [
    {
      label: "Servicios Activos",
      value: servicesCount || 0,
      icon: Scissors,
      href: "/admin/services"
    },
    {
      label: "Productos",
      value: productsCount || 0,
      icon: Package,
      href: "/admin/products"
    },
    {
      label: "Miembros del Equipo",
      value: teamCount || 0,
      icon: Users,
      href: "/admin/team"
    },
    {
      label: "Testimonios",
      value: testimonialsCount || 0,
      icon: MessageSquare,
      href: "/admin/testimonials"
    },
    {
      label: "Fotos en Galería",
      value: galleryCount || 0,
      icon: Image,
      href: "/admin/gallery"
    }
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto"> <div class="mb-8"> <h2 class="text-2xl font-bold text-white mb-2">
Bienvenido al Panel de Control
</h2> <p class="text-stone-400">
Desde aquí puedes administrar todo el contenido de tu landing page.
</p> </div> <!-- Stats Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"> ${stats.map((stat) => {
    const Icon = stat.icon;
    return renderTemplate`<a${addAttribute(stat.href, "href")} class="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"> <div class="flex items-center justify-between mb-4"> <div class="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform"> ${renderComponent($$result2, "Icon", Icon, { "className": "w-5 h-5" })} </div> <span class="text-2xl font-bold text-white">${stat.value}</span> </div> <h3 class="text-sm font-medium text-stone-400">${stat.label}</h3> </a>`;
  })} </div> <!-- Quick Help --> <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6"> <h3 class="text-lg font-bold text-amber-500 mb-3 flex items-center gap-2"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
¿Cómo funciona?
</h3> <ul class="space-y-2 text-stone-300 list-disc list-inside"> <li>
Usa el menú lateral para navegar entre las diferentes secciones de tu
          página.
</li> <li>
Cualquier cambio que guardes se reflejará <strong>inmediatamente</strong> en el sitio público.
</li> <li>
Para ver los cambios, puedes hacer clic en "Ver sitio en vivo" en la
          parte superior derecha.
</li> </ul> </div> </div> ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
