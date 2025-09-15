import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from("videos").select("*");
      if (error) console.error(error);
      else setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="h-screen w-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video) => (
        <div
          key={video.id}
          className="h-screen w-full flex flex-col items-center justify-center snap-start relative"
        >
          {/* Video */}
          <video
            src={video.url}
            className="h-full w-full object-cover"
            controls={false}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay text */}
          <div className="absolute bottom-16 left-4 text-white">
            <h2 className="text-xl font-bold">{video.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
