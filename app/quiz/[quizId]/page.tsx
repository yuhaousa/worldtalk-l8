"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy, RotateCcw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const questionGroups = {
  "basic-vocabulary-quiz": [
    {
      id: 1,
      question: "What does 'Adventure' mean?",
      options: ["A boring routine", "An exciting or unusual experience", "A type of food", "A mathematical equation"],
      correct: 1,
      explanation: "Adventure refers to an exciting, unusual, or daring experience.",
    },
    {
      id: 2,
      question: "Choose the correct usage of 'Brilliant':",
      options: [
        "The weather is brilliant today",
        "She had a brilliant idea",
        "The food tastes brilliant",
        "All of the above",
      ],
      correct: 3,
      explanation: "Brilliant can mean very bright, intelligent, or excellent, so all uses are correct!",
    },
    {
      id: 3,
      question: "What is the opposite of 'Curious'?",
      options: ["Interested", "Indifferent", "Excited", "Eager"],
      correct: 1,
      explanation: "Indifferent means showing no interest, which is opposite to being curious.",
    },
    {
      id: 4,
      question: "Complete the sentence: 'The party was absolutely ___'",
      options: ["delightful", "adventure", "curious", "brilliant"],
      correct: 0,
      explanation: "Delightful means charming or giving pleasure, perfect for describing a party.",
    },
    {
      id: 5,
      question: "Someone who is 'Enthusiastic' is:",
      options: ["Tired and bored", "Angry and upset", "Excited and eager", "Confused and lost"],
      correct: 2,
      explanation: "Enthusiastic means showing intense excitement and eagerness.",
    },
    {
      id: 6,
      question: "What does 'Fantastic' mean?",
      options: ["Terrible", "Extraordinarily good", "Average", "Confusing"],
      correct: 1,
      explanation: "Fantastic means extraordinarily good or attractive.",
    },
    {
      id: 7,
      question: "A 'Generous' person is:",
      options: ["Selfish", "Kind and giving", "Angry", "Lazy"],
      correct: 1,
      explanation: "Generous means showing kindness and giving freely to others.",
    },
    {
      id: 8,
      question: "What does 'Humble' mean?",
      options: ["Arrogant", "Modest", "Loud", "Rich"],
      correct: 1,
      explanation: "Humble means having a modest opinion of oneself, not arrogant.",
    },
    {
      id: 9,
      question: "Something 'Inspiring' makes you feel:",
      options: ["Sad", "Motivated", "Angry", "Confused"],
      correct: 1,
      explanation: "Inspiring means having the effect of motivating or encouraging someone.",
    },
    {
      id: 10,
      question: "A 'Joyful' person is:",
      options: ["Sad", "Happy", "Angry", "Tired"],
      correct: 1,
      explanation: "Joyful means feeling or expressing great happiness and delight.",
    },
  ],
  "business-english-quiz": [
    {
      id: 1,
      question: "What does 'negotiate' mean in business?",
      options: ["To argue", "To discuss to reach agreement", "To refuse", "To delay"],
      correct: 1,
      explanation: "Negotiate means to discuss something with someone to reach an agreement.",
    },
    {
      id: 2,
      question: "Revenue is:",
      options: ["Money spent", "Income generated", "Number of employees", "Office space"],
      correct: 1,
      explanation: "Revenue is the income generated from business operations.",
    },
    {
      id: 3,
      question: "A strategy is:",
      options: ["A problem", "A plan of action", "A mistake", "A building"],
      correct: 1,
      explanation: "A strategy is a plan of action designed to achieve specific goals.",
    },
    {
      id: 4,
      question: "To collaborate means to:",
      options: ["Work alone", "Work together", "Compete", "Quit"],
      correct: 1,
      explanation: "Collaborate means to work jointly with others on a project or task.",
    },
    {
      id: 5,
      question: "An efficient process is:",
      options: ["Slow", "Well-organized", "Expensive", "Complicated"],
      correct: 1,
      explanation: "Efficient means working in a well-organized and effective way.",
    },
    {
      id: 6,
      question: "A deadline is:",
      options: ["A celebration", "The latest time to complete something", "A meeting", "A vacation"],
      correct: 1,
      explanation: "A deadline is the latest time by which something should be completed.",
    },
    {
      id: 7,
      question: "A budget is:",
      options: ["A person", "An estimate of income and costs", "A building", "A celebration"],
      correct: 1,
      explanation: "A budget is an estimate of income and expenditure for a set period.",
    },
    {
      id: 8,
      question: "A proposal is:",
      options: ["A problem", "A plan or suggestion", "A celebration", "A building"],
      correct: 1,
      explanation: "A proposal is a plan or suggestion put forward for consideration.",
    },
    {
      id: 9,
      question: "A meeting is:",
      options: ["A meal", "An assembly for discussion", "A vacation", "A building"],
      correct: 1,
      explanation: "A meeting is an assembly of people for discussion or decision-making.",
    },
    {
      id: 10,
      question: "A report is:",
      options: ["A celebration", "A detailed account", "A building", "A vacation"],
      correct: 1,
      explanation: "A report is a detailed account or statement about something.",
    },
  ],
}

export default function QuizGroupPage() {
  const params = useParams()
  const quizId = params.quizId as string
  const questions = questionGroups[quizId as keyof typeof questionGroups] || []

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
          <Link href="/quiz">
            <Button>Back to Quizzes</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center mb-6">
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl text-gray-900">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-6xl font-bold text-green-600 mb-2">{percentage}%</p>
                <p className="text-gray-600">
                  You got {score} out of {questions.length} questions correct
                </p>
              </div>

              <div className="text-left space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Results Summary:</h3>
                {questions.map((question, index) => (
                  <div key={question.id} className="flex items-center gap-2">
                    {answers[index] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm text-gray-700">Question {index + 1}</span>
                  </div>
                ))}
              </div>

              <Button onClick={resetQuiz} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Quiz Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center mb-6">
          <Link href="/quiz">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quizId
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <p className="text-gray-600">Answer {questions.length} questions to test your knowledge</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-blue-500 bg-blue-50"
                    : showResult && index === questions[currentQuestion].correct
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult &&
                    selectedAnswer === index &&
                    (index === questions[currentQuestion].correct ? (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                    ))}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Explanation */}
        {showResult && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">{questions[currentQuestion].explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          {!showResult ? (
            <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="px-8">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="px-8">
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
