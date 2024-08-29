'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const IframeWithSkeleton = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const iframe = document.getElementById(
      'languages-youtube-iframe'
    ) as HTMLIFrameElement
    if (iframe) {
      const handleIframeLoad = () => {
        setIframeLoaded(true)
      }

      iframe.addEventListener('load', handleIframeLoad)

      return () => {
        iframe.removeEventListener('load', handleIframeLoad)
      }
    }
  }, [])

  return (
    <>
      {!iframeLoaded && (
        <Skeleton className="w-full max-w-2xl h-auto aspect-video" />
      )}
      <iframe
        id="languages-youtube-iframe"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`w-full max-w-2xl h-auto aspect-video rounded-[6px] ${iframeLoaded ? '' : 'hidden'}`}
      ></iframe>
    </>
  )
}

export const Languages = () => {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ') // Default video ID (Rick Roll)

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="w-1/3">
          <div className="border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 p-4">Your Niche</h2>
            <div className="relative p-4">
              <input
                type="text"
                placeholder="Enter your video niche 📷..."
                className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 flex justify-center">
          <span className="text-4xl">→</span>
        </div>
        <div className="w-1/3">
          <h2 className="text-5xl font-bold">Full Script</h2>
          <span className="text-lg mt-2 block">
            Generate a complete Script In Less than
            <span
              className="text-xl underline cursor-pointer pl-1"
              onClick={() => {
                window.location.href = '/Script-Youtube-Video'
              }}
            >
              10 Seconds.
            </span>
          </span>
        </div>
      </div>
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Example:</h3>
        <div className="flex justify-center">
          <IframeWithSkeleton />
        </div>
      </div>
    </div>
  )
}
