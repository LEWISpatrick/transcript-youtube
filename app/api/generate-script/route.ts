import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { title, outline } = await req.json()

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
