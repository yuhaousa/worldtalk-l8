"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Trophy, Target } from "lucide-react"
import Link from "next/link"

const quizGroups = [
  {
    id: "basic-vocabulary-quiz",
    title: "Basic Vocabulary Quiz",
    description: "Test your knowledge of essential words",
    level: "Beginner",
    questionsCount: 10,
    bestScore: 80,
    color: "bg-blue-500",
  },
  {
    id: "business-english-quiz",
    title: "Business English Quiz",
    description: "Professional vocabulary assessment",
    level: "Intermediate",
    questionsCount: 10,
    bestScore: 60,
    color: "bg-green-500",
  },
  {
    id: "grammar-basics-quiz",
    title: "Grammar Basics Quiz",
    description: "Test your grammar fundamentals",
    level: "Beginner",
    questionsCount: 10,
    bestScore: 90,
    color: "bg-purple-500",
  },
  {
    id: "advanced-vocabulary-quiz",
    title: "Advanced Vocabulary Quiz",
    description: "Challenge yourself with complex words",
    level: "Advanced",
    questionsCount: 10,
    bestScore: 40,
    color: "bg-orange-500",
  },
  {
    id: "idioms-quiz",
    title: "Idioms & Phrases Quiz",
    description: "Learn common English expressions",
    level: "Intermediate",
    questionsCount: 10,
    bestScore: 70,
    color: "bg-pink-500",
  },
  {
    id: "pronunciation-quiz",
    title: "Pronunciation Quiz",
    description: "Test your pronunciation knowledge",
    level: "Intermediate",
    questionsCount: 10,
    bestScore: 0,
    color: "bg-indigo-500",
  },
]

export default function QuizPage() {
  const averageScore = Math.round(quizGroups.reduce((acc, quiz) => acc + quiz.bestScore, 0) / quizGroups.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">English Quizzes</h1>
          <p className="text-gray-600">Choose a quiz to test your knowledge</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Brain className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{quizGroups.length}</p>
                <p className="text-sm text-gray-600">Available Quizzes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Target className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{quizGroups.length * 10}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Trophy className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizGroups.map((quiz) => (
            <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${quiz.color}`}></div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {quiz.level}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{quiz.title}</CardTitle>
                  <p className="text-sm text-gray-600">{quiz.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{quiz.questionsCount} questions</span>
                      <span className="text-gray-900 font-medium">
                        Best: {quiz.bestScore > 0 ? `${quiz.bestScore}%` : "Not taken"}
                      </span>
                    </div>
                    <Progress value={quiz.bestScore} className="h-2" />
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
