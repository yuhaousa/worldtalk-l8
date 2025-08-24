"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react"

// Sample reading passage data
const passageData = {
  "beginner-1": {
    title: "A Day at the Park",
    level: "A1",
    difficulty: "Beginner",
    content: `Yesterday was a beautiful sunny day. Sarah decided to go to the park with her dog, Max. The park was full of people enjoying the nice weather.

Sarah sat on a green bench under a big tree. Max ran around and played with other dogs. Children were playing on the swings and slides. Some people were having picnics on the grass.

Sarah bought an ice cream from a small shop in the park. She shared it with Max, who loved the cold treat. They stayed at the park for two hours.

When it was time to go home, Sarah felt happy and relaxed. She promised Max they would come back to the park again soon.`,
    questions: [
      {
        id: 1,
        question: "What was the weather like yesterday?",
        options: ["Rainy", "Sunny", "Cloudy", "Windy"],
        correct: 1,
        explanation: "The text says 'Yesterday was a beautiful sunny day.'",
      },
      {
        id: 2,
        question: "Who did Sarah go to the park with?",
        options: ["Her friend", "Her dog Max", "Her family", "Alone"],
        correct: 1,
        explanation: "Sarah went to the park with her dog, Max.",
      },
      {
        id: 3,
        question: "Where did Sarah sit in the park?",
        options: ["On the grass", "On a green bench", "On a swing", "By the shop"],
        correct: 1,
        explanation: "Sarah sat on a green bench under a big tree.",
      },
      {
        id: 4,
        question: "What did Sarah buy from the shop?",
        options: ["A sandwich", "A drink", "An ice cream", "A toy"],
        correct: 2,
        explanation: "Sarah bought an ice cream from a small shop in the park.",
      },
      {
        id: 5,
        question: "How long did they stay at the park?",
        options: ["One hour", "Two hours", "Three hours", "All day"],
        correct: 1,
        explanation: "They stayed at the park for two hours.",
      },
    ],
  },
  "beginner-2": {
    title: "My Family",
    level: "A1",
    difficulty: "Beginner",
    content: `Hello! My name is Tom. I want to tell you about my family. I have a big family with many people.

My father is John. He is 45 years old and works in an office. He likes to read books and watch TV. My mother is Mary. She is 42 years old and works as a teacher. She loves cooking and gardening.

I have one older sister named Lisa. She is 20 years old and studies at university. She wants to be a doctor. I also have a younger brother named Sam. He is only 8 years old and goes to elementary school.

We have a pet dog named Buddy. He is very friendly and loves to play. We all live together in a house with a small garden. I love my family very much!`,
    questions: [
      {
        id: 1,
        question: "How old is Tom's father?",
        options: ["42 years old", "45 years old", "20 years old", "8 years old"],
        correct: 1,
        explanation: "The text states that Tom's father John is 45 years old.",
      },
      {
        id: 2,
        question: "What is Tom's mother's job?",
        options: ["Doctor", "Office worker", "Teacher", "Student"],
        correct: 2,
        explanation: "Tom's mother Mary works as a teacher.",
      },
      {
        id: 3,
        question: "What does Lisa want to be?",
        options: ["Teacher", "Doctor", "Office worker", "Student"],
        correct: 1,
        explanation: "Lisa studies at university and wants to be a doctor.",
      },
      {
        id: 4,
        question: "How old is Tom's younger brother?",
        options: ["20 years old", "45 years old", "8 years old", "42 years old"],
        correct: 2,
        explanation: "Sam, Tom's younger brother, is only 8 years old.",
      },
      {
        id: 5,
        question: "What is the name of their pet?",
        options: ["Sam", "Buddy", "Lisa", "Tom"],
        correct: 1,
        explanation: "They have a pet dog named Buddy.",
      },
    ],
  },
  "elementary-1": {
    title: "The School Library",
    level: "A2",
    difficulty: "Elementary",
    content: `Emma was a curious student who loved learning new things. One day, she discovered the school library and was amazed by how many books it contained. The librarian, Mrs. Johnson, was very helpful and showed Emma around.

The library had different sections for various subjects. There were fiction books with exciting stories, non-fiction books about science and history, and reference books like dictionaries and encyclopedias. Emma was particularly interested in the science section.

Mrs. Johnson explained the library rules to Emma. Students could borrow up to three books at a time for two weeks. They needed to return books on time to avoid late fees. The library also had computers for research and quiet study areas for homework.

Emma borrowed a book about space exploration and spent her lunch break reading it. She learned about planets, stars, and astronauts. From that day on, Emma visited the library every week and became one of its most regular visitors.`,
    questions: [
      {
        id: 1,
        question: "Who showed Emma around the library?",
        options: ["Her teacher", "Mrs. Johnson", "Another student", "Her friend"],
        correct: 1,
        explanation: "The librarian, Mrs. Johnson, was very helpful and showed Emma around.",
      },
      {
        id: 2,
        question: "How many books can students borrow at a time?",
        options: ["Two books", "Three books", "Four books", "Five books"],
        correct: 1,
        explanation: "Students could borrow up to three books at a time.",
      },
      {
        id: 3,
        question: "How long can students keep the books?",
        options: ["One week", "Two weeks", "Three weeks", "One month"],
        correct: 1,
        explanation: "Students could borrow books for two weeks.",
      },
      {
        id: 4,
        question: "What subject was Emma particularly interested in?",
        options: ["History", "Fiction", "Science", "Art"],
        correct: 2,
        explanation: "Emma was particularly interested in the science section.",
      },
      {
        id: 5,
        question: "What book did Emma borrow first?",
        options: ["A history book", "A fiction story", "A book about space exploration", "A dictionary"],
        correct: 2,
        explanation: "Emma borrowed a book about space exploration.",
      },
    ],
  },
  "elementary-2": {
    title: "Weekend Shopping",
    level: "A2",
    difficulty: "Elementary",
    content: `Last Saturday, Maria and her mother went shopping at the local mall. They had a long shopping list because they needed groceries and some new clothes for Maria.

First, they went to the supermarket. They bought fresh vegetables, fruits, bread, milk, and meat for the week. Maria helped her mother choose the best apples and carrots. The total cost for groceries was $85.

After grocery shopping, they visited a clothing store. Maria needed new school shoes and a winter jacket. She tried on several pairs of shoes before finding comfortable ones that fit perfectly. The jacket was on sale, so they saved $20.

At the end of their shopping trip, they stopped at a café for lunch. Maria ordered a sandwich and orange juice, while her mother had a salad and coffee. They talked about their successful shopping day and planned to return next weekend.`,
    questions: [
      {
        id: 1,
        question: "When did Maria and her mother go shopping?",
        options: ["Last Friday", "Last Saturday", "Last Sunday", "Yesterday"],
        correct: 1,
        explanation: "Last Saturday, Maria and her mother went shopping at the local mall.",
      },
      {
        id: 2,
        question: "How much did they spend on groceries?",
        options: ["$75", "$80", "$85", "$90"],
        correct: 2,
        explanation: "The total cost for groceries was $85.",
      },
      {
        id: 3,
        question: "What clothes did Maria need?",
        options: ["Shoes and a dress", "Shoes and a jacket", "A jacket and pants", "A dress and socks"],
        correct: 1,
        explanation: "Maria needed new school shoes and a winter jacket.",
      },
      {
        id: 4,
        question: "How much money did they save on the jacket?",
        options: ["$15", "$20", "$25", "$30"],
        correct: 1,
        explanation: "The jacket was on sale, so they saved $20.",
      },
      {
        id: 5,
        question: "What did Maria drink at the café?",
        options: ["Coffee", "Water", "Orange juice", "Tea"],
        correct: 2,
        explanation: "Maria ordered a sandwich and orange juice.",
      },
    ],
  },
  "intermediate-1": {
    title: "Climate Change Effects",
    level: "B1",
    difficulty: "Intermediate",
    content: `Climate change is one of the most pressing issues facing our planet today. Scientists have been studying this phenomenon for decades, and the evidence shows that human activities are the primary cause of recent climate changes.

The burning of fossil fuels, such as coal, oil, and natural gas, releases greenhouse gases into the atmosphere. These gases trap heat from the sun, causing global temperatures to rise. This process is known as the greenhouse effect, and while it occurs naturally, human activities have intensified it significantly.

The effects of climate change are already visible around the world. Ice caps and glaciers are melting at an alarming rate, causing sea levels to rise. Extreme weather events, including hurricanes, droughts, and floods, are becoming more frequent and severe. Many plant and animal species are struggling to adapt to changing conditions.

However, there is hope. Governments, businesses, and individuals are taking action to reduce greenhouse gas emissions. Renewable energy sources like solar and wind power are becoming more affordable and widespread. By working together, we can slow down climate change and protect our planet for future generations.`,
    questions: [
      {
        id: 1,
        question: "What is the primary cause of recent climate changes?",
        options: ["Natural disasters", "Human activities", "Solar radiation", "Ocean currents"],
        correct: 1,
        explanation: "The evidence shows that human activities are the primary cause of recent climate changes.",
      },
      {
        id: 2,
        question: "What happens when greenhouse gases are released into the atmosphere?",
        options: [
          "They cool the planet",
          "They trap heat from the sun",
          "They create clouds",
          "They protect the ozone layer",
        ],
        correct: 1,
        explanation: "These gases trap heat from the sun, causing global temperatures to rise.",
      },
      {
        id: 3,
        question: "What is causing sea levels to rise?",
        options: ["Heavy rainfall", "Melting ice caps and glaciers", "Ocean expansion", "Underwater earthquakes"],
        correct: 1,
        explanation: "Ice caps and glaciers are melting at an alarming rate, causing sea levels to rise.",
      },
      {
        id: 4,
        question: "What types of renewable energy are mentioned?",
        options: ["Nuclear and hydro", "Solar and wind", "Geothermal and biomass", "Coal and oil"],
        correct: 1,
        explanation: "Renewable energy sources like solar and wind power are becoming more affordable and widespread.",
      },
      {
        id: 5,
        question: "According to the text, how can we address climate change?",
        options: [
          "By ignoring the problem",
          "By working together",
          "By moving to other planets",
          "By using more fossil fuels",
        ],
        correct: 1,
        explanation:
          "By working together, we can slow down climate change and protect our planet for future generations.",
      },
    ],
  },
  "intermediate-2": {
    title: "Technology in Education",
    level: "B2",
    difficulty: "Upper-Intermediate",
    content: `The integration of technology in education has revolutionized the way students learn and teachers instruct. Over the past two decades, digital tools have transformed traditional classrooms into dynamic, interactive learning environments that cater to diverse learning styles and needs.

One of the most significant advantages of educational technology is its ability to personalize learning experiences. Adaptive learning software can adjust the difficulty level and pace of instruction based on individual student performance. This ensures that advanced learners are challenged while struggling students receive additional support and practice.

Furthermore, technology has made education more accessible than ever before. Online courses and virtual classrooms have broken down geographical barriers, allowing students from remote areas to access high-quality education. During the COVID-19 pandemic, this accessibility proved crucial in maintaining educational continuity when traditional in-person learning was not possible.

However, the digital divide remains a significant challenge. Not all students have equal access to devices and reliable internet connections, which can exacerbate existing educational inequalities. Additionally, there are concerns about screen time, digital distraction, and the potential loss of face-to-face social interaction skills.

Despite these challenges, the future of education will undoubtedly continue to be shaped by technological innovations. Virtual reality, artificial intelligence, and machine learning are already beginning to create even more immersive and effective learning experiences.`,
    questions: [
      {
        id: 1,
        question: "What is one major advantage of adaptive learning software?",
        options: [
          "It reduces teacher workload",
          "It personalizes learning experiences",
          "It eliminates homework",
          "It replaces textbooks",
        ],
        correct: 1,
        explanation:
          "Adaptive learning software can adjust the difficulty level and pace of instruction based on individual student performance, personalizing the learning experience.",
      },
      {
        id: 2,
        question: "How has technology made education more accessible?",
        options: [
          "By reducing costs",
          "By breaking down geographical barriers",
          "By eliminating exams",
          "By shortening school days",
        ],
        correct: 1,
        explanation:
          "Online courses and virtual classrooms have broken down geographical barriers, allowing students from remote areas to access high-quality education.",
      },
      {
        id: 3,
        question: "What is the 'digital divide' mentioned in the text?",
        options: [
          "The gap between old and new technology",
          "Unequal access to devices and internet",
          "The difference between online and offline learning",
          "The separation of digital and traditional subjects",
        ],
        correct: 1,
        explanation:
          "The digital divide refers to the fact that not all students have equal access to devices and reliable internet connections.",
      },
      {
        id: 4,
        question: "When did virtual classrooms prove especially important?",
        options: [
          "During summer breaks",
          "During the COVID-19 pandemic",
          "During teacher strikes",
          "During technology conferences",
        ],
        correct: 1,
        explanation:
          "During the COVID-19 pandemic, virtual classrooms proved crucial in maintaining educational continuity when traditional in-person learning was not possible.",
      },
      {
        id: 5,
        question: "Which technologies are mentioned as shaping the future of education?",
        options: [
          "Radio and television",
          "Virtual reality, AI, and machine learning",
          "Calculators and computers",
          "Smartphones and tablets",
        ],
        correct: 1,
        explanation:
          "Virtual reality, artificial intelligence, and machine learning are already beginning to create even more immersive and effective learning experiences.",
      },
    ],
  },
}

