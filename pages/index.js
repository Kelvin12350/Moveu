import Head from 'next/head'
import VideoFeed from '../components/VideoFeed'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TikTok Clone</title>
        <meta name="description" content="TikTok Clone built with Next.js and Supabase" />
      </Head>

      <main className="app">
        <VideoFeed />
      </main>
    </div>
  )
}
