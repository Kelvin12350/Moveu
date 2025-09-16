import React, { useRef, useState } from "react";

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="w-full h-full object-cover"
      />

      {/* Mute / Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-md shadow-lg"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
