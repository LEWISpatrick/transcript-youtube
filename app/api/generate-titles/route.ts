import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { niche } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that generates YouTube video titles.'
        },
        {
          role: 'user',
          content: `Generate 10 catchy and SEO-friendly YouTube video titles for the ${niche} niche. Separate each title with a newline.`
        }
      ]
    })

    const titles = completion.choices[0].message.content?.split('\n')

    return NextResponse.json({ titles })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate titles' },
      { status: 500 }
    )
  }
}
