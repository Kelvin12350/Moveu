import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.8 } // 80% visible = considered active
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full snap-start">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
      />

      {/* Mute/Unmute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-5 left-5 p-2 rounded-full bg-black/40 text-white"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
