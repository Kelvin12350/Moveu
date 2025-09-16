// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/video`,
          {
            auth: {
              username: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              password: process.env.CLOUDINARY_API_SECRET,
            },
          }
        );
        setVideos(res.data.resources || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <h1 style={{ color: "white", textAlign: "center" }}>Loading videos...</h1>;
  }

  if (!videos.length) {
    return <h1 style={{ color: "white", textAlign: "center" }}>No videos found in Cloudinary</h1>;
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((video, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video
            src={video.secure_url}
            controls
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
      }
