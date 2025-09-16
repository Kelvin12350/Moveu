export default function VideoCard({ url, title }) {
  return (
    <div className="video-container">
      <video
        className="video-player"
        src={url}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="video-title">{title}</div>
    </div>
  );
}
