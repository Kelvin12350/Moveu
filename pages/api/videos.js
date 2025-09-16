import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        auth: {
          username: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
        params: {
          expression: "resource_type:image OR resource_type:video",
          max_results: 50,
        },
      }
    );

    res.status(200).json(data.resources);
  } catch (error) {
    console.error("Error fetching Cloudinary resources:", error);
    res.status(500).json({ error: "Failed to load resources" });
  }
}
