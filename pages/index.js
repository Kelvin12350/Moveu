// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    }
    fetchVideos();
  }, []);

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1>No videos uploaded yet.</h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video) => (
        <div
          key={video.id}
          className="h-screen w-screen flex flex-col items-center justify-center snap-start relative"
        >
          <video
            src={video.url}
            controls
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-20 left-5 text-white">
            <h2 className="text-xl font-bold">{video.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
              }
