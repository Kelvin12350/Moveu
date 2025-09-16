export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      title: "Cloudinary Demo Video",
      url: "https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4",
      thumbnail: "https://img.youtube.com/vi/YE7VzlLtp-4/hqdefault.jpg"
    }
  ]);
}
