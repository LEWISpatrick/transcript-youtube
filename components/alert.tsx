'use client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Palette, RocketIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { Form } from '@/components/ui/form'

export function AlertDemo() {
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json()

      if (data.message) {
        toast.success(
          'Check your Spam folder if you don’t see it in your inbox.'
        )
        setEmail('')
        setOpen(false) // Close the dialog after successful submission
      } else {
        console.error(data, 'ha')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="w-full max-w-6xl px-6 py-4">
      <Alert className="flex flex-col sm:flex-row gap-4 justify-between px-6 rounded-xl border-0 ring ring-primary/20 ring-inset text-secondary bg-primary/15 text-black dark:text-white cursor-default">
        <div>
          <AlertTitle className="flex gap-1">
            <RocketIcon className="h-4 w-4" />
            Heads up!
          </AlertTitle>
          <AlertDescription className="flex">
            <p>Best Newsletter 🙀</p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <p className="text-primary ml-1.5 underline cursor-pointer">
                  Sign up for my newsletter
                </p>
              </DialogTrigger>
              <DialogContent className="rounded-lg sm:max-w-[425px] ">
                <DialogHeader>
                  <DialogTitle>Sign up for the newsletter</DialogTitle>
                  <DialogDescription>
                    Get Updates when i ship a New Product or Feature. 🙂
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                  <Label htmlFor="email" className="text-right mb-2">
                    Email
                  </Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    type="email"
                    required
                    placeholder="tylerdurder@gmail.com"
                    className="mt-3"
                    value={email}
                  />
                  <DialogFooter>
                    <Button type="submit" className="mt-4">
                      Sign Up
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
