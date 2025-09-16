// /pages/index.js
import dynamic from "next/dynamic";

const VideoFeed = dynamic(() => import("../components/VideoFeed"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <VideoFeed />
    </div>
  );
}
