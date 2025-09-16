import { useRef, useState } from "react";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-64 object-cover"
        loop
      />
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-lg">{video.title}</h2>
        <button
          onClick={togglePlay}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
          }
