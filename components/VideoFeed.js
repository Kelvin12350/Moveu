// components/VideoFeed.js
import { useEffect, useState } from "react";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/api/test-db");
      const data = await res.json();
      if (data.ok) setVideos(data.data || data.sampleVideos || []);
    }
    loadVideos();
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {videos.map((video, i) => (
        <div
          key={i}
          className="h-screen w-full snap-start flex items-center justify-center bg-black"
        >
          <video
            src={video.url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          {/* 🔴 Removed overlay text/watermark from code */}
        </div>
      ))}
    </div>
  );
              }
