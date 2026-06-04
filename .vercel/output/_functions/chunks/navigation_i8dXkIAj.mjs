import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_CrODMIMm.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B1K9u8oz.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { Plus, CheckCircle2, X, GripVertical, ExternalLink, Trash2, Link, Save } from 'lucide-react';

const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navigation;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  const { data: navLinks } = await supabase.from("nav_links").select("*").order("sort_order", { ascending: true });
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      if (action === "save_links") {
        const ids = formData.getAll("id[]");
        const labels = formData.getAll("label[]");
        const hrefs = formData.getAll("href[]");
        const orders = formData.getAll("sort_order[]");
        const updates = ids.map((id, i) => {
          const item = {
            label: labels[i].toString(),
            href: hrefs[i].toString(),
            sort_order: parseInt(orders[i].toString()) || i + 1
          };
          if (id && id.toString() !== "") {
            item.id = id.toString();
          }
          return item;
        });
        const { error } = await supabase.from("nav_links").upsert(updates);
        if (error) throw error;
        return Astro2.redirect("/admin/navigation?success=true");
      } else if (action === "delete_link") {
        const id = formData.get("id")?.toString();
        if (id) {
          const { error } = await supabase.from("nav_links").delete().eq("id", id);
          if (error) throw error;
        }
        return Astro2.redirect("/admin/navigation?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const links = navLinks || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Navegación" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto space-y-8 text-stone-300"> <div class="flex items-center justify-between"> <div> <h2 class="text-2xl font-black text-white uppercase tracking-tight">
Menú Principal
</h2> <p class="text-stone-500 text-sm mt-1 font-medium italic">
Controla los enlaces de la barra de navegación pública.
</p> </div> <button type="button" id="add-link-btn" class="cursor-pointer bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-amber-500 hover:text-stone-950 transition-all shadow-lg shadow-amber-500/5 group"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-5 h-5 group-hover:rotate-90 transition-transform" })}
Añadir Sección
</button> </div> ${isSuccess && renderTemplate`<div id="success-notification" class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-5 h-5" })} <span class="font-medium text-sm text-white">
Configuración de navegación guardada con éxito.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="cursor-pointer p-1 hover:bg-emerald-500/10 rounded-lg transition-colors"> ${renderComponent($$result2, "X", X, { "className": "w-4 h-4" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} <span class="font-medium text-sm">Error: ${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="cursor-pointer p-1 hover:bg-red-500/10 rounded-lg transition-colors"> ${renderComponent($$result2, "X", X, { "className": "w-4 h-4" })} </button> </div>`} <form method="POST" id="nav-form"> <input type="hidden" name="action" value="save_links"> <div id="links-container" class="space-y-4"> ${links.map((link, index) => renderTemplate`<div class="bg-stone-900 border border-stone-800 p-6 rounded-5xl flex items-center gap-6 group animate-in fade-in slide-in-from-bottom-4 transition-all hover:border-stone-700"${addAttribute(`animation-delay: ${index * 50}ms`, "style")}> <div class="text-stone-700 group-hover:text-amber-500/50 transition-colors"> ${renderComponent($$result2, "GripVertical", GripVertical, { "className": "w-6 h-6" })} </div> <input type="hidden" name="id[]"${addAttribute(link.id, "value")}> <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-600 uppercase tracking-ultra ml-4">
Nombre del Enlace
</label> <input type="text" name="label[]"${addAttribute(link.label, "value")} placeholder="Ej. Servicios" class="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors font-medium" required> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-600 uppercase tracking-ultra ml-4">
Destino (ID o URL)
</label> <div class="relative"> ${renderComponent($$result2, "ExternalLink", ExternalLink, { "className": "absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-700" })} <input type="text" name="href[]"${addAttribute(link.href, "value")} placeholder="Ej. #servicios" class="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors font-medium" required> </div> </div> </div> <div class="w-24 space-y-2"> <label class="text-2xs font-black text-stone-600 uppercase tracking-ultra ml-4">
Orden
</label> <input type="number" name="sort_order[]"${addAttribute(link.sort_order, "value")} class="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-4 text-sm text-white text-center focus:outline-none focus:border-amber-500/50 transition-colors font-black" required> </div> <button type="button" class="delete-btn cursor-pointer p-4 bg-stone-950 border border-stone-800 text-stone-600 hover:text-red-500 hover:border-red-500/30 rounded-2xl transition-all mt-6"${addAttribute(link.id, "data-id")}> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-5 h-5" })} </button> </div>`)} ${links.length === 0 && renderTemplate`<div class="bg-stone-900/50 border border-dashed border-stone-800 rounded-6xl p-20 text-center"> ${renderComponent($$result2, "LinkIcon", Link, { "className": "w-12 h-12 text-stone-800 mx-auto mb-4" })} <h3 class="text-xl font-black text-stone-600 uppercase tracking-widest">
Menú Vacío
</h3> <p class="text-stone-500 text-sm mt-2">
No hay enlaces configurados. Añade uno para empezar.
</p> </div>`} </div> <div class="flex justify-end mt-12"> <button type="submit" class="cursor-pointer bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-12 py-5 rounded-2xl transition-all flex items-center gap-4 shadow-xl shadow-amber-500/10 group active:scale-95"> ${renderComponent($$result2, "Save", Save, { "className": "w-5 h-5 group-hover:scale-110 transition-transform" })}
Publicar Cambios en Menú
</button> </div> </form> <form id="delete-form" method="POST" class="hidden"> <input type="hidden" name="action" value="delete_link"> <input type="hidden" name="id" id="delete-id"> </form> </div> ${renderScript($$result2, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/navigation.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/navigation.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/navigation.astro";
const $$url = "/admin/navigation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Navigation,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
