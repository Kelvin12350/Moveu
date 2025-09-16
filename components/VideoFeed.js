import React, { useState } from "react";
import VideoCard from "./VideoCard";

const videos = [
  "https://res.cloudinary.com/demo/video/upload/w_800,h_1200,c_fill/sample.mp4",
  "https://res.cloudinary.com/demo/video/upload/w_800,h_1200,c_fill/dog.mp4",
  "https://res.cloudinary.com/demo/video/upload/w_800,h_1200,c_fill/cat.mp4",
];

export default function VideoFeed() {
  const [current, setCurrent] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "up" && current < videos.length - 1) {
      setCurrent(current + 1);
    } else if (direction === "down" && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div
      className="w-full h-screen overflow-hidden bg-black"
      onWheel={(e) => {
        if (e.deltaY > 0) handleSwipe("up");
        else handleSwipe("down");
      }}
      onTouchStart={(e) => (this.touchStartY = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        const endY = e.changedTouches[0].clientY;
        if (this.touchStartY - endY > 50) handleSwipe("up");
        if (endY - this.touchStartY > 50) handleSwipe("down");
      }}
    >
      <VideoCard src={videos[current]} />
    </div>
  );
}
