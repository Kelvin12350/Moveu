import { useRef, useState, useEffect } from "react";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";

export default function VideoCard({ url, playing }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (playing) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [playing]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleTap = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 1500);
  };

  return (
    <div
      className="relative h-screen w-full bg-black flex items-center justify-center"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src={url}
        loop
        muted={muted}
        className="h-full w-full object-cover"
      />

      {/* Sidebar icons */}
      <div className="absolute right-4 top-1/3 flex flex-col space-y-6 text-white text-2xl">
        <FaHeart className="cursor-pointer" />
        <FaCommentDots className="cursor-pointer" />
        <FaShare className="cursor-pointer" />
      </div>

      {/* Play/Pause button (only shows on tap) */}
      {showControls && (
        <button
          onClick={handleTogglePlay}
          className="absolute text-white text-5xl"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      )}

      {/* Mute/Unmute button (always visible) */}
      <button
        onClick={handleToggleMute}
        className="absolute bottom-6 left-4 text-white text-2xl bg-black/40 p-2 rounded-full"
      >
        {muted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
      </button>
    </div>
  );
          }
