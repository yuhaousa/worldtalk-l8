import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="text-center py-16">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          Interactive Learning Experience
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Master English with
          <span className="text-blue-600"> Smart Learning</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Learn English through interactive flashcards, challenging quizzes, and natural conversations with our AI
          avatar. Track your progress and achieve fluency faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/flashcards">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/quiz">Take a Quiz</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
