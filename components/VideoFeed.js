"use client";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section");
      let newIndex = activeIndex;

      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          newIndex = i;
        }
      });

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <div className="scroll-container">
      {videos.map((video, i) => (
        <div key={i} className="scroll-section">
          <VideoCard src={video.url} isActive={i === activeIndex} />
        </div>
      ))}
    </div>
  );
}
