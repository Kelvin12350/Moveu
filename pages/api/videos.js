// pages/api/videos.js
export default async function handler(req, res) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/upload`;

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error: "Cloudinary fetch failed", details: error });
    }

    const data = await response.json();

    // Only return the video URLs
    const videos = data.resources.map((video) => video.secure_url);

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching Cloudinary videos:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
