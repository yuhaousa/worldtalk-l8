import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Clock, User, ArrowRight } from "lucide-react"

const conversations = [
  {
    id: "daily-conversation",
    title: "Daily Conversation Practice",
    description: "Practice everyday English conversations with AI",
    avatar: "👩‍🏫",
    difficulty: "Beginner",
    duration: "15-20 min",
    topics: ["Greetings", "Shopping", "Weather"],
    lastMessage: "Hello! Ready to practice some daily conversations?",
    isActive: true,
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Professional conversations and workplace scenarios",
    avatar: "👨‍💼",
    difficulty: "Intermediate",
    duration: "20-25 min",
    topics: ["Meetings", "Presentations", "Emails"],
    lastMessage: "Let's work on your presentation skills today.",
    isActive: false,
  },
  {
    id: "travel-english",
    title: "Travel & Tourism",
    description: "Essential English for travelers and tourists",
    avatar: "✈️",
    difficulty: "Beginner",
    duration: "15-20 min",
    topics: ["Airport", "Hotel", "Directions"],
    lastMessage: "Planning a trip? Let's practice travel English!",
    isActive: true,
  },
  {
    id: "academic-english",
    title: "Academic English",
    description: "English for academic and educational contexts",
    avatar: "🎓",
    difficulty: "Advanced",
    duration: "25-30 min",
    topics: ["Essays", "Research", "Discussions"],
    lastMessage: "Ready to discuss some academic topics?",
    isActive: false,
  },
  {
    id: "casual-chat",
    title: "Casual Chat",
    description: "Free-form conversation practice on any topic",
    avatar: "💬",
    difficulty: "All Levels",
    duration: "Open-ended",
    topics: ["Hobbies", "Culture", "Current Events"],
    lastMessage: "What would you like to talk about today?",
    isActive: true,
  },
  {
    id: "pronunciation-practice",
    title: "Pronunciation Coach",
    description: "Focus on pronunciation and speaking clarity",
    avatar: "🗣️",
    difficulty: "All Levels",
    duration: "10-15 min",
    topics: ["Sounds", "Rhythm", "Intonation"],
    lastMessage: "Let's work on your pronunciation together!",
    isActive: true,
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-blue-100 text-blue-800"
  }
}

export default function DialogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Conversation Practice</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a conversation partner and start practicing English in realistic scenarios
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-600">Available Conversations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">45</div>
              <div className="text-sm text-gray-600">Minutes Practiced</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Active Conversations</div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{conversation.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{conversation.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getDifficultyColor(conversation.difficulty)}>{conversation.difficulty}</Badge>
                        {conversation.isActive && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{conversation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {conversation.duration}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {conversation.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 italic">"{conversation.lastMessage}"</p>
                  </div>

                  <Link href={`/dialog/${conversation.id}`}>
                    <Button className="w-full" variant={conversation.isActive ? "default" : "outline"}>
                      {conversation.isActive ? "Continue" : "Start"} Conversation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
