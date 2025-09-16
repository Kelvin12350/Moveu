import React, { useEffect, useState } from "react";
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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {videos.length > 0 ? (
        videos.map((url, idx) => (
          <div key={idx} className="snap-start h-screen">
            <VideoCard src={url} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-screen text-white">
          Loading videos...
        </div>
      )}
    </div>
  );
}
