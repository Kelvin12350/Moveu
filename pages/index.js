import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Auto play only one video per screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
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

  return (
    <div
      ref={containerRef}
      className="snap-y snap-mandatory h-screen overflow-scroll scrollbar-hide"
    >
      {videos.map((video, index) => (
        <div
          key={video.public_id}
          className="snap-start h-screen w-screen flex justify-center items-center bg-black relative"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.secure_url}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
          />
        </div>
      ))}
    </div>
  );
            }
