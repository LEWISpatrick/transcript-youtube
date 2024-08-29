import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { title, content } = await req.json()

    if (!title || !content) {
      return new NextResponse('Title and content are required', { status: 400 })
    }

    const outline = await db.videoOutline.create({
      data: {
        userId: user.user.id,
        title,
        content
      }
    })

    return NextResponse.json(outline)
  } catch (error) {
    console.error('[CREATE_OUTLINE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
