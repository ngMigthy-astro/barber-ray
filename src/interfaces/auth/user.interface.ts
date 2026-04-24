import type { User } from "@supabase/supabase-js";

export interface AppUser extends User {
  isAdmin: boolean;
}
