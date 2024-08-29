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

    const deletedOutline = await db.videoOutline.delete({
      where: {
        id: id,
        userId: user.user.id
      }
    })

    return NextResponse.json(deletedOutline)
  } catch (error) {
    console.error('[DELETE_OUTLINE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
