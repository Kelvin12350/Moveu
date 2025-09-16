import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoCard({ resource }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  if (resource.resource_type === "image") {
    return (
      <div className="w-full flex justify-center items-center bg-black rounded-xl">
        <img
          src={resource.secure_url}
          alt="Cloudinary Image"
          className="max-h-[600px] rounded-xl"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center items-center bg-black rounded-xl">
      <video
        ref={videoRef}
        src={resource.secure_url}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="max-h-[600px] rounded-xl"
      />
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          videoRef.current.muted = !videoRef.current.muted;
        }}
        className="absolute bottom-4 right-4 bg-white/70 rounded-full p-2"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
          }
