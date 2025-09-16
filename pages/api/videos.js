export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ error: "Missing Cloudinary credentials" });
    }

    // Fetch resources from Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
        },
      }
    );

    const data = await response.json();

    if (!data.resources) {
      return res.status(500).json({ error: "No resources found" });
    }

    // Extract secure URLs only
    const videoUrls = data.resources.map((file) => file.secure_url);

    res.status(200).json(videoUrls);
  } catch (error) {
    console.error("Cloudinary API error:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
