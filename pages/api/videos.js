import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { resources } = await cloudinary.search
        .expression("folder:moveu_media AND resource_type:video")
        .sort_by("created_at", "desc")
        .max_results(20)
        .execute();

      res.status(200).json(resources);
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
