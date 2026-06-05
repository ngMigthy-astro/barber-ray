export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url?: string | null;
  created_at?: string;
}

export interface AllowedAdmin {
  id: string;
  email: string;
  created_at?: string;
}

// Interfaz para representar un usuario combinado en la UI con su estado de rol
export interface ManagedUser extends UserProfile {
  isAdmin: boolean;
}
