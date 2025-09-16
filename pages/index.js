import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Moveu</h1>

      <div className="flex flex-col space-y-6">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="bg-gray-800 p-4 rounded-2xl shadow-lg"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              controls
              className="w-full rounded-lg"
              onPlay={() => handlePlay(index)}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-2">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
                }
