import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all videos from your Cloudinary account
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/video/upload?max_results=20`,
          {
            headers: {
              Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET)}`
            }
          }
        );

        const data = await res.json();
        if (data.resources) {
          setVideos(data.resources);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">🎬 Video Feed</h1>

      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos uploaded yet. Go to /upload to add one.</p>
      ) : (
        <div className="space-y-6 w-full max-w-[600px]">
          {videos.map((video) => (
            <div key={video.public_id} className="rounded-lg overflow-hidden shadow-md">
              <video
                src={video.secure_url}
                controls
                autoPlay
                loop
                muted
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
