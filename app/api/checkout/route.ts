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

    // Check if user already has a purchase
    const existingPurchase = await db.purchase.findFirst({
      where: { userId: user.user.id }
    })

    if (existingPurchase) {
      return NextResponse.json({ redirectUrl: '/dumb' })
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
            unit_amount: 799 // $7.99
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
