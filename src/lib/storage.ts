import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Sube un archivo al bucket de Supabase y devuelve su URL pública.
 * @param supabase - Instancia de Supabase Client
 * @param file - Archivo a subir (proveniente de un FormData)
 * @param folder - Carpeta dentro del bucket (ej. 'team', 'gallery', 'products')
 * @returns URL pública de la imagen o null si hubo error
 */
export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  // Generamos un nombre único para evitar colisiones
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("barber-media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }

  // Obtenemos la URL pública
  const { data: publicUrlData } = supabase.storage
    .from("barber-media")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
