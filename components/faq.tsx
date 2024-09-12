'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is Script-Youtube?',
      answer:
        'Script-Youtube is an AI-powered tool that helps you generate engaging YouTube video scripts quickly and efficiently.'
    },
    {
      question: 'How does the free trial work?',
      answer:
        'You can generate up to 2 free scripts during the trial period. After that, you will need to purchase a subscription to continue using the service.'
    },
    {
      question: 'Can I save my scripts?',
      answer:
        'Yes, you can save your generated scripts and access them later from your dashboard.'
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods, including credit cards, PayPal, and other secure payment options. You can choose your preferred method during the checkout process.'
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team via the contact form on our website, or you can email us directly at support@script-youtube.com. We aim to respond to all inquiries within 24 hours.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full max-w-md bg-secondary border-0 ring-2 ring-foreground/10 rounded-lg hover:bg-primary/10 transition duration-300 cursor-default overflow-hidden"
          >
            <Button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-left bg-transparent hover:bg-primary/20 focus:outline-none"
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="text-lg">{openIndex === index ? '-' : '+'}</span>
            </Button>
            {openIndex === index && (
              <div className="p-4 ">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
