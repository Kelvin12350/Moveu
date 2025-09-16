import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get("/api/media");
        setMedia(res.data.resources);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {media.map((item) => (
        <div
          key={item.asset_id}
          className="h-screen w-screen flex items-center justify-center snap-start bg-black"
        >
          {item.resource_type === "video" ? (
            <video
              src={item.secure_url}
              controls
              autoPlay
              loop
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={item.secure_url}
              alt="media"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
                   }
