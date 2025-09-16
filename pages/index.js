import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Example static Cloudinary links, replace with API later
    setVideos([
      "https://res.cloudinary.com/demo/video/upload/w_720,c_fill/sample.mp4",
      "https://res.cloudinary.com/demo/video/upload/w_720,c_fill/dog.mp4"
    ]);
  }, []);

  const handleScroll = () => {
    const container = document.querySelector(".container");
    const { scrollTop, clientHeight } = container;
    const index = Math.round(scrollTop / clientHeight);

    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  };

  useEffect(() => {
    const container = document.querySelector(".container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {videos.map((video, idx) => (
        <div key={idx} className="video-wrapper">
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={video}
            muted
            playsInline
            loop
          />
        </div>
      ))}
    </div>
  );
                              }
