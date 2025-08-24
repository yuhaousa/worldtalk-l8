"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PenTool, Clock, Target, CheckCircle, Star } from "lucide-react"

const writingPrompts = [
  {
    id: "personal-intro",
    title: "Personal Introduction",
    description: "Write about yourself, your hobbies, and your goals",
    level: "A1",
    timeLimit: 15,
    wordTarget: 100,
    completed: true,
    score: 85,
  },
  {
    id: "daily-routine",
    title: "My Daily Routine",
    description: "Describe what you do from morning to evening",
    level: "A2",
    timeLimit: 20,
    wordTarget: 150,
    completed: true,
    score: 92,
  },
  {
    id: "favorite-place",
    title: "My Favorite Place",
    description: "Write about a place you love and explain why",
    level: "B1",
    timeLimit: 25,
    wordTarget: 200,
    completed: false,
    score: null,
  },
  {
    id: "technology-impact",
    title: "Technology in Our Lives",
    description: "Discuss how technology has changed our daily lives",
    level: "B2",
    timeLimit: 30,
    wordTarget: 250,
    completed: false,
    score: null,
  },
  {
    id: "environmental-issues",
    title: "Environmental Challenges",
    description: "Write about environmental problems and solutions",
    level: "C1",
    timeLimit: 35,
    wordTarget: 300,
    completed: false,
    score: null,
  },
  {
    id: "future-society",
    title: "Society in 2050",
    description: "Imagine and describe what society might look like in the future",
    level: "C2",
    timeLimit: 40,
    wordTarget: 400,
    completed: false,
    score: null,
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "A1":
      return "bg-green-100 text-green-800"
    case "A2":
      return "bg-blue-100 text-blue-800"
    case "B1":
      return "bg-yellow-100 text-yellow-800"
    case "B2":
      return "bg-orange-100 text-orange-800"
    case "C1":
      return "bg-red-100 text-red-800"
    case "C2":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function WritingPage() {
  const completedPrompts = writingPrompts.filter((prompt) => prompt.completed).length
  const totalPrompts = writingPrompts.length
  const averageScore =
    writingPrompts.filter((prompt) => prompt.score !== null).reduce((sum, prompt) => sum + (prompt.score || 0), 0) /
      completedPrompts || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PenTool className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Writing Practice</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Improve your English writing skills with guided prompts and instant feedback
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>
                    {completedPrompts}/{totalPrompts}
                  </span>
                </div>
                <Progress value={(completedPrompts / totalPrompts) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{averageScore.toFixed(0)}%</div>
              <p className="text-sm text-gray-600">Based on {completedPrompts} essays</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Next Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-gray-900">Complete B1 Level</div>
              <p className="text-sm text-gray-600">2 more essays to go</p>
            </CardContent>
          </Card>
        </div>

        {/* Writing Prompts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writingPrompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{prompt.title}</CardTitle>
                    <CardDescription className="text-sm">{prompt.description}</CardDescription>
                  </div>
                  {prompt.completed && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge className={getLevelColor(prompt.level)}>{prompt.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {prompt.timeLimit}min
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {prompt.wordTarget} words
                    </div>
                  </div>

                  {prompt.completed && prompt.score && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Score</span>
                        <span className="text-lg font-bold text-green-600">{prompt.score}%</span>
                      </div>
                    </div>
                  )}

                  <Link href={`/writing/${prompt.id}`}>
                    <Button className="w-full" variant={prompt.completed ? "outline" : "default"}>
                      {prompt.completed ? "Review Essay" : "Start Writing"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
