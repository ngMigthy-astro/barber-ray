import { createServerClient, parseCookieHeader } from '@supabase/ssr';

function createSupabaseClient(request, cookies) {
  return createServerClient(
    "https://sjjaracpnvlhcafzjjso.supabase.co",
    "sb_publishable_6kvaFF6obTbPYsg9DFdEIg_FrV1Gg2D",
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("Cookie");
          if (!cookieHeader) return [];
          const parsed = parseCookieHeader(cookieHeader);
          return parsed.map((c) => ({ name: c.name, value: c.value ?? "" }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options);
          });
        }
      }
    }
  );
}

export { createSupabaseClient as c };
