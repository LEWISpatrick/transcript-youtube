'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopupMessage {
  id: number
  message: string
  duration: number
}

interface AnimatedPopupProps {
  messages: PopupMessage[]
}

export function AnimatedPopup({ messages }: AnimatedPopupProps) {
  const [activeMessages, setActiveMessages] = useState<PopupMessage[]>([])

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1]
      setActiveMessages((prev) => {
        // Check if the message is already in the active messages
        if (!prev.some((msg) => msg.id === newMessage.id)) {
          return [...prev, newMessage]
        }
        return prev
      })

      const timer = setTimeout(() => {
        setActiveMessages((prev) =>
          prev.filter((msg) => msg.id !== newMessage.id)
        )
      }, newMessage.duration)

      return () => clearTimeout(timer)
    }
  }, [messages])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {activeMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ marginTop: `${index * 10}px` }} // Reduced from 60px to 10px
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm overflow-hidden"
          >
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 pr-6">
                {message.message}
              </p>
            </div>
            <button
              onClick={() =>
                setActiveMessages((prev) =>
                  prev.filter((msg) => msg.id !== message.id)
                )
              }
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
