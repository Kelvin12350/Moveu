// pages/api/videos.js
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Example: replace with your DB fetch
      const videos = [
        // Example static data while testing
        {
          id: 1,
          title: "Sample Video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ];

      res.status(200).json(videos || []); // always return an array
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(200).json([]); // fallback empty array
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
