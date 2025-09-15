// pages/index.js
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import VideoCard from '../components/VideoCard'

export default function Home() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Supabase error', error)
        } else if (mounted && data) {
          setVideos(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return <div style={{ color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
  }

  if (!videos || videos.length === 0) {
    return <div style={{ color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No videos yet</div>
  }

  return (
    <div className="feed">
      {videos.map((v) => (
        <section key={v.id} className="snap-item">
          <VideoCard video={v} />
        </section>
      ))}
    </div>
  )
}
