import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from("videos").select("*");
      if (error) console.error(error);
      else setVideos(data);
    };

    fetchVideos();
  }, []);

  // Pause videos that are not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {}); // Try autoplay
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 } // play only if 70% visible
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="h-screen w-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="h-screen w-screen flex items-center justify-center snap-start relative"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={video.url}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay Title */}
          <div className="absolute bottom-16 left-4 text-white">
            <h2 className="text-xl font-bold">{video.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
    }
