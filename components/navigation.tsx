"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, MessageCircle, User, FileText, PenTool, Gamepad2, Menu, X, Shield } from "lucide-react"
import { useState } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isEnglish, isChinese } = useLanguage()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLabels = {
    flashcards: isEnglish ? "Flashcards" : "单词卡",
    quiz: isEnglish ? "Quiz" : "测验",
    dialog: isEnglish ? "AI Dialog" : "AI对话",
    reading: isEnglish ? "Reading" : "阅读",
    writing: isEnglish ? "Writing" : "写作",
    games: isEnglish ? "Games" : "游戏",
    admin: isEnglish ? "Admin" : "管理",
    login: isEnglish ? "Login" : "登录",
    register: isEnglish ? "Register" : "注册",
    profile: isEnglish ? "Profile" : "个人资料",
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">{isEnglish ? "LearnSpeak" : "学语言"}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href={isEnglish ? "/flashcards" : "/chinese/flashcards"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Brain className="h-4 w-4" />
              {navLabels.flashcards}
            </Link>
            <Link
              href={isEnglish ? "/quiz" : "/chinese/quiz"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              {navLabels.quiz}
            </Link>
            <Link
              href={isEnglish ? "/dialog" : "/chinese/dialog"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {navLabels.dialog}
            </Link>
            <Link
              href={isEnglish ? "/reading" : "/chinese/reading"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              {navLabels.reading}
            </Link>
            <Link
              href={isEnglish ? "/writing" : "/chinese/writing"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <PenTool className="h-4 w-4" />
              {navLabels.writing}
            </Link>
            <Link
              href={isEnglish ? "/games" : "/chinese/games"}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Gamepad2 className="h-4 w-4" />
              {navLabels.games}
            </Link>
            <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Shield className="h-4 w-4" />
              {navLabels.admin}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {navLabels.login}
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                {navLabels.register}
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                {navLabels.profile}
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>

              <Link
                href={isEnglish ? "/flashcards" : "/chinese/flashcards"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Brain className="h-4 w-4" />
                {navLabels.flashcards}
              </Link>
              <Link
                href={isEnglish ? "/quiz" : "/chinese/quiz"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                {navLabels.quiz}
              </Link>
              <Link
                href={isEnglish ? "/dialog" : "/chinese/dialog"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                {navLabels.dialog}
              </Link>
              <Link
                href={isEnglish ? "/reading" : "/chinese/reading"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="h-4 w-4" />
                {navLabels.reading}
              </Link>
              <Link
                href={isEnglish ? "/writing" : "/chinese/writing"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PenTool className="h-4 w-4" />
                {navLabels.writing}
              </Link>
              <Link
                href={isEnglish ? "/games" : "/chinese/games"}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Gamepad2 className="h-4 w-4" />
                {navLabels.games}
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                {navLabels.admin}
              </Link>

              <div className="border-t pt-3 mt-3 space-y-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    {navLabels.login}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full justify-start">
                    {navLabels.register}
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    {navLabels.profile}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
