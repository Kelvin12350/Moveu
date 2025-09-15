import { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleUpload() {
    if (!file) return alert("Please choose a video file");

    const filename = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(filename, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("videos")
      .getPublicUrl(filename);

    const { error: insertError } = await supabase.from("videos").insert([
      {
        title,
        description,
        url: publicUrl.publicUrl,
        filename,
      },
    ]);

    if (insertError) {
      alert("Database insert failed: " + insertError.message);
      return;
    }

    alert("Video uploaded successfully 🎉");
    setFile(null);
    setTitle("");
    setDescription("");
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>📤 Upload a Video</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>
  );
                    }
