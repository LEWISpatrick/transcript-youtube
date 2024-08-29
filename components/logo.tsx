import { Squircle } from 'lucide-react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative h-6 w-6 ">
        <Image
          src="/logo.png"
          alt="logo"
          className="rounded-md"
          width={500}
          height={500}
        ></Image>
      </div>
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300">
        Script-youtube
      </span>
    </div>
  )
}
