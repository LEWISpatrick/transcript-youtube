'use client'

import React, { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'

interface TitleData {
  title: string
  outline: string
  showOutline: boolean
  script: string
}

const TranscriptPage = () => {
  const [niche, setNiche] = useState('')
  const [titleData, setTitleData] = useState<TitleData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateIdeas = async () => {
    if (!niche.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche })
      })
      const data = await response.json()
      setTitleData(
        data.titles.map((title: string) => ({
          title,
          outline: '',
          showOutline: false,
          script: ''
        }))
      )
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateIdeas()
    }
  }

  const handleTitleChange = (index: number, newTitle: string) => {
    const newTitleData = [...titleData]
    newTitleData[index].title = newTitle
    setTitleData(newTitleData)
  }

  const handleOutlineChange = (index: number, newOutline: string) => {
    const newTitleData = [...titleData]
    newTitleData[index].outline = newOutline
    setTitleData(newTitleData)
  }

  const handleGenerateOutline = async (index: number) => {
    const title = titleData[index].title
    try {
      const response = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const data = await response.json()
      const newTitleData = [...titleData]
      newTitleData[index].outline = data.outline
      newTitleData[index].showOutline = true
      setTitleData(newTitleData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleGenerateScript = async (index: number) => {
    const { title, outline } = titleData[index]
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, outline })
      })
      const data = await response.json()
      const newTitleData = [...titleData]
      newTitleData[index].script = data.script
      setTitleData(newTitleData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const createGoogleDocsLink = (title: string, script: string) => {
    const encodedTitle = encodeURIComponent(title)
    const encodedScript = encodeURIComponent(script)
    return `https://docs.google.com/document/create?title=${encodedTitle}&body=${encodedScript}`
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      {' '}
      {/* Increased max-width from 4xl to 6xl */}
      <h1 className="text-3xl font-bold text-center mb-6">YT Transcript</h1>
      <p className="text-center mb-6">
        Generate YouTube video ideas and scripts.
      </p>
      <div className="mb-6">
        <label className="block text-lg text-center font-medium text-gray-700 mb-2">
          Video Niche:
        </label>
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleGenerateIdeas}
          disabled={isLoading || !niche.trim()}
          className="px-6 py-3 text-lg"
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </Button>
      </div>
      {titleData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Generated Titles and Outlines:
          </h2>
          {titleData.map((item, index) => (
            <div key={index} className="mb-8 p-8 border rounded-lg shadow-md">
              {' '}
              {/* Increased padding */}
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              />
              <div className="flex justify-center mb-4">
                <Button
                  onClick={() => handleGenerateOutline(index)}
                  className="px-6 py-3 text-lg"
                >
                  Generate Outline
                </Button>
              </div>
              {item.showOutline && (
                <>
                  <textarea
                    value={item.outline}
                    onChange={(e) => handleOutlineChange(index, e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    rows={8}
                  />
                  <div className="flex justify-center mb-4">
                    <Button
                      onClick={() => handleGenerateScript(index)}
                      className="px-6 py-3 text-lg"
                    >
                      Generate Full Script
                    </Button>
                  </div>
                </>
              )}
              {item.script && (
                <>
                  <textarea
                    value={item.script}
                    readOnly
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    rows={12}
                  />
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        window.open(
                          createGoogleDocsLink(item.title, item.script),
                          '_blank'
                        )
                      }}
                      rel="noopener noreferrer"
                      className="px-6 py-3 text-lg"
                    >
                      Open in Google Docs
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TranscriptPage
