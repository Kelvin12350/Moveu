import { useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlay = (videoEl) => {
    if (activeVideo && activeVideo !== videoEl) {
      activeVideo.pause();
    }
    setActiveVideo(videoEl);
  };

  return (
    <div className="space-y-6 p-6">
      <VideoCard
        src="https://res.cloudinary.com/demo/video/upload/w_600,c_fill/sample.mp4"
        onPlay={handlePlay}
      />
      <VideoCard
        src="https://res.cloudinary.com/demo/video/upload/w_600,c_fill/dog.mp4"
        onPlay={handlePlay}
      />
      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
          alt="Cloudinary Image"
          className="w-full"
        />
      </div>
    </div>
  );
}
