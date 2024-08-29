'use client'

import React, { useState, useEffect } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'

interface Niche {
  id: string
  niche: string
}

const SavedScriptsPage = () => {
  const [niches, setNiches] = useState<Niche[]>([])
  const [editingNiche, setEditingNiche] = useState<Niche | null>(null)

  useEffect(() => {
    fetchNiches()
  }, [])

  const fetchNiches = async () => {
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Niches</h1>
      {niches.length === 0 ? (
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
    </div>
  )
}

export default SavedScriptsPage
