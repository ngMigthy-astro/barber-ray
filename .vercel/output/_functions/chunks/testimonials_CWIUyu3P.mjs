import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { MessageSquare, Star, CheckCircle2, X, User, ShieldX, ShieldCheck, Trash2 } from 'lucide-react';

const $$Testimonials = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Testimonials;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      const id = formData.get("id")?.toString();
      if (action === "toggle_featured") {
        const currentStatus = formData.get("current_status") === "true";
        const { error } = await supabase.from("appointment_reviews").update({ is_featured: !currentStatus }).eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/testimonials?success=true");
      } else if (action === "delete_review") {
        const { error } = await supabase.from("appointment_reviews").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/testimonials?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const { data: reviews, error: fetchError } = await supabase.from("appointment_reviews").select(`
    *,
    appointments (
      appointment_date,
      barber:team_members(name),
      service:services(name)
    )
  `).order("created_at", { ascending: false });
  if (fetchError) {
    console.error("Error fetching reviews:", fetchError);
    errorMessage = "Error al cargar reseñas: " + fetchError.message;
  }
  const allReviews = reviews || [];
  const featuredCount = allReviews.filter((r) => r.is_featured).length;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Moderación de Testimonios" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto space-y-8"> <!-- Header de Stats --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="bg-stone-900 border border-stone-800 p-6 rounded-4xl flex items-center gap-4"> <div class="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500"> ${renderComponent($$result2, "MessageSquare", MessageSquare, { "className": "w-6 h-6" })} </div> <div> <p class="text-2xs font-black text-stone-500 uppercase tracking-widest">Total Reseñas</p> <p class="text-2xl font-black text-white">${allReviews.length}</p> </div> </div> <div class="bg-stone-900 border border-stone-800 p-6 rounded-4xl flex items-center gap-4"> <div class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500"> ${renderComponent($$result2, "Star", Star, { "className": "w-6 h-6 fill-current" })} </div> <div> <p class="text-2xs font-black text-stone-500 uppercase tracking-widest">Destacadas (Live)</p> <p class="text-2xl font-black text-white">${featuredCount}</p> </div> </div> <div class="bg-stone-900 border border-stone-800 p-6 rounded-4xl flex items-center gap-4"> <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-6 h-6" })} </div> <div> <p class="text-2xs font-black text-stone-500 uppercase tracking-widest">Estado Sistema</p> <p class="text-xs font-bold text-emerald-500 uppercase">Activo</p> </div> </div> </div> ${isSuccess && renderTemplate`<div id="success-notification" class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-5 h-5" })} <span class="font-medium text-sm">Actualizado correctamente.</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="cursor-pointer p-1 hover:bg-emerald-500/10 rounded-lg transition-colors"> ${renderComponent($$result2, "X", X, { "className": "w-4 h-4" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} <span class="font-medium text-sm">Error: ${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="cursor-pointer p-1 hover:bg-red-500/10 rounded-lg transition-colors"> ${renderComponent($$result2, "X", X, { "className": "w-4 h-4" })} </button> </div>`} <!-- Lista de Reseñas --> <div class="space-y-4"> <div class="flex items-center gap-3 mb-6"> <div class="w-1.5 h-6 bg-primary rounded-full"></div> <h2 class="text-xl font-black text-white uppercase tracking-widest">Feed de Reseñas Reales</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${allReviews.map((review) => renderTemplate`<div${addAttribute(`bg-stone-900 border ${review.is_featured ? "border-amber-500/50 shadow-lg shadow-amber-500/5" : "border-stone-800"} rounded-5xl p-8 transition-all relative group overflow-hidden`, "class")}> ${review.is_featured && renderTemplate`<div class="absolute top-0 right-0 bg-amber-500 text-stone-950 px-4 py-1 text-3xs font-black uppercase tracking-widest rounded-bl-2xl">
Destacado
</div>`} <div class="space-y-6"> <!-- Rating y Fecha --> <div class="flex justify-between items-center"> <div class="flex gap-1"> ${[...Array(5)].map((_, i) => renderTemplate`${renderComponent($$result2, "Star", Star, { "className": `w-4 h-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-stone-800"}` })}`)} </div> <span class="text-2xs font-bold text-stone-500 uppercase tracking-tighter"> ${new Date(review.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })} </span> </div> <!-- Comentario --> <div class="relative"> <span class="absolute -top-4 -left-2 text-4xl text-primary/20 font-serif italic">"</span> <p class="text-stone-300 text-base italic leading-relaxed relative z-10 px-2"> ${review.comment || "Sin comentarios."} </p> <span class="absolute -bottom-6 -right-2 text-4xl text-primary/20 font-serif italic">"</span> </div> <!-- Info de la Cita --> <div class="pt-6 border-t border-stone-800/50 flex items-center justify-between"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center text-stone-500"> ${renderComponent($$result2, "User", User, { "className": "w-5 h-5" })} </div> <div> <p class="text-2xs font-black text-stone-600 uppercase tracking-widest">Atendido por</p> <p class="text-xs font-bold text-stone-400">${review.appointments?.barber?.name || "Staff"}</p> </div> </div> <div class="flex items-center gap-2"> <!-- Botón Toggle Destacado --> <form method="POST"> <input type="hidden" name="action" value="toggle_featured"> <input type="hidden" name="id"${addAttribute(review.id, "value")}> <input type="hidden" name="current_status"${addAttribute(review.is_featured.toString(), "value")}> <button type="submit"${addAttribute(review.is_featured ? "Quitar de destacados" : "Marcar como destacado", "title")}${addAttribute(`cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center transition-all ${review.is_featured ? "bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20" : "bg-stone-950 text-stone-600 hover:text-amber-500 border border-stone-800"}`, "class")}> ${review.is_featured ? renderTemplate`${renderComponent($$result2, "ShieldX", ShieldX, { "className": "w-5 h-5" })}` : renderTemplate`${renderComponent($$result2, "ShieldCheck", ShieldCheck, { "className": "w-5 h-5" })}`} </button> </form> <!-- Botón Eliminar --> <form method="POST" onsubmit="return confirm('¿Seguro que quieres borrar esta reseña para siempre? No se puede deshacer.')"> <input type="hidden" name="action" value="delete_review"> <input type="hidden" name="id"${addAttribute(review.id, "value")}> <button type="submit" class="cursor-pointer w-10 h-10 rounded-xl bg-stone-950 text-stone-600 hover:text-red-500 border border-stone-800 flex items-center justify-center transition-all"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-5 h-5" })} </button> </form> </div> </div> </div> </div>`)} </div> ${allReviews.length === 0 && renderTemplate`<div class="bg-stone-900/50 border border-dashed border-stone-800 rounded-6xl p-20 text-center"> ${renderComponent($$result2, "MessageSquare", MessageSquare, { "className": "w-12 h-12 text-stone-800 mx-auto mb-4" })} <h3 class="text-xl font-black text-stone-600 uppercase tracking-widest">Sin reseñas registradas</h3> <p class="text-stone-500 text-sm mt-2">No se han encontrado reseñas de clientes en el sistema para moderar.</p> </div>`} </div> </div> ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/testimonials.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/testimonials.astro";
const $$url = "/admin/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testimonials,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
