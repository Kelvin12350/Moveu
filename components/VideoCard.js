import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get("/api/videos");
        setResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  if (!resources.length) {
    return <p className="text-center mt-10">No videos or images found in Cloudinary</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {resources.map((res) => (
        <VideoCard key={res.asset_id} resource={res} />
      ))}
    </div>
  );
}
