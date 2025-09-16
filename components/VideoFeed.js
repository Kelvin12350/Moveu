import { useEffect, useState, useRef } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // 🔑 Replace with your actual Cloudinary cloud name + folder
        const res = await fetch(
          "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/list/moveu.json"
        );
        const data = await res.json();
        setVideos(data.resources || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  // Auto play only the video in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = container.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, [videos]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
    >
      {videos.map((video, i) => (
        <div key={i} className="h-screen w-full snap-start">
          <VideoCard src={video.secure_url} />
        </div>
      ))}
    </div>
  );
        }