export default function ReadingPassagePage({ params }: { params: { passageId: string } }) {
  const passage = passageData[params.passageId as keyof typeof passageData]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isReading, setIsReading] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  if (!passage) {
    return <div>Passage not found</div>
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const handleRestart = () => {
    setAnswers([])
    setShowResults(false)
    setCurrentQuestion(0)
    setIsReading(true)
  }

  const correctAnswers = answers.filter((answer, index) => answer === passage.questions[index].correct).length
  const score = Math.round((correctAnswers / passage.questions.length) * 100)

  const speakText = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setCurrentWordIndex(-1)
      return
    }

    const sentences = text.split(/(?<=[.!?])\s+/)
    let currentSentenceIndex = 0
    let currentWordInSentence = 0

    const speakSentence = (sentenceIndex: number) => {
      if (sentenceIndex >= sentences.length) {
        setIsSpeaking(false)
        setCurrentWordIndex(-1)
        return
      }

      const sentence = sentences[sentenceIndex]
      const words = sentence.split(/(\s+)/)

      const utterance = new SpeechSynthesisUtterance(sentence)
      utterance.rate = 1.0
      utteranceRef.current = utterance

      utterance.onstart = () => setIsSpeaking(true)

      utterance.onend = () => {
        currentSentenceIndex++
        currentWordInSentence = 0
        setCurrentWordIndex(-1)
        setTimeout(() => speakSentence(currentSentenceIndex), 200)
      }

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          let charCount = 0
          for (let i = 0; i < words.length; i++) {
            const wordLength = words[i].length
            if (charCount + wordLength > event.charIndex) {
              if (words[i].trim()) {
                setCurrentWordIndex(i)
              }
              break
            }
            charCount += wordLength
          }
        }
      }

      window.speechSynthesis.speak(utterance)
    }

    speakSentence(0)
  }

  const renderHighlightedText = (text: string) => {
    if (!isSpeaking || currentWordIndex === -1) {
      return text
    }

    const sentences = text.split(/(?<=[.!?])\s+/)

    return (
      <>
        {sentences.map((sentence, sentenceIndex) => {
          const words = sentence.split(/(\s+)/)

          return (
            <span key={sentenceIndex}>
              {words.map((word, wordIndex) => (
                <span
                  key={`${sentenceIndex}-${wordIndex}`}
                  className={
                    isSpeaking && wordIndex === currentWordIndex && word.trim() ? "bg-red-200 text-red-900" : ""
                  }
                >
                  {word}
                </span>
              ))}
              {sentenceIndex < sentences.length - 1 && " "}
            </span>
          )
        })}
      </>
    )
  }

  if (isReading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/reading">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reading
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{passage.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {passage.level} - {passage.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {/* Reading Content */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Reading Passage</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speakText(passage.content)}
                  className={isSpeaking ? "text-blue-600" : ""}
                >
                  <Volume2 className={`h-4 w-4 mr-2 ${isSpeaking ? "animate-pulse" : ""}`} />
                  {isSpeaking ? "Stop" : "Listen"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                {passage.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {renderHighlightedText(paragraph)}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Start Quiz Button */}
          <div className="text-center">
            <Button onClick={() => setIsReading(false)} size="lg">
              Start Comprehension Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/reading">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reading
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
              <p className="text-gray-600 mt-1">{passage.title}</p>
            </div>
          </div>

          {/* Score Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Your Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg text-gray-600 mb-4">
                {correctAnswers} out of {passage.questions.length} questions correct
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleRestart} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Link href="/reading">
                  <Button>Continue Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-6">
            {passage.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {answers[index] === question.correct ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{question.question}</CardTitle>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Your answer:</span>{" "}
                          <span className={answers[index] === question.correct ? "text-green-600" : "text-red-600"}>
                            {question.options[answers[index]]}
                          </span>
                        </p>
                        {answers[index] !== question.correct && (
                          <p className="text-sm">
                            <span className="font-medium">Correct answer:</span>{" "}
                            <span className="text-green-600">{question.options[question.correct]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{question.explanation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/reading">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reading
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Comprehension Quiz</h1>
            <p className="text-gray-600 mt-1">{passage.title}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {answers.filter((a) => a !== undefined).length} / {passage.questions.length}
            </span>
          </div>
          <Progress value={(answers.filter((a) => a !== undefined).length / passage.questions.length) * 100} />
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {passage.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1}: {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[index]?.toString()}
                  onValueChange={(value) => handleAnswerChange(index, Number.parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`q${index}-${optionIndex}`} />
                      <Label htmlFor={`q${index}-${optionIndex}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmitQuiz}
            disabled={answers.filter((a) => a !== undefined).length !== passage.questions.length}
            size="lg"
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
