import { useEffect, useRef, useState } from "react";

export default function VideoCard({ src, isActive }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted={muted}
        loop
      />
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-20 right-5 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
