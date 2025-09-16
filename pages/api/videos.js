let videos = [
  {
    id: 1,
    title: "Demo Video",
    url: "https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4",
  },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const newVideo = {
      id: videos.length + 1,
      title: "User Upload",
      url,
    };
    videos.push(newVideo);
    return res.status(200).json(newVideo);
  }

  res.status(200).json(videos);
}
