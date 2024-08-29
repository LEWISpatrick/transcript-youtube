'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Send me your review of publiclyBuild with your PFP at patricklewis2009@gmail.com, or discord: patrickxp.'
    }
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Section Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-12">
        <h2 className="pb-4 text-4xl font-extrabold text-foreground">
          Testimonials
        </h2>
        <p className="text-md opacity-50 max-w-lg"></p>
        <AvatarCircles />
      </div>
      {/* Testimonials Card*/}
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col items-center gap-6">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="max-w-xs py-4 px-0 bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default"
            >
              <CardContent className="py-0 px-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </Avatar>
                  <CardTitle className="text-lg text-foreground">
                    {testimonial.name}
                  </CardTitle>
                </div>
                <p className="text-foreground/70">"{testimonial.message}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
