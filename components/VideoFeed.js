// components/VideoFeed.js
import { useState, useEffect, useRef } from "react";

// helper to shuffle video order
const shuffle = (arr) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort(() => Math.random() - 0.5);
};

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const refs = useRef([]);

  // fetch videos from API and shuffle them
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(shuffle(data || [])); // shuffle once on load
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }
    loadVideos();
  }, []);

  // update index on scroll
  useEffect(() => {
    function onScroll() {
      const idx = Math.round(window.scrollY / window.innerHeight);
      setCurrentIndex(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // play/pause handling, keep only current video playing
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted;
      if (i === currentIndex) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [currentIndex, muted, videos]);

  const togglePlayPause = (i) => {
    const v = refs.current[i];
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  if (!videos.length) {
    return (
      <div className="feed-empty">
        <p>No videos found.</p>
      </div>
    );
  }

  return (
    <div className="feed">
      {/* mute/unmute stays fixed */}
      <button className="mute-btn" onClick={() => setMuted((m) => !m)}>
        {muted ? "🔈 Unmute" : "🔇 Mute"}
      </button>

      {videos.map((video, i) => (
        <section key={video.id ?? i} className="snap-item">
          <div
            className="video-wrapper"
            onClick={() => togglePlayPause(i)}
            role="button"
            tabIndex={0}
          >
            <video
              ref={(el) => (refs.current[i] = el)}
              src={video.url}
              className="video-full"
              playsInline
              loop
              muted={muted}
              preload="metadata"
            />
            <div className="video-meta">
              <h2>{video.title ?? "Untitled"}</h2>
              {video.description && <p>{video.description}</p>}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
      }
