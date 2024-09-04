import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Navbar } from '@/components/navbar'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { AnimatedPopup } from '@/components/animatedPopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Script-youtube',
  description: 'Use AI to help you write your youtube Scripts 💻👀 - 🫢'
}
const popupMessages = [
  {
    id: 1,
    message: "Start by clicking on the 'Script Youtube'.",
    duration: 4000
  }
]

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <Navbar />
            <AnimatedPopup messages={popupMessages} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
