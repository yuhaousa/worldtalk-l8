"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

const chineseQuizData = {
  "basic-characters-quiz": [
    {
      id: 1,
      question: "这个汉字的意思是什么？",
      questionEn: "What does this Chinese character mean?",
      character: "水",
      options: ["water", "fire", "earth", "air"],
      correct: 0,
      explanation: "水 (shuǐ) 意思是水，是最基本的汉字之一。",
      explanationEn: "水 (shuǐ) means water, one of the most basic Chinese characters.",
    },
    {
      id: 2,
      question: "选择正确的拼音：",
      questionEn: "Choose the correct pinyin:",
      character: "你好",
      options: ["nǐ hǎo", "nǐ hào", "ní hǎo", "nǐ háo"],
      correct: 0,
      explanation: "你好的正确拼音是 nǐ hǎo，意思是 hello。",
      explanationEn: "The correct pinyin for 你好 is nǐ hǎo, meaning hello.",
    },
    {
      id: 3,
      question: "这个汉字怎么读？",
      questionEn: "How do you pronounce this character?",
      character: "中",
      options: ["zhōng", "chōng", "zōng", "cōng"],
      correct: 0,
      explanation: "中 读作 zhōng，意思是中间或中国。",
      explanationEn: "中 is pronounced zhōng, meaning middle or China.",
    },
    {
      id: 4,
      question: "选择正确的英文翻译：",
      questionEn: "Choose the correct English translation:",
      character: "谢谢",
      options: ["thank you", "goodbye", "hello", "please"],
      correct: 0,
      explanation: "谢谢 (xiè xiè) 意思是 thank you。",
      explanationEn: "谢谢 (xiè xiè) means thank you.",
    },
    {
      id: 5,
      question: "这个词的意思是什么？",
      questionEn: "What does this word mean?",
      character: "朋友",
      options: ["friend", "family", "teacher", "student"],
      correct: 0,
      explanation: "朋友 (péng yǒu) 意思是朋友。",
      explanationEn: "朋友 (péng yǒu) means friend.",
    },
  ],
  "pinyin-quiz": [
    {
      id: 1,
      question: "选择正确的声调：",
      questionEn: "Choose the correct tone:",
      character: "妈妈",
      options: ["mā ma", "má ma", "mǎ ma", "mà ma"],
      correct: 0,
      explanation: "妈妈的正确拼音是 mā ma，第一声和轻声。",
      explanationEn: "The correct pinyin for 妈妈 is mā ma, first tone and neutral tone.",
    },
    {
      id: 2,
      question: "这个拼音对应哪个汉字？",
      questionEn: "Which character corresponds to this pinyin?",
      character: "xiǎo",
      options: ["小", "笑", "校", "效"],
      correct: 0,
      explanation: "xiǎo (第三声) 对应汉字 '小'，意思是小的。",
      explanationEn: "xiǎo (third tone) corresponds to '小', meaning small.",
    },
  ],
}

export default function ChineseQuizDetailPage({ params }: { params: { quizId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const questions = chineseQuizData[params.quizId as keyof typeof chineseQuizData] || []
  const currentQ = questions[currentQuestion]

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
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  if (!currentQ && !showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">测验未找到</h1>
          <Link href="/chinese/quiz">
            <Button>返回测验列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">测验完成！</CardTitle>
              <p className="text-gray-600">Quiz Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-blue-600">{percentage}%</div>
              <p className="text-lg text-gray-700">
                你答对了 {score} / {questions.length} 道题
              </p>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="text-left p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {answers[index] === q.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium">题目 {index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{q.question}</p>
                    <p className="text-sm text-gray-500 mb-2">{q.questionEn}</p>
                    {q.character && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold">{q.character}</span>
                        <Button variant="ghost" size="sm" onClick={() => speakChinese(q.character)} className="p-1">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-green-700 mb-1">{q.explanation}</p>
                    <p className="text-sm text-green-600">{q.explanationEn}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={resetQuiz} variant="outline">
                  重新测验
                </Button>
                <Link href="/chinese/quiz">
                  <Button>返回测验列表</Button>
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
          <Link href="/chinese/quiz">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">中文测验</h1>
            <p className="text-sm text-gray-600">
              题目 {currentQuestion + 1} / {questions.length}
            </p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">{currentQ.question}</CardTitle>
            <p className="text-gray-600">{currentQ.questionEn}</p>
            {currentQ.character && (
              <div className="flex items-center justify-center gap-3 py-4">
                <span className="text-4xl font-bold text-gray-900">{currentQ.character}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakChinese(currentQ.character)}
                  className={`p-2 ${isSpeaking ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-red-500"}`}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Button */}
        <div className="flex justify-center">
          <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} size="lg">
            {currentQuestion < questions.length - 1 ? "下一题" : "完成测验"}
          </Button>
        </div>
      </div>
    </div>
  )
}
