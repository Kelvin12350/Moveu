import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ videos }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // Find which video is closest to full screen
      const newIndex = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(newIndex);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {videos.map((video, index) => (
        <div key={video.id} className="snap-start h-screen w-full">
          <VideoCard video={video} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
