export default function VideoCard({ video, videoRef }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "black",
      }}
    >
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "white",
          textShadow: "0px 2px 5px rgba(0,0,0,0.7)",
        }}
      >
        <h2 style={{ margin: 0 }}>{video.title}</h2>
        <p style={{ margin: 0 }}>{video.description}</p>
      </div>
    </div>
  );
          }
