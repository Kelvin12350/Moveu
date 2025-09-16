import { useRef, useState, useEffect } from "react";

export default function VideoCard({ src, isActive, isMuted }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTap = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-black"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover pointer-events-none"
        loop
        playsInline
        controls={false}
      />

      {/* ▶️ / ❚❚ Play-Pause button */}
      <button
        onClick={togglePlayPause}
        className={`absolute text-white text-6xl bg-black bg-opacity-40 p-4 rounded-full transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>
    </div>
  );
}
