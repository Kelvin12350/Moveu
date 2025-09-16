import React from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ videos }) {
  return (
    <div className="video-feed">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
  }
