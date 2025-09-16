import { useEffect, useRef, useState } from "react";

export default function VideoCard({ video, isActive }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showPause, setShowPause] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowPause(true);
      setTimeout(() => setShowPause(false), 1200); // hide after 1.2s
    } else {
      videoRef.current.pause();
      setShowPause(true);
      setTimeout(() => setShowPause(false), 1200);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      />

      {/* Pause Icon (auto hides after delay) */}
      {showPause && (
        <div className="absolute text-white text-6xl">
          ⏸
        </div>
      )}

      {/* Mute/Unmute Button (always visible) */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-20 right-5 bg-black bg-opacity-50 p-3 rounded-full text-white text-xl"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
