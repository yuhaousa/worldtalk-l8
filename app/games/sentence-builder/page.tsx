"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Lightbulb, Volume2 } from "lucide-react"

const sentences = [
  {
    id: 1,
    words: ["I", "am", "learning", "English", "every", "day"],
    correct: "I am learning English every day",
    hint: "Start with the subject pronoun",
    difficulty: "A2",
  },
  {
    id: 2,
    words: ["She", "has", "been", "working", "here", "for", "five", "years"],
    correct: "She has been working here for five years",
    hint: "Use present perfect continuous tense",
    difficulty: "B1",
  },
  {
    id: 3,
    words: ["If", "I", "had", "studied", "harder", "I", "would", "have", "passed"],
    correct: "If I had studied harder I would have passed",
    hint: "This is a third conditional sentence",
    difficulty: "B2",
  },
  {
    id: 4,
    words: ["The", "book", "that", "you", "gave", "me", "is", "very", "interesting"],
    correct: "The book that you gave me is very interesting",
    hint: "Use a relative clause with 'that'",
    difficulty: "B1",
  },
  {
    id: 5,
    words: ["Despite", "the", "rain", "we", "decided", "to", "go", "for", "a", "walk"],
    correct: "Despite the rain we decided to go for a walk",
    hint: "Start with the preposition 'Despite'",
    difficulty: "B2",
  },
]

export default function SentenceBuilderGame() {
  const [currentSentence, setCurrentSentence] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    resetSentence()
  }, [currentSentence])

  const resetSentence = () => {
    const shuffled = [...sentences[currentSentence].words].sort(() => Math.random() - 0.5)
    setAvailableWords(shuffled)
    setSelectedWords([])
    setIsCorrect(null)
    setShowHint(false)
  }

  const selectWord = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word])
    setAvailableWords(availableWords.filter((_, i) => i !== index))
  }

  const removeWord = (index: number) => {
    const word = selectedWords[index]
    setAvailableWords([...availableWords, word])
    setSelectedWords(selectedWords.filter((_, i) => i !== index))
  }

  const checkAnswer = () => {
    const userSentence = selectedWords.join(" ")
    const correct = userSentence === sentences[currentSentence].correct
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 10)
      setTimeout(() => {
        if (currentSentence < sentences.length - 1) {
          setCurrentSentence(currentSentence + 1)
        } else {
          setGameComplete(true)
        }
      }, 2000)
    }
  }

  const speakSentence = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      speechSynthesis.speak(utterance)
    }
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl text-green-600">Congratulations!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">You completed all sentences!</p>
            <p className="text-3xl font-bold text-blue-600">Score: {score}/50</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
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
              <h1 className="text-3xl font-bold text-gray-900">Sentence Builder</h1>
              <p className="text-gray-600">Build correct sentences from the given words</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-orange-600">{score}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentSentence + 1} / {sentences.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSentence + 1) / sentences.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Sentence {currentSentence + 1}</CardTitle>
                <Badge variant="outline">{sentences[currentSentence].difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Words Area */}
              <div className="min-h-[80px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Your sentence:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedWords.length === 0 ? (
                    <p className="text-gray-400 italic">Drag words here to build your sentence</p>
                  ) : (
                    selectedWords.map((word, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        onClick={() => removeWord(index)}
                        className="cursor-pointer hover:bg-red-100"
                      >
                        {word}
                      </Button>
                    ))
                  )}
                </div>
              </div>

              {/* Available Words */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Available words:</p>
                <div className="flex flex-wrap gap-2">
                  {availableWords.map((word, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => selectWord(word, index)}
                      className="cursor-pointer hover:bg-blue-100"
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={checkAnswer}
                  disabled={selectedWords.length === 0}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check Answer
                </Button>
                <Button variant="outline" onClick={resetSentence}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hint
                </Button>
                {selectedWords.length > 0 && (
                  <Button variant="outline" onClick={() => speakSentence(selectedWords.join(" "))}>
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
                    {sentences[currentSentence].hint}
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
                    <p className="text-sm text-gray-600 mt-2">Correct answer: "{sentences[currentSentence].correct}"</p>
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
