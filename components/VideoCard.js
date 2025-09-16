import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function VideoFeed() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    const { data, error } = await supabase.from('videos').select('*')
    if (error) {
      console.error(error)
    } else {
      setVideos(data)
    }
  }

  return (
    <div className="video-feed">
      {videos.map((video) => (
        <div key={video.id} className="video-container">
          <video
            src={video.url}
            className="video-player"
            autoPlay
            loop
            muted
            playsInline
          />
          <p className="video-caption">{video.title}</p>
        </div>
      ))}
    </div>
  )
}
