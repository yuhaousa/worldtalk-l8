"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shuffle, CheckCircle, XCircle, Lightbulb, Volume2 } from "lucide-react"

const scrambledWords = [
  {
    id: 1,
    scrambled: "PELPA",
    correct: "APPLE",
    hint: "A red or green fruit",
    difficulty: "A1",
  },
  {
    id: 2,
    scrambled: "TACEHER",
    correct: "TEACHER",
    hint: "Someone who educates students",
    difficulty: "A1",
  },
  {
    id: 3,
    scrambled: "TAUBEIFUL",
    correct: "BEAUTIFUL",
    hint: "Something that looks very nice",
    difficulty: "A2",
  },
  {
    id: 4,
    scrambled: "NOTIDUCAE",
    correct: "EDUCATION",
    hint: "The process of learning and teaching",
    difficulty: "B1",
  },
  {
    id: 5,
    scrambled: "NRETNATIONAL",
    correct: "INTERNATIONAL",
    hint: "Between or among nations",
    difficulty: "B1",
  },
  {
    id: 6,
    scrambled: "SNOISSERPXE",
    correct: "EXPRESSIONS",
    hint: "Ways of showing thoughts or feelings",
    difficulty: "B2",
  },
  {
    id: 7,
    scrambled: "NREPSONSIBILITY",
    correct: "RESPONSIBILITY",
    hint: "Being accountable for something",
    difficulty: "B2",
  },
  {
    id: 8,
    scrambled: "NREDNATSUDNIG",
    correct: "UNDERSTANDING",
    hint: "The ability to comprehend something",
    difficulty: "B2",
  },
]

export default function WordScrambleGame() {
  const [currentWord, setCurrentWord] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([])

  useEffect(() => {
    resetWord()
  }, [currentWord])

  const resetWord = () => {
    setScrambledLetters(scrambledWords[currentWord].scrambled.split(""))
    setUserAnswer("")
    setIsCorrect(null)
    setShowHint(false)
  }

  const shuffleLetters = () => {
    const shuffled = [...scrambledLetters].sort(() => Math.random() - 0.5)
    setScrambledLetters(shuffled)
  }

  const checkAnswer = () => {
    const correct = userAnswer.toUpperCase() === scrambledWords[currentWord].correct
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 10)
      setTimeout(() => {
        if (currentWord < scrambledWords.length - 1) {
          setCurrentWord(currentWord + 1)
        } else {
          setGameComplete(true)
        }
      }, 2000)
    }
  }

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word.toLowerCase())
      utterance.rate = 0.8
      utterance.pitch = 1.0
      speechSynthesis.speak(utterance)
    }
  }

  const addLetter = (letter: string, index: number) => {
    setUserAnswer(userAnswer + letter)
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index))
  }

  const removeLetter = (index: number) => {
    const letter = userAnswer[index]
    setUserAnswer(userAnswer.slice(0, index) + userAnswer.slice(index + 1))
    setScrambledLetters([...scrambledLetters, letter])
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <CardTitle className="text-2xl text-green-600">Excellent Work!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">You unscrambled all words!</p>
            <p className="text-3xl font-bold text-teal-600">
              Score: {score}/{scrambledWords.length * 10}
            </p>
            <div className="space-y-2">
              <Link href="/games">
                <Button className="w-full">Back to Games</Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => window.location.reload()}>
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
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
              <h1 className="text-3xl font-bold text-gray-900">Word Scramble</h1>
              <p className="text-gray-600">Unscramble the letters to form correct words</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-teal-600">{score}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentWord + 1} / {scrambledWords.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentWord + 1) / scrambledWords.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Word {currentWord + 1}</CardTitle>
                <Badge variant="outline">{scrambledWords[currentWord].difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scrambled Letters */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Scrambled letters:</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {scrambledLetters.map((letter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      onClick={() => addLetter(letter, index)}
                      className="w-12 h-12 text-xl font-bold hover:bg-teal-100"
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" onClick={shuffleLetters} size="sm">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              </div>

              {/* User Answer */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Your word:</p>
                <div className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-4">
                  {userAnswer ? (
                    <div className="flex flex-wrap justify-center gap-1">
                      {userAnswer.split("").map((letter, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          size="sm"
                          onClick={() => removeLetter(index)}
                          className="w-8 h-8 text-lg font-bold cursor-pointer hover:bg-red-100"
                        >
                          {letter}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Click letters above to build your word</p>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={checkAnswer}
                  disabled={userAnswer.length === 0}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check Answer
                </Button>
                <Button variant="outline" onClick={resetWord}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hint
                </Button>
                {userAnswer && (
                  <Button variant="outline" onClick={() => speakWord(userAnswer)}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                )}
              </div>

              {/* Hint */}
              {showHint && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <Lightbulb className="h-4 w-4 inline mr-1" />
                    {scrambledWords[currentWord].hint}
                  </p>
                </div>
              )}

              {/* Feedback */}
              {isCorrect !== null && (
                <div
                  className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <p className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                      {isCorrect ? "Correct! Well done!" : "Not quite right. Try again!"}
                    </p>
                  </div>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600 mt-2">
                      Correct answer: "{scrambledWords[currentWord].correct}"
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
