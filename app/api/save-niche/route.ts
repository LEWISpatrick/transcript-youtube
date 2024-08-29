import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { niche } = await req.json()
    const lowercaseNiche = niche.toLowerCase()

    if (!db.videoNiche) {
      console.error('VideoNiche model is not defined in the Prisma client')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    // Check if niche already exists
    const existingNiche = await db.videoNiche.findFirst({
      where: {
        userId: user.user.id,
        niche: lowercaseNiche
      }
    })

    if (existingNiche) {
      return new NextResponse('Niche already exists', { status: 400 })
    }

    const savedNiche = await db.videoNiche.create({
      data: {
        userId: user.user.id,
        niche: lowercaseNiche
      }
    })

    return NextResponse.json({ savedNiche })
  } catch (error) {
    console.error('[SAVE_NICHE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// ... (keep the GET function as is)
