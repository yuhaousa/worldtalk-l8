"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Trophy } from "lucide-react"

const sentences = [
  {
    id: 1,
    correct: "I like to eat apples",
    words: ["I", "like", "to", "eat", "apples"],
    scrambled: ["apples", "I", "eat", "to", "like"],
    difficulty: "A1",
  },
  {
    id: 2,
    correct: "She is reading a book",
    words: ["She", "is", "reading", "a", "book"],
    scrambled: ["book", "She", "a", "reading", "is"],
    difficulty: "A1",
  },
  {
    id: 3,
    correct: "We went to the park yesterday",
    words: ["We", "went", "to", "the", "park", "yesterday"],
    scrambled: ["yesterday", "park", "We", "the", "to", "went"],
    difficulty: "A2",
  },
  {
    id: 4,
    correct: "The weather is very nice today",
    words: ["The", "weather", "is", "very", "nice", "today"],
    scrambled: ["today", "very", "The", "nice", "weather", "is"],
    difficulty: "A2",
  },
  {
    id: 5,
    correct: "I have been studying English for two years",
    words: ["I", "have", "been", "studying", "English", "for", "two", "years"],
    scrambled: ["years", "studying", "have", "English", "I", "two", "for", "been"],
    difficulty: "B1",
  },
]

export default function DragDropWordsGame() {
  const [currentSentence, setCurrentSentence] = useState(0)
  const [droppedWords, setDroppedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    resetSentence()
  }, [currentSentence])

  const resetSentence = () => {
    const sentence = sentences[currentSentence]
    setAvailableWords([...sentence.scrambled])
    setDroppedWords([])
    setIsComplete(false)
    setIsCorrect(null)
  }

  const handleDragStart = (word: string) => {
    setDraggedWord(word)
  }

  const handleDrop = (index: number) => {
    if (draggedWord) {
      const newDroppedWords = [...droppedWords]
      const newAvailableWords = availableWords.filter((w) => w !== draggedWord)

      // If there's already a word at this position, move it back to available
      if (newDroppedWords[index]) {
        newAvailableWords.push(newDroppedWords[index])
      }

      newDroppedWords[index] = draggedWord
      setDroppedWords(newDroppedWords)
      setAvailableWords(newAvailableWords)
      setDraggedWord(null)

      // Check if sentence is complete
      if (newDroppedWords.filter((w) => w).length === sentences[currentSentence].words.length) {
        checkAnswer(newDroppedWords)
      }
    }
  }

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (fromAvailable) {
      // Add word to first empty slot
      const emptyIndex = droppedWords.findIndex((w) => !w)
      if (emptyIndex !== -1) {
        const newDroppedWords = [...droppedWords]
        newDroppedWords[emptyIndex] = word
        setDroppedWords(newDroppedWords)
        setAvailableWords(availableWords.filter((w) => w !== word))

        if (newDroppedWords.filter((w) => w).length === sentences[currentSentence].words.length) {
          checkAnswer(newDroppedWords)
        }
      }
    } else {
      // Move word back to available
      const newDroppedWords = droppedWords.map((w) => (w === word ? "" : w))
      setDroppedWords(newDroppedWords)
      setAvailableWords([...availableWords, word])
      setIsComplete(false)
      setIsCorrect(null)
    }
  }

  const checkAnswer = (words: string[]) => {
    const userSentence = words.join(" ")
    const correct = userSentence === sentences[currentSentence].correct
    setIsCorrect(correct)
    setIsComplete(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const nextSentence = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1)
    } else {
      setGameComplete(true)
    }
  }

  const restartGame = () => {
    setCurrentSentence(0)
    setScore(0)
    setGameComplete(false)
    resetSentence()
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {score}/{sentences.length}
              </p>
              <p className="text-gray-600">Sentences Correct</p>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
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
              <h1 className="text-2xl font-bold text-gray-900">Drag & Drop Words</h1>
              <p className="text-gray-600">Arrange words to form correct sentences</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Score: {score}/{sentences.length}
            </p>
            <p className="text-sm text-gray-600">
              Question {currentSentence + 1}/{sentences.length}
            </p>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Current Sentence Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Build the Sentence</CardTitle>
                <Badge variant="outline">{sentences[currentSentence].difficulty}</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Drop Zone */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                {sentences[currentSentence].words.map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[80px] h-12 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    onClick={() => droppedWords[index] && handleWordClick(droppedWords[index], false)}
                  >
                    {droppedWords[index] && <span className="text-sm font-medium px-2">{droppedWords[index]}</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Words */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Available Words</h3>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <div
                    key={`${word}-${index}`}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors select-none"
                    draggable
                    onDragStart={() => handleDragStart(word)}
                    onClick={() => handleWordClick(word, true)}
                  >
                    {word}
                  </div>
                ))}
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
                    <p className="font-medium text-gray-900">{sentences[currentSentence].correct}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={nextSentence} disabled={currentSentence >= sentences.length - 1}>
                    Next Sentence
                  </Button>
                  <Button variant="outline" onClick={resetSentence}>
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
