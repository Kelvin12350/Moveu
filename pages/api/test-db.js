// pages/api/test-db.js
export default function handler(req, res) {
  // Simple placeholder API — returns sample data so your build won't fail
  res.status(200).json({
    ok: true,
    message: "Test API working (no supabase) — replace with real DB later",
    now: new Date().toISOString(),
    sampleVideos: [
      {
        id: "sample-1",
        title: "My First TikTok Clone Video",
        url: "https://res.cloudinary.com/your-cloud/video/upload/v000000/sample1.mp4",
        description: "Auto uploaded video"
      }
    ]
  });
}
