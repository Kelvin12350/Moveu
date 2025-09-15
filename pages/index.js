import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from("videos").select("*");
      if (error) {
        console.error("Error fetching videos:", error);
      } else {
        setVideos(data || []);
      }
    };
    fetchVideos();
  }, []);

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
    <div className="w-screen h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="w-screen h-screen flex items-center justify-center snap-start"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute bottom-10 left-5 text-xl font-bold">
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
              }
