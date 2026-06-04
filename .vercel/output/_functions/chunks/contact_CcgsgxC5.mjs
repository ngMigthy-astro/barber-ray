import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_CrODMIMm.mjs';
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B1K9u8oz.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { X, CheckCircle2, Info, MapPin, Phone, Clock, Plus, Trash2, Save } from 'lucide-react';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Contact;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let errorMessage = "";
  const { data: contact } = await supabase.from("contact_info").select("*").eq("id", "default").single();
  const { data: dbSchedule } = await supabase.from("schedule_entries").select("*").order("sort_order", { ascending: true });
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const action = formData.get("action");
      if (action === "update_contact") {
        const address = formData.get("address")?.toString();
        const phone = formData.get("phone")?.toString();
        const brand_name = formData.get("brand_name")?.toString();
        const brand_description = formData.get("brand_description")?.toString();
        const days = formData.getAll("schedule_days[]");
        const hours = formData.getAll("schedule_hours[]");
        const schedule = days.map((day, i) => ({
          days: day.toString(),
          hours: hours[i]?.toString() || ""
        })).filter((item) => item.days && item.hours);
        const { error: contactError } = await supabase.from("contact_info").upsert({
          id: "default",
          address,
          phone,
          brand_name,
          brand_description
        });
        if (contactError) throw contactError;
        const { error: deleteError } = await supabase.from("schedule_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (deleteError) throw deleteError;
        const scheduleData = days.map((day, i) => ({
          days: day.toString(),
          hours: hours[i]?.toString() || "",
          sort_order: i + 1
        })).filter((item) => item.days && item.hours);
        const { error: scheduleError } = await supabase.from("schedule_entries").insert(scheduleData);
        if (scheduleError) throw scheduleError;
        return Astro2.redirect("/admin/contact?success=true");
      }
    } catch (e) {
      errorMessage = e.message;
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  const currentContact = contact || {
    address: "",
    phone: "",
    brand_name: "Barber Ray",
    brand_description: ""
  };
  const currentSchedule = dbSchedule?.length ? dbSchedule : [{ days: "Lun – Vie", hours: "9:00am – 8:00pm" }];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Configuración de Contacto" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto space-y-8"> <div class="flex items-center justify-between"> <div> <h2 class="text-2xl font-black text-white uppercase tracking-tight">
Información del Negocio
</h2> <p class="text-stone-500 text-sm mt-1 font-medium">
Administra la ubicación, teléfonos y horarios de atención al cliente.
</p> </div> </div> ${errorMessage && renderTemplate`<div class="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3"> ${renderComponent($$result2, "X", X, { "className": "w-5 h-5" })} <span class="font-medium text-sm">${errorMessage}</span> </div>`} ${isSuccess && renderTemplate`<div id="success-notification" class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4"> <div class="flex items-center gap-3"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-5 h-5" })} <span class="font-medium text-sm text-white">
Los cambios se han guardado y publicado correctamente.
</span> </div> <button onclick="document.getElementById('success-notification').style.display='none'" class="cursor-pointer p-1 hover:bg-emerald-500/10 rounded-lg transition-colors"> ${renderComponent($$result2, "X", X, { "className": "w-4 h-4" })} </button> </div>`} <form method="POST" class="space-y-8"> <input type="hidden" name="action" value="update_contact"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <div class="space-y-8"> <div class="bg-stone-900 border border-stone-800 rounded-5xl p-8 space-y-6"> <div class="flex items-center gap-3 mb-2"> <div class="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500"> ${renderComponent($$result2, "Info", Info, { "className": "w-5 h-5" })} </div> <h3 class="text-white font-black uppercase tracking-ultra text-2xs">
Identidad y Contacto
</h3> </div> <div class="space-y-4"> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra ml-4">Nombre de la Marca</label> <input type="text" name="brand_name"${addAttribute(currentContact.brand_name, "value")} placeholder="Ej. Barber Ray" class="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors" required> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra ml-4">Descripción (Footer)</label> <textarea name="brand_description" rows="3" placeholder="Descripción corta de la marca para el footer..." class="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none" required>${currentContact.brand_description}</textarea> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra ml-4">Dirección Física</label> <div class="relative"> ${renderComponent($$result2, "MapPin", MapPin, { "className": "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-700" })} <input type="text" name="address"${addAttribute(currentContact.address, "value")} placeholder="Ej. Av. Reforma 123, CDMX" class="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors" required> </div> </div> <div class="space-y-2"> <label class="text-2xs font-black text-stone-500 uppercase tracking-ultra ml-4">Teléfono de Atención</label> <div class="relative"> ${renderComponent($$result2, "Phone", Phone, { "className": "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-700" })} <input type="text" name="phone"${addAttribute(currentContact.phone, "value")} placeholder="Ej. +52 55 1234 5678" class="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors" required> </div> </div> </div> </div> </div> <div class="space-y-8"> <div class="bg-stone-900 border border-stone-800 rounded-5xl p-8"> <div class="flex items-center justify-between mb-8"> <div class="flex items-center gap-3"> <div class="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500"> ${renderComponent($$result2, "Clock", Clock, { "className": "w-5 h-5" })} </div> <h3 class="text-white font-black uppercase tracking-ultra text-2xs">
Gestión de Horarios
</h3> </div> <button type="button" id="add-schedule-btn" class="cursor-pointer p-2 bg-amber-500/10 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-stone-950 transition-all"> ${renderComponent($$result2, "Plus", Plus, { "className": "w-5 h-5" })} </button> </div> <div id="schedule-container" class="space-y-4"> ${currentSchedule.map((item, index) => renderTemplate`<div class="flex gap-4 items-end group animate-in fade-in slide-in-from-right-4"${addAttribute(`animation-delay: ${index * 50}ms`, "style")}> <div class="flex-1 space-y-2"> ${index === 0 && renderTemplate`<label class="text-3xs font-black text-stone-600 uppercase tracking-ultra ml-4">
Días
</label>`} <input type="text" name="schedule_days[]"${addAttribute(item.days, "value")} placeholder="Lun - Vie" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors" required> </div> <div class="flex-1 space-y-2"> ${index === 0 && renderTemplate`<label class="text-3xs font-black text-stone-600 uppercase tracking-ultra ml-4">
Horas
</label>`} <input type="text" name="schedule_hours[]"${addAttribute(item.hours, "value")} placeholder="9:00am - 8:00pm" class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors" required> </div> ${index > 0 && renderTemplate`<button type="button" onclick="this.parentElement.remove()" class="cursor-pointer p-3 text-stone-600 hover:text-red-500 transition-colors"> ${renderComponent($$result2, "Trash2", Trash2, { "className": "w-5 h-5" })} </button>`} </div>`)} </div> </div> </div> </div> <div class="flex justify-end pt-4"> <button type="submit" class="cursor-pointer bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-12 py-5 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-amber-500/10 group"> ${renderComponent($$result2, "Save", Save, { "className": "w-5 h-5 group-hover:scale-110 transition-transform" })}
Guardar Cambios
</button> </div> </form> </div> ${renderScript($$result2, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/contact.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/contact.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/contact.astro";
const $$url = "/admin/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
