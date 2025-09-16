import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ videos }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const newIndex = Math.round(container.scrollTop / window.innerHeight);
        setActiveIndex(newIndex);
        container.scrollTo({
          top: newIndex * window.innerHeight,
          behavior: "smooth",
        });
      }, 120); // wait a bit after scrolling stops
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
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
