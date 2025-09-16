import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a video first!");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tiktok_upload"); // your unsigned preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ds9cmu7sa/video/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setVideoUrl(data.secure_url);

    // save to our fake DB (/api/videos)
    await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.secure_url }),
    });

    setUploading(false);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded Video:</h3>
          <video src={videoUrl} controls width="300" />
        </div>
      )}
    </div>
  );
        }
