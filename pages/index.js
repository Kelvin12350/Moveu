import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const res = await axios.get(
          `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
          {
            auth: {
              username: apiKey,
              password: apiSecret,
            },
          }
        );

        const videoList = res.data.resources.map((v) => v.secure_url);
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <VideoCard key={index} src={video} />
        ))
      ) : (
        <p className="text-white">Loading videos...</p>
      )}
    </div>
  );
                   }
