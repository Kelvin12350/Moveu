export default function VideoCard({ video }) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-md p-4 mb-4">
      <video src={video.url} controls className="w-full rounded-lg" />
      <div className="flex justify-between items-center mt-2">
        <p className="text-white">{video.title}</p>
      </div>
    </div>
  );
}
