'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const SuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasShownToast = localStorage.getItem('hasShownSuccessToast')
    if (!hasShownToast) {
      toast.success('Payment successful! Thank you for your purchase.', {
        duration: 10000,
        position: 'top-center'
      })
      localStorage.setItem('hasShownSuccessToast', 'true')
    }

    // Clear the localStorage item after 10 seconds
    const timer = setTimeout(() => {
      localStorage.removeItem('hasShownSuccessToast')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Toaster />

      <div className="relative w-[500px] h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-16 h-16 animate-spin text-green-500" />
          </div>
        )}
        <Image
          src="/success.gif"
          alt="Success celebration"
          width={500}
          height={500}
          onLoadingComplete={() => setIsLoading(false)}
          className={`rounded-lg shadow-lg ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        />
      </div>
    </div>
  )
}

export default SuccessPage
