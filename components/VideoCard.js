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
    <div className="relative w-full h-screen bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.secure_url}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
      />

      {/* Controls */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
        <button
          onClick={handleLike}
          className="text-white flex flex-col items-center"
        >
          <Heart className="w-8 h-8" />
          <span>{likes}</span>
        </button>
        <button className="text-white">
          <MessageCircle className="w-8 h-8" />
        </button>
        <button className="text-white">
          <Share2 className="w-8 h-8" />
        </button>
        <button onClick={toggleMute} className="text-white">
          {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
        </button>
      </div>
    </div>
  );
            }
