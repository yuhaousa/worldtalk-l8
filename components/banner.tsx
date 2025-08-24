import { Star, Trophy, Users } from "lucide-react"

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-300" />
            <span>Join 50,000+ learners</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-300" />
            <span>Achieve fluency faster</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-yellow-300" />
            <span>Learn with AI-powered conversations</span>
          </div>
        </div>
      </div>
    </div>
  )
}
