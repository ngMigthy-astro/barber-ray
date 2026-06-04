async function uploadImage(supabase, file, folder) {
  if (!file || file.size === 0) return null;
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;
  const { error } = await supabase.storage.from("barber-media").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false
  });
  if (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }
  const { data: publicUrlData } = supabase.storage.from("barber-media").getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

export { uploadImage as u };
