import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = params
    const { title, content } = await req.json()

    if (!title || !content) {
      return new NextResponse('Title and content are required', { status: 400 })
    }

    const updatedScript = await db.fullScript.update({
      where: {
        id: id,
        userId: user.user.id
      },
      data: {
        title,
        content
      }
    })

    return NextResponse.json(updatedScript)
  } catch (error) {
    console.error('[EDIT_SCRIPT]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
