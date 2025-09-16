import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from("videos").select("*");
      if (error) {
        console.error("Error fetching videos:", error);
      } else {
        setVideos(data);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      {videos.map((video) => (
        <div key={video.id} className="w-full h-screen relative">
          <video
            src={video.url}
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute bottom-6 left-4 text-lg font-bold drop-shadow-lg">
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
              }
