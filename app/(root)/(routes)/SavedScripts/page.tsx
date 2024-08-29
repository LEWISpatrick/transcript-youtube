'use client'

import React, { useState, useEffect } from 'react'
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

interface Niche {
  id: string
  niche: string
}

interface Outline {
  id: string
  title: string
  content: string
}

interface FullScript {
  id: string
  title: string
  content: string
}

const SavedScriptsPage = () => {
  const [niches, setNiches] = useState<Niche[]>([])
  const [outlines, setOutlines] = useState<Outline[]>([])
  const [fullScripts, setFullScripts] = useState<FullScript[]>([])
  const [editingNiche, setEditingNiche] = useState<Niche | null>(null)
  const [isLoadingNiches, setIsLoadingNiches] = useState(true)
  const [isLoadingOutlines, setIsLoadingOutlines] = useState(true)
  const [isLoadingFullScripts, setIsLoadingFullScripts] = useState(true)
  const [selectedScript, setSelectedScript] = useState<FullScript | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedOutline, setSelectedOutline] = useState<Outline | null>(null)
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false)
  const [editingOutline, setEditingOutline] = useState<Outline | null>(null)
  const [editingScript, setEditingScript] = useState<FullScript | null>(null)

  useEffect(() => {
    fetchNiches()
    fetchOutlines()
    fetchFullScripts()
  }, [])

  //get niches
  const fetchNiches = async () => {
    setIsLoadingNiches(true)
    try {
      const response = await fetch('/api/get-niches')
      if (!response.ok) {
        throw new Error('Failed to fetch niches')
      }
      const data = await response.json()
      setNiches(data.niches)
    } catch (error) {
      console.error('Error fetching niches:', error)
      toast.error('Failed to fetch niches')
    } finally {
      setIsLoadingNiches(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-niche/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete niche')
      }
      fetchNiches() // Refresh the list after deletion
      toast.success('Niche deleted successfully')
    } catch (error) {
      console.error('Error deleting niche:', error)
      toast.error('Failed to delete niche')
    }
  }

  const handleEdit = (niche: Niche) => {
    setEditingNiche(niche)
  }

  const handleSaveEdit = async () => {
    if (!editingNiche) return

    try {
      const response = await fetch(`/api/edit-niche/${editingNiche.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ niche: editingNiche.niche })
      })

      if (!response.ok) {
        throw new Error('Failed to edit niche')
      }

      fetchNiches() // Refresh the list after editing
      setEditingNiche(null)
      toast.success('Niche updated successfully')
    } catch (error) {
      console.error('Error editing niche:', error)
      toast.error('Failed to update niche')
    }
  }
  // end niche stuff

  //get outlines
  const fetchOutlines = async () => {
    setIsLoadingOutlines(true)
    try {
      const response = await fetch('/api/get-outlines')
      if (!response.ok) {
        throw new Error('Failed to fetch outlines')
      }
      const data = await response.json()
      setOutlines(data.outlines)
    } catch (error) {
      console.error('Error fetching outlines:', error)
      toast.error('Failed to fetch outlines')
    } finally {
      setIsLoadingOutlines(false)
    }
  }

  //get full scripts
  const fetchFullScripts = async () => {
    setIsLoadingFullScripts(true)
    try {
      const response = await fetch('/api/get-scripts')
      if (!response.ok) {
        throw new Error('Failed to fetch full scripts')
      }
      const data = await response.json()
      setFullScripts(data.scripts)
    } catch (error) {
      console.error('Error fetching full scripts:', error)
      toast.error('Failed to fetch full scripts')
    } finally {
      setIsLoadingFullScripts(false)
    }
  }

  // save outlines
  const handleSaveOutline = async (outline: Outline) => {
    try {
      const response = await fetch('/api/create-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(outline)
      })

      if (!response.ok) {
        throw new Error('Failed to save outline')
      }

      fetchOutlines() // Refresh the list after saving
      toast.success('Outline saved successfully')
    } catch (error) {
      console.error('Error saving outline:', error)
      toast.error('Failed to save outline')
    }
  }

  //edit full scripts
  const handleEditFullScript = async (script: FullScript) => {
    try {
      const response = await fetch(`/api/edit-script/${script.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(script)
      })

      if (!response.ok) {
        throw new Error('Failed to edit full script')
      }

      fetchFullScripts() // Refresh the list after editing
      toast.success('Full script updated successfully')
    } catch (error) {
      console.error('Error editing full script:', error)
      toast.error('Failed to update full script')
    }
  }

  //delete full scripts
  const handleDeleteFullScript = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-script/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete full script')
      }

      fetchFullScripts() // Refresh the list after deletion
      toast.success('Full script deleted successfully')
    } catch (error) {
      console.error('Error deleting full script:', error)
      toast.error('Failed to delete full script')
    }
  }

  const handleViewScript = (script: FullScript) => {
    setSelectedScript(script)
    setIsViewModalOpen(true)
  }

  const handleCopyToClipboard = () => {
    if (selectedScript) {
      navigator.clipboard.writeText(selectedScript.content)
      toast.success('Script copied to clipboard')
    }
  }

  const handleViewOutline = (outline: Outline) => {
    setSelectedOutline(outline)
    setIsOutlineModalOpen(true)
  }

  const handleCopyOutlineToClipboard = () => {
    if (selectedOutline) {
      navigator.clipboard.writeText(selectedOutline.content)
      toast.success('Outline copied to clipboard')
    }
  }

  // Outline functions
  const handleEditOutline = (outline: Outline) => {
    setEditingOutline(outline)
  }

  const handleSaveOutlineEdit = async () => {
    if (!editingOutline) return

    try {
      const response = await fetch(`/api/edit-outline/${editingOutline.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editingOutline.title,
          content: editingOutline.content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to edit outline')
      }

      fetchOutlines()
      setEditingOutline(null)
      toast.success('Outline updated successfully')
    } catch (error) {
      console.error('Error editing outline:', error)
      toast.error('Failed to update outline')
    }
  }

  const handleDeleteOutline = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-outline/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete outline')
      }

      fetchOutlines()
      toast.success('Outline deleted successfully')
    } catch (error) {
      console.error('Error deleting outline:', error)
      toast.error('Failed to delete outline')
    }
  }

  // Full Script functions
  const handleEditScript = (script: FullScript) => {
    setEditingScript(script)
  }

  const handleSaveScriptEdit = async () => {
    if (!editingScript) return

    try {
      const response = await fetch(`/api/edit-script/${editingScript.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editingScript.title,
          content: editingScript.content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to edit script')
      }

      fetchFullScripts()
      setEditingScript(null)
      toast.success('Script updated successfully')
    } catch (error) {
      console.error('Error editing script:', error)
      toast.error('Failed to update script')
    }
  }

  const handleDeleteScript = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-script/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete script')
      }

      fetchFullScripts()
      toast.success('Script deleted successfully')
    } catch (error) {
      console.error('Error deleting script:', error)
      toast.error('Failed to delete script')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Content</h1>

      {/* Niches Section */}
      <h2 className="text-2xl font-semibold mb-4">Saved Niches</h2>
      {isLoadingNiches ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : niches.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          You have no saved niches.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {niches.map((niche) => (
            <div
              key={niche.id}
              className="shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {editingNiche && editingNiche.id === niche.id ? (
                <input
                  type="text"
                  value={editingNiche.niche}
                  onChange={(e) =>
                    setEditingNiche({ ...editingNiche, niche: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ) : (
                <h2 className="text-xl font-semibold mb-2">{niche.niche}</h2>
              )}
              <div className="flex justify-end space-x-2">
                {editingNiche && editingNiche.id === niche.id ? (
                  <>
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingNiche(null)}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit(niche)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(niche.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Outlines Section */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Saved Outlines</h2>
      {isLoadingOutlines ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : outlines.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          You have no saved outlines.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outlines.map((outline) => (
            <div
              key={outline.id}
              className="shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {editingOutline && editingOutline.id === outline.id ? (
                <>
                  <input
                    type="text"
                    value={editingOutline.title}
                    onChange={(e) =>
                      setEditingOutline({
                        ...editingOutline,
                        title: e.target.value
                      })
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={editingOutline.content}
                    onChange={(e) =>
                      setEditingOutline({
                        ...editingOutline,
                        content: e.target.value
                      })
                    }
                    className="w-full p-2 border rounded mb-2"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {outline.title}
                  </h3>
                  <p className="mb-4">{outline.content.substring(0, 100)}...</p>
                </>
              )}
              <div className="flex justify-end space-x-2">
                {editingOutline && editingOutline.id === outline.id ? (
                  <>
                    <Button
                      onClick={handleSaveOutlineEdit}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingOutline(null)}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleViewOutline(outline)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <FaEye className="mr-2" /> View
                    </Button>
                    <Button
                      onClick={() => handleEditOutline(outline)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteOutline(outline.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Scripts Section */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Saved Full Scripts</h2>
      {isLoadingFullScripts ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : fullScripts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          You have no saved full scripts.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fullScripts.map((script) => (
            <div
              key={script.id}
              className="shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {editingScript && editingScript.id === script.id ? (
                <>
                  <input
                    type="text"
                    value={editingScript.title}
                    onChange={(e) =>
                      setEditingScript({
                        ...editingScript,
                        title: e.target.value
                      })
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={editingScript.content}
                    onChange={(e) =>
                      setEditingScript({
                        ...editingScript,
                        content: e.target.value
                      })
                    }
                    className="w-full p-2 border rounded mb-2"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{script.title}</h3>
                  <p className="mb-4">{script.content.substring(0, 100)}...</p>
                </>
              )}
              <div className="flex justify-end space-x-2">
                {editingScript && editingScript.id === script.id ? (
                  <>
                    <Button
                      onClick={handleSaveScriptEdit}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingScript(null)}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleViewScript(script)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <FaEye className="mr-2" /> View
                    </Button>
                    <Button
                      onClick={() => handleEditScript(script)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteScript(script.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Script Modal */}
      {isViewModalOpen && selectedScript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedScript.title}</h2>
            <div className="whitespace-pre-wrap mb-4">
              {selectedScript.content}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleCopyToClipboard}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Copy to Clipboard
              </Button>
              <Button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Outline Modal */}
      {isOutlineModalOpen && selectedOutline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedOutline.title}</h2>
            <div className="whitespace-pre-wrap mb-4">
              {selectedOutline.content}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleCopyOutlineToClipboard}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Copy to Clipboard
              </Button>
              <Button
                onClick={() => setIsOutlineModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedScriptsPage
