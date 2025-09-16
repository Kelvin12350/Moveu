import { useRef, useState, useEffect } from "react";

const videos = [
  {
    id: 1,
    url: "https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/demo/video/upload/w_800,h_1200,c_fill/elephants.mp4"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/demo/video/upload/w_800,h_1200,c_fill/dog.mp4"
  }
];

export default function Home() {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [muted, setMuted] = useState(true);

  // Handle scroll - only play the visible video
  const handleScroll = () => {
    const newIndex = Math.round(window.scrollY / window.innerHeight);
    setCurrentVideo(newIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideo]);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="h-screen w-screen flex items-center justify-center bg-black snap-start relative"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.url}
            className="h-full w-full object-cover"
            muted={muted}
            playsInline
            loop
          />
        </div>
      ))}

      {/* Mute/Unmute button */}
      <button
        onClick={() => setMuted(!muted)}
        className="fixed bottom-20 right-6 bg-white text-black px-4 py-2 rounded-full shadow-lg"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
            }
