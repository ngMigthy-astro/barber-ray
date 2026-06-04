import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseClient(request, cookies);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: new URL("/api/auth/callback", request.url).toString()
    }
  });
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return redirect(data.url);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
