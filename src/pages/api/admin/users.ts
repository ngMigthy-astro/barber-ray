import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

// Helper para verificar que el usuario actual es administrador
async function checkAdmin(supabase: any, userEmail: string | undefined): Promise<boolean> {
  if (!userEmail) return false;
  const { data: admin } = await supabase
    .from("allowed_admins")
    .select("email")
    .eq("email", userEmail.toLowerCase())
    .single();
  return !!admin;
}

// POST: Agregar un correo a la tabla allowed_admins (Promover o Pre-autorizar)
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseClient(request, cookies);

  // 1. Validar sesión del usuario
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "No autorizado. Inicie sesión." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Validar que el usuario que ejecuta la acción sea Administrador
  const isUserAdmin = await checkAdmin(supabase, user.email);
  if (!isUserAdmin) {
    return new Response(
      JSON.stringify({ error: "Acción prohibida. Se requieren permisos de administrador." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Por favor, proporciona un correo electrónico válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 3. Comprobar si ya existe en allowed_admins
    const { data: existingAdmin } = await supabase
      .from("allowed_admins")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingAdmin) {
      return new Response(
        JSON.stringify({ error: "Este correo electrónico ya tiene permisos de administrador." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Insertar el nuevo administrador
    const { error: insertError } = await supabase
      .from("allowed_admins")
      .insert([{ email: normalizedEmail }]);

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ success: true, message: "Administrador agregado exitosamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error al promover administrador:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Ocurrió un error al procesar la solicitud." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// DELETE: Quitar un correo de la tabla allowed_admins (Remover permisos)
export const DELETE: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseClient(request, cookies);

  // 1. Validar sesión del usuario
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "No autorizado. Inicie sesión." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Validar que el usuario que ejecuta la acción sea Administrador
  const isUserAdmin = await checkAdmin(supabase, user.email);
  if (!isUserAdmin) {
    return new Response(
      JSON.stringify({ error: "Acción prohibida. Se requieren permisos de administrador." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Correo electrónico no válido." }),
        { status: 452, headers: { "Content-Type": "application/json" } }
      );
    }

    const targetEmail = email.trim().toLowerCase();
    const currentUserEmail = user.email?.trim().toLowerCase();

    // 3. Autoprotección: Un administrador no puede removerse los permisos a sí mismo
    if (targetEmail === currentUserEmail) {
      return new Response(
        JSON.stringify({ error: "No puedes revocarte los permisos de administrador a ti mismo para prevenir un bloqueo de cuenta." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Eliminar el registro
    const { error: deleteError, count } = await supabase
      .from("allowed_admins")
      .delete()
      .eq("email", targetEmail);

    if (deleteError) throw deleteError;

    return new Response(
      JSON.stringify({ success: true, message: "Permisos de administrador revocados exitosamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error al revocar administrador:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Ocurrió un error al procesar la solicitud." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
