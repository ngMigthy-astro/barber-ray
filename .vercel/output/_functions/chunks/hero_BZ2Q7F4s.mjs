import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_CrODMIMm.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B1K9u8oz.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { u as uploadImage } from './storage_z6_9fOVM.mjs';
import { X, Upload } from 'lucide-react';

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  const { data: dbHeroData, error: fetchError } = await supabase.from("hero_content").select("*").single();
  const hero = dbHeroData || {
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" }
    ]
  };
  let successMessage = "";
  let errorMessage = "";
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const stats = [
        {
          value: formData.get("stat1_value")?.toString() || "",
          label: formData.get("stat1_label")?.toString() || ""
        },
        {
          value: formData.get("stat2_value")?.toString() || "",
          label: formData.get("stat2_label")?.toString() || ""
        },
        {
          value: formData.get("stat3_value")?.toString() || "",
          label: formData.get("stat3_label")?.toString() || ""
        }
      ];
      const imageFile = formData.get("image");
      let image_url = formData.get("current_image")?.toString() || "";
      if (imageFile && imageFile.size > 0) {
        const uploadedUrl = await uploadImage(supabase, imageFile, "hero");
        if (uploadedUrl) image_url = uploadedUrl;
      }
      const updatedHero = {
        title: formData.get("title")?.toString() || "",
        subtitle: formData.get("subtitle")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        image_url,
        stats
      };
      const { error: updateError } = await supabase.from("hero_content").upsert({
        id: dbHeroData?.id,
        ...updatedHero,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (updateError) throw updateError;
      successMessage = "Hero actualizado correctamente.";
      return Astro2.redirect("/admin/hero?success=true");
    } catch (e) {
      errorMessage = "Error al actualizar: " + e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Editar Hero Section" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl"> <div class="mb-8"> <h2 class="text-2xl font-bold text-white mb-2">Configuración del Hero</h2> <p class="text-stone-400 text-sm">
Personaliza el mensaje principal que ven tus clientes al entrar al
        sitio.
</p> </div> ${isSuccess && renderTemplate`<div id="success-notification" class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="font-medium">
Los cambios se han guardado correctamente.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="text-emerald-500/70 hover:text-emerald-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="font-medium">${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="text-red-500/70 hover:text-red-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} <form method="POST" enctype="multipart/form-data" class="space-y-8"> <input type="hidden" name="current_image"${addAttribute(hero.image_url, "value")}> <!-- Imagen de Fondo --> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6"> <div class="flex items-center gap-2 mb-2"> <div class="w-2 h-6 bg-amber-500 rounded-full"></div> <h3 class="font-black text-white uppercase tracking-ultra text-2xs">
Imagen de Fondo (Hero Background)
</h3> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"> <div class="md:col-span-1"> <div class="relative group aspect-video md:aspect-square bg-stone-950 border-2 border-dashed border-stone-800 rounded-2xl overflow-hidden flex items-center justify-center hover:border-amber-500/50 transition-all cursor-pointer"> <img id="hero-preview"${addAttribute(hero.image_url || "/images/hero-bg.jpg", "src")} class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-30 transition-opacity duration-300"> <div class="relative z-10 flex flex-col items-center gap-2 text-stone-500 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-8 h-8" })} <span class="text-2xs font-black uppercase tracking-widest">Cambiar Imagen</span> </div> <input type="file" name="image" accept="image/*" id="hero-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"> </div> </div> <div class="md:col-span-2 space-y-4"> <div class="p-4 bg-stone-950/50 rounded-xl border border-stone-800/50"> <p class="text-xs text-stone-400 leading-relaxed"> <strong class="text-amber-500">Tip </strong> Para el Hero, usa imágenes
                horizontales (landscape) de alta resolución (mínimo 1920x1080). Las
                imágenes con tonos oscuros funcionan mejor con el diseño "Blood &
                Steel".
</p> </div> </div> </div> </div> <!-- Textos Principales --> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6"> <div class="flex items-center gap-2 mb-2"> <div class="w-2 h-6 bg-amber-500 rounded-full"></div> <h3 class="font-black text-white uppercase tracking-ultra text-2xs">
Textos Principales
</h3> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label class="text-2xs font-black text-text-muted uppercase tracking-ultra px-1">Título</label> <input type="text" name="title"${addAttribute(hero.title, "value")} class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" required> </div> <div class="space-y-2"> <label class="text-2xs font-black text-text-muted uppercase tracking-ultra px-1">Subtítulo</label> <input type="text" name="subtitle"${addAttribute(hero.subtitle, "value")} class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" required> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-text-muted uppercase tracking-ultra px-1">Descripción</label> <textarea name="description" rows="3" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all resize-none" required>${hero.description}</textarea> </div> </div> <!-- Stats --> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6"> <div class="flex items-center gap-2 mb-2"> <div class="w-2 h-6 bg-amber-500 rounded-full"></div> <h3 class="font-black text-white uppercase tracking-ultra text-2xs">
Estadísticas (Stats)
</h3> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> ${hero.stats.map((stat, index) => renderTemplate`<div class="p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-3"> <input type="text"${addAttribute(`stat${index + 1}_value`, "name")} placeholder="Valor (ej: 10+)"${addAttribute(stat.value, "value")} class="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-lg font-bold text-white text-center focus:border-amber-500 outline-none"> <input type="text"${addAttribute(`stat${index + 1}_label`, "name")} placeholder="Etiqueta"${addAttribute(stat.label, "value")} class="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-500 text-center focus:border-amber-500 outline-none"> </div>`)} </div> </div> <!-- Submit --> <div class="flex justify-end"> <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95 cursor-pointer">
Guardar Cambios
</button> </div> </form> </div> ` })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/hero.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/hero.astro";
const $$url = "/admin/hero";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Hero,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
