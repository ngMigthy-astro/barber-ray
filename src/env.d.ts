/// <reference types="astro/client" />
import type { AppUser } from "./interfaces/auth/user.interface";

declare global {
  namespace App {
    interface Locals {
      user: AppUser | null;
    }
  }
}
