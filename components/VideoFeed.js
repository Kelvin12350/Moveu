import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos"); // calls our API route
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading videos...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        No videos found.
      </div>
    );
  }

  return (
    <div className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll bg-black">
      {videos.map((src, idx) => (
        <div key={idx} className="snap-start h-screen w-screen">
          <VideoCard src={src} />
        </div>
      ))}
    </div>
  );
}
