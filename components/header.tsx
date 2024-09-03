'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'

const IframeWithSkeleton = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const iframe = document.getElementById(
      'youtube-iframe'
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
        id="youtube-iframe"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`w-full max-w-2xl h-auto aspect-video rounded-[6px] ${iframeLoaded ? '' : 'hidden'}`}
      ></iframe>
    </>
  )
}

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 py-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-primary flex-shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
    <span className="text-lg text-muted-foreground">{text}</span>
  </div>
)

export const Header = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
      {' '}
      {/* Reduced height */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 text-foreground">
          {' '}
          {/* Reduced font size */}
          AI. Edit. Record.
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          Use AI to help you write your YouTube scripts
        </p>
        <div className="mb-8 inline-block text-left">
          <CheckItem text="Write engaging scripts with AI" />
          <CheckItem text="Access YouTube videos library" />
          <CheckItem text="Save hours on script writing" />
        </div>
        <div>
          <Link href="/register">
            <Button size="lg" className="text-xl px-8 py-3 rounded-md">
              <Sparkles className="h-7 w-7 mr-2" />
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
