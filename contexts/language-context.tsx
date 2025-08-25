"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "english" | "chinese"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  isEnglish: boolean
  isChinese: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as Language
    if (savedLanguage && (savedLanguage === "english" || savedLanguage === "chinese")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("selectedLanguage", newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isEnglish: language === "english",
        isChinese: language === "chinese",
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
