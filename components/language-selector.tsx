"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSelector() {
  const { language, setLanguage, isEnglish, isChinese } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <Button
          variant={isEnglish ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("english")}
          className={`px-3 py-1 text-xs ${
            isEnglish ? "bg-blue-600 text-white shadow-sm" : "bg-transparent text-gray-600 hover:text-blue-600"
          }`}
        >
          English
        </Button>
        <Button
          variant={isChinese ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("chinese")}
          className={`px-3 py-1 text-xs ${
            isChinese ? "bg-blue-600 text-white shadow-sm" : "bg-transparent text-gray-600 hover:text-blue-600"
          }`}
        >
          中文
        </Button>
      </div>
    </div>
  )
}
