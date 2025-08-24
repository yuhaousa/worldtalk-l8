import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Star, Clock, Target } from "lucide-react"

const games = [
  {
    id: "drag-drop-words",
    title: "Drag & Drop Words",
    description: "Arrange words to form correct sentences",
    difficulty: "A1-B1",
    duration: "5-10 min",
    type: "Grammar",
    color: "bg-green-500",
    icon: "🎯",
  },
  {
    id: "fill-missing-letters",
    title: "Fill Missing Letters",
    description: "Complete words by filling in missing letters",
    difficulty: "A1-A2",
    duration: "3-7 min",
    type: "Spelling",
    color: "bg-purple-500",
    icon: "🔤",
  },
  {
    id: "word-matching",
    title: "Word Matching",
    description: "Match words with their definitions or translations",
    difficulty: "A2-B2",
    duration: "5-8 min",
    type: "Vocabulary",
    color: "bg-blue-500",
    icon: "🔗",
  },
  {
    id: "sentence-builder",
    title: "Sentence Builder",
    description: "Build sentences using given words and grammar rules",
    difficulty: "B1-C1",
    duration: "8-12 min",
    type: "Grammar",
    color: "bg-orange-500",
    icon: "🏗️",
  },
  {
    id: "listening-game",
    title: "Listen & Choose",
    description: "Listen to audio and choose the correct word or phrase",
    difficulty: "A2-B2",
    duration: "6-10 min",
    type: "Listening",
    color: "bg-pink-500",
    icon: "👂",
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form correct English words",
    difficulty: "A1-B1",
    duration: "4-8 min",
    type: "Spelling",
    color: "bg-teal-500",
    icon: "🔀",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Games</h1>
            <p className="text-gray-600 mt-2">Interactive games to make learning English fun and engaging</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-sm text-gray-600">Available Games</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Games Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0h</p>
                  <p className="text-sm text-gray-600">Time Played</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {game.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{game.title}</CardTitle>
                  <CardDescription className="text-sm">{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {game.duration}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {game.difficulty}
                    </Badge>
                  </div>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    <Play className="h-4 w-4 mr-2" />
                    Play Game
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
