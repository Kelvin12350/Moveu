import axios from "axios";
import { useEffect, useState } from "react";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await axios.get("/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="grid gap-4">
      {videos.map((video) => (
        <video
          key={video.id}
          src={video.url}
          controls
          className="w-full rounded-lg shadow"
        />
      ))}
    </div>
  );
}
