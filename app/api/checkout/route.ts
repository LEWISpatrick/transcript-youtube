import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.APP_URL}/success`,
      cancel_url: process.env.APP_URL,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: user.user.email!,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'One-Time Payment',
              description: 'Access to premium features'
            },
            unit_amount: 2000 // $20.00
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.user.id
      }
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.error('[STRIPE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
