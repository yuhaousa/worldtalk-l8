import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, BookOpen, Star, CheckCircle } from "lucide-react"

const readingPassages = [
  {
    id: "beginner-1",
    title: "A Day at the Park",
    level: "A1",
    difficulty: "Beginner",
    duration: "5 min",
    description: "Simple story about activities in a park",
    progress: 100,
    completed: true,
    rating: 4.8,
    topics: ["Daily Life", "Nature"],
  },
  {
    id: "beginner-2",
    title: "My Family",
    level: "A1",
    difficulty: "Beginner",
    duration: "4 min",
    description: "Introduction to family members and relationships",
    progress: 0,
    completed: false,
    rating: 4.9,
    topics: ["Family", "Relationships"],
  },
  {
    id: "elementary-1",
    title: "The School Library",
    level: "A2",
    difficulty: "Elementary",
    duration: "7 min",
    description: "Story about discovering books and learning",
    progress: 60,
    completed: false,
    rating: 4.7,
    topics: ["Education", "Books"],
  },
  {
    id: "elementary-2",
    title: "Weekend Shopping",
    level: "A2",
    difficulty: "Elementary",
    duration: "6 min",
    description: "Dialogue about shopping for groceries and clothes",
    progress: 0,
    completed: false,
    rating: 4.6,
    topics: ["Shopping", "Money"],
  },
  {
    id: "intermediate-1",
    title: "Climate Change Effects",
    level: "B1",
    difficulty: "Intermediate",
    duration: "10 min",
    description: "Article about environmental changes and solutions",
    progress: 30,
    completed: false,
    rating: 4.5,
    topics: ["Environment", "Science"],
  },
  {
    id: "intermediate-2",
    title: "Technology in Education",
    level: "B2",
    difficulty: "Upper-Intermediate",
    duration: "12 min",
    description: "Essay on how technology transforms learning",
    progress: 0,
    completed: false,
    rating: 4.4,
    topics: ["Technology", "Education"],
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Elementary":
      return "bg-blue-100 text-blue-800"
    case "Intermediate":
      return "bg-orange-100 text-orange-800"
    case "Upper-Intermediate":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ReadingPage() {
  const completedCount = readingPassages.filter((p) => p.completed).length
  const totalCount = readingPassages.length
  const averageProgress = Math.round(readingPassages.reduce((sum, p) => sum + p.progress, 0) / totalCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reading Comprehension</h1>
            <p className="text-gray-600 mt-1">Improve your English through engaging stories and articles</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCount}/{totalCount}
                  </p>
                  <p className="text-sm text-gray-600">Passages Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                  <p className="text-sm text-gray-600">Average Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.7</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reading Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingPassages.map((passage) => (
            <Link key={passage.id} href={`/reading/${passage.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{passage.title}</CardTitle>
                      <CardDescription className="text-sm">{passage.description}</CardDescription>
                    </div>
                    {passage.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge className={getDifficultyColor(passage.difficulty)}>
                      {passage.level} - {passage.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Topics */}
                    <div className="flex flex-wrap gap-1">
                      {passage.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* Duration and Rating */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {passage.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {passage.rating}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{passage.progress}%</span>
                      </div>
                      <Progress value={passage.progress} className="h-2" />
                    </div>

                    {/* Action Button */}
                    <Button className="w-full pointer-events-none" variant={passage.completed ? "outline" : "default"}>
                      {passage.progress === 0 ? "Start Reading" : passage.completed ? "Review" : "Continue"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
