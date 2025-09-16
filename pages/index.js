import Navbar from "../components/Navbar";
import VideoFeed from "../components/VideoFeed";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <VideoFeed />
    </div>
  );
}
