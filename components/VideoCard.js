import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import styles from '../styles/VideoFeed.module.css'

export default function VideoFeed() {
  const [videos, setVideos] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    const { data, error } = await supabase.from('videos').select('*')
    if (error) {
      console.error('Error fetching videos:', error)
    } else {
      setVideos(data)
    }
  }

  // Auto-play videos when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting) {
            video.play()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.8 }
    )

    const videoElements = containerRef.current?.querySelectorAll('video') || []
    videoElements.forEach((video) => observer.observe(video))

    return () => {
      videoElements.forEach((video) => observer.unobserve(video))
    }
  }, [videos])

  return (
    <div ref={containerRef} className={styles.feed}>
      {videos.map((video) => (
        <div key={video.id} className={styles.videoWrapper}>
          <video
            src={video.url}
            className={styles.video}
            loop
            muted
            playsInline
          />
          <div className={styles.caption}>
            <h3>{video.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
  }
