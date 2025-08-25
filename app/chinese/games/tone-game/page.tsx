"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

const toneGameData = [
  { id: 1, character: "妈", pinyin: "mā", tone: 1, options: ["mā", "má", "mǎ", "mà"] },
  { id: 2, character: "麻", pinyin: "má", tone: 2, options: ["mā", "má", "mǎ", "mà"] },
  { id: 3, character: "马", pinyin: "mǎ", tone: 3, options: ["mā", "má", "mǎ", "mà"] },
  { id: 4, character: "骂", pinyin: "mà", tone: 4, options: ["mā", "má", "mǎ", "mà"] },
  { id: 5, character: "好", pinyin: "hǎo", tone: 3, options: ["hāo", "háo", "hǎo", "hào"] },
  { id: 6, character: "号", pinyin: "hào", tone: 4, options: ["hāo", "háo", "hǎo", "hào"] },
  { id: 7, character: "水", pinyin: "shuǐ", tone: 3, options: ["shuī", "shuí", "shuǐ", "shuì"] },
  { id: 8, character: "睡", pinyin: "shuì", tone: 4, options: ["shuī", "shuí", "shuǐ", "shuì"] },
]

export default function ToneGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const currentQ = toneGameData[currentQuestion]

  const speakChinese = (text: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "zh-CN"
    utterance.rate = 0.8

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === currentQ.tone - 1) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < toneGameData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameComplete(false)
  }

  if (gameComplete) {
    const percentage = Math.round((score / toneGameData.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">游戏完成！</CardTitle>
              <p className="text-gray-600">Game Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-red-600">{percentage}%</div>
              <p className="text-lg text-gray-700">
                你答对了 {score} / {toneGameData.length} 个声调
              </p>

              <div className="flex justify-center gap-4">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重新开始
                </Button>
                <Link href="/chinese/games">
                  <Button>返回游戏列表</Button>
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
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/chinese/games">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">声调游戏</h1>
            <p className="text-gray-600">Tone Game</p>
            <p className="text-sm text-gray-600">
              题目 {currentQuestion + 1} / {toneGameData.length}
            </p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={((currentQuestion + 1) / toneGameData.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-lg text-gray-900">听音频，选择正确的拼音声调</CardTitle>
            <p className="text-gray-600">Listen to the audio and choose the correct pinyin tone</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-900 mb-4">{currentQ.character}</div>
              <Button
                onClick={() => speakChinese(currentQ.character)}
                size="lg"
                className={`${isSpeaking ? "bg-red-600 animate-pulse" : "bg-red-500 hover:bg-red-600"}`}
              >
                <Volume2 className="h-6 w-6 mr-2" />
                播放音频
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? index === currentQ.tone - 1
                        ? "default"
                        : selectedAnswer === index
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className="h-16 text-2xl font-bold"
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {option}
                  {showResult && index === currentQ.tone - 1 && <CheckCircle className="h-5 w-5 ml-2 text-green-500" />}
                  {showResult && selectedAnswer === index && index !== currentQ.tone - 1 && (
                    <XCircle className="h-5 w-5 ml-2 text-red-500" />
                  )}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  正确答案: <span className="font-bold text-red-600">{currentQ.pinyin}</span>
                </p>
                <p className="text-sm text-gray-600">第{currentQ.tone}声</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">声调说明 Tone Guide:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>第一声 (1st): 高平调 ā</div>
              <div>第二声 (2nd): 上升调 á</div>
              <div>第三声 (3rd): 降升调 ǎ</div>
              <div>第四声 (4th): 下降调 à</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
