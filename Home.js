import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setVideos(data || []);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 } // must be 80% visible to play
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

  if (loading) {
    return <p className="text-center mt-10">Loading videos...</p>;
  }

  return (
    <div className="feed">
      <div className="snap-list">
        {videos.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No videos uploaded yet.
          </p>
        ) : (
          videos.map((video, index) => (
            <div key={video.id} className="snap-item">
              <VideoCard
                video={video}
                videoRef={(el) => (videoRefs.current[index] = el)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
                      }
