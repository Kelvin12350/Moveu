import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]); // default empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setVideos(data || []); // always set an array
      } catch (err) {
        console.error("Error fetching videos:", err.message);
        setVideos([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold my-6">My TikTok App</h1>
      <div className="w-full max-w-md space-y-6">
        {videos.length === 0 ? (
          <p className="text-center text-gray-400">No videos uploaded yet.</p>
        ) : (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        )}
      </div>
    </div>
  );
    }
