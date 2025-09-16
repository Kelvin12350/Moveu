import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'video',
      type: 'upload',
      max_results: 30,
    });

    res.status(200).json(result.resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
