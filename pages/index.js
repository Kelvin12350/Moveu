import Head from 'next/head'
import VideoFeed from '../components/VideoFeed'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TikTok Clone</title>
        <meta name="description" content="TikTok Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Video Feed */}
      <VideoFeed />
    </div>
  )
}
