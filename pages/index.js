import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setUploading(true);
      try {
        const res = await axios.post("/api/upload", { file: reader.result });
        setVideos((prev) => [...prev, { url: res.data.url }]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
      setUploading(false);
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Moveu</h1>

      <label className="px-4 py-2 bg-blue-600 rounded-lg cursor-pointer">
        {uploading ? "Uploading..." : "Upload"}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      <div className="mt-6 space-y-6">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center"
          >
            <video
              src={video.url}
              controls
              className="rounded-lg w-full max-w-md"
            />
            <p className="mt-2">Video {idx + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
    }
