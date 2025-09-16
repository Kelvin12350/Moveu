import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { file } = req.body;

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: "moveu_media",
        resource_type: "auto",
      });

      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
