// pages/api/videos.js
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, url, thumbnail")
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
