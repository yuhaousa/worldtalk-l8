"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Target, Save, Send, CheckCircle, AlertCircle, Star } from "lucide-react"
import Link from "next/link"

const prompts = {
  "personal-intro": {
    title: "Personal Introduction",
    description: "Write about yourself, your hobbies, and your goals",
    level: "A1",
    timeLimit: 15,
    wordTarget: 100,
    prompt:
      "Write a short essay introducing yourself. Include information about your name, age, where you're from, your hobbies, and what you hope to achieve in the future. Use simple sentences and basic vocabulary.",
  },
  "daily-routine": {
    title: "My Daily Routine",
    description: "Describe what you do from morning to evening",
    level: "A2",
    timeLimit: 20,
    wordTarget: 150,
    prompt:
      "Describe your typical day from when you wake up until you go to bed. Include details about your work or studies, meals, and leisure activities. Use time expressions and present simple tense.",
  },
  "favorite-place": {
    title: "My Favorite Place",
    description: "Write about a place you love and explain why",
    level: "B1",
    timeLimit: 25,
    wordTarget: 200,
    prompt:
      "Write about your favorite place in the world. Describe what it looks like, what you can do there, and explain why it's special to you. Include sensory details and personal experiences.",
  },
}

export default function WritingPromptPage() {
  const params = useParams()
  const router = useRouter()
  const promptId = params.promptId as string
  const prompt = prompts[promptId as keyof typeof prompts]

  const [essay, setEssay] = useState("")
  const [timeLeft, setTimeLeft] = useState(prompt?.timeLimit * 60 || 900)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  const startTimer = () => {
    setIsTimerActive(true)
  }

  const wordCount = essay
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const progress = Math.min((wordCount / (prompt?.wordTarget || 100)) * 100, 100)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setIsTimerActive(false)

    // Mock feedback generation
    const mockFeedback = {
      score: Math.floor(Math.random() * 20) + 80,
      grammar: Math.floor(Math.random() * 15) + 85,
      vocabulary: Math.floor(Math.random() * 15) + 80,
      coherence: Math.floor(Math.random() * 15) + 85,
      taskResponse: Math.floor(Math.random() * 15) + 80,
      strengths: [
        "Good use of descriptive language",
        "Clear paragraph structure",
        "Appropriate vocabulary for the level",
      ],
      improvements: [
        "Try to use more complex sentence structures",
        "Add more specific examples",
        "Check subject-verb agreement in some sentences",
      ],
    }

    setFeedback(mockFeedback)
    setShowSubmitDialog(false)
  }

  if (!prompt) {
    return <div>Prompt not found</div>
  }

  if (isSubmitted && feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/writing">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Writing
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{prompt.title} - Results</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Essay Display */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Essay</CardTitle>
                  <CardDescription>
                    {wordCount} words • {prompt.level} level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{essay}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      Overall Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{feedback.score}%</div>
                      <Badge className="bg-green-100 text-green-800">Excellent Work!</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Grammar</span>
                        <span className="text-sm font-bold">{feedback.grammar}%</span>
                      </div>
                      <Progress value={feedback.grammar} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Vocabulary</span>
                        <span className="text-sm font-bold">{feedback.vocabulary}%</span>
                      </div>
                      <Progress value={feedback.vocabulary} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Coherence</span>
                        <span className="text-sm font-bold">{feedback.coherence}%</span>
                      </div>
                      <Progress value={feedback.coherence} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Task Response</span>
                        <span className="text-sm font-bold">{feedback.taskResponse}%</span>
                      </div>
                      <Progress value={feedback.taskResponse} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/writing">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Writing
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{prompt.title}</h1>
            <Badge className="bg-blue-100 text-blue-800">{prompt.level}</Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Writing Area */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Essay</CardTitle>
                  <CardDescription>{prompt.prompt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Start writing your essay here..."
                    value={essay}
                    onChange={(e) => {
                      setEssay(e.target.value)
                      if (!isTimerActive && e.target.value.length > 0) {
                        startTimer()
                      }
                    }}
                    className="min-h-96 resize-none"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>
                        Words: {wordCount}/{prompt.wordTarget}
                      </span>
                      <span>Time: {formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button onClick={() => setShowSubmitDialog(true)} disabled={wordCount < 50}>
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Word Count</span>
                      <span>
                        {wordCount}/{prompt.wordTarget}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Time Remaining</span>
                      <span className={timeLeft < 300 ? "text-red-600 font-medium" : ""}>{formatTime(timeLeft)}</span>
                    </div>
                    <Progress value={(timeLeft / (prompt.timeLimit * 60)) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Plan your essay before writing</li>
                    <li>• Use clear topic sentences</li>
                    <li>• Include specific examples</li>
                    <li>• Check your grammar and spelling</li>
                    <li>• Stay focused on the topic</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Your Essay?</DialogTitle>
            <DialogDescription>
              Are you ready to submit your essay for evaluation? You won't be able to edit it after submission.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Writing
            </Button>
            <Button onClick={handleSubmit}>Submit Essay</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
