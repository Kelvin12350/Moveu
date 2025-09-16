import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/video`,
          {
            params: { max_results: 5 },
            auth: {
              username: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              password: process.env.CLOUDINARY_API_SECRET,
            },
          }
        );
        setVideos(res.data.resources);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  if (!videos || videos.length === 0) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        No videos found
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {videos.map((video) => (
        <VideoCard key={video.asset_id} video={video} />
      ))}
    </div>
  );
      }
