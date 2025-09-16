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
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-scroll">
      {videos.map((video, index) => (
        <div key={index} className="snap-start">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}
