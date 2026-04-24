import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseClient(request, cookies);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: new URL("/api/auth/callback", request.url).toString(),
    },
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect(data.url);
};
