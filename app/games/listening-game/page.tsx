"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react"

const listeningQuestions = [
  {
    id: 1,
    audio: "The weather is beautiful today",
    question: "What did you hear?",
    options: [
      "The weather is beautiful today",
      "The weather is terrible today",
      "The water is beautiful today",
      "The weather was beautiful today",
    ],
    correct: 0,
    difficulty: "A1",
  },
  {
    id: 2,
    audio: "I would like to book a table for two people",
    question: "What is the person trying to do?",
    options: ["Buy a book", "Book a table for two people", "Look at a table", "Book a room for two people"],
    correct: 1,
    difficulty: "A2",
  },
  {
    id: 3,
    audio: "Despite the heavy rain, we managed to reach the destination on time",
    question: "What happened despite the rain?",
    options: ["They were late", "They cancelled the trip", "They reached on time", "They got lost"],
    correct: 2,
    difficulty: "B1",
  },
  {
    id: 4,
    audio: "The presentation that was scheduled for tomorrow has been postponed indefinitely",
    question: "What happened to the presentation?",
    options: [
      "It will happen tomorrow",
      "It was moved to next week",
      "It has been postponed indefinitely",
      "It was cancelled permanently",
    ],
    correct: 2,
    difficulty: "B2",
  },
  {
    id: 5,
    audio: "Had I known about the traffic jam, I would have taken an alternative route",
    question: "What does this sentence express?",
    options: ["A future plan", "A past regret", "A present situation", "A suggestion"],
    correct: 1,
    difficulty: "C1",
  },
]

export default function ListeningGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    if (answerIndex === listeningQuestions[currentQuestion].correct) {
      setScore(score + 20)
    }

    setTimeout(() => {
      if (currentQuestion < listeningQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setGameComplete(false)
  }

  // Auto-play audio when question changes
  useEffect(() => {
    const timer = setTimeout(() => {
      speakText(listeningQuestions[currentQuestion].audio)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentQuestion])

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎧</div>
            <CardTitle className="text-2xl text-green-600">Great Listening!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">You completed all listening exercises!</p>
            <p className="text-3xl font-bold text-pink-600">Score: {score}/100</p>
            <div className="space-y-2">
              <Link href="/games">
                <Button className="w-full">Back to Games</Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent" onClick={resetGame}>
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Games
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Listen & Choose</h1>
              <p className="text-gray-600">Listen carefully and choose the correct answer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-pink-600">{score}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} / {listeningQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / listeningQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
                <Badge variant="outline">{listeningQuestions[currentQuestion].difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Player */}
              <div className="text-center p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                <div className="text-6xl mb-4">🎧</div>
                <Button
                  onClick={() => speakText(listeningQuestions[currentQuestion].audio)}
                  disabled={isPlaying}
                  className="bg-pink-500 hover:bg-pink-600"
                  size="lg"
                >
                  <Volume2 className="h-5 w-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Audio"}
                </Button>
                <p className="text-sm text-gray-600 mt-3">Click to listen to the audio</p>
              </div>

              {/* Question */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {listeningQuestions[currentQuestion].question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {listeningQuestions[currentQuestion].options.map((option, index) => {
                  let buttonClass = "w-full text-left p-4 border-2 transition-all duration-200"

                  if (isAnswered) {
                    if (index === listeningQuestions[currentQuestion].correct) {
                      buttonClass += " bg-green-50 border-green-500 text-green-800"
                    } else if (index === selectedAnswer) {
                      buttonClass += " bg-red-50 border-red-500 text-red-800"
                    } else {
                      buttonClass += " bg-gray-50 border-gray-300 text-gray-600"
                    }
                  } else {
                    buttonClass += " hover:bg-pink-50 hover:border-pink-300 border-gray-300"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswered && index === listeningQuestions[currentQuestion].correct && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {isAnswered &&
                          index === selectedAnswer &&
                          index !== listeningQuestions[currentQuestion].correct && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Replay Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => speakText(listeningQuestions[currentQuestion].audio)}
                  disabled={isPlaying}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Replay Audio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
