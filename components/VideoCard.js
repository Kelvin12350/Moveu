import { useRef, useState } from "react";

export default function VideoCard({ videoUrl }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-20 right-5 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
