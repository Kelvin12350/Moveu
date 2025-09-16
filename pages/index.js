import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <div className="feed">
      {videos.map((video) => (
        <div key={video.id} className="video-container">
          <video
            src={video.url}
            autoPlay
            loop
            muted
            playsInline
            className="video-element"
          />
          <div className="overlay">
            <h2>{video.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
              }
