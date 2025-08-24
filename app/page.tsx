import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import { ProgressOverview } from "@/components/progress-overview"
import { SlidingBanner } from "@/components/sliding-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <SlidingBanner />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <ProgressOverview />
        <FeatureCards />
      </main>
    </div>
  )
}
