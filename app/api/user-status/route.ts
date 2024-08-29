import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userData = await db.user.findUnique({
      where: { id: user.user.id },
      select: {
        freeScriptsGenerated: true,
        purchases: { select: { id: true } }
      }
    })

    if (!userData) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json({
      hasPurchase: userData.purchases.length > 0,
      freeScriptsGenerated: userData.freeScriptsGenerated
    })
  } catch (error) {
    console.error('[USER_STATUS_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
