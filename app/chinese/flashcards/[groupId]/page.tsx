"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, Volume2, Check, X } from "lucide-react"
import Link from "next/link"

const chineseFlashcardData = {
  "basic-characters": [
    { id: 1, chinese: "你好", pinyin: "nǐ hǎo", english: "hello", known: false },
    { id: 2, chinese: "谢谢", pinyin: "xiè xiè", english: "thank you", known: true },
    { id: 3, chinese: "再见", pinyin: "zài jiàn", english: "goodbye", known: false },
    { id: 4, chinese: "请", pinyin: "qǐng", english: "please", known: false },
    { id: 5, chinese: "对不起", pinyin: "duì bù qǐ", english: "sorry", known: true },
    { id: 6, chinese: "是", pinyin: "shì", english: "yes/to be", known: false },
    { id: 7, chinese: "不", pinyin: "bù", english: "no/not", known: false },
    { id: 8, chinese: "我", pinyin: "wǒ", english: "I/me", known: true },
    { id: 9, chinese: "你", pinyin: "nǐ", english: "you", known: false },
    { id: 10, chinese: "他", pinyin: "tā", english: "he/him", known: false },
  ],
  "daily-phrases": [
    { id: 1, chinese: "早上好", pinyin: "zǎo shàng hǎo", english: "good morning", known: false },
    { id: 2, chinese: "晚上好", pinyin: "wǎn shàng hǎo", english: "good evening", known: false },
    { id: 3, chinese: "吃饭了吗", pinyin: "chī fàn le ma", english: "have you eaten?", known: false },
    { id: 4, chinese: "多少钱", pinyin: "duō shǎo qián", english: "how much?", known: true },
    { id: 5, chinese: "在哪里", pinyin: "zài nǎ lǐ", english: "where is it?", known: false },
    { id: 6, chinese: "不客气", pinyin: "bù kè qì", english: "you're welcome", known: false },
    { id: 7, chinese: "没关系", pinyin: "méi guān xì", english: "it's okay", known: true },
    { id: 8, chinese: "慢走", pinyin: "màn zǒu", english: "take care", known: false },
    { id: 9, chinese: "小心", pinyin: "xiǎo xīn", english: "be careful", known: false },
    { id: 10, chinese: "加油", pinyin: "jiā yóu", english: "keep going/good luck", known: false },
  ],
}

export default function ChineseFlashcardGroupPage({ params }: { params: { groupId: string } }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flashcards, setFlashcards] = useState(
    chineseFlashcardData[params.groupId as keyof typeof chineseFlashcardData] || [],
  )
  const [isSpeaking, setIsSpeaking] = useState(false)

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100
  const knownCount = flashcards.filter((card) => card.known).length

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

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const markAsKnown = (known: boolean) => {
    const updatedCards = flashcards.map((card, index) => (index === currentIndex ? { ...card, known } : card))
    setFlashcards(updatedCards)

    setTimeout(() => {
      nextCard()
    }, 500)
  }

  const resetProgress = () => {
    const resetCards = flashcards.map((card) => ({ ...card, known: false }))
    setFlashcards(resetCards)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">词汇组未找到</h1>
          <Link href="/chinese/flashcards">
            <Button>返回词汇卡片</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/chinese/flashcards">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">中文词汇卡片</h1>
            <p className="text-sm text-gray-600">
              {currentIndex + 1} / {flashcards.length} • {knownCount} 已掌握
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetProgress}>
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <Card
            className="h-80 cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
              {!isFlipped ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <h2 className="text-4xl font-bold text-gray-900">{currentCard.chinese}</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        speakChinese(currentCard.chinese)
                      }}
                      className={`p-2 ${isSpeaking ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-red-500"}`}
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xl text-gray-600">{currentCard.pinyin}</p>
                  <p className="text-gray-500">点击翻转查看英文</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">{currentCard.english}</h2>
                  <div className="space-y-2">
                    <p className="text-xl text-gray-700">{currentCard.chinese}</p>
                    <p className="text-lg text-gray-600">{currentCard.pinyin}</p>
                  </div>
                  <p className="text-gray-500">点击翻转查看中文</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => markAsKnown(false)}
            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            不认识
          </Button>
          <Button onClick={() => markAsKnown(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Check className="h-4 w-4" />
            认识
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
            上一个
          </Button>
          <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
            下一个
          </Button>
        </div>

        {/* Completion Message */}
        {currentIndex === flashcards.length - 1 && (
          <div className="mt-8 text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">学习完成！</h3>
            <p className="text-gray-600 mb-4">
              你已经完成了这组词汇的学习。已掌握 {knownCount} / {flashcards.length} 个词汇。
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={resetProgress} variant="outline">
                重新学习
              </Button>
              <Link href="/chinese/flashcards">
                <Button>选择其他组</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
