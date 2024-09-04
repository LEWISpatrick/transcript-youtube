import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'
import { generateObject } from 'ai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })
//
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { niche, story } = await req.json()

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

    const model = groq('llama-3.1-70b-versatile');


    const { object } = await generateObject({
      model,
      schema: z.object({
        titles: z.array(z.string()),
      }),
      system: `You are a helpful assistant that generates YouTube video titles.`,
      prompt: `Generate 10 catchy and SEO-friendly YouTube video titles for the ${niche} niche. ${story ? `The video should revolve around this story: ${story}` : ''}`
    })

    return NextResponse.json({ titles: object.titles })
    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'system',
    //       content:
    //         'You are a helpful assistant that generates YouTube video titles.'
    //     },
    //     {
    //       role: 'user',
    //       content: `Generate 10 catchy and SEO-friendly YouTube video titles for the ${niche} niche. ${story ? `The video should revolve around this story: ${story}` : ''} Separate each title with a newline.`
    //     }
    //   ]
    // })

    // const titles = completion.choices[0].message.content?.split('\n')

    // return NextResponse.json({ titles })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate titles' },
      { status: 500 }
    )
  }
}
