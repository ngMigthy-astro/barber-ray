import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { u as uploadImage } from './storage_z6_9fOVM.mjs';
import { Save, X, Upload, Plus, Users, Star, Trash2 } from 'lucide-react';
import { LuInstagram } from 'react-icons/lu';

const $$Team = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Team;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      if (action === "upsert_team") {
        const id = formData.get("id")?.toString();
        const imageFile = formData.get("image");
        let image_url = formData.get("current_image")?.toString() || "";
        if (imageFile && imageFile.size > 0) {
          const uploadedUrl = await uploadImage(supabase, imageFile, "team");
          if (uploadedUrl) image_url = uploadedUrl;
        }
        const specialtiesStr = formData.get("specialties")?.toString() || "";
        const specialties = specialtiesStr.split(",").map((s) => s.trim()).filter(Boolean);
        const teamData = {
          name: formData.get("name")?.toString().trim(),
          role: formData.get("role")?.toString().trim(),
          instagram: formData.get("instagram")?.toString().trim(),
          rating: parseFloat(formData.get("rating")?.toString() || "5"),
          specialties,
          image_url,
          sort_order: parseInt(formData.get("sort_order")?.toString() || "0")
        };
        const { error } = id ? await supabase.from("team_members").update(teamData).eq("id", id) : await supabase.from("team_members").insert([teamData]);
        if (error) throw error;
        return Astro2.redirect("/admin/team?success=true");
      } else if (action === "delete_team") {
        const id = formData.get("id")?.toString();
        const { error } = await supabase.from("team_members").delete().eq("id", id);
        if (error) throw error;
        return Astro2.redirect("/admin/team?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const { data: dbTeam } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
  const team = dbTeam || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Equipo" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto"> ${isSuccess && renderTemplate`<div id="success-notification" class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "Save", Save, { "className": "w-5 h-5" })} <span class="font-medium">
La información del equipo ha sido actualizada correctamente.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="text-emerald-500/70 hover:text-emerald-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} ${errorMessage && renderTemplate`<div id="error-notification" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> <span class="font-medium">Error: ${errorMessage}</span> </div> <button onclick="document.getElementById('error-notification').style.display='none'" class="text-red-500/70 hover:text-red-500 transition-colors cursor-pointer"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} </button> </div>`} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Formulario para agregar miembro --> <div class="lg:col-span-1 space-y-6"> <div class="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl sticky top-8"> <div class="flex items-center gap-3 mb-6"> <div class="w-1.5 h-6 bg-amber-500 rounded-full"></div> <h3 class="text-sm font-black text-white uppercase tracking-widest">
Nuevo Barbero
</h3> </div> <!-- IMPORTANTE: enctype="multipart/form-data" para poder enviar archivos --> <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="hidden" name="action" value="upsert_team"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Foto de Perfil</label> <div class="relative group cursor-pointer"> <input type="file" id="new-team-image" name="image" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"> <div id="new-team-preview-container" class="w-full h-32 bg-stone-950 border border-dashed border-stone-800 rounded-xl overflow-hidden flex flex-col items-center justify-center text-stone-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors"> <div id="new-team-upload-ui" class="flex flex-col items-center justify-center pointer-events-none"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-6 h-6 mb-2" })} <span class="text-xs font-bold uppercase tracking-widest text-center">Subir Imagen</span> </div> <img id="new-team-image-preview" class="hidden w-full h-full object-cover"> </div> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Nombre</label> <input type="text" name="name" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Rol / Puesto</label> <input type="text" name="role" placeholder="Ej: Master Barber" required class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Instagram (@)</label> <input type="text" name="instagram" placeholder="barber_ray" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500"> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra px-1">Especialidades (separadas por coma)</label> <textarea name="specialties" rows="2" placeholder="Cortes Clásicos, Fade, Barba..." class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-amber-500 resize-none"></textarea> </div> <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all cursor-pointer"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-4 h-4" })}
Agregar Barbero
</button> </form> </div> </div> <!-- Lista del Equipo Actual --> <div class="lg:col-span-2 space-y-6"> <div class="flex items-center justify-between mb-2"> <h3 class="text-xl font-bold text-white">Equipo Actual</h3> <span class="px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-2xs font-black text-stone-500 uppercase">${team.length} items</span> </div> <div class="grid grid-cols-1 gap-4"> ${team.map((member, index) => renderTemplate`<div class="bg-stone-900 border border-stone-800 rounded-4xl p-6 hover:border-amber-500/50 transition-all group"> <form method="POST" enctype="multipart/form-data" class="flex flex-col md:flex-row gap-6"> <input type="hidden" name="action" value="upsert_team"> <input type="hidden" name="id"${addAttribute(member.id, "value")}> <input type="hidden" name="sort_order"${addAttribute(index, "value")}> <input type="hidden" name="current_image"${addAttribute(member.image_url, "value")}> <input type="hidden" name="rating"${addAttribute(member.rating, "value")}> <div class="flex flex-col items-center gap-4"> <div class="w-24 h-24 rounded-2xl bg-stone-950 border border-stone-800 overflow-hidden relative"> ${member.image_url ? renderTemplate`<img${addAttribute(`edit-team-preview-${member.id}`, "id")}${addAttribute(member.image_url, "src")}${addAttribute(member.name, "alt")} class="w-full h-full object-cover">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-stone-700 relative"> ${renderComponent($$result2, "Users", Users, { "className": "w-8 h-8" })} <img${addAttribute(`edit-team-preview-${member.id}`, "id")} class="hidden absolute inset-0 w-full h-full object-cover"> </div>`} <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"> ${renderComponent($$result2, "Upload", Upload, { "className": "w-5 h-5 text-white" })} <input type="file"${addAttribute(`edit-team-image-${member.id}`, "id")} name="image" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer edit-team-file-input"${addAttribute(`edit-team-preview-${member.id}`, "data-preview-id")}> </div> </div> <div class="flex items-center gap-1 text-amber-500 text-xs font-bold"> ${renderComponent($$result2, "Star", Star, { "className": "w-3 h-3 fill-amber-500" })} ${member.rating} </div> </div> <div class="flex-1 space-y-4"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name"${addAttribute(member.name, "value")} required class="bg-transparent text-xl font-bold text-white outline-none focus:text-amber-500 transition-colors"> <div class="flex items-center gap-2"> <input type="text" name="role"${addAttribute(member.role, "value")} required class="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-3 py-1 text-stone-400 text-xs font-bold uppercase text-center focus:border-amber-500 outline-none"> </div> </div> <div class="flex items-center gap-2 text-stone-400"> ${renderComponent($$result2, "LuInstagram", LuInstagram, { "className": "w-4 h-4 text-pink-500" })} <input type="text" name="instagram"${addAttribute(member.instagram, "value")} placeholder="Usuario IG" class="bg-transparent border-b border-stone-800 text-sm outline-none focus:border-pink-500 transition-colors"> </div> <div> <label class="text-2xs font-black text-stone-600 uppercase tracking-ultra mb-1 block">
Especialidades
</label> <textarea name="specialties" rows="2" class="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-400 text-sm outline-none focus:border-amber-500 transition-colors resize-none">${(member.specialties || []).join(", ").trim()}</textarea> </div> <div class="flex items-center justify-end gap-3 pt-2 border-t border-stone-800/50"> <button type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-emerald-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Save", Save, { "className": "w-3 h-3" })}
Guardar
</button> <button${addAttribute(`delete-${member.id}`, "form")} type="submit" class="flex items-center gap-2 text-xs font-black text-stone-500 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-3 h-3" })}
Eliminar
</button> </div> </div> </form> <form${addAttribute(`delete-${member.id}`, "id")} method="POST" class="hidden"> <input type="hidden" name="action" value="delete_team"> <input type="hidden" name="id"${addAttribute(member.id, "value")}> </form> </div>`)} </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/team.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/team.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/team.astro";
const $$url = "/admin/team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Team,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
