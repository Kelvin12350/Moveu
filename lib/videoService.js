import { supabase } from "./supabaseClient";

// Function to upload video and save record in DB
export async function uploadVideo(file, title, description) {
  try {
    // 1. Upload video to Supabase Storage
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from("videos")
      .upload(`public/${file.name}`, file);

    if (storageError) throw storageError;

    const videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/public/${file.name}`;

    // 2. Insert video record into database
    const { data: dbData, error: dbError } = await supabase
      .from("videos")
      .insert([
        {
          title: title,
          description: description,
          url: videoUrl,
          filename: file.name,
        },
      ])
      .select();

    if (dbError) throw dbError;

    return { success: true, video: dbData[0] };
  } catch (err) {
    console.error("Upload failed:", err.message);
    return { success: false, error: err.message };
  }
      }
