import { useState } from "react";

export default function Upload() {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) return alert("Please select a video first!");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setUploadedUrl(data.secure_url);
      setUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Uploaded Video:</h2>
          <video
            src={uploadedUrl}
            controls
            autoPlay
            loop
            muted
            className="w-[300px] md:w-[500px] mt-4 rounded-lg"
          />
        </div>
      )}
    </div>
  );
        }
