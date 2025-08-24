"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Users } from "lucide-react"
import Link from "next/link"

const flashcardGroups = [
  {
    id: "basic-vocabulary",
    title: "Basic Vocabulary",
    description: "Essential everyday English words",
    level: "Beginner",
    wordsCount: 10,
    progress: 70,
    color: "bg-blue-500",
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Professional workplace vocabulary",
    level: "Intermediate",
    wordsCount: 10,
    progress: 30,
    color: "bg-green-500",
  },
  {
    id: "travel-phrases",
    title: "Travel Phrases",
    description: "Useful words for traveling",
    level: "Beginner",
    wordsCount: 10,
    progress: 90,
    color: "bg-purple-500",
  },
  {
    id: "academic-words",
    title: "Academic Words",
    description: "Advanced vocabulary for studies",
    level: "Advanced",
    wordsCount: 10,
    progress: 10,
    color: "bg-orange-500",
  },
  {
    id: "daily-conversation",
    title: "Daily Conversation",
    description: "Common words for everyday chat",
    level: "Beginner",
    wordsCount: 10,
    progress: 50,
    color: "bg-pink-500",
  },
  {
    id: "technology-terms",
    title: "Technology Terms",
    description: "Modern tech vocabulary",
    level: "Intermediate",
    wordsCount: 10,
    progress: 0,
    color: "bg-indigo-500",
  },
]

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vocabulary Flashcards</h1>
          <p className="text-gray-600">Choose a group to start learning new words</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <BookOpen className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{flashcardGroups.length}</p>
                <p className="text-sm text-gray-600">Available Groups</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{flashcardGroups.length * 10}</p>
                <p className="text-sm text-gray-600">Total Words</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(flashcardGroups.reduce((acc, group) => acc + group.progress, 0) / flashcardGroups.length)}
                  %
                </p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardGroups.map((group) => (
            <Link key={group.id} href={`/flashcards/${group.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {group.level}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{group.title}</CardTitle>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{group.wordsCount} words</span>
                      <span className="text-gray-900 font-medium">{group.progress}% complete</span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
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
