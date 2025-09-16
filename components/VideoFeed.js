import { useEffect, useState, useRef } from "react";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [paused, setPaused] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/api/test-db");
      const data = await res.json();
      if (data.ok) setVideos(data.data || data.sampleVideos || []);
    }
    loadVideos();
  }, []);

  // Intersection Observer: play only the video in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setPaused((prev) => ({ ...prev, [video.dataset.index]: false }));
          } else {
            video.pause();
            setPaused((prev) => ({ ...prev, [video.dataset.index]: true }));
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // Tap to toggle play/pause
  const handleToggle = (i) => {
    const video = videoRefs.current[i];
    if (video.paused) {
      video.play();
      setPaused((prev) => ({ ...prev, [i]: false }));
    } else {
      video.pause();
      setPaused((prev) => ({ ...prev, [i]: true }));
    }
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {videos.map((video, i) => (
        <div
          key={i}
          className="h-screen w-full snap-start flex items-center justify-center bg-black relative"
        >
          <video
            ref={(el) => (videoRefs.current[i] = el)}
            src={video.url}
            loop
            playsInline
            data-index={i}
            className="h-full w-full object-cover"
            onClick={() => handleToggle(i)}
          />
          {/* Overlay Play Icon */}
          {paused[i] && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30"
              onClick={() => handleToggle(i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-20 h-20 opacity-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
        }
