import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/media");
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollTop / window.innerHeight);
    setActiveIndex(index);
  };

  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      onScroll={handleScroll}
    >
      {videos.map((video, i) => (
        <div key={video.public_id} className="snap-start h-screen">
          <VideoCard src={video.secure_url} isActive={i === activeIndex} />
        </div>
      ))}
    </div>
  );
}
