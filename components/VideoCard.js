import React, { useRef, useEffect, useState } from "react";

/**
 * VideoCard
 * - Expects a `video` prop with a `url` field (video.url).
 * - Autoplays muted (so browsers allow autoplay).
 * - Shows a mute/unmute button (🔇 / 🔊) bottom-right.
 * - Toggling updates the actual video element `muted` property and updates UI.
 *
 * Place this file at: components/VideoCard.js
 */

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // ensure video plays and keeps muted state in sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Keep dom muted in sync with state (useful if other code toggles or when video changes)
    v.muted = isMuted;

    // Try to autoplay (some browsers block unless muted)
    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        // ignore autoplay errors (user gesture required on some devices)
      }
    };
    tryPlay();

    // cleanup: pause when unmounting
    return () => {
      try {
        v.pause();
      } catch (e) {}
    };
  }, [isMuted, video]);

  // Toggle mute/unmute handler
  const toggleMute = (e) => {
    // Prevent parent scroll handlers from triggering (if any)
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const newMuted = !v.muted;
    v.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Basic inline styles for button so it looks consistent without extra CSS
  const buttonStyles = {
    position: "absolute",
    right: "16px",
    bottom: "24px",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    zIndex: 30,
  };

  return (
    <div
      className="video-card relative w-full h-screen overflow-hidden bg-black"
      style={{ touchAction: "manipulation" }} // help mobile scrolling
    >
      <video
        ref={videoRef}
        src={video?.url || ""}
        // For mobile autoplay compatibility:
        autoPlay
        playsInline
        loop
        muted={isMuted}
        // styling: fill the screen like TikTok (cover)
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          backgroundColor: "black",
        }}
      />

      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        style={buttonStyles}
      >
        {isMuted ? "🔇" : "🔊"}{" "}
        <span style={{ fontSize: 14, marginLeft: 6 }}>
          {isMuted ? "Unmute" : "Mute"}
        </span>
      </button>
    </div>
  );
          }
