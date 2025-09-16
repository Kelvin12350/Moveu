import { useEffect, useRef, useState } from "react";

export default function VideoCard({ video, isActive }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />

      {/* Mute/Unmute Button (bottom-right) */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-16 right-5 bg-black bg-opacity-50 p-3 rounded-full text-white text-xl"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
