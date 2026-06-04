import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseClient(request, cookies);
  await supabase.auth.signOut();
  return redirect("/");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
