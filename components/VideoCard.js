import { useRef, useEffect, useState } from "react";

export default function VideoCard({ src, isActive }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

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
    <div className="relative h-full w-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      {/* Mute / Unmute button stays in corner */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
