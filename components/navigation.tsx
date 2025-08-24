"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, MessageCircle, User, FileText, PenTool, Gamepad2, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LearnSpeak</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/flashcards"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Brain className="h-4 w-4" />
              Flashcards
            </Link>
            <Link href="/quiz" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <BookOpen className="h-4 w-4" />
              Quiz
            </Link>
            <Link
              href="/dialog"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              AI Dialog
            </Link>
            <Link
              href="/reading"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Reading
            </Link>
            <Link
              href="/writing"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <PenTool className="h-4 w-4" />
              Writing
            </Link>
            <Link href="/games" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Gamepad2 className="h-4 w-4" />
              Games
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                Register
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
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
              <Link
                href="/flashcards"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Brain className="h-4 w-4" />
                Flashcards
              </Link>
              <Link
                href="/quiz"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                Quiz
              </Link>
              <Link
                href="/dialog"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                AI Dialog
              </Link>
              <Link
                href="/reading"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="h-4 w-4" />
                Reading
              </Link>
              <Link
                href="/writing"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PenTool className="h-4 w-4" />
                Writing
              </Link>
              <Link
                href="/games"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Gamepad2 className="h-4 w-4" />
                Games
              </Link>

              <div className="border-t pt-3 mt-3 space-y-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full justify-start">
                    Register
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    Profile
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
