import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react"; // mute/unmute icons

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // prevents autoplay block errors
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover" // fills entire screen
        autoPlay
        loop
        playsInline
        muted={isMuted}
      />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-20 right-5 p-3 bg-black/50 rounded-full text-white"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
