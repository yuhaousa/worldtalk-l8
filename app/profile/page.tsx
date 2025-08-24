"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  BookOpen,
  Brain,
  MessageCircle,
  FileText,
  PenTool,
  Trophy,
  Target,
  TrendingUp,
  Award,
} from "lucide-react"

export default function ProfilePage() {
  // Mock user data - in real app this would come from database/API
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinDate: "March 2024",
    overallLevel: "B2",
    totalStudyTime: "127 hours",
    streak: 15,
    skills: {
      reading: { level: "B2", score: 78, progress: 78 },
      writing: { level: "B1", score: 65, progress: 65 },
      listening: { level: "B2", score: 82, progress: 82 },
      speaking: { level: "B1", score: 68, progress: 68 },
    },
    activities: {
      flashcards: { completed: 450, total: 600, accuracy: 85 },
      quizzes: { completed: 28, total: 40, accuracy: 78 },
      conversations: { completed: 15, total: 20, avgRating: 4.2 },
      reading: { completed: 12, total: 18, comprehension: 82 },
      writing: { completed: 8, total: 12, avgScore: 72 },
    },
    achievements: [
      { name: "First Steps", description: "Complete your first lesson", earned: true },
      { name: "Vocabulary Master", description: "Learn 500 new words", earned: true },
      { name: "Quiz Champion", description: "Score 90%+ on 10 quizzes", earned: false },
      { name: "Conversation Pro", description: "Complete 20 AI conversations", earned: false },
      { name: "Reading Expert", description: "Complete all reading passages", earned: false },
    ],
  }

  const cefrLevels = {
    A1: { name: "Beginner", description: "Can understand and use familiar everyday expressions and basic phrases." },
    A2: {
      name: "Elementary",
      description: "Can communicate in simple tasks requiring direct exchange of information.",
    },
    B1: { name: "Intermediate", description: "Can deal with most situations while traveling and express opinions." },
    B2: {
      name: "Upper-Intermediate",
      description: "Can interact fluently with native speakers and understand complex texts.",
    },
    C1: {
      name: "Advanced",
      description: "Can express ideas fluently and use language flexibly for social and professional purposes.",
    },
    C2: {
      name: "Proficient",
      description: "Can understand virtually everything and express themselves spontaneously and precisely.",
    },
  }

  const getSkillColor = (level: string) => {
    const colors = {
      A1: "bg-red-100 text-red-800",
      A2: "bg-orange-100 text-orange-800",
      B1: "bg-yellow-100 text-yellow-800",
      B2: "bg-blue-100 text-blue-800",
      C1: "bg-green-100 text-green-800",
      C2: "bg-purple-100 text-purple-800",
    }
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Track your English learning progress and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{userProfile.name}</CardTitle>
                <p className="text-gray-600">{userProfile.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall Level</span>
                  <Badge className={`${getSkillColor(userProfile.overallLevel)} font-semibold`}>
                    {userProfile.overallLevel} - {cefrLevels[userProfile.overallLevel as keyof typeof cefrLevels]?.name}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Time</span>
                  <span className="font-semibold">{userProfile.totalStudyTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">{userProfile.streak} days 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{userProfile.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* CEFR Level Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  CEFR Levels Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(cefrLevels).map(([level, info]) => (
                  <div key={level} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getSkillColor(level)} text-xs`}>{level}</Badge>
                      <span className="font-medium text-sm">{info.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 ml-12">{info.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Language Skills Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(userProfile.skills).map(([skill, data]) => (
                    <div key={skill} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {skill === "reading" && <FileText className="h-4 w-4 text-blue-600" />}
                          {skill === "writing" && <PenTool className="h-4 w-4 text-green-600" />}
                          {skill === "listening" && <MessageCircle className="h-4 w-4 text-purple-600" />}
                          {skill === "speaking" && <MessageCircle className="h-4 w-4 text-orange-600" />}
                          <span className="font-medium capitalize">{skill}</span>
                        </div>
                        <Badge className={`${getSkillColor(data.level)} text-xs`}>{data.level}</Badge>
                      </div>
                      <Progress value={data.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Score: {data.score}/100</span>
                        <span>{data.progress}% Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Learning Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(userProfile.activities).map(([activity, data]) => (
                    <div key={activity} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {activity === "flashcards" && <Brain className="h-4 w-4 text-blue-600" />}
                          {activity === "quizzes" && <BookOpen className="h-4 w-4 text-green-600" />}
                          {activity === "conversations" && <MessageCircle className="h-4 w-4 text-purple-600" />}
                          {activity === "reading" && <FileText className="h-4 w-4 text-orange-600" />}
                          {activity === "writing" && <PenTool className="h-4 w-4 text-red-600" />}
                          <span className="font-medium capitalize">{activity}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {data.completed}/{data.total}
                        </span>
                      </div>
                      <Progress value={(data.completed / data.total) * 100} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          {"accuracy" in data && `Accuracy: ${data.accuracy}%`}
                          {"avgRating" in data && `Avg Rating: ${data.avgRating}/5`}
                          {"comprehension" in data && `Comprehension: ${data.comprehension}%`}
                          {"avgScore" in data && `Avg Score: ${data.avgScore}%`}
                        </span>
                        <span>{Math.round((data.completed / data.total) * 100)}% Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className={`font-medium ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                            {achievement.name}
                          </h4>
                          <p className={`text-sm ${achievement.earned ? "text-green-600" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
