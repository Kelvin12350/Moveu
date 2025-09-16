import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

export default function Home() {
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlay = (videoEl) => {
    if (activeVideo && activeVideo !== videoEl) {
      activeVideo.pause();
    }
    setActiveVideo(videoEl);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Example Video 1 */}
      <VideoPlayer
        src="https://res.cloudinary.com/demo/video/upload/w_600,c_fill/sample.mp4"
        onPlay={handlePlay}
      />

      {/* Example Video 2 */}
      <VideoPlayer
        src="https://res.cloudinary.com/demo/video/upload/w_600,c_fill/dog.mp4"
        onPlay={handlePlay}
      />

      {/* Example Image */}
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
