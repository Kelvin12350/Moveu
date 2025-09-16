import Navbar from "../components/Navbar";
import VideoFeed from "../components/VideoFeed";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-4">
        <VideoFeed />
      </main>
    </div>
  );
}
