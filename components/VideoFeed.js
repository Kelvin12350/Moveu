import VideoCard from "./VideoCard";

const sampleVideos = [
  {
    title: "First Video",
    url: "https://res.cloudinary.com/demo/video/upload/w_600,h_400,c_fill/sample.mp4"
  },
  {
    title: "Second Video",
    url: "https://res.cloudinary.com/demo/video/upload/w_600,h_400,c_fill/dog.mp4"
  }
];

export default function VideoFeed() {
  return (
    <div className="p-4">
      {sampleVideos.map((video, idx) => (
        <VideoCard key={idx} video={video} />
      ))}
    </div>
  );
}
