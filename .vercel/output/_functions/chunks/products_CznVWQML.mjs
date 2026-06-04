import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { u as uploadImage } from './storage_z6_9fOVM.mjs';
import { Save, X, Upload, Plus, Trash2, Package } from 'lucide-react';

const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Products;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      if (action === "upsert_product") {
        const id = formData.get("id")?.toString();
        const imageFile = formData.get("image");
        let image_url = formData.get("current_image")?.toString() || "";
        if (imageFile && imageFile.size > 0) {
          const uploadedUrl = await uploadImage(supabase, imageFile, "products");
          if (uploadedUrl) image_url = uploadedUrl;
        }
        const productData = {
          name: formData.get("name")?.toString().trim(),
          description: formData.get("description")?.toString().trim(),
          price: formData.get("price")?.toString().trim(),
          category: formData.get("category")?.toString().trim(),
          image_url
        };
        const { error } = id ? await supabase.from("products").update(productData).eq("id", id) : await supabase.from("products").insert([productData]);
        if (error) throw error;
        return Astro2.redirect("/admin/products?success=true");
      } else if (action === "delete_product") {
        const id = formData.get("id")?.toString();
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/products?success=true");
      } else if (action === "add_category") {
        const name = formData.get("name")?.toString().trim();
        if (!name) throw new Error("El nombre de la categoría es requerido.");
        const { data: currentCats } = await supabase.from("product_categories").select("id");
        const { error } = await supabase.from("product_categories").insert([{ name, sort_order: (currentCats?.length || 0) + 1 }]);
        if (error) throw error;
        return Astro2.redirect("/admin/products?success=true");
      } else if (action === "delete_category") {
        const id = formData.get("id")?.toString();
        const { error } = await supabase.from("product_categories").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/products?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const { data: dbProducts } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  const products = dbProducts || [];
  const { data: dbCategories } = await supabase.from("product_categories").select("*").order("sort_order", { ascending: true });
  const categories = dbCategories || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto"> ${isSuccess && renderTemplate`<div id="success-notification" class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "Save", Save, { "className": "w-5 h-5" })} <span class="font-medium">
El catálogo de productos ha sido actualizado correctamente.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="text-emerald-500/70 hover:text-emerald-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> <span class="font-medium">Error: ${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="text-red-500/70 hover:text-red-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Formulario Nuevo Producto --> <div class="lg:col-span-1 space-y-6"> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl sticky top-8"> <div class="flex items-center gap-3 mb-6"> <div class="w-1.5 h-6 bg-amber-500 rounded-full"></div> <h3 class="text-sm font-black text-white uppercase tracking-widest">
Nuevo Producto
</h3> </div> <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="hidden" name="action" value="upsert_product"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Imagen del Producto</label> <div class="relative group cursor-pointer"> <input type="file" id="new-product-image" name="image" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"> <div id="new-product-preview-container" class="w-full bg-stone-950 border border-dashed border-stone-800 rounded-xl px-4 py-6 flex flex-col items-center justify-center text-stone-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors overflow-hidden"> <div id="new-product-upload-ui" class="flex flex-col items-center justify-center pointer-events-none"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-6 h-6 mb-2" })} <span class="text-xs font-bold uppercase tracking-widest text-center">Subir Imagen</span> </div> <img id="new-product-image-preview" class="hidden w-full h-32 object-contain"> </div> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Nombre</label> <input type="text" name="name" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> <div class="grid grid-cols-2 gap-4"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Categoría</label> <select name="category" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500 cursor-pointer"> <option value="" disabled selected>Seleccionar...</option> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.name, "value")} class="bg-stone-900">${cat.name}</option>`)} </select> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Precio</label> <input type="text" name="price" placeholder="$0.00" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Descripción</label> <textarea name="description" rows="3" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500 resize-none"></textarea> </div> <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all cursor-pointer"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-4 h-4" })}
Crear Producto
</button> </form> </div> <!-- Gestión de Categorías (Catálogo) --> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl"> <details class="group select-none"> <summary class="flex items-center justify-between font-black text-white text-sm uppercase tracking-widest cursor-pointer list-none"> <div class="flex items-center gap-3"> <div class="w-1.5 h-6 bg-amber-500 rounded-full"></div> <span>Gestionar Categorías</span> </div> <span class="transition-transform duration-300 group-open:rotate-180 text-stone-500 group-hover:text-white"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path> </svg> </span> </summary> <div class="mt-6 space-y-6"> <!-- Formulario Agregar Categoría --> <form method="POST" class="space-y-3"> <input type="hidden" name="action" value="add_category"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Nueva Categoría</label> <div class="flex gap-2"> <input type="text" name="name" placeholder="Ej: Afeitado" required class="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl px-3 flex items-center justify-center cursor-pointer transition-all"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-4 h-4" })} </button> </div> </div> </form> <!-- Lista de Categorías Existentes --> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Categorías Actuales</label> <div class="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar"> ${categories.map((cat) => renderTemplate`<div class="flex items-center justify-between bg-stone-950 border border-stone-800 rounded-xl px-3 py-2"> <span class="text-sm font-semibold text-stone-300">${cat.name}</span> <form method="POST" class="inline"> <input type="hidden" name="action" value="delete_category"> <input type="hidden" name="id"${addAttribute(cat.id, "value")}> <button type="submit" class="text-stone-500 hover:text-red-500 transition-colors cursor-pointer" onclick="return confirm('¿Seguro que deseas eliminar esta categoría?')"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-4 h-4" })} </button> </form> </div>`)} </div> </div> </div> </details> </div> </div> <!-- Lista de Productos --> <div class="lg:col-span-2 space-y-6"> <div class="flex items-center justify-between mb-2"> <h3 class="text-xl font-bold text-white">Inventario</h3> <span class="px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-2xs font-black text-stone-500 uppercase">${products.length} items</span> </div> <div class="grid grid-cols-1 gap-4"> ${products.map((product) => renderTemplate`<div class="bg-stone-900 border border-stone-800 rounded-4xl p-6 hover:border-amber-500/50 transition-all group"> <form method="POST" enctype="multipart/form-data" class="flex flex-col md:flex-row gap-6"> <input type="hidden" name="action" value="upsert_product"> <input type="hidden" name="id"${addAttribute(product.id, "value")}> <input type="hidden" name="current_image"${addAttribute(product.image_url, "value")}> <div class="w-24 h-24 shrink-0 rounded-2xl bg-stone-950 border border-stone-800 overflow-hidden relative flex items-center justify-center"> <div${addAttribute(`preview-container-${product.id}`, "id")} class="w-full h-full flex items-center justify-center"> <img${addAttribute(`img-preview-${product.id}`, "id")}${addAttribute(product.image_url || "", "src")}${addAttribute(product.name, "alt")}${addAttribute(`w-full h-full object-cover ${!product.image_url ? "hidden" : ""}`, "class")}> ${!product.image_url && renderTemplate`${renderComponent($$result2, "Package", Package, { "id": `icon-placeholder-${product.id}`, "className": "w-8 h-8 text-stone-700" })}`} </div> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-5 h-5 text-white" })} <input type="file" name="image"${addAttribute(product.id, "data-product-id")} accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"> </div> </div> <div class="flex-1 space-y-4"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name"${addAttribute(product.name, "value")} required class="bg-transparent text-xl font-bold text-white outline-none focus:text-amber-500 transition-colors"> <div class="flex items-center gap-2 justify-end"> <input type="text" name="price"${addAttribute(product.price, "value")} required class="w-24 bg-stone-950 border border-stone-800 rounded-lg px-3 py-1 text-emerald-500 text-sm font-black text-center focus:border-amber-500 outline-none"> </div> </div> <div> <select name="category" required class="bg-stone-950 border border-stone-800 rounded-md px-2 py-1 text-stone-400 text-2xs font-bold uppercase tracking-widest outline-none focus:border-amber-500 cursor-pointer"> ${!categories.some((cat) => cat.name === product.category) && renderTemplate`<option${addAttribute(product.category, "value")} selected class="bg-stone-900"> ${product.category} </option>`} ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.name, "value")}${addAttribute(product.category === cat.name, "selected")} class="bg-stone-900"> ${cat.name} </option>`)} </select> </div> <textarea name="description" rows="2" class="w-full bg-transparent text-stone-400 text-sm outline-none focus:text-stone-200 transition-colors resize-none">${(product.description || "").trim()}</textarea> <div class="flex items-center justify-end gap-3 pt-2 border-t border-stone-800/50"> <button type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-emerald-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Save", Save, { "className": "w-3 h-3" })}
Guardar
</button> <button${addAttribute(`delete-${product.id}`, "form")} type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-3 h-3" })}
Eliminar
</button> </div> </div> </form> <form${addAttribute(`delete-${product.id}`, "id")} method="POST" class="hidden"> <input type="hidden" name="action" value="delete_product"> <input type="hidden" name="id"${addAttribute(product.id, "value")}> </form> </div>`)} </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/products.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/products.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
