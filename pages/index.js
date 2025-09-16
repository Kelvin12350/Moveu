import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Cloudinary API URL
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        // Build request
        const res = await axios.get(
          `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
          {
            auth: {
              username: apiKey,
              password: apiSecret,
            },
          }
        );

        // Only take video resources
        const videoList = res.data.resources.map((vid) => ({
          id: vid.asset_id,
          url: vid.secure_url,
        }));

        setVideos(videoList);
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="snap-start h-screen">
            <VideoCard url={video.url} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-screen text-white">
          No videos found.
        </div>
      )}
    </div>
  );
      }
