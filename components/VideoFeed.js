import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Example video list (replace with Cloudinary URLs later)
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ];

  // Detect scroll to switch active video
  useEffect(() => {
    const handleScroll = () => {
      const index = Math.round(window.scrollY / window.innerHeight);
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll">
      {videos.map((src, index) => (
        <div key={index} className="snap-start h-screen">
          <VideoCard src={src} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
