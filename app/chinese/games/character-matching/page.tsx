"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

const characterMatchingData = [
  { id: 1, character: "你", pinyin: "nǐ", english: "you", matched: false },
  { id: 2, character: "好", pinyin: "hǎo", english: "good", matched: false },
  { id: 3, character: "我", pinyin: "wǒ", english: "I/me", matched: false },
  { id: 4, character: "是", pinyin: "shì", english: "to be", matched: false },
  { id: 5, character: "的", pinyin: "de", english: "possessive particle", matched: false },
  { id: 6, character: "不", pinyin: "bù", english: "not", matched: false },
  { id: 7, character: "在", pinyin: "zài", english: "at/in", matched: false },
  { id: 8, character: "有", pinyin: "yǒu", english: "to have", matched: false },
]

export default function CharacterMatchingGame() {
  const [gameData, setGameData] = useState(characterMatchingData)
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [selectedTranslation, setSelectedTranslation] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showMode, setShowMode] = useState<"pinyin" | "english">("pinyin")
  const [isSpeaking, setIsSpeaking] = useState(false)

  const shuffledTranslations = [...gameData].sort(() => Math.random() - 0.5)

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

  const handleCharacterClick = (id: number) => {
    if (gameData.find((item) => item.id === id)?.matched) return
    setSelectedCharacter(id)
  }

  const handleTranslationClick = (id: number) => {
    if (gameData.find((item) => item.id === id)?.matched) return
    setSelectedTranslation(id)
  }

  useEffect(() => {
    if (selectedCharacter && selectedTranslation) {
      if (selectedCharacter === selectedTranslation) {
        // Correct match
        setGameData((prev) => prev.map((item) => (item.id === selectedCharacter ? { ...item, matched: true } : item)))
        setScore((prev) => prev + 1)
      }

      setTimeout(() => {
        setSelectedCharacter(null)
        setSelectedTranslation(null)
      }, 1000)
    }
  }, [selectedCharacter, selectedTranslation])

  useEffect(() => {
    if (gameData.every((item) => item.matched)) {
      setGameComplete(true)
    }
  }, [gameData])

  const resetGame = () => {
    setGameData(characterMatchingData.map((item) => ({ ...item, matched: false })))
    setSelectedCharacter(null)
    setSelectedTranslation(null)
    setScore(0)
    setGameComplete(false)
  }

  const progress = (score / gameData.length) * 100

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">游戏完成！</CardTitle>
              <p className="text-gray-600">Game Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-red-600">{Math.round((score / gameData.length) * 100)}%</div>
              <p className="text-lg text-gray-700">
                你成功配对了 {score} / {gameData.length} 个汉字
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
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/chinese/games">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">汉字配对游戏</h1>
            <p className="text-gray-600">Character Matching Game</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showMode === "pinyin" ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMode("pinyin")}
            >
              拼音
            </Button>
            <Button
              variant={showMode === "english" ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMode("english")}
            >
              英文
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">进度</span>
            <span className="text-sm font-medium">
              {score} / {gameData.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Game Instructions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <p className="text-center text-gray-700">
              点击汉字，然后点击对应的{showMode === "pinyin" ? "拼音" : "英文翻译"}进行配对
            </p>
          </CardContent>
        </Card>

        {/* Game Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Characters Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">汉字 Characters</h3>
            <div className="grid grid-cols-2 gap-3">
              {gameData.map((item) => (
                <Card
                  key={`char-${item.id}`}
                  className={`cursor-pointer transition-all duration-200 ${
                    item.matched
                      ? "bg-green-100 border-green-300"
                      : selectedCharacter === item.id
                        ? "bg-red-100 border-red-300 scale-105"
                        : "hover:bg-gray-50 hover:scale-105"
                  }`}
                  onClick={() => handleCharacterClick(item.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold">{item.character}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          speakChinese(item.character)
                        }}
                        className="p-1"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.matched && <CheckCircle className="h-5 w-5 text-green-500 mx-auto mt-2" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Translations Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {showMode === "pinyin" ? "拼音 Pinyin" : "英文 English"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {shuffledTranslations.map((item) => (
                <Card
                  key={`trans-${item.id}`}
                  className={`cursor-pointer transition-all duration-200 ${
                    item.matched
                      ? "bg-green-100 border-green-300"
                      : selectedTranslation === item.id
                        ? "bg-red-100 border-red-300 scale-105"
                        : "hover:bg-gray-50 hover:scale-105"
                  }`}
                  onClick={() => handleTranslationClick(item.id)}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-lg font-medium">{showMode === "pinyin" ? item.pinyin : item.english}</span>
                    {item.matched && <CheckCircle className="h-5 w-5 text-green-500 mx-auto mt-2" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Match Feedback */}
        {selectedCharacter && selectedTranslation && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                {selectedCharacter === selectedTranslation ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-700 font-medium">正确！</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700 font-medium">再试一次</span>
                  </>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
