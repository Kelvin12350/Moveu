import { useEffect, useState } from "react";

export default function Home() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch("/api/media");
        const data = await res.json();
        setMedia(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading videos...
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        No media found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {media.map((item) => (
        <div key={item.public_id} className="w-full">
          {item.resource_type === "video" ? (
            <video
              src={item.secure_url}
              controls
              loop
              className="w-full rounded-lg"
            />
          ) : (
            <img
              src={item.secure_url}
              alt={item.public_id}
              className="w-full rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
      }
