'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
    <div className="relative w-full aspect-video">
      {!iframeLoaded && <Skeleton className="w-full h-full" />}
      <iframe
        id="languages-youtube-iframe"
        src="https://www.youtube.com/embed/AZ8Pf1Wm_wg?si=7ceXjGHFqVLz4zoB"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`w-full h-full ${iframeLoaded ? '' : 'hidden'}`}
      ></iframe>
    </div>
  )
}

export const Languages = () => {
  return (
    <div className="p-4 mx-auto max-w-screen-sm w-full mb-44 ">
      <div className="text-center">
        <h3 className="text-3xl font-semibold mb-4">See It in Action</h3>
        <IframeWithSkeleton />
      </div>
    </div>
  )
}
