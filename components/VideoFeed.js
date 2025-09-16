import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ videos }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const feedRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return;
      const { scrollTop, clientHeight } = feedRef.current;
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== currentVideo) {
        setCurrentVideo(newIndex);
      }
    };

    const ref = feedRef.current;
    ref.addEventListener("scroll", handleScroll);

    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [currentVideo]);

  return (
    <div
      ref={feedRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {videos.map((video, index) => (
        <div key={video.id || index} className="snap-start h-screen">
          <VideoCard
            url={video.url}
            playing={index === currentVideo}
          />
        </div>
      ))}
    </div>
  );
}
