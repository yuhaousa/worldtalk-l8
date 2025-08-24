"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const wordGroups = {
  "basic-vocabulary": [
    {
      id: 1,
      word: "Adventure",
      translation: "An exciting or unusual experience",
      example: "Going hiking was a great adventure.",
    },
    {
      id: 2,
      word: "Brilliant",
      translation: "Very bright, intelligent, or skillful",
      example: "She had a brilliant idea for the project.",
    },
    {
      id: 3,
      word: "Curious",
      translation: "Eager to know or learn something",
      example: "The curious child asked many questions.",
    },
    {
      id: 4,
      word: "Delightful",
      translation: "Causing delight; charming",
      example: "The garden party was absolutely delightful.",
    },
    {
      id: 5,
      word: "Enthusiastic",
      translation: "Having or showing intense excitement",
      example: "He was enthusiastic about learning English.",
    },
    {
      id: 6,
      word: "Fantastic",
      translation: "Extraordinarily good or attractive",
      example: "The movie was absolutely fantastic.",
    },
    {
      id: 7,
      word: "Generous",
      translation: "Showing kindness and giving freely",
      example: "She was generous with her time and help.",
    },
    {
      id: 8,
      word: "Humble",
      translation: "Having a modest opinion of oneself",
      example: "Despite his success, he remained humble.",
    },
    {
      id: 9,
      word: "Inspiring",
      translation: "Having the effect of inspiring someone",
      example: "Her speech was truly inspiring.",
    },
    {
      id: 10,
      word: "Joyful",
      translation: "Feeling or expressing great happiness",
      example: "The children were joyful at the playground.",
    },
  ],
  "business-english": [
    {
      id: 1,
      word: "Negotiate",
      translation: "To discuss something to reach an agreement",
      example: "We need to negotiate the contract terms.",
    },
    {
      id: 2,
      word: "Revenue",
      translation: "Income generated from business operations",
      example: "The company's revenue increased this quarter.",
    },
    {
      id: 3,
      word: "Strategy",
      translation: "A plan of action to achieve goals",
      example: "Our marketing strategy was very effective.",
    },
    {
      id: 4,
      word: "Collaborate",
      translation: "To work jointly with others",
      example: "Teams must collaborate to succeed.",
    },
    {
      id: 5,
      word: "Efficient",
      translation: "Working in a well-organized way",
      example: "The new system is more efficient.",
    },
    {
      id: 6,
      word: "Deadline",
      translation: "The latest time by which something should be completed",
      example: "We must meet the project deadline.",
    },
    {
      id: 7,
      word: "Budget",
      translation: "An estimate of income and expenditure",
      example: "We need to stay within budget.",
    },
    {
      id: 8,
      word: "Proposal",
      translation: "A plan or suggestion put forward for consideration",
      example: "The client approved our proposal.",
    },
    {
      id: 9,
      word: "Meeting",
      translation: "An assembly of people for discussion",
      example: "The meeting is scheduled for 2 PM.",
    },
    {
      id: 10,
      word: "Report",
      translation: "A detailed account of something",
      example: "Please submit your monthly report.",
    },
  ],
}

export default function FlashcardGroupPage() {
  const params = useParams()
  const groupId = params.groupId as string
  const flashcards = wordGroups[groupId as keyof typeof wordGroups] || []

  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
  }

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const markAsKnown = () => {
    const cardId = flashcards[currentCard].id
    if (!knownCards.includes(cardId)) {
      setKnownCards([...knownCards, cardId])
    }
    handleNext()
  }

  const resetProgress = () => {
    setKnownCards([])
    setCurrentCard(0)
    setIsFlipped(false)
  }

  const progress = (knownCards.length / flashcards.length) * 100

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Group Not Found</h1>
          <Link href="/flashcards">
            <Button>Back to Groups</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-6">
          <Link href="/flashcards">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Groups
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {groupId
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <p className="text-gray-600">Learn {flashcards.length} vocabulary words</p>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <Button variant="outline" size="sm" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-600">
            {knownCards.length} of {flashcards.length} cards mastered ({Math.round(progress)}%)
          </p>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Card
              className={`h-80 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                knownCards.includes(flashcards[currentCard].id) ? "ring-2 ring-green-400" : ""
              }`}
              onClick={handleFlip}
            >
              <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                {!isFlipped ? (
                  <>
                    <h3 className="text-4xl font-bold text-blue-600 mb-4">{flashcards[currentCard].word}</h3>
                    <p className="text-gray-500">Click to see definition</p>
                    {knownCards.includes(flashcards[currentCard].id) && (
                      <Star className="h-6 w-6 text-yellow-500 mt-4" fill="currentColor" />
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{flashcards[currentCard].translation}</h4>
                    <p className="text-gray-600 italic mb-4">"{flashcards[currentCard].example}"</p>
                    <p className="text-sm text-gray-500">Click to flip back</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-gray-600 px-4">
            {currentCard + 1} of {flashcards.length}
          </span>

          <Button variant="outline" onClick={handleNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={markAsKnown} className="bg-green-600 hover:bg-green-700">
            <Star className="h-4 w-4 mr-2" />I Know This Word
          </Button>
          <Button variant="outline" onClick={handleFlip}>
            Flip Card
          </Button>
        </div>
      </div>
    </div>
  )
}
