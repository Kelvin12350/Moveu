import VideoFeed from "../components/VideoFeed";

// Helper function to shuffle videos
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function Home({ videos }) {
  return (
    <div className="h-screen w-full">
      <VideoFeed videos={videos} />
    </div>
  );
}

// Static example (replace later with Supabase fetch)
export async function getServerSideProps() {
  const videos = shuffleArray([
    {
      id: 1,
      url: "https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/demo/video/upload/w_800,h_600,c_fill/elephants.mp4",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/demo/video/upload/w_800,h_600,c_fill/dog.mp4",
    },
  ]);

  return {
    props: {
      videos,
    },
  };
}
