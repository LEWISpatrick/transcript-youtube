import { NextResponse } from 'next/server'
// import OpenAI from 'openai'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { title, story } = await req.json()

    const model = groq('llama-3.1-70b-versatile');

    const { text } = await generateText({
      model,
      system: 'You are a helpful assistant that generates video outlines.',
      prompt: `Generate a basic outline for a YouTube video with the title: "${title}". ${story ? `The video should incorporate this story: ${story}` : ''} Provide a structure with main points and sub-points.`
    })

    return NextResponse.json({ outline: text })

    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are a helpful assistant that generates video outlines.'
    //     },
    //     {
    //       role: 'user',
    //       content: `Generate a basic outline for a YouTube video with the title: "${title}". ${story ? `The video should incorporate this story: ${story}` : ''} Provide a structure with main points and sub-points.`
    //     }
    //   ]
    // })

    // const outline = completion.choices[0].message.content

    // return NextResponse.json({ outline })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate outline' },
      { status: 500 }
    )
  }
}
