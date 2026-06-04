// supabase/functions/send-appointment-confirmation/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppointmentRow {
  id: string
  user_id: string
  service_id: string
  barber_id: string
  appointment_date: string
  status: string
}

interface AppointmentWithRelations {
  appointment_date: string
  user_id: string
  services: { name: string; price: string }
  team_members: { name: string; email: string | null }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEmailHtml(
  clientName: string,
  serviceName: string,
  barberName: string,
  appointmentDate: string,
): string {
  const formattedDate = new Date(appointmentDate).toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #f5f5f5; border-radius: 12px; overflow: hidden;">
      <div style="background: #dc2626; padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">Barber Ray</h1>
        <p style="margin: 8px 0 0; opacity: 0.85; font-size: 14px;">Confirmación de Cita</p>
      </div>

      <div style="padding: 32px;">
        <p style="font-size: 16px; color: #d1d5db;">Hola <strong style="color: #f5f5f5;">${clientName}</strong>,</p>
        <p style="color: #9ca3af;">Tu cita ha sido agendada exitosamente. Aquí están los detalles:</p>

        <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 24px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Servicio</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-weight: 600; text-align: right;">${serviceName}</td>
            </tr>
            <tr style="border-top: 1px solid #2a2a2a;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Barbero</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-weight: 600; text-align: right;">${barberName}</td>
            </tr>
            <tr style="border-top: 1px solid #2a2a2a;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Fecha y Hora</td>
              <td style="padding: 10px 0; color: #dc2626; font-weight: 700; text-align: right;">${formattedDate}</td>
            </tr>
          </table>
        </div>

        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
          Por favor llega 5 minutos antes de tu cita. Si necesitas cancelar o reagendar,
          contáctanos con al menos 24 horas de anticipación.
        </p>
      </div>

      <div style="border-top: 1px solid #1a1a1a; padding: 20px 32px; text-align: center;">
        <p style="color: #4b5563; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Barber Ray · Todos los derechos reservados
        </p>
      </div>
    </div>
  `
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

Deno.serve(async (req: Request): Promise<Response> => {
  // Database Webhooks always send POST
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    // 1. Parse the webhook payload from Supabase (contains `record` with the new row)
    const payload = await req.json() as { record: AppointmentRow }
    const { record } = payload

    if (!record?.id) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload: missing record.id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    // 2. Create Supabase admin client (service role bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 3. Fetch appointment with its relations
    //    barber_id → team_members, service_id → services
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select(`
        appointment_date,
        user_id,
        services ( name, price ),
        team_members!appointments_barber_id_fkey ( name, email )
      `)
      .eq('id', record.id)
      .single<AppointmentWithRelations>()

    if (fetchError || !appointment) {
      throw new Error(`Failed to fetch appointment: ${fetchError?.message}`)
    }

    // 4. Get client data from auth.users via Admin API
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(
      appointment.user_id,
    )

    if (userError || !user?.email) {
      throw new Error(`Failed to fetch user: ${userError?.message}`)
    }

    // 5. Build recipient list — always the client, optionally the barber
    const clientName = user.user_metadata?.full_name ?? user.email
    const recipients: string[] = [user.email]

    if (appointment.team_members?.email) {
      recipients.push(appointment.team_members.email)
    }

    // 6. Send email via Resend
    const emailHtml = buildEmailHtml(
      clientName,
      appointment.services.name,
      appointment.team_members.name,
      appointment.appointment_date,
    )

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Barber Ray <onboarding@resend.dev>',
        to: recipients,
        subject: `✂️ Cita confirmada: ${appointment.services.name} con ${appointment.team_members.name}`,
        html: emailHtml,
      }),
    })

    if (!resendRes.ok) {
      const resendError = await resendRes.json()
      throw new Error(`Resend error: ${JSON.stringify(resendError)}`)
    }

    const resendData = await resendRes.json()

    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
