// /components/VideoFeed.js
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
        console.error("Error fetching videos:", err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="video-feed">
      {videos.map((video) => (
        <VideoCard key={video.id} url={video.url} />
      ))}

      <style jsx>{`
        .video-feed {
          width: 100%;
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }
        .video-feed > div {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
}
