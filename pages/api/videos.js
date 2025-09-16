// pages/api/videos.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:video")
      .sort_by("created_at", "desc")
      .max_results(20)
      .execute();

    const videos = resources.map((file) => ({
      id: file.asset_id,
      url: file.secure_url,
      thumbnail: file.secure_url.replace(".mp4", ".jpg"), // crude thumbnail
    }));

    res.status(200).json(videos);
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
