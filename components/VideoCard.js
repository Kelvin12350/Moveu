export default function VideoPlayer({ video }) {
  return (
    <div className="video-container">
      <video
        src={video.url}
        controls={false}
        autoPlay
        loop
        muted
        playsInline
        className="video-player"
      />
    </div>
  );
}
