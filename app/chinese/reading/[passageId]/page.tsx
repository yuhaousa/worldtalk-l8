"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

const chinesePassageData = {
  "beginner-1": {
    title: "我的一天",
    titleEn: "My Day",
    level: "HSK1",
    content: `我叫小明，今年二十岁。我是一个大学生。

每天早上七点，我起床。然后我洗脸，刷牙。八点我吃早饭。早饭我喜欢吃包子和喝豆浆。

九点我去学校。我骑自行车去学校。学校离我家不远，只要十分钟。

在学校，我有很多课。我学习中文、英文、数学和历史。我最喜欢中文课，因为老师很好，同学们也很友善。

中午十二点，我和朋友们一起吃午饭。我们在学校食堂吃饭。食堂的菜很好吃，也不贵。

下午我继续上课。五点下课后，我回家。晚上我做作业，看书。十点我睡觉。

这就是我的一天。虽然很忙，但是我很开心。`,
    contentEn: `My name is Xiao Ming, and I am twenty years old. I am a university student.

Every morning at seven o'clock, I get up. Then I wash my face and brush my teeth. At eight o'clock I eat breakfast. For breakfast I like to eat steamed buns and drink soy milk.

At nine o'clock I go to school. I ride my bicycle to school. The school is not far from my home, it only takes ten minutes.

At school, I have many classes. I study Chinese, English, mathematics and history. I like Chinese class the most because the teacher is very good and the classmates are also very friendly.

At twelve noon, I eat lunch with my friends. We eat in the school cafeteria. The food in the cafeteria is delicious and not expensive.

In the afternoon I continue with classes. After class at five o'clock, I go home. In the evening I do homework and read books. At ten o'clock I go to sleep.

This is my day. Although it's busy, I am very happy.`,
    questions: [
      {
        id: 1,
        question: "小明今年多少岁？",
        questionEn: "How old is Xiao Ming?",
        options: ["十八岁", "十九岁", "二十岁", "二十一岁"],
        optionsEn: ["18 years old", "19 years old", "20 years old", "21 years old"],
        correct: 2,
        explanation: "文章开头说'我叫小明，今年二十岁'。",
        explanationEn: "The article begins with 'My name is Xiao Ming, and I am twenty years old.'",
      },
      {
        id: 2,
        question: "小明早饭喜欢吃什么？",
        questionEn: "What does Xiao Ming like to eat for breakfast?",
        options: ["面条和牛奶", "包子和豆浆", "米饭和汤", "面包和咖啡"],
        optionsEn: ["Noodles and milk", "Steamed buns and soy milk", "Rice and soup", "Bread and coffee"],
        correct: 1,
        explanation: "文章中说'早饭我喜欢吃包子和喝豆浆'。",
        explanationEn: "The article says 'For breakfast I like to eat steamed buns and drink soy milk.'",
      },
      {
        id: 3,
        question: "小明怎么去学校？",
        questionEn: "How does Xiao Ming go to school?",
        options: ["走路", "坐公交车", "骑自行车", "开车"],
        optionsEn: ["Walking", "Taking the bus", "Riding a bicycle", "Driving"],
        correct: 2,
        explanation: "文章中说'我骑自行车去学校'。",
        explanationEn: "The article says 'I ride my bicycle to school.'",
      },
      {
        id: 4,
        question: "小明最喜欢什么课？",
        questionEn: "What is Xiao Ming's favorite class?",
        options: ["英文", "数学", "历史", "中文"],
        optionsEn: ["English", "Mathematics", "History", "Chinese"],
        correct: 3,
        explanation: "文章中说'我最喜欢中文课'。",
        explanationEn: "The article says 'I like Chinese class the most.'",
      },
      {
        id: 5,
        question: "小明几点睡觉？",
        questionEn: "What time does Xiao Ming go to sleep?",
        options: ["九点", "十点", "十一点", "十二点"],
        optionsEn: ["9 o'clock", "10 o'clock", "11 o'clock", "12 o'clock"],
        correct: 1,
        explanation: "文章最后说'十点我睡觉'。",
        explanationEn: "The article ends with 'At ten o'clock I go to sleep.'",
      },
    ],
  },
  "beginner-2": {
    title: "我的家庭",
    titleEn: "My Family",
    level: "HSK1",
    content: `我有一个幸福的家庭。我家有四个人：爸爸、妈妈、弟弟和我。

我的爸爸今年四十五岁。他是一个医生，在医院工作。爸爸很忙，但是他很关心我们。他喜欢看书和听音乐。

我的妈妈今年四十二岁。她是一个老师，在小学教书。妈妈很温柔，做菜也很好吃。她喜欢种花和看电视。

我的弟弟今年十六岁。他是一个高中生。弟弟很聪明，学习很好。他喜欢打篮球和玩电脑游戏。

我今年十九岁，是一个大学生。我学习很努力，希望将来能找到好工作。我喜欢读书和听音乐。

周末的时候，我们全家人会一起吃饭，聊天。有时候我们也会一起去公园散步或者看电影。

我爱我的家庭。虽然我们每个人都很忙，但是我们互相关心，互相帮助。这让我感到很温暖。`,
    contentEn: `I have a happy family. There are four people in my family: dad, mom, younger brother and me.

My dad is forty-five years old this year. He is a doctor and works at a hospital. Dad is very busy, but he cares about us very much. He likes reading books and listening to music.

My mom is forty-two years old this year. She is a teacher and teaches at an elementary school. Mom is very gentle and cooks delicious food. She likes growing flowers and watching TV.

My younger brother is sixteen years old this year. He is a high school student. My brother is very smart and studies well. He likes playing basketball and playing computer games.

I am nineteen years old this year and am a university student. I study very hard and hope to find a good job in the future. I like reading books and listening to music.

On weekends, our whole family will eat together and chat. Sometimes we also go to the park for a walk or watch movies together.

I love my family. Although each of us is very busy, we care for each other and help each other. This makes me feel very warm.`,
    questions: [
      {
        id: 1,
        question: "这个家庭有几个人？",
        questionEn: "How many people are in this family?",
        options: ["三个", "四个", "五个", "六个"],
        optionsEn: ["Three", "Four", "Five", "Six"],
        correct: 1,
        explanation: "文章开头说'我家有四个人：爸爸、妈妈、弟弟和我'。",
        explanationEn:
          "The article begins with 'There are four people in my family: dad, mom, younger brother and me.'",
      },
    ],
  },
}

