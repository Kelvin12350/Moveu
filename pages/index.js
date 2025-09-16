import { useState } from "react";

export default function Home() {
  // List of online video URLs
  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://cdn.coverr.co/videos/coverr-a-lake-in-the-mountains-3740/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-sunrise-in-the-city-3125/1080p.mp4",
  ];

  const [current, setCurrent] = useState(0);

  // Handle scroll/swipe with mouse wheel
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      // scroll down → next video
      setCurrent((prev) => (prev + 1) % videos.length);
    } else {
      // scroll up → previous video
      setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="relative flex items-center justify-center h-screen w-screen bg-black overflow-hidden"
    >
      {/* Video */}
      <video
        key={videos[current]} // reload when video changes
        src={videos[current]}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Caption */}
      <div className="absolute bottom-5 left-5 text-white text-lg font-bold">
        Video {current + 1} / {videos.length}
      </div>
    </div>
  );
          }
