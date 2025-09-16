import { useEffect, useState, useRef } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.resources || []);
    }
    fetchVideos();
  }, []);

  // detect scroll to play only one video
  const handleScroll = () => {
    const container = containerRef.current;
    const cards = container.querySelectorAll("video");

    let middle = window.innerHeight / 2;
    cards.forEach((video) => {
      const rect = video.getBoundingClientRect();
      if (rect.top <= middle && rect.bottom >= middle) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videos]);

  return (
    <div
      ref={containerRef}
      className="snap-y snap-mandatory h-screen overflow-scroll"
    >
      {videos.map((video, index) => (
        <div key={index} className="snap-start h-screen">
          <VideoCard videoUrl={video.secure_url} />
        </div>
      ))}
    </div>
  );
            }
