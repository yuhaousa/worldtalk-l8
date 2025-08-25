"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Users } from "lucide-react"
import Link from "next/link"

const chineseFlashcardGroups = [
  {
    id: "basic-characters",
    title: "基础汉字",
    titleEn: "Basic Characters",
    description: "最常用的汉字学习",
    descriptionEn: "Most commonly used Chinese characters",
    level: "初级",
    levelEn: "Beginner",
    wordsCount: 10,
    progress: 70,
    color: "bg-red-500",
  },
  {
    id: "daily-phrases",
    title: "日常用语",
    titleEn: "Daily Phrases",
    description: "日常生活中的常用短语",
    descriptionEn: "Common phrases for daily life",
    level: "初级",
    levelEn: "Beginner",
    wordsCount: 10,
    progress: 50,
    color: "bg-orange-500",
  },
  {
    id: "numbers-time",
    title: "数字时间",
    titleEn: "Numbers & Time",
    description: "数字、时间相关词汇",
    descriptionEn: "Numbers and time-related vocabulary",
    level: "初级",
    levelEn: "Beginner",
    wordsCount: 10,
    progress: 80,
    color: "bg-yellow-500",
  },
  {
    id: "food-drinks",
    title: "食物饮品",
    titleEn: "Food & Drinks",
    description: "餐厅、食物相关词汇",
    descriptionEn: "Restaurant and food-related vocabulary",
    level: "中级",
    levelEn: "Intermediate",
    wordsCount: 10,
    progress: 30,
    color: "bg-green-500",
  },
  {
    id: "family-relationships",
    title: "家庭关系",
    titleEn: "Family & Relationships",
    description: "家庭成员和人际关系",
    descriptionEn: "Family members and relationships",
    level: "初级",
    levelEn: "Beginner",
    wordsCount: 10,
    progress: 90,
    color: "bg-blue-500",
  },
  {
    id: "business-chinese",
    title: "商务中文",
    titleEn: "Business Chinese",
    description: "商务场合常用词汇",
    descriptionEn: "Common business vocabulary",
    level: "高级",
    levelEn: "Advanced",
    wordsCount: 10,
    progress: 10,
    color: "bg-purple-500",
  },
]

export default function ChineseFlashcardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">中文词汇卡片</h1>
          <p className="text-lg text-gray-700 mb-1">Chinese Vocabulary Flashcards</p>
          <p className="text-gray-600">选择一个组开始学习新词汇</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <BookOpen className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{chineseFlashcardGroups.length}</p>
                <p className="text-sm text-gray-600">可用组别 / Available Groups</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{chineseFlashcardGroups.length * 10}</p>
                <p className="text-sm text-gray-600">总词汇 / Total Words</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    chineseFlashcardGroups.reduce((acc, group) => acc + group.progress, 0) /
                      chineseFlashcardGroups.length,
                  )}
                  %
                </p>
                <p className="text-sm text-gray-600">总体进度 / Overall Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chinese Flashcard Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseFlashcardGroups.map((group) => (
            <Link key={group.id} href={`/chinese/flashcards/${group.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {group.level}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{group.title}</CardTitle>
                  <p className="text-sm text-gray-500 mb-1">{group.titleEn}</p>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{group.wordsCount} 个词汇</span>
                      <span className="text-gray-900 font-medium">{group.progress}% 完成</span>
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
