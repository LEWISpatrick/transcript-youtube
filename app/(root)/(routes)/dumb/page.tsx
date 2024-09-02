'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-center text-indigo-500 mb-4 ">
        Do you want to give me more money?
      </h1>
      <p className="text-xl text-gray-600">
        (Just kidding, you've already made a purchase!)
      </p>
    </div>
  )
}

export default Page
