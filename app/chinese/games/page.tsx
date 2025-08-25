import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Star, Clock, Target } from "lucide-react"

const chineseGames = [
  {
    id: "character-matching",
    title: "汉字配对",
    titleEn: "Character Matching",
    description: "将汉字与拼音或英文意思配对",
    descriptionEn: "Match Chinese characters with pinyin or English meanings",
    difficulty: "HSK1-HSK2",
    duration: "5-10 分钟",
    durationEn: "5-10 min",
    type: "词汇",
    typeEn: "Vocabulary",
    color: "bg-red-500",
    icon: "🀄",
  },
  {
    id: "pinyin-puzzle",
    title: "拼音拼图",
    titleEn: "Pinyin Puzzle",
    description: "根据拼音拼出正确的汉字",
    descriptionEn: "Spell Chinese characters based on pinyin",
    difficulty: "HSK1-HSK2",
    duration: "3-7 分钟",
    durationEn: "3-7 min",
    type: "拼音",
    typeEn: "Pinyin",
    color: "bg-orange-500",
    icon: "🧩",
  },
  {
    id: "stroke-order",
    title: "笔画顺序",
    titleEn: "Stroke Order",
    description: "学习正确的汉字笔画顺序",
    descriptionEn: "Learn correct Chinese character stroke order",
    difficulty: "HSK1-HSK3",
    duration: "5-8 分钟",
    durationEn: "5-8 min",
    type: "书写",
    typeEn: "Writing",
    color: "bg-yellow-500",
    icon: "✍️",
  },
  {
    id: "sentence-puzzle",
    title: "句子拼图",
    titleEn: "Sentence Puzzle",
    description: "重新排列词语组成正确的中文句子",
    descriptionEn: "Rearrange words to form correct Chinese sentences",
    difficulty: "HSK2-HSK3",
    duration: "8-12 分钟",
    durationEn: "8-12 min",
    type: "语法",
    typeEn: "Grammar",
    color: "bg-green-500",
    icon: "🔧",
  },
  {
    id: "tone-game",
    title: "声调游戏",
    titleEn: "Tone Game",
    description: "听音频选择正确的声调",
    descriptionEn: "Listen to audio and choose the correct tone",
    difficulty: "HSK1-HSK2",
    duration: "6-10 分钟",
    durationEn: "6-10 min",
    type: "听力",
    typeEn: "Listening",
    color: "bg-blue-500",
    icon: "🎵",
  },
  {
    id: "radical-hunt",
    title: "部首寻宝",
    titleEn: "Radical Hunt",
    description: "找出汉字中的部首和偏旁",
    descriptionEn: "Find radicals and components in Chinese characters",
    difficulty: "HSK2-HSK4",
    duration: "4-8 分钟",
    durationEn: "4-8 min",
    type: "汉字",
    typeEn: "Characters",
    color: "bg-purple-500",
    icon: "🔍",
  },
]

export default function ChineseGamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              首页
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">中文学习游戏</h1>
            <p className="text-lg text-gray-700 mb-1">Chinese Learning Games</p>
            <p className="text-gray-600 mt-2">通过互动游戏让中文学习变得有趣而引人入胜</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-sm text-gray-600">可用游戏 / Available Games</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">已完成游戏 / Games Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0小时</p>
                  <p className="text-sm text-gray-600">游戏时间 / Time Played</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chinese Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseGames.map((game) => (
            <Link key={game.id} href={`/chinese/games/${game.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {game.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-red-600 transition-colors">{game.title}</CardTitle>
                  <p className="text-sm text-gray-500 mb-2">{game.titleEn}</p>
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
                  <Button className="w-full group-hover:bg-red-600 transition-colors">
                    <Play className="h-4 w-4 mr-2" />
                    开始游戏
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
