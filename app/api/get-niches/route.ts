import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const niches = await db.videoNiche.findMany({
      where: { userId: user.user.id },
      select: { id: true, niche: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ niches })
  } catch (error) {
    console.error('[GET_NICHES]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
