'use client'

import React, { useState, KeyboardEvent, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  FaSave,
  FaFolder,
  FaLightbulb,
  FaTimes,
  FaListUl,
  FaFileAlt,
  FaArrowLeft
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface TitleData {
  title: string
  outline: string
  script: string
}

interface VideoNiche {
  id: string
  niche: string
}

const TranscriptPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [niche, setNiche] = useState('')
  const [story, setStory] = useState('')
  const [titleData, setTitleData] = useState<TitleData[]>([])
  const [selectedTitle, setSelectedTitle] = useState<TitleData | null>(null)
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false)
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false)
  const [isGeneratingScript, setIsGeneratingScript] = useState(false)
  const [savedNiches, setSavedNiches] = useState<VideoNiche[]>([])
  const [isNicheDialogOpen, setIsNicheDialogOpen] = useState(false)
  const [isSavingNiche, setIsSavingNiche] = useState(false)
  const [isLoadingNiche, setIsLoadingNiche] = useState(false)
  const [hasPurchase, setHasPurchase] = useState(false)
  const [freeScriptsGenerated, setFreeScriptsGenerated] = useState(0)
  const [activeInput, setActiveInput] = useState<'niche' | 'story'>('niche')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/register')
    } else if (status === 'authenticated') {
      fetchUserStatus()
      fetchSavedNiches()
    }
  }, [status, router])

  const fetchUserStatus = async () => {
    try {
      const response = await fetch('/api/user-status')
      const data = await response.json()
      setHasPurchase(data.hasPurchase)
      setFreeScriptsGenerated(data.freeScriptsGenerated)
    } catch (error) {
      0
      console.error('Error fetching user status:', error)
      toast.error('Failed to fetch user status')
    }
  }

  const handleGenerateIdeas = async () => {
    if (!niche.trim() || isGeneratingIdeas) return

    setIsGeneratingIdeas(true)
    toast.loading('Generating video ideas for your niche...', {
      id: 'generateIdeas'
    })

    // Disable all buttons
    setIsSavingNiche(true)
    setIsLoadingNiche(true)

    try {
      const response = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, story })
      })

      if (response.status === 402) {
        toast.error(
          'You have reached the limit of free scripts. Please purchase to continue.',
          { id: 'generateIdeas' }
        )
        handleCheckout()
        return
      }

      const data = await response.json()
      setTitleData(
        data.titles.map((title: string) => ({ title, outline: '', script: '' }))
      )
      setSelectedTitle(null)
      if (!hasPurchase) {
        setFreeScriptsGenerated((prev) => prev + 1)
      }
      toast.success('Video ideas generated successfully!', {
        id: 'generateIdeas'
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to generate ideas. Please try again.', {
        id: 'generateIdeas'
      })
    } finally {
      setIsGeneratingIdeas(false)
      setIsSavingNiche(false)
      setIsLoadingNiche(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerateIdeas()
    }
  }

  const handleTitleClick = (title: TitleData) => {
    setSelectedTitle(title)
  }

  const handleGenerateOutline = async () => {
    if (!selectedTitle || isGeneratingOutline) return

    setIsGeneratingOutline(true)
    toast.loading('Generating outline for your video...', {
      id: 'generateOutline'
    })

    try {
      const response = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: selectedTitle.title, story })
      })
      const data = await response.json()
      setSelectedTitle({ ...selectedTitle, outline: data.outline })
      toast.success('Outline generated successfully!', {
        id: 'generateOutline'
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to generate outline. Please try again.', {
        id: 'generateOutline'
      })
    } finally {
      setIsGeneratingOutline(false)
    }
  }

  const handleGenerateScript = async () => {
    if (!selectedTitle || isGeneratingScript) return

    setIsGeneratingScript(true)
    toast.loading('Generating full script for your video...', {
      id: 'generateScript'
    })

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedTitle.title,
          outline: selectedTitle.outline,
          story
        })
      })

      const data = await response.json()
      setSelectedTitle({ ...selectedTitle, script: data.script })
      toast.success('Full script generated successfully!', {
        id: 'generateScript'
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to generate full script. Please try again.', {
        id: 'generateScript'
      })
    } finally {
      setIsGeneratingScript(false)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      toast.error('Failed to initiate checkout. Please try again.')
    }
  }

  const handleSaveNiche = async () => {
    if (!niche.trim() || isSavingNiche) return

    const lowercaseNiche = niche.trim().toLowerCase()

    // Check if niche already exists
    if (savedNiches.some((savedNiche) => savedNiche.niche === lowercaseNiche)) {
      toast.error('This niche idea is already saved.')
      return
    }

    setIsSavingNiche(true)
    toast.loading('Saving video niche...', { id: 'saveNiche' })

    try {
      const response = await fetch('/api/save-niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: lowercaseNiche })
      })

      if (!response.ok) throw new Error('Failed to save niche')

      toast.success('Video niche saved successfully!', { id: 'saveNiche' })
      fetchSavedNiches()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save video niche. Please try again.', {
        id: 'saveNiche'
      })
    } finally {
      setIsSavingNiche(false)
    }
  }

  const handleDeleteNiche = async (id: string) => {
    toast.success('Deleting niche...')
    try {
      const response = await fetch(`/api/delete-niche/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete niche')

      toast.success('Niche deleted successfully!')
      fetchSavedNiches()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete niche. Please try again.')
    }
  }

  const fetchSavedNiches = async () => {
    try {
      const response = await fetch('/api/get-niches')
      if (!response.ok) throw new Error('Failed to fetch niches')
      const data = await response.json()
      setSavedNiches(data.niches)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to fetch saved niches.')
    }
  }

  const handleLoadNiche = () => {
    toast.success('Loading saved niches...', { id: 'loadNiche' })
    setIsNicheDialogOpen(true)
  }

  const handleNicheClick = (clickedNiche: string) => {
    if (activeInput === 'niche') {
      setNiche(clickedNiche)
    } else if (activeInput === 'story') {
      setStory(clickedNiche)
    }
    setIsNicheDialogOpen(false)
    setIsLoadingNiche(false)
    toast.success('Content loaded successfully!', { id: 'loadNiche' })
  }

  const handleOutlineChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTitle) {
      setSelectedTitle({ ...selectedTitle, outline: e.target.value })
    }
  }

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTitle) {
      setSelectedTitle({ ...selectedTitle, script: e.target.value })
    }
  }

  const handleSaveOutline = async () => {
    if (!selectedTitle || !selectedTitle.outline) {
      toast.error('Please generate an outline first')
      return
    }

    try {
      const response = await fetch('/api/create-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: selectedTitle.title,
          content: selectedTitle.outline
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save outline')
      }

      toast.success('Outline saved successfully')
    } catch (error) {
      console.error('Error saving outline:', error)
      toast.error('Failed to save outline')
    }
  }

  const handleSaveFullScript = async () => {
    if (!selectedTitle || !selectedTitle.script) {
      toast.error('Please generate a full script first')
      return
    }

    try {
      const response = await fetch('/api/create-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: selectedTitle.title,
          content: selectedTitle.script
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save full script')
      }

      toast.success('Full script saved successfully')
    } catch (error) {
      console.error('Error saving full script:', error)
      toast.error('Failed to save full script')
    }
  }

  return (
    <>
      {status === 'loading' ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : status === 'authenticated' ? (
        <div className="p-4 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Generate YouTube Video Scripts
          </h1>

          {!selectedTitle && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Video Niche:
                </h2>
                <textarea
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  onFocus={() => setActiveInput('niche')}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                  rows={4}
                  placeholder="Enter your video niche idea here..."
                />
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Video Story:
                  </h2>
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    onFocus={() => setActiveInput('story')}
                    placeholder="Enter your video story (optional)..."
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={5}
                  />
                </div>
                <div className="flex justify-between mb-4">
                  <Button
                    onClick={handleSaveNiche}
                    className="px-4 py-2 text-sm"
                    disabled={
                      !niche.trim() ||
                      isSavingNiche ||
                      isLoadingNiche ||
                      isGeneratingIdeas
                    }
                  >
                    <FaSave className="mr-2" /> Save Niche
                  </Button>
                  <Button
                    onClick={handleLoadNiche}
                    className="px-4 py-2 text-sm"
                    disabled={
                      isSavingNiche || isLoadingNiche || isGeneratingIdeas
                    }
                  >
                    <FaFolder className="mr-2" /> Load Niche
                  </Button>
                  <Button
                    onClick={handleGenerateIdeas}
                    disabled={
                      isGeneratingIdeas ||
                      !niche.trim() ||
                      isSavingNiche ||
                      isLoadingNiche
                    }
                    className="px-6 py-2 text-sm"
                  >
                    <FaLightbulb className="mr-2" />
                    {isGeneratingIdeas ? 'Generating...' : 'Generate Titles'}
                  </Button>
                </div>
              </div>
            </>
          )}

          {!selectedTitle && titleData.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Generated Titles:
              </h2>
              {titleData.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg shadow-lg cursor-pointer
                  transition-all duration-300
                  
                  hover:bg-indigo-500"
                  onClick={() => handleTitleClick(item)}
                >
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
              ))}
            </div>
          )}

          {selectedTitle && (
            <div className="mt-8 p-8 border rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedTitle.title}
              </h2>
              {!selectedTitle.outline && (
                <div className="flex justify-center mb-4">
                  <Button
                    onClick={handleGenerateOutline}
                    disabled={isGeneratingOutline}
                    className="px-6 py-3 text-lg"
                  >
                    <FaListUl className="mr-2" />
                    {isGeneratingOutline
                      ? 'Generating...'
                      : 'Generate Basic Outline'}
                  </Button>
                </div>
              )}
              {selectedTitle.outline && (
                <>
                  <textarea
                    value={selectedTitle.outline}
                    onChange={handleOutlineChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    rows={8}
                  />
                  <div className="flex justify-between mb-4">
                    <Button
                      onClick={handleGenerateScript}
                      disabled={isGeneratingScript}
                      className="px-6 py-3 text-lg"
                    >
                      <FaFileAlt className="mr-2" />
                      {isGeneratingScript
                        ? 'Generating...'
                        : 'Generate Full Script'}
                    </Button>
                    <Button
                      onClick={handleSaveOutline}
                      className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600"
                    >
                      <FaSave className="mr-2" /> Save Outline
                    </Button>
                  </div>
                </>
              )}
              {selectedTitle.script && (
                <>
                  <textarea
                    value={selectedTitle.script}
                    onChange={handleScriptChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    rows={12}
                  />
                  <div className="flex justify-center mb-4">
                    <Button
                      onClick={handleSaveFullScript}
                      className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600"
                    >
                      <FaSave className="mr-2" /> Save Full Script
                    </Button>
                  </div>
                </>
              )}
              <div className="flex justify-center">
                <Button
                  onClick={() => setSelectedTitle(null)}
                  className="px-6 py-3 text-lg"
                >
                  <FaArrowLeft className="mr-2" /> Back to Titles
                </Button>
              </div>
            </div>
          )}

          <Dialog open={isNicheDialogOpen} onOpenChange={setIsNicheDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Saved Content</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {savedNiches.length > 0 ? (
                  <ul className="space-y-2">
                    {savedNiches.map((savedNiche) => (
                      <li
                        key={savedNiche.id}
                        className="mb-4 p-4 border rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-indigo-500 flex justify-between items-center"
                      >
                        <span
                          onClick={() => handleNicheClick(savedNiche.niche)}
                        >
                          {savedNiche.niche}
                        </span>
                        <Button
                          onClick={() => handleDeleteNiche(savedNiche.id)}
                          className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600"
                        >
                          <FaTimes />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No saved content found.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {!hasPurchase && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <p className="font-bold">Free Trial</p>
              <p>You have used {freeScriptsGenerated} out of 2 free scripts.</p>
              <p>Purchase to unlock unlimited scripts.</p>
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default TranscriptPage
