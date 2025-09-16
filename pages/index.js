import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);
  const touchStartY = useRef(0);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data.resources || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }
    fetchVideos();
  }, []);

  // Scroll on desktop
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [videos.length]);

  // Swipe on mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY > 50) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0)); // swipe down
      } else if (deltaY < -50) {
        setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1)); // swipe up
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [videos.length]);

  // Snap + play only current video
  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight * currentIndex,
      behavior: "smooth",
    });

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const toggleMute = () => {
    setMuted((prev) => !prev);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !video.muted;
      }
    });
  };

  return (
    <div className="app-container">
      {videos.map((video, index) => (
        <div key={video.public_id} className="video-page">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.secure_url}
            muted={muted}
            loop
            playsInline
            className="video-player"
          />
        </div>
      ))}

      {/* Mute/Unmute button */}
      <button className="mute-button" onClick={toggleMute}>
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
    }
