"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Example videos (replace with Cloudinary URLs)
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ];

  const handleSwipe = (direction) => {
    if (direction === "up" && activeIndex < videos.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
    if (direction === "down" && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          className="w-full h-screen absolute top-0 left-0"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.y < -100 && velocity.y < -300) {
              handleSwipe("up");
            } else if (offset.y > 100 && velocity.y > 300) {
              handleSwipe("down");
            }
          }}
        >
          <VideoCard
            src={videos[activeIndex]}
            isActive={true}
            isMuted={isMuted}
          />
        </motion.div>
      </AnimatePresence>

      {/* 🔊 Floating mute/unmute button */}
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className="absolute bottom-20 right-6 bg-black bg-opacity-50 text-white text-lg px-4 py-2 rounded-full shadow-lg z-50"
      >
        {isMuted ? "🔇 Mute" : "🔊 Sound"}
      </button>
    </div>
  );
}
