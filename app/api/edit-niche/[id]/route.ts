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
    const { niche } = await req.json()

    if (!niche) {
      return new NextResponse('Niche is required', { status: 400 })
    }

    if (!db.videoNiche) {
      console.error('VideoNiche model is not defined in the Prisma client')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    const updatedNiche = await db.videoNiche.update({
      where: {
        id: id,
        userId: user.user.id
      },
      data: {
        niche: niche
      }
    })

    return NextResponse.json(updatedNiche)
  } catch (error) {
    console.error('[EDIT_NICHE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
