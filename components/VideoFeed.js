// components/VideoFeed.js
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen w-full overflow-scroll">
      {videos.map((video) => (
        <div key={video.asset_id} className="snap-start">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}
