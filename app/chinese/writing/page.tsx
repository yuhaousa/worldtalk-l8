"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PenTool, Clock, Target, CheckCircle, Star } from "lucide-react"

const chineseWritingPrompts = [
  {
    id: "self-introduction",
    title: "自我介绍",
    titleEn: "Self Introduction",
    description: "介绍你自己，包括姓名、年龄、爱好等",
    descriptionEn: "Introduce yourself, including name, age, hobbies, etc.",
    level: "HSK1",
    timeLimit: 15,
    characterTarget: 50,
    completed: true,
    score: 85,
  },
  {
    id: "my-family",
    title: "我的家庭",
    titleEn: "My Family",
    description: "描述你的家庭成员和家庭生活",
    descriptionEn: "Describe your family members and family life",
    level: "HSK1",
    timeLimit: 20,
    characterTarget: 80,
    completed: true,
    score: 92,
  },
  {
    id: "daily-life",
    title: "我的一天",
    titleEn: "My Day",
    description: "写一写你一天的生活安排",
    descriptionEn: "Write about your daily schedule",
    level: "HSK2",
    timeLimit: 25,
    characterTarget: 120,
    completed: false,
    score: null,
  },
  {
    id: "favorite-food",
    title: "我最喜欢的食物",
    titleEn: "My Favorite Food",
    description: "介绍你最喜欢的中国菜或食物",
    descriptionEn: "Introduce your favorite Chinese dish or food",
    level: "HSK2",
    timeLimit: 25,
    characterTarget: 100,
    completed: false,
    score: null,
  },
  {
    id: "travel-experience",
    title: "旅行经历",
    titleEn: "Travel Experience",
    description: "描述一次难忘的旅行经历",
    descriptionEn: "Describe a memorable travel experience",
    level: "HSK3",
    timeLimit: 30,
    characterTarget: 200,
    completed: false,
    score: null,
  },
  {
    id: "chinese-culture",
    title: "中国文化",
    titleEn: "Chinese Culture",
    description: "谈谈你对中国文化的理解和感受",
    descriptionEn: "Talk about your understanding and feelings about Chinese culture",
    level: "HSK4",
    timeLimit: 35,
    characterTarget: 300,
    completed: false,
    score: null,
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "HSK1":
      return "bg-green-100 text-green-800"
    case "HSK2":
      return "bg-blue-100 text-blue-800"
    case "HSK3":
      return "bg-orange-100 text-orange-800"
    case "HSK4":
      return "bg-red-100 text-red-800"
    case "HSK5":
      return "bg-purple-100 text-purple-800"
    case "HSK6":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ChineseWritingPage() {
  const completedPrompts = chineseWritingPrompts.filter((prompt) => prompt.completed).length
  const totalPrompts = chineseWritingPrompts.length
  const averageScore =
    chineseWritingPrompts
      .filter((prompt) => prompt.score !== null)
      .reduce((sum, prompt) => sum + (prompt.score || 0), 0) / completedPrompts || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PenTool className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">中文写作练习</h1>
          </div>
          <p className="text-lg text-gray-700 mb-2">Chinese Writing Practice</p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">通过引导式写作提示提高你的中文写作技能</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                进度 / Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>已完成</span>
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
                平均分数 / Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{averageScore.toFixed(0)}%</div>
              <p className="text-sm text-gray-600">基于 {completedPrompts} 篇作文</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                下一个目标 / Next Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-gray-900">完成 HSK2 级别</div>
              <p className="text-sm text-gray-600">还需 2 篇作文</p>
            </CardContent>
          </Card>
        </div>

        {/* Chinese Writing Prompts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseWritingPrompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{prompt.title}</CardTitle>
                    <p className="text-sm text-gray-500 mb-2">{prompt.titleEn}</p>
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
                      {prompt.timeLimit}分钟
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {prompt.characterTarget}字
                    </div>
                  </div>

                  {prompt.completed && prompt.score && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">分数</span>
                        <span className="text-lg font-bold text-green-600">{prompt.score}%</span>
                      </div>
                    </div>
                  )}

                  <Link href={`/chinese/writing/${prompt.id}`}>
                    <Button className="w-full" variant={prompt.completed ? "outline" : "default"}>
                      {prompt.completed ? "查看作文" : "开始写作"}
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
