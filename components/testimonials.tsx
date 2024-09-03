'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: '§Agusto',
      avatar: '/testimonials/default.jpg',
      imageSrc: '/testimonials/message.png' // New field for the testimonial image
    }
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Section Title */}

      {/* Testimonials Card*/}
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col items-center gap-6">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="max-w-xs bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex items-center p-4 bg-background/50">
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
                <div className="w-full relative p-4 rounded-xl">
                  <img
                    src={testimonial.imageSrc}
                    alt={`Testimonial from ${testimonial.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
