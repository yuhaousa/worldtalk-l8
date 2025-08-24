"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mic, MicOff, Volume2, RotateCcw, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const conversationData = {
  "daily-conversation": {
    title: "Daily Conversation Practice",
    avatar: "👩‍🏫",
    difficulty: "Beginner",
    aiName: "Sarah",
    initialMessage:
      "Hello! I'm Sarah, your conversation partner. I'm here to help you practice everyday English. What would you like to talk about today?",
  },
  "business-english": {
    title: "Business English",
    avatar: "👨‍💼",
    difficulty: "Intermediate",
    aiName: "Michael",
    initialMessage:
      "Good morning! I'm Michael, and I'll be helping you with business English today. Shall we start with a typical workplace scenario?",
  },
  "travel-english": {
    title: "Travel & Tourism",
    avatar: "✈️",
    difficulty: "Beginner",
    aiName: "Emma",
    initialMessage:
      "Hi there! I'm Emma, your travel English guide. Whether you're planning a trip or just want to practice travel scenarios, I'm here to help!",
  },
  "academic-english": {
    title: "Academic English",
    avatar: "🎓",
    difficulty: "Advanced",
    aiName: "Professor Johnson",
    initialMessage:
      "Welcome! I'm Professor Johnson. I'm here to help you with academic English, from essay writing to research discussions. What topic interests you?",
  },
  "casual-chat": {
    title: "Casual Chat",
    avatar: "💬",
    difficulty: "All Levels",
    aiName: "Alex",
    initialMessage: "Hey! I'm Alex, and I love chatting about anything and everything. What's on your mind today?",
  },
  "pronunciation-practice": {
    title: "Pronunciation Coach",
    avatar: "🗣️",
    difficulty: "All Levels",
    aiName: "Coach Lisa",
    initialMessage:
      "Hello! I'm Coach Lisa, your pronunciation specialist. Let's work on making your English sound clear and natural. Ready to practice?",
  },
}

// Mock AI responses for demonstration
const generateAIResponse = (userMessage: string, conversationId: string) => {
  const responses = {
    "daily-conversation": [
      "That's interesting! Can you tell me more about that?",
      "I see! How do you usually handle situations like this?",
      "Great point! What do you think about trying a different approach?",
      "That sounds challenging. How did you feel about it?",
      "Excellent! Your English is improving. Let's try another topic.",
    ],
    "business-english": [
      "That's a professional approach. How would you present this in a meeting?",
      "Good thinking! What would be the next steps in this business scenario?",
      "I understand. How would you communicate this to your team?",
      "Excellent business insight! Can you elaborate on the strategy?",
      "That's very professional. Let's practice a formal presentation.",
    ],
    "travel-english": [
      "That sounds like a wonderful trip! What's your favorite destination?",
      "Great! How would you ask for directions in that situation?",
      "Perfect! What would you say at the hotel check-in?",
      "Excellent! How would you order food at a restaurant there?",
      "That's helpful! What travel tips would you give to other tourists?",
    ],
    "academic-english": [
      "That's a sophisticated argument. Can you provide evidence to support it?",
      "Interesting thesis! How would you structure your research methodology?",
      "Excellent analysis! What are the implications of your findings?",
      "Good point! How does this relate to current academic discourse?",
      "Well articulated! Can you critique this perspective?",
    ],
    "casual-chat": [
      "That's so cool! I'd love to hear more about your experience.",
      "Haha, that's funny! What happened next?",
      "I totally get that! Have you tried anything different?",
      "That sounds amazing! What's your favorite part about it?",
      "Oh wow! How long have you been interested in that?",
    ],
    "pronunciation-practice": [
      "Good effort! Let's focus on the 'th' sound. Try saying 'think' slowly.",
      "Great improvement! Now let's work on word stress. Say 'important' with emphasis on 'por'.",
      "Excellent! Your intonation is getting better. Try asking a question with rising tone.",
      "Well done! Let's practice the 'r' sound. Say 'really' and roll the 'r' slightly.",
      "Perfect! Your pronunciation is much clearer now. Let's try some tongue twisters!",
    ],
  }

  const conversationResponses = responses[conversationId as keyof typeof responses] || responses["casual-chat"]
  return conversationResponses[Math.floor(Math.random() * conversationResponses.length)]
}

