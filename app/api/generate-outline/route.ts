import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates video outlines.'
        },
        {
          role: 'user',
          content: `Generate a basic outline for a YouTube video with the title: "${title}". Provide a structure with main points and sub-points.`
        }
      ]
    })

    const outline = completion.choices[0].message.content

    return NextResponse.json({ outline })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate outline' },
      { status: 500 }
    )
  }
}
