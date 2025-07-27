"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved preference, default to system
    const saved = localStorage.getItem("theme-preference") as Theme
    return saved || "system"
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Function to update theme based on current setting
    const updateTheme = () => {
      root.classList.remove("light", "dark")
      
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        root.classList.add(isDark ? "dark" : "light")
      } else {
        root.classList.add(theme)
      }
    }

    // Set initial theme
    updateTheme()

    // Listen for system theme changes (only when using system preference)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = () => {
      if (theme === "system") {
        updateTheme()
      }
    }
    
    mediaQuery.addEventListener("change", handleSystemChange)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleSystemChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      localStorage.setItem("theme-preference", newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 