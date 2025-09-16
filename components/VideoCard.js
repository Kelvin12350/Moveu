// components/VideoCard.js
import React, { useRef, useState } from "react";
import { Volume2, VolumeX, Heart } from "lucide-react"; // icons

const VideoCard = ({ src }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        muted={muted}
      />

      {/* Buttons */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-4">
        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          className="bg-black/50 text-white p-3 rounded-full"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        {/* Like */}
        <button
          onClick={toggleLike}
          className={`p-3 rounded-full ${
            liked ? "bg-red-600 text-white" : "bg-black/50 text-white"
          }`}
        >
          <Heart size={24} fill={liked ? "white" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
