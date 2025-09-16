// /components/VideoCard.js
import { useRef, useState } from "react";

export default function VideoCard({ url }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={url}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="video-player"
      />
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <style jsx>{`
        .video-card {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background: black;
        }
        .video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mute-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