export default function ChineseReadingPassagePage({ params }: { params: { passageId: string } }) {
  const [currentSentence, setCurrentSentence] = useState(-1)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const passage = chinesePassageData[params.passageId as keyof typeof chinesePassageData]

  if (!passage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <Link href="/chinese/reading">
            <Button>返回阅读列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  const sentences = passage.content.split(/[。！？]/).filter((s) => s.trim().length > 0)

  const speakChinese = (text: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "zh-CN"
    utterance.rate = 0.7

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const speakSentenceBysentence = () => {
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      setCurrentSentence(-1)
      return
    }

    let index = 0
    const speakNext = () => {
      if (index < sentences.length) {
        setCurrentSentence(index)
        const utterance = new SpeechSynthesisUtterance(sentences[index] + "。")
        utterance.lang = "zh-CN"
        utterance.rate = 0.7

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => {
          index++
          setTimeout(speakNext, 500)
        }
        utterance.onerror = () => {
          setIsSpeaking(false)
          setCurrentSentence(-1)
        }

        speechSynthesis.speak(utterance)
      } else {
        setIsSpeaking(false)
        setCurrentSentence(-1)
      }
    }

    speakNext()
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === passage.questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < passage.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    const percentage = Math.round((score / passage.questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">阅读完成！</CardTitle>
              <p className="text-gray-600">Reading Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-red-600">{percentage}%</div>
              <p className="text-lg text-gray-700">
                你答对了 {score} / {passage.questions.length} 道题
              </p>

              <div className="space-y-4">
                {passage.questions.map((q, index) => (
                  <div key={q.id} className="text-left p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {answers[index] === q.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium">题目 {index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{q.question}</p>
                    <p className="text-sm text-gray-500 mb-2">{q.questionEn}</p>
                    <p className="text-sm text-green-700 mb-1">{q.explanation}</p>
                    <p className="text-sm text-green-600">{q.explanationEn}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                  重新阅读
                </Button>
                <Link href="/chinese/reading">
                  <Button>返回阅读列表</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showQuiz) {
    const currentQ = passage.questions[currentQuestion]
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => setShowQuiz(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回阅读
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">理解测试</h1>
              <p className="text-sm text-gray-600">
                题目 {currentQuestion + 1} / {passage.questions.length}
              </p>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / passage.questions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">{currentQ.question}</CardTitle>
              <p className="text-gray-600">{currentQ.questionEn}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    <div>
                      <div>{option}</div>
                      <div className="text-sm text-gray-500">{currentQ.optionsEn[index]}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Button */}
          <div className="flex justify-center">
            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} size="lg">
              {currentQuestion < passage.questions.length - 1 ? "下一题" : "完成测试"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/chinese/reading">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{passage.title}</h1>
            <p className="text-gray-600">{passage.titleEn}</p>
            <Badge className="mt-2">{passage.level}</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => speakChinese(passage.content)}>
              <Volume2 className="h-4 w-4 mr-2" />
              朗读全文
            </Button>
            <Button variant="outline" size="sm" onClick={speakSentenceBysentence}>
              <Volume2 className="h-4 w-4 mr-2" />
              逐句朗读
            </Button>
          </div>
        </div>

        {/* Reading Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chinese Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">中文原文</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-lg leading-relaxed">
                {sentences.map((sentence, index) => (
                  <p
                    key={index}
                    className={`${
                      currentSentence === index ? "bg-red-100 text-red-800 p-2 rounded" : ""
                    } transition-colors duration-300`}
                  >
                    {sentence}。
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* English Translation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">英文翻译</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                {passage.contentEn.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <Button onClick={() => setShowQuiz(true)} size="lg">
            开始理解测试
          </Button>
        </div>
      </div>
    </div>
  )
}
