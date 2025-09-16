export default function Home() {
  return (
    <div className="container">
      <video className="video-player" autoPlay loop muted playsInline>
        <source
          src="https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
