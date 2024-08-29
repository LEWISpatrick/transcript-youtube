import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { title, outline } = await req.json()

    // Check if user has any purchases
    const hasPurchase = await db.purchase.findFirst({
      where: { userId: user.user.id }
    })

    if (!hasPurchase) {
      // Check and increment freeScriptsGenerated if user has no purchases
      const userData = await db.user.findUnique({
        where: { id: user.user.id },
        select: { freeScriptsGenerated: true }
      })

      if (userData && userData.freeScriptsGenerated >= 2) {
        return NextResponse.json(
          { error: 'Free script limit reached' },
          { status: 402 }
        )
      }

      await db.user.update({
        where: { id: user.user.id },
        data: { freeScriptsGenerated: { increment: 1 } }
      })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates video scripts.'
        },
        {
          role: 'user',
          content: `Generate a full script for a YouTube video with the title: "${title}" and the following outline:\n\n${outline}\n\nProvide a complete script with an introduction, main content following the outline, and a conclusion.`
        }
      ]
    })

    const script = completion.choices[0].message.content

    return NextResponse.json({ script })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    )
  }
}
