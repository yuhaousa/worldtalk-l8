"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Target, CheckCircle, AlertCircle, Lightbulb } from "lucide-react"
import Link from "next/link"

const chineseWritingData = {
  "self-introduction": {
    title: "自我介绍",
    titleEn: "Self Introduction",
    description: "介绍你自己，包括姓名、年龄、爱好等",
    descriptionEn: "Introduce yourself, including name, age, hobbies, etc.",
    level: "HSK1",
    timeLimit: 15,
    characterTarget: 50,
    tips: ["使用简单的句子结构", "包含基本信息：姓名、年龄、国籍", "提到你的爱好或兴趣", "使用礼貌的开头和结尾"],
    tipsEn: [
      "Use simple sentence structures",
      "Include basic information: name, age, nationality",
      "Mention your hobbies or interests",
      "Use polite opening and closing",
    ],
    sampleText: "大家好！我叫张明，今年二十岁。我是美国人，现在在中国学习中文。我喜欢看书和听音乐。很高兴认识大家！",
  },
  "my-family": {
    title: "我的家庭",
    titleEn: "My Family",
    description: "描述你的家庭成员和家庭生活",
    descriptionEn: "Describe your family members and family life",
    level: "HSK1",
    timeLimit: 20,
    characterTarget: 80,
    tips: ["介绍家庭成员的关系", "描述每个人的基本信息", "提到家庭活动或传统", "表达对家庭的感情"],
    tipsEn: [
      "Introduce family member relationships",
      "Describe basic information about each person",
      "Mention family activities or traditions",
      "Express feelings about your family",
    ],
    sampleText:
      "我家有四个人：爸爸、妈妈、弟弟和我。爸爸是医生，妈妈是老师。弟弟今年十六岁，还在上高中。我们一家人很幸福。",
  },
}

export default function ChineseWritingPromptPage({ params }: { params: { promptId: string } }) {
  const [essay, setEssay] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)

  const prompt = chineseWritingData[params.promptId as keyof typeof chineseWritingData]

  useEffect(() => {
    if (prompt) {
      setTimeLeft(prompt.timeLimit * 60) // Convert minutes to seconds
    }
  }, [prompt])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false)
      handleSubmit()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft])

  const startTimer = () => {
    setIsTimerActive(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getCharacterCount = () => {
    return essay.length
  }

  const handleSubmit = () => {
    setIsTimerActive(false)

    // Generate mock feedback
    const characterCount = getCharacterCount()
    const targetMet = characterCount >= prompt.characterTarget
    const score = Math.min(100, Math.max(60, 70 + (characterCount / prompt.characterTarget) * 20))

    setFeedback({
      score: Math.round(score),
      characterCount,
      targetMet,
      strengths: ["使用了适当的词汇", "句子结构清晰", "内容符合主题要求"],
      improvements: ["可以增加更多细节描述", "注意标点符号的使用", "尝试使用更丰富的表达方式"],
    })
    setShowFeedback(true)
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">写作题目未找到</h1>
          <Link href="/chinese/writing">
            <Button>返回写作练习</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (showFeedback && feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">写作完成！</CardTitle>
              <p className="text-gray-600">Writing Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-2">{feedback.score}%</div>
                <p className="text-lg text-gray-700">
                  字数: {feedback.characterCount} / {prompt.characterTarget}
                  {feedback.targetMet ? (
                    <CheckCircle className="inline h-5 w-5 text-green-500 ml-2" />
                  ) : (
                    <AlertCircle className="inline h-5 w-5 text-orange-500 ml-2" />
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      优点 / Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      改进建议 / Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">你的作文 / Your Essay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{essay}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                  重新写作
                </Button>
                <Link href="/chinese/writing">
                  <Button>返回写作练习</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/chinese/writing">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{prompt.title}</h1>
            <p className="text-gray-600">{prompt.titleEn}</p>
            <Badge className="mt-2">{prompt.level}</Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
            <p className="text-sm text-gray-600">剩余时间</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Writing Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>写作区域</span>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {getCharacterCount()}/{prompt.characterTarget} 字
                    </div>
                    <Progress value={(getCharacterCount() / prompt.characterTarget) * 100} className="w-20 h-2" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="在这里开始写作..."
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  className="min-h-96 text-lg leading-relaxed resize-none"
                  disabled={showFeedback}
                />

                <div className="flex justify-between items-center mt-4">
                  {!isTimerActive && !showFeedback && (
                    <Button onClick={startTimer} size="lg">
                      开始计时写作
                    </Button>
                  )}
                  {isTimerActive && (
                    <Button onClick={handleSubmit} variant="outline">
                      提前提交
                    </Button>
                  )}
                  <div className="text-sm text-gray-600">字数统计: {getCharacterCount()} 字</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions and Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">写作要求</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
                  <p className="text-sm text-gray-500">{prompt.descriptionEn}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-red-500" />
                    {prompt.timeLimit} 分钟
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-orange-500" />
                    {prompt.characterTarget} 字
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  写作提示
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prompt.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">参考示例</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-800 leading-relaxed">{prompt.sampleText}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
