import { useState } from 'react'

export default function Home() {
  const [videos] = useState([
    {
      id: 1,
      title: 'First Cloudinary Video',
      url: 'https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4',
    },
    {
      id: 2,
      title: 'Second Video',
      url: 'https://res.cloudinary.com/ds9cmu7sa/video/upload/v1757988413/c5845c1d50fc71193aef97eff1c4f66d_tk2cpp.mp4',
    },
  ])

  return (
    <div className="feed">
      {videos.map(video => (
        <div key={video.id} className="video-container">
          <video src={video.url} controls loop playsInline />
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  )
}
