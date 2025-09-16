import { useEffect, useState } from "react";

export default function Home() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        // Change "videos" to the tag/folder you used in Cloudinary
        const res = await fetch(
          `https://res.cloudinary.com/${cloudName}/image/list/videos.json`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch media");
        }

        const data = await res.json();

        // Cloudinary returns resources in "resources"
        setMedia(data.resources || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
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
          {item.format === "mp4" || item.resource_type === "video" ? (
            <video
              src={item.secure_url}
              controls
              autoPlay={false}
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
