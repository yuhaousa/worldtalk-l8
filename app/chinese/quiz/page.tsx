"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Trophy, Target } from "lucide-react"
import Link from "next/link"

const chineseQuizGroups = [
  {
    id: "basic-characters-quiz",
    title: "基础汉字测验",
    titleEn: "Basic Characters Quiz",
    description: "测试你对基础汉字的掌握",
    descriptionEn: "Test your knowledge of basic Chinese characters",
    level: "初级",
    levelEn: "Beginner",
    questionsCount: 10,
    bestScore: 80,
    color: "bg-red-500",
  },
  {
    id: "pinyin-quiz",
    title: "拼音测验",
    titleEn: "Pinyin Quiz",
    description: "测试你的拼音知识",
    descriptionEn: "Test your pinyin knowledge",
    level: "初级",
    levelEn: "Beginner",
    questionsCount: 10,
    bestScore: 70,
    color: "bg-orange-500",
  },
  {
    id: "daily-phrases-quiz",
    title: "日常用语测验",
    titleEn: "Daily Phrases Quiz",
    description: "测试常用短语的理解",
    descriptionEn: "Test your understanding of common phrases",
    level: "初级",
    levelEn: "Beginner",
    questionsCount: 10,
    bestScore: 90,
    color: "bg-yellow-500",
  },
  {
    id: "grammar-quiz",
    title: "语法测验",
    titleEn: "Grammar Quiz",
    description: "测试中文语法基础",
    descriptionEn: "Test your Chinese grammar fundamentals",
    level: "中级",
    levelEn: "Intermediate",
    questionsCount: 10,
    bestScore: 60,
    color: "bg-green-500",
  },
  {
    id: "business-chinese-quiz",
    title: "商务中文测验",
    titleEn: "Business Chinese Quiz",
    description: "测试商务场合词汇",
    descriptionEn: "Test business vocabulary",
    level: "高级",
    levelEn: "Advanced",
    questionsCount: 10,
    bestScore: 40,
    color: "bg-blue-500",
  },
  {
    id: "culture-quiz",
    title: "文化常识测验",
    titleEn: "Culture Quiz",
    description: "测试中国文化知识",
    descriptionEn: "Test your knowledge of Chinese culture",
    level: "中级",
    levelEn: "Intermediate",
    questionsCount: 10,
    bestScore: 0,
    color: "bg-purple-500",
  },
]

export default function ChineseQuizPage() {
  const averageScore = Math.round(
    chineseQuizGroups.reduce((acc, quiz) => acc + quiz.bestScore, 0) / chineseQuizGroups.length,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">中文测验</h1>
          <p className="text-lg text-gray-700 mb-1">Chinese Quizzes</p>
          <p className="text-gray-600">选择一个测验来检验你的知识</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Brain className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{chineseQuizGroups.length}</p>
                <p className="text-sm text-gray-600">可用测验 / Available Quizzes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Target className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{chineseQuizGroups.length * 10}</p>
                <p className="text-sm text-gray-600">总题目 / Total Questions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Trophy className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                <p className="text-sm text-gray-600">平均分数 / Average Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chinese Quiz Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseQuizGroups.map((quiz) => (
            <Link key={quiz.id} href={`/chinese/quiz/${quiz.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${quiz.color}`}></div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {quiz.level}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{quiz.title}</CardTitle>
                  <p className="text-sm text-gray-500 mb-1">{quiz.titleEn}</p>
                  <p className="text-sm text-gray-600">{quiz.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{quiz.questionsCount} 道题</span>
                      <span className="text-gray-900 font-medium">
                        最佳: {quiz.bestScore > 0 ? `${quiz.bestScore}%` : "未参加"}
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
