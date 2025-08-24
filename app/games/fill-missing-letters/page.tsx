"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Trophy, Volume2 } from "lucide-react"

const words = [
  {
    id: 1,
    word: "APPLE",
    definition: "A red or green fruit",
    missing: [1, 3], // Missing P and L
    display: "A_P_E",
    difficulty: "A1",
    hint: "It's a common fruit that grows on trees",
  },
  {
    id: 2,
    word: "HOUSE",
    definition: "A place where people live",
    missing: [1, 4], // Missing O and E
    display: "H_US_",
    difficulty: "A1",
    hint: "People live in this building",
  },
  {
    id: 3,
    word: "SCHOOL",
    definition: "A place where children learn",
    missing: [2, 5], // Missing H and L
    display: "SC_OO_",
    difficulty: "A1",
    hint: "Children go here to study and learn",
  },
  {
    id: 4,
    word: "BEAUTIFUL",
    definition: "Very pretty or attractive",
    missing: [2, 5, 7], // Missing A, T, F
    display: "BE_U_I_UL",
    difficulty: "A2",
    hint: "This word describes something very pretty",
  },
  {
    id: 5,
    word: "COMPUTER",
    definition: "An electronic device for processing data",
    missing: [1, 4, 6], // Missing O, P, T
    display: "C_M_U_ER",
    difficulty: "A2",
    hint: "You use this electronic device to work or play games",
  },
  {
    id: 6,
    word: "RESTAURANT",
    definition: "A place where you can buy and eat meals",
    missing: [1, 4, 7, 9], // Missing E, A, R, N
    display: "R_ST_U_A_T",
    difficulty: "B1",
    hint: "You go here to eat meals prepared by chefs",
  },
]

export default function FillMissingLettersGame() {
  const [currentWord, setCurrentWord] = useState(0)
  const [userInputs, setUserInputs] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    resetWord()
  }, [currentWord])

  const resetWord = () => {
    const word = words[currentWord]
    setUserInputs(new Array(word.missing.length).fill(""))
    setIsComplete(false)
    setIsCorrect(null)
    setShowHint(false)
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newInputs = [...userInputs]
      newInputs[index] = value.toUpperCase()
      setUserInputs(newInputs)

      // Auto-focus next input
      if (value && index < userInputs.length - 1) {
        const nextInput = document.getElementById(`input-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const checkAnswer = () => {
    const word = words[currentWord]
    const correctLetters = word.missing.map((pos) => word.word[pos])
    const isAnswerCorrect = userInputs.every((input, index) => input === correctLetters[index])

    setIsCorrect(isAnswerCorrect)
    setIsComplete(true)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }
  }

  const nextWord = () => {
    if (currentWord < words.length - 1) {
      setCurrentWord(currentWord + 1)
    } else {
      setGameComplete(true)
    }
  }

  const restartGame = () => {
    setCurrentWord(0)
    setScore(0)
    setGameComplete(false)
    resetWord()
  }

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(words[currentWord].word.toLowerCase())
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const renderWordWithBlanks = () => {
    const word = words[currentWord]
    const letters = word.word.split("")
    let inputIndex = 0

    return letters.map((letter, index) => {
      if (word.missing.includes(index)) {
        const currentInputIndex = inputIndex++
        return (
          <Input
            key={index}
            id={`input-${currentInputIndex}`}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-blue-300 focus:border-blue-500"
            value={userInputs[currentInputIndex] || ""}
            onChange={(e) => handleInputChange(currentInputIndex, e.target.value)}
            maxLength={1}
            disabled={isComplete}
          />
        )
      } else {
        return (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-gray-100 border-2 border-gray-300 rounded-md"
          >
            {letter}
          </div>
        )
      }
    })
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {score}/{words.length}
              </p>
              <p className="text-gray-600">Words Completed</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={restartGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Link href="/games">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fill Missing Letters</h1>
              <p className="text-gray-600">Complete words by filling in missing letters</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Score: {score}/{words.length}
            </p>
            <p className="text-sm text-gray-600">
              Word {currentWord + 1}/{words.length}
            </p>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Current Word Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Complete the Word</CardTitle>
                <Badge variant="outline">{words[currentWord].difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-gray-700">{words[currentWord].definition}</p>
                <Button variant="outline" size="sm" onClick={speakWord}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              {showHint && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Hint:</strong> {words[currentWord].hint}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Word Input */}
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-center gap-2 mb-8">{renderWordWithBlanks()}</div>

              <div className="flex justify-center gap-2">
                <Button onClick={checkAnswer} disabled={isComplete || userInputs.some((input) => !input)}>
                  Check Answer
                </Button>
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button variant="outline" onClick={resetWord}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Result */}
          {isComplete && (
            <Card className={`border-2 ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Correct answer:</p>
                    <p className="font-bold text-2xl text-gray-900 tracking-wider">{words[currentWord].word}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={nextWord} disabled={currentWord >= words.length - 1}>
                    Next Word
                  </Button>
                  <Button variant="outline" onClick={resetWord}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
