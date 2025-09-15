// components/VideoCard.js
import React, { useRef, useEffect, useState } from 'react'

export default function VideoCard({ video }) {
  const vidRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    // Ensure autoplay attempt
    v.muted = true
    v.play().catch(() => {
      // autoplay might fail — that's OK
    })
  }, [])

  function handleTap() {
    const v = vidRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
    // On first tap, unmute
    if (muted) {
      v.muted = false
      setMuted(false)
    }
  }

  const src = video?.url || video?.video_url || ''

  return (
    <div className="video-wrapper" onClick={handleTap} role="button" tabIndex={0}>
      <video
        ref={vidRef}
        src={src}
        className="video-full"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
      />
      <div className="video-meta">
        <h2 className="video-title">@{video?.title ?? 'Sample Video'}</h2>
        {video?.description ? <p className="video-desc">{video.description}</p> : null}
      </div>
    </div>
  )
    }
