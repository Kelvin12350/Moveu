import React, { useRef, useState, useEffect } from "react";

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        muted={isMuted}
      />

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-lg"
      >
        {isMuted ? (
          <span role="img" aria-label="muted">
            🔇
          </span>
        ) : (
          <span role="img" aria-label="unmuted">
            🔊
          </span>
        )}
      </button>
    </div>
  );
          }
