// components/VideoCard.js
import { useRef, useState, useEffect } from "react";

export default function VideoCard({ url, isActive }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto play/pause when in view
  useEffect(() => {
    if (isActive) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Hide play/pause after 2s
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-black"
      onClick={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />

      {/* Play / Pause Button */}
      {showControls && (
        <button
          onClick={handleTogglePlay}
          className="absolute text-white text-6xl opacity-80"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
      )}

      {/* Mute / Unmute Button (top-right) */}
      <button
        onClick={handleToggleMute}
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
      }
