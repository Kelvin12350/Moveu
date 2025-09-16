import VideoCard from '../components/VideoCard';

export default function Home() {
  const videos = [
    {
      id: 1,
      url: '/VID-20250819-WA0580.mp4',
      title: 'My First TikTok Clone Video',
    },
    {
      id: 2,
      url: '/VID-20250819-WA0581.mp4',
      title: 'Another cool video',
    },
  ];

  return (
    <div className="app">
      {videos.map((video) => (
        <VideoCard key={video.id} url={video.url} title={video.title} />
      ))}
    </div>
  );
}
