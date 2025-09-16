// components/VideoCard.js
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.75 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={video.secure_url}
        className="w-full h-full object-contain"
        loop
        playsInline
        muted={isMuted}
      />
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-20 left-5 bg-black/50 p-3 rounded-full text-white"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      {/* Heart Icon */}
      <button className="absolute bottom-20 right-5 bg-black/50 p-3 rounded-full text-white">
        <Heart size={24} />
      </button>
    </div>
  );
          }
