import { useRef, useState, useEffect } from "react";

export default function VideoCard({ src, onPlay }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      if (onPlay) onPlay(videoRef.current);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    const handleEnded = () => setIsPlaying(false);

    if (videoEl) {
      videoEl.addEventListener("ended", handleEnded);
    }
    return () => {
      if (videoEl) {
        videoEl.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
      <video ref={videoRef} src={src} className="w-full rounded-lg" />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {isPlaying && (
        <button
          onClick={handlePause}
          className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded"
        >
          Pause
        </button>
      )}
    </div>
  );
    }