const generateCEFRReport = (messages: any[], conversationId: string) => {
  const userMessages = messages.filter((msg) => msg.sender === "user")
  const messageCount = userMessages.length
  const avgWordsPerMessage =
    userMessages.reduce((acc, msg) => acc + msg.content.split(" ").length, 0) / messageCount || 0

  // Mock CEFR assessment based on conversation type and user engagement
  const assessments = {
    "daily-conversation": { level: "A2", score: 65 },
    "business-english": { level: "B1", score: 72 },
    "travel-english": { level: "A2", score: 68 },
    "academic-english": { level: "B2", score: 78 },
    "casual-chat": { level: "A2", score: 70 },
    "pronunciation-practice": { level: "B1", score: 75 },
  }

  const baseAssessment = assessments[conversationId as keyof typeof assessments] || { level: "A2", score: 65 }

  // Adjust score based on engagement
  const engagementBonus = Math.min(messageCount * 2, 10)
  const vocabularyBonus = Math.min((avgWordsPerMessage - 5) * 2, 10)

  const finalScore = Math.min(baseAssessment.score + engagementBonus + vocabularyBonus, 95)

  let level = baseAssessment.level
  if (finalScore >= 85) level = "C1"
  else if (finalScore >= 75) level = "B2"
  else if (finalScore >= 65) level = "B1"
  else if (finalScore >= 55) level = "A2"
  else level = "A1"

  return {
    level,
    score: finalScore,
    messageCount,
    avgWordsPerMessage: Math.round(avgWordsPerMessage),
    grammar: Math.min(finalScore + Math.random() * 10 - 5, 95),
    vocabulary: Math.min(finalScore + Math.random() * 10 - 5, 95),
    fluency: Math.min(finalScore + Math.random() * 10 - 5, 95),
    comprehension: Math.min(finalScore + Math.random() * 10 - 5, 95),
  }
}

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
  const conversation = conversationData[params.conversationId as keyof typeof conversationData]
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: conversation?.initialMessage || "Hello! How can I help you practice English today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [isAvatarTalking, setIsAvatarTalking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(
      () => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "ai" as const,
          content: generateAIResponse(inputMessage, params.conversationId),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        content: conversation?.initialMessage || "Hello! How can I help you practice English today?",
        timestamp: new Date(),
      },
    ])
  }

  const handleSpeak = (text: string, messageId: number) => {
    // Stop any currently playing speech
    window.speechSynthesis.cancel()

    if (speakingMessageId === messageId) {
      // If clicking the same message, stop speaking
      setSpeakingMessageId(null)
      setIsAvatarTalking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0 // Normal speaking speed
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      setSpeakingMessageId(messageId)
      setIsAvatarTalking(true)
    }

    utterance.onend = () => {
      setSpeakingMessageId(null)
      setIsAvatarTalking(false)
    }

    utterance.onerror = () => {
      setSpeakingMessageId(null)
      setIsAvatarTalking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const cefrDescriptions = {
    A1: "Beginner - Can understand and use familiar everyday expressions",
    A2: "Elementary - Can communicate in simple and routine tasks",
    B1: "Intermediate - Can deal with most situations while traveling",
    B2: "Upper Intermediate - Can interact with fluency and spontaneity",
    C1: "Advanced - Can express ideas fluently and spontaneously",
    C2: "Proficient - Can understand virtually everything heard or read",
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversation Not Found</h2>
            <Link href="/dialog">
              <Button>Back to Conversations</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const reportData = generateCEFRReport(messages, params.conversationId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dialog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`text-4xl transition-all duration-200 ${
                    isAvatarTalking ? "animate-bounce scale-110" : "scale-100"
                  }`}
                >
                  {conversation.avatar}
                </div>
                {/* Talking indicator */}
                {isAvatarTalking && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                )}
                {/* Sound waves animation */}
                {isAvatarTalking && (
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <div
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{ height: "8px", animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{ height: "12px", animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{ height: "6px", animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{ height: "10px", animationDelay: "450ms" }}
                    ></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{conversation.title}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{conversation.difficulty}</Badge>
                  <span className="text-sm text-gray-600">with {conversation.aiName}</span>
                  {isAvatarTalking && (
                    <span className="text-sm text-green-600 font-medium animate-pulse">Speaking...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={resetConversation}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {conversation.aiName} is online
              {isAvatarTalking && <span className="text-sm font-normal text-green-600">• Speaking</span>}
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.sender === "ai" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 transition-all ${
                          speakingMessageId === message.id
                            ? "text-blue-600 opacity-100"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => handleSpeak(message.content, message.id)}
                        title={speakingMessageId === message.id ? "Stop speaking" : "Read aloud"}
                      >
                        <Volume2 className={`h-3 w-3 ${speakingMessageId === message.id ? "animate-pulse" : ""}`} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{conversation.aiName} is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={isRecording ? "bg-red-100 text-red-600" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Dialog open={showReport} onOpenChange={setShowReport}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" title="Generate CEFR Report">
                    <FileText className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      CEFR Language Assessment Report
                    </DialogTitle>
                    <DialogDescription>Based on your conversation with {conversation.aiName}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Overall Level */}
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{reportData.level}</div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">Overall CEFR Level</div>
                      <div className="text-sm text-gray-600">
                        {cefrDescriptions[reportData.level as keyof typeof cefrDescriptions]}
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold text-gray-900">{Math.round(reportData.score)}%</div>
                        <Progress value={reportData.score} className="mt-2" />
                      </div>
                    </div>

                    {/* Skill Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Grammar</span>
                            <span className="text-sm text-gray-600">{Math.round(reportData.grammar)}%</span>
                          </div>
                          <Progress value={reportData.grammar} />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Vocabulary</span>
                            <span className="text-sm text-gray-600">{Math.round(reportData.vocabulary)}%</span>
                          </div>
                          <Progress value={reportData.vocabulary} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Fluency</span>
                            <span className="text-sm text-gray-600">{Math.round(reportData.fluency)}%</span>
                          </div>
                          <Progress value={reportData.fluency} />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Comprehension</span>
                            <span className="text-sm text-gray-600">{Math.round(reportData.comprehension)}%</span>
                          </div>
                          <Progress value={reportData.comprehension} />
                        </div>
                      </div>
                    </div>

                    {/* Conversation Stats */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{reportData.messageCount}</div>
                        <div className="text-sm text-gray-600">Messages Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{reportData.avgWordsPerMessage}</div>
                        <div className="text-sm text-gray-600">Avg Words/Message</div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Continue practicing with {conversation.aiName} to improve fluency</li>
                        <li>• Try more complex sentence structures to advance to the next level</li>
                        <li>• Focus on expanding your vocabulary in this topic area</li>
                        <li>• Practice pronunciation with the speech feature</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
