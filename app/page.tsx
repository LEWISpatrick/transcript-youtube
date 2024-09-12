import FAQ from '@/components/faq'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Languages } from '@/components/languages'
import { PricingCard } from '@/components/pricing-card'
import { Testimonials } from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <main className="w-full max-w-6xl px-6 ">
        <Header />
        <Languages />
        <Testimonials />
        <PricingCard />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
