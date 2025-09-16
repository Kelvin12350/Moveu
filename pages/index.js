import { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <main className="app">
      <VideoFeed videos={videos} />
    </main>
  );
}
