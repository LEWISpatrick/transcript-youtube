import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = params

    if (!db.videoNiche) {
      console.error('VideoNiche model is not defined in the Prisma client')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    await db.videoNiche.deleteMany({
      where: {
        id: id,
        userId: user.user.id
      }
    })

    return new NextResponse('Niche deleted successfully', { status: 200 })
  } catch (error) {
    console.error('[DELETE_NICHE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
