import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageCircle, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Smart Flashcards",
    description: "Learn vocabulary with spaced repetition and adaptive difficulty",
    href: "/flashcards",
    color: "text-purple-600",
  },
  {
    icon: BookOpen,
    title: "Interactive Quizzes",
    description: "Test your knowledge with engaging multiple-choice and fill-in-the-blank questions",
    href: "/quiz",
    color: "text-green-600",
  },
  {
    icon: MessageCircle,
    title: "AI Conversations",
    description: "Practice speaking with our intelligent AI avatar in realistic scenarios",
    href: "/dialog",
    color: "text-blue-600",
  },
  {
    icon: Trophy,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and achievements",
    href: "/progress",
    color: "text-orange-600",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Learn English</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our comprehensive platform combines proven learning methods with cutting-edge technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit group-hover:bg-gray-100 transition-colors">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
