"use client";
import { useRef, useEffect, useState } from "react";

export default function VideoCard({ src, isActive }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Mute / Unmute Button */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
          }
