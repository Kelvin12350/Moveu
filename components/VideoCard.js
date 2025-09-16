import { useRef, useState, useEffect } from "react";

export default function VideoCard({ src, isActive }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Play/pause depending on active status
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

  // Toggle play/pause
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

  // Show button on tap, auto-hide after 2s
  const handleTap = () => {
    setShowControls(true);
    setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-black"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted
      />

      {showControls && (
        <button
          onClick={togglePlayPause}
          className="absolute text-white text-6xl bg-black bg-opacity-40 p-4 rounded-full"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      )}
    </div>
  );
          }
