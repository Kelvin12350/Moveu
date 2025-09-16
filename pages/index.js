import VideoFeed from "../components/VideoFeed";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">
      {/* ✅ Navbar */}
      <header className="w-full h-14 flex items-center justify-between px-5 bg-black/80 border-b border-gray-800">
        <h1 className="text-xl font-bold">My Video App</h1>
        <nav className="flex gap-4 text-sm">
          <button className="hover:text-red-500">Home</button>
          <button className="hover:text-red-500">Explore</button>
          <button className="hover:text-red-500">Profile</button>
        </nav>
      </header>

      {/* ✅ Main feed */}
      <main className="flex-1">
        <VideoFeed />
      </main>
    </div>
  );
        }
