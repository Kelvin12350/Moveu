import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const videos = [
    { id: 1, src: "/sample.mp4", title: "First Video" },
    { id: 2, src: "/sample2.mp4", title: "Second Video" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
