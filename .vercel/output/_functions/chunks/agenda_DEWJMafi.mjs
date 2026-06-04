import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead, a6 as addAttribute } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { $ as $$AdminLayout } from './AdminLayout_BYekw57A.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

const $$Agenda = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Agenda;
  const { user } = Astro2.locals;
  if (!user) return Astro2.redirect("/admin");
  const supabase = createSupabaseClient(Astro2.request, Astro2.cookies);
  const { data: rawAppointments, error } = await supabase.from("appointments").select(`
    id,
    user_id,
    appointment_date,
    status,
    profiles:user_id(full_name, email),
    service:service_id(name, duration, price),
    barber:barber_id(name)
  `).order("appointment_date", { ascending: true }).gte("appointment_date", (/* @__PURE__ */ new Date()).toISOString());
  if (error) {
    console.error("Error al traer agenda:", error);
  }
  const appointments = (rawAppointments || []).map((app) => ({
    id: app.id,
    user_id: app.user_id,
    client_name: app.profiles?.full_name || "Cliente Desconocido",
    client_email: app.profiles?.email,
    service: app.service,
    barber: app.barber,
    appointment_date: app.appointment_date,
    status: app.status
  }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Agenda Semanal" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto space-y-8 text-stone-300 animate-in fade-in slide-in-from-bottom-4 duration-700"> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"> <div> <h2 class="text-2xl font-black text-white uppercase tracking-tight">
Citas Agendadas
</h2> <p class="text-stone-500 text-sm mt-1 font-medium italic">
Administra las reservaciones de tus clientes
</p> </div> </div> <div class="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl relative"> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-stone-950/50 border-b border-stone-800"> <th class="px-6 py-5 text-2xs font-black text-stone-500 uppercase tracking-ultra whitespace-nowrap">Fecha & Hora</th> <th class="px-6 py-5 text-2xs font-black text-stone-500 uppercase tracking-ultra">Cliente</th> <th class="px-6 py-5 text-2xs font-black text-stone-500 uppercase tracking-ultra">Servicio</th> <th class="px-6 py-5 text-2xs font-black text-stone-500 uppercase tracking-ultra">Barbero</th> <th class="px-6 py-5 text-2xs font-black text-stone-500 uppercase tracking-ultra whitespace-nowrap">Estado</th> </tr> </thead> <tbody class="divide-y divide-stone-800/50"> ${appointments.length === 0 ? renderTemplate`<tr> <td colspan="5" class="px-6 py-16 text-center text-stone-500"> <div class="flex flex-col items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-stone-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> <p class="font-medium">No hay citas agendadas próximamente.</p> </div> </td> </tr>` : appointments.map((app) => {
    const dateObj = new Date(app.appointment_date);
    const dateStr = dateObj.toLocaleDateString("es-MX", { weekday: "short", day: "2-digit", month: "short" });
    const timeStr = dateObj.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    let badgeClass = "bg-stone-800 text-stone-400 border border-stone-700";
    let statusText = app.status;
    if (app.status === "pending") {
      badgeClass = "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      statusText = "Pendiente";
    } else if (app.status === "confirmed") {
      badgeClass = "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      statusText = "Confirmada";
    } else if (app.status === "cancelled") {
      badgeClass = "bg-red-500/10 text-red-500 border border-red-500/20";
      statusText = "Cancelada";
    } else if (app.status === "completed") {
      badgeClass = "bg-blue-500/10 text-blue-500 border border-blue-500/20";
      statusText = "Completada";
    }
    return renderTemplate`<tr class="hover:bg-stone-800/40 transition-colors group"> <td class="px-6 py-5 whitespace-nowrap"> <div class="flex flex-col"> <span class="font-bold text-white capitalize text-sm">${dateStr}</span> <span class="text-xs text-amber-500 font-bold mt-0.5">${timeStr}</span> </div> </td> <td class="px-6 py-5"> <div class="flex flex-col"> <span class="font-bold text-white text-sm">${app.client_name}</span> <span class="text-xs text-stone-500 mt-0.5">${app.client_email || "Sin email registrado"}</span> </div> </td> <td class="px-6 py-5"> <div class="flex flex-col"> <span class="font-medium text-stone-300 text-sm">${app.service?.name || "N/A"}</span> <span class="text-xs text-stone-500 mt-0.5"> ${app.service?.duration ? String(app.service.duration).toLowerCase().includes("min") ? app.service.duration : `${app.service.duration} min` : "-"} •
<span class="font-bold"> ${app.service?.price ? String(app.service.price).startsWith("$") ? app.service.price : `$${app.service.price}` : "$0"} </span> </span> </div> </td> <td class="px-6 py-5 whitespace-nowrap"> <div class="flex items-center gap-3"> <div class="w-8 h-8 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-xs font-black text-amber-500 shadow-inner"> ${app.barber?.name?.charAt(0) || "?"} </div> <span class="text-sm font-medium text-stone-300">${app.barber?.name || "Sin Asignar"}</span> </div> </td> <td class="px-6 py-5 whitespace-nowrap"> <span${addAttribute(`px-3 py-1.5 text-2xs font-black uppercase tracking-ultra rounded-lg inline-flex items-center gap-2 ${badgeClass}`, "class")}> <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span> ${statusText} </span> </td> </tr>`;
  })} </tbody> </table> </div> </div> </div> ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/agenda.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/admin/agenda.astro";
const $$url = "/admin/agenda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Agenda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
