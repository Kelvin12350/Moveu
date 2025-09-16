import { useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState(0);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.url}
        muted={isMuted}
        loop
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Right side icons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 text-white">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center hover:scale-110 transition"
        >
          <Heart className="w-8 h-8" />
          <span className="text-sm">{likes}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center hover:scale-110 transition">
          <MessageCircle className="w-8 h-8" />
          <span className="text-sm">0</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center hover:scale-110 transition">
          <Share2 className="w-8 h-8" />
          <span className="text-sm">0</span>
        </button>
      </div>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 left-6 bg-black bg-opacity-50 p-2 rounded-full text-white"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
          }
