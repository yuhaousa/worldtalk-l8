import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, BookOpen, Star, CheckCircle } from "lucide-react"

const chineseReadingPassages = [
  {
    id: "beginner-1",
    title: "我的一天",
    titleEn: "My Day",
    level: "HSK1",
    difficulty: "初级",
    difficultyEn: "Beginner",
    duration: "5 分钟",
    durationEn: "5 min",
    description: "简单的日常生活描述",
    descriptionEn: "Simple description of daily life",
    progress: 100,
    completed: true,
    rating: 4.8,
    topics: ["日常生活", "时间"],
    topicsEn: ["Daily Life", "Time"],
  },
  {
    id: "beginner-2",
    title: "我的家庭",
    titleEn: "My Family",
    level: "HSK1",
    difficulty: "初级",
    difficultyEn: "Beginner",
    duration: "4 分钟",
    durationEn: "4 min",
    description: "介绍家庭成员和关系",
    descriptionEn: "Introduction to family members and relationships",
    progress: 0,
    completed: false,
    rating: 4.9,
    topics: ["家庭", "人际关系"],
    topicsEn: ["Family", "Relationships"],
  },
  {
    id: "elementary-1",
    title: "在餐厅",
    titleEn: "At the Restaurant",
    level: "HSK2",
    difficulty: "初中级",
    difficultyEn: "Elementary",
    duration: "7 分钟",
    durationEn: "7 min",
    description: "餐厅点餐的对话",
    descriptionEn: "Dialogue about ordering food at a restaurant",
    progress: 60,
    completed: false,
    rating: 4.7,
    topics: ["食物", "餐厅"],
    topicsEn: ["Food", "Restaurant"],
  },
  {
    id: "elementary-2",
    title: "购物经历",
    titleEn: "Shopping Experience",
    level: "HSK2",
    difficulty: "初中级",
    difficultyEn: "Elementary",
    duration: "6 分钟",
    durationEn: "6 min",
    description: "在商店购买衣服的故事",
    descriptionEn: "Story about buying clothes at a store",
    progress: 0,
    completed: false,
    rating: 4.6,
    topics: ["购物", "衣服"],
    topicsEn: ["Shopping", "Clothes"],
  },
  {
    id: "intermediate-1",
    title: "中国传统节日",
    titleEn: "Chinese Traditional Festivals",
    level: "HSK3",
    difficulty: "中级",
    difficultyEn: "Intermediate",
    duration: "10 分钟",
    durationEn: "10 min",
    description: "介绍春节和中秋节的文化",
    descriptionEn: "Introduction to Spring Festival and Mid-Autumn Festival culture",
    progress: 30,
    completed: false,
    rating: 4.5,
    topics: ["文化", "节日"],
    topicsEn: ["Culture", "Festivals"],
  },
  {
    id: "intermediate-2",
    title: "现代科技生活",
    titleEn: "Modern Technology Life",
    level: "HSK4",
    difficulty: "中高级",
    difficultyEn: "Upper-Intermediate",
    duration: "12 分钟",
    durationEn: "12 min",
    description: "科技如何改变我们的生活方式",
    descriptionEn: "How technology changes our lifestyle",
    progress: 0,
    completed: false,
    rating: 4.4,
    topics: ["科技", "生活"],
    topicsEn: ["Technology", "Life"],
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "初级":
      return "bg-green-100 text-green-800"
    case "初中级":
      return "bg-blue-100 text-blue-800"
    case "中级":
      return "bg-orange-100 text-orange-800"
    case "中高级":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ChineseReadingPage() {
  const completedCount = chineseReadingPassages.filter((p) => p.completed).length
  const totalCount = chineseReadingPassages.length
  const averageProgress = Math.round(chineseReadingPassages.reduce((sum, p) => sum + p.progress, 0) / totalCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">中文阅读理解</h1>
            <p className="text-lg text-gray-700 mb-1">Chinese Reading Comprehension</p>
            <p className="text-gray-600 mt-1">通过有趣的故事和文章提高你的中文水平</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCount}/{totalCount}
                  </p>
                  <p className="text-sm text-gray-600">已完成文章 / Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                  <p className="text-sm text-gray-600">平均进度 / Average Progress</p>
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
                  <p className="text-sm text-gray-600">平均评分 / Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chinese Reading Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseReadingPassages.map((passage) => (
            <Link key={passage.id} href={`/chinese/reading/${passage.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{passage.title}</CardTitle>
                      <p className="text-sm text-gray-500 mb-2">{passage.titleEn}</p>
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
                      {passage.topics.map((topic, index) => (
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
                        <span className="text-gray-600">进度</span>
                        <span className="font-medium">{passage.progress}%</span>
                      </div>
                      <Progress value={passage.progress} className="h-2" />
                    </div>

                    {/* Action Button */}
                    <Button className="w-full pointer-events-none" variant={passage.completed ? "outline" : "default"}>
                      {passage.progress === 0 ? "开始阅读" : passage.completed ? "复习" : "继续"}
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
