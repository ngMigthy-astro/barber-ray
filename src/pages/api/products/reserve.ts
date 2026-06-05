import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseClient(request, cookies);

  // 1. Validar sesión del usuario
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Inicia sesión para apartar productos." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { productId, quantity } = await request.json();

    if (!productId || !quantity || quantity <= 0) {
      return new Response(
        JSON.stringify({ error: "Datos del apartado inválidos." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Obtener el stock físico del producto
    const { data: product, error: errProduct } = await supabase
      .from("products")
      .select("stock")
      .eq("id", productId)
      .single();

    if (errProduct || !product) {
      return new Response(
        JSON.stringify({ error: "El producto seleccionado no existe." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Obtener la cantidad reservada actualmente (pendientes y vigentes)
    const nowIso = new Date().toISOString();
    const { data: activeReservations, error: errReservations } = await supabase
      .from("product_reservations")
      .select("quantity")
      .eq("product_id", productId)
      .eq("status", "pending")
      .gt("expires_at", nowIso);

    if (errReservations) throw errReservations;

    const reservedQty = (activeReservations || []).reduce(
      (sum: number, res: any) => sum + res.quantity,
      0
    );

    const availableStock = Math.max(0, product.stock - reservedQty);

    // 4. Validar si hay stock disponible suficiente
    if (availableStock < quantity) {
      return new Response(
        JSON.stringify({ error: "No hay suficiente stock disponible para apartar." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Crear la reserva por 3 días (72 horas)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);

    const { error: errInsert } = await supabase
      .from("product_reservations")
      .insert([
        {
          user_id: user.id,
          product_id: productId,
          quantity,
          expires_at: expiresAt.toISOString(),
          status: "pending",
        },
      ]);

    if (errInsert) throw errInsert;

    return new Response(
      JSON.stringify({ success: true, message: "¡Producto apartado con éxito!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error reserving product:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Ocurrió un error al apartar el producto." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
