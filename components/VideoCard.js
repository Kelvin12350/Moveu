import { useRef, useState } from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        playsInline
        loop
        muted={muted}
      />

      {/* 🔈 Mute/Unmute */}
      <button
        onClick={toggleMute}
        className="absolute bottom-20 right-5 bg-black/50 p-3 rounded-full text-white"
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* ❤️ Like Icon (placeholder, no function yet) */}
      <div className="absolute bottom-36 right-5 flex flex-col items-center">
        <Heart size={32} className="text-white" />
      </div>
    </div>
  );
        }
