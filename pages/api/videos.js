import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.search
      .expression("resource_type:video") // fetch only videos
      .sort_by("created_at", "desc")
      .max_results(50) // adjust how many videos you want
      .execute();

    const videos = result.resources.map((file) => file.secure_url);
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
