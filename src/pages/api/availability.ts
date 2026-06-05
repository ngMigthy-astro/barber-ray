import { createSupabaseClient } from "../../lib/supabase";

export async function GET({ request, cookies }: { request: Request; cookies: any }) {
  try {
    const url = new URL(request.url);
    const barberId = url.searchParams.get("barberId");
    const date = url.searchParams.get("date"); // Formato YYYY-MM-DD

    if (!date) {
      return new Response(
        JSON.stringify({ error: "Missing date parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabase = createSupabaseClient(request, cookies);

    // Consultamos las citas en la fecha seleccionada que no estén canceladas
    let query = supabase
      .from("appointments")
      .select(`
        appointment_date,
        status,
        barber_id,
        service:service_id(duration)
      `)
      .neq("status", "cancelled")
      .filter("appointment_date", "gte", `${date}T00:00:00Z`)
      .filter("appointment_date", "lte", `${date}T23:59:59Z`);

    if (barberId) {
      query = query.eq("barber_id", barberId);
    }

    const { data: appointments, error } = await query;

    if (error) {
      throw error;
    }

    // Limpiamos y estructuramos las citas ocupadas con su hora, duración y barbero
    const activeAppointments = (appointments || []).map((app: any) => {
      const rawDuration = app.service?.duration || "30";
      const duration = parseInt(rawDuration.replace(/\D/g, ""), 10) || 30;

      return {
        date: app.appointment_date,
        duration: duration,
        barberId: app.barber_id
      };
    });

    return new Response(
      JSON.stringify({ appointments: activeAppointments }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error fetching availability:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
