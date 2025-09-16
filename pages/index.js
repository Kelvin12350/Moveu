import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="app">
      {videos.map((video) => (
        <div className="video-container" key={video.id}>
          <video
            className="video-player"
            src={video.url}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="video-title">{video.title}</div>
        </div>
      ))}
    </div>
  );
}
