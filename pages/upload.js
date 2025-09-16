import { useState } from 'react'

export default function Upload() {
  const [file, setFile] = useState(null)

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file) return alert("Please select a video first.")
    alert("Video upload will be handled with Cloudinary later.")
  }

  return (
    <div className="upload-page">
      <h1>Upload Video</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
            }
