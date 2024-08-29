import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const scripts = await db.fullScript.findMany({
      where: { userId: user.user.id },
      select: { id: true, title: true, content: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ scripts })
  } catch (error) {
    console.error('[GET_SCRIPTS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
