import React from "react";

export default function VideoCard({ video }) {
  return (
    <div className="video-container">
      <video
        className="video-player"
        src={video.url}
        controls
        loop
        autoPlay
        muted
      />
      <p className="video-caption">{video.title}</p>
    </div>
  );
}
