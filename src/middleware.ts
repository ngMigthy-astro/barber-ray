import { defineMiddleware } from "astro:middleware";
import { createSupabaseClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, cookies, redirect, locals } = context;

  const supabase = createSupabaseClient(request, cookies);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: admin } = await supabase
      .from("allowed_admins")
      .select("email")
      .eq("email", user.email?.toLowerCase())
      .single();

    locals.user = {
      ...user,
      isAdmin: !!admin,
    };
  } else {
    locals.user = null;
  }

  if (url.pathname.startsWith("/admin")) {
    if (!locals.user) {
      return redirect("/?login=true");
    }

    if (!locals.user.isAdmin) {
      return redirect("/?login=unauthorized");
    }
  }


  return next();
});
