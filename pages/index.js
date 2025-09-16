// pages/index.js
import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <video
        src="https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-screen w-auto object-contain"
      />
    </div>
  );
}
