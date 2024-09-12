'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: 'Nizzy',
      avatar: '/testimonials/Nizzy.jpeg', // Updated avatar filename
      imageSrc: '/testimonials/rev.png' // Updated image source
    },
    {
      name: '§Agusto',
      avatar: '/testimonials/default.jpg',
      imageSrc: '/testimonials/message.png' // New field for the testimonial image
    }
  ]

  return (
    <div className="flex flex-col items-center mb-48 mt-56">
      {/* Section Title */}

      {/* Testimonials Card*/}
      <div className="w-full max-w-6xl px-4   ">
        <div className="flex flex-col  items-center gap-6">
          <h3 className="text-3xl font-semibold mb-4">Proof That It Works</h3>

          <div className="grid grid-cols-2 gap-6">
            {' '}
            {/* Moved the grid container outside the map */}
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="max-w-80  bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default overflow-hidden" // Set max-w-full to allow full width in grid
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
    </div>
  )
}
