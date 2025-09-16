import VideoCard from "./VideoCard";

const videos = [
  { id: 1, url: "https://res.cloudinary.com/demo/video/upload/dog.mp4" },
  { id: 2, url: "https://res.cloudinary.com/demo/video/upload/cat.mp4" },
  { id: 3, url: "https://res.cloudinary.com/demo/video/upload/bird.mp4" },
];

export default function VideoFeed() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
  }
