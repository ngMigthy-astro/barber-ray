import { aa as defineMiddleware, aj as sequence } from './chunks/sequence_krGa48tk.mjs';
import { c as createSupabaseClient } from './chunks/supabase_CNNSamdl.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, url, cookies, redirect, locals } = context;
  const supabase = createSupabaseClient(request, cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    const { data: admin } = await supabase.from("allowed_admins").select("email").eq("email", user.email?.toLowerCase()).single();
    locals.user = {
      ...user,
      isAdmin: !!admin
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

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
