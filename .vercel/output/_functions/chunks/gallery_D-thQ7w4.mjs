import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { u as uploadImage } from './storage_z6_9fOVM.mjs';
import { Save, X, Upload, Plus, Trash2, Image } from 'lucide-react';

const $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Gallery;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      if (action === "upsert_gallery") {
        const id = formData.get("id")?.toString();
        const imageFile = formData.get("image");
        let image_url = formData.get("current_image")?.toString() || "";
        if (imageFile && imageFile.size > 0) {
          const uploadedUrl = await uploadImage(supabase, imageFile, "gallery");
          if (uploadedUrl) image_url = uploadedUrl;
        }
        if (!id && !image_url) {
          throw new Error(
            "Debes subir una imagen para crear un nuevo registro en la galería."
          );
        }
        const galleryData = {
          alt: formData.get("alt")?.toString(),
          category: formData.get("category")?.toString(),
          image_url,
          sort_order: parseInt(formData.get("sort_order")?.toString() || "0")
        };
        const { error } = id ? await supabase.from("gallery_images").update(galleryData).eq("id", id) : await supabase.from("gallery_images").insert([galleryData]);
        if (error) throw error;
        return Astro2.redirect("/admin/gallery?success=true");
      } else if (action === "delete_gallery") {
        const id = formData.get("id")?.toString();
        const { error } = await supabase.from("gallery_images").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/gallery?success=true");
      } else if (action === "add_gallery_category") {
        const name = formData.get("name")?.toString().trim();
        if (!name) throw new Error("El nombre de la categoría es requerido.");
        const { data: currentCats } = await supabase.from("gallery_categories").select("id");
        const { error } = await supabase.from("gallery_categories").insert([{ name, sort_order: (currentCats?.length || 0) + 1 }]);
        if (error) throw error;
        return Astro2.redirect("/admin/gallery?success=true");
      } else if (action === "delete_gallery_category") {
        const id = formData.get("id")?.toString();
        const { error } = await supabase.from("gallery_categories").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/gallery?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const { data: dbGallery } = await supabase.from("gallery_images").select("*").order("sort_order", { ascending: true });
  const gallery = dbGallery || [];
  const { data: dbCategories } = await supabase.from("gallery_categories").select("*").order("sort_order", { ascending: true });
  const categories = dbCategories || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Galería" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto"> ${isSuccess && renderTemplate`<div id="success-notification" class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "Save", Save, { "className": "w-5 h-5" })} <span class="font-medium">
La galería de imágenes ha sido actualizada correctamente.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="text-emerald-500/70 hover:text-emerald-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> <span class="font-medium">Error: ${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="text-red-500/70 hover:text-red-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} <div class="grid grid-cols-1 lg:grid-cols-4 gap-8"> <!-- Formulario Nueva Imagen --> <div class="lg:col-span-1 space-y-6"> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl sticky top-8"> <div class="flex items-center gap-3 mb-6"> <div class="w-1.5 h-6 bg-amber-500 rounded-full"></div> <h3 class="text-sm font-black text-white uppercase tracking-widest">
Subir Foto
</h3> </div> <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="hidden" name="action" value="upsert_gallery"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Archivo de Imagen *</label> <div class="relative group cursor-pointer"> <input type="file" id="new-gallery-image" name="image" accept="image/*" required class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"> <div id="new-gallery-preview-container" class="w-full h-32 bg-stone-950 border border-dashed border-stone-800 rounded-xl overflow-hidden flex flex-col items-center justify-center text-stone-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors"> <div id="new-gallery-upload-ui" class="flex flex-col items-center justify-center pointer-events-none"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-6 h-6 mb-2" })} <span class="text-xs font-bold uppercase tracking-widest text-center">Seleccionar</span> </div> <img id="new-gallery-image-preview" class="hidden w-full h-full object-cover"> </div> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Descripción / Alt</label> <input type="text" name="alt" required placeholder="Ej: Fade Clásico con textura" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Categoría</label> <select name="category" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500 cursor-pointer"> <option value="" disabled selected>Seleccionar...</option> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.name, "value")} class="bg-stone-900">${cat.name}</option>`)} </select> </div> <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all mt-4 cursor-pointer"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-4 h-4" })}
Subir a Galería
</button> </form> </div> <!-- Gestión de Categorías de Galería --> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl"> <details class="group select-none"> <summary class="flex items-center justify-between font-black text-white text-sm uppercase tracking-widest cursor-pointer list-none"> <div class="flex items-center gap-3"> <div class="w-1.5 h-6 bg-amber-500 rounded-full"></div> <span>Gestionar Categorías</span> </div> <span class="transition-transform duration-300 group-open:rotate-180 text-stone-500 group-hover:text-white"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path> </svg> </span> </summary> <div class="mt-6 space-y-6"> <!-- Formulario Agregar Categoría --> <form method="POST" class="space-y-3"> <input type="hidden" name="action" value="add_gallery_category"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Nueva Categoría</label> <div class="flex gap-2"> <input type="text" name="name" placeholder="Ej: Color" required class="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl px-3 flex items-center justify-center cursor-pointer transition-all"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-4 h-4" })} </button> </div> </div> </form> <!-- Lista de Categorías Existentes --> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Categorías Actuales</label> <div class="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar"> ${categories.map((cat) => renderTemplate`<div class="flex items-center justify-between bg-stone-950 border border-stone-800 rounded-xl px-3 py-2"> <span class="text-sm font-semibold text-stone-300">${cat.name}</span> <form method="POST" class="inline"> <input type="hidden" name="action" value="delete_gallery_category"> <input type="hidden" name="id"${addAttribute(cat.id, "value")}> <button type="submit" class="text-stone-500 hover:text-red-500 transition-colors cursor-pointer" onclick="return confirm('¿Seguro que deseas eliminar esta categoría?')"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-4 h-4" })} </button> </form> </div>`)} </div> </div> </div> </details> </div> </div> <!-- Grid de Galería --> <div class="lg:col-span-3"> <div class="flex items-center justify-between mb-6"> <h3 class="text-xl font-bold text-white">Fotos en el Portafolio</h3> <span class="px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-2xs font-black text-stone-500 uppercase">${gallery.length} fotos</span> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> ${gallery.map((image, index) => renderTemplate`<div class="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col"> <div class="relative aspect-4/3 w-full bg-stone-950 flex items-center justify-center overflow-hidden"> ${image.image_url ? renderTemplate`<img${addAttribute(image.image_url, "src")}${addAttribute(image.alt, "alt")} class="w-full h-full object-cover">` : renderTemplate`${renderComponent($$result2, "ImageIcon", Image, { "className": "w-10 h-10 text-stone-800" })}`} <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"> <form method="POST" enctype="multipart/form-data" class="text-center"> <input type="hidden" name="action" value="upsert_gallery"> <input type="hidden" name="id"${addAttribute(image.id, "value")}> <input type="hidden" name="current_image"${addAttribute(image.image_url, "value")}> <input type="hidden" name="alt"${addAttribute(image.alt, "value")}> <input type="hidden" name="category"${addAttribute(image.category, "value")}> <input type="hidden" name="sort_order"${addAttribute(index, "value")}> ${renderComponent($$result2, "Upload", Upload, { "className": "w-8 h-8 text-white mx-auto mb-2" })} <span class="text-xs text-white font-bold uppercase tracking-widest">
Cambiar Imagen
</span> <input type="file" name="image" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onchange="this.form.submit()"> </form> </div> </div> <div class="p-5 flex-1 flex flex-col"> <form method="POST" class="flex-1 space-y-3"> <input type="hidden" name="action" value="upsert_gallery"> <input type="hidden" name="id"${addAttribute(image.id, "value")}> <input type="hidden" name="current_image"${addAttribute(image.image_url, "value")}> <input type="hidden" name="sort_order"${addAttribute(index, "value")}> <input type="text" name="alt"${addAttribute(image.alt, "value")} required class="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-amber-500 transition-colors border-b border-transparent focus:border-stone-700 pb-1"> <div class="flex items-center gap-2"> <select name="category" required class="bg-stone-950 border border-stone-800 rounded-md px-2 py-1 text-stone-400 text-2xs font-bold uppercase tracking-widest outline-none focus:border-amber-500 cursor-pointer"> ${!categories.some((cat) => cat.name === image.category) && renderTemplate`<option${addAttribute(image.category, "value")} selected class="bg-stone-900"> ${image.category} </option>`} ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.name, "value")}${addAttribute(image.category === cat.name, "selected")} class="bg-stone-900"> ${cat.name} </option>`)} </select> </div> <div class="flex items-center justify-end gap-3 pt-4 mt-auto"> <button type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-emerald-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Save", Save, { "className": "w-3 h-3" })} </button> <button${addAttribute(`delete-${image.id}`, "form")} type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-3 h-3" })} </button> </div> </form> <form${addAttribute(`delete-${image.id}`, "id")} method="POST" class="hidden"> <input type="hidden" name="action" value="delete_gallery"> <input type="hidden" name="id"${addAttribute(image.id, "value")}> </form> </div> </div>`)} </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/gallery.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/gallery.astro";
const $$url = "/admin/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
