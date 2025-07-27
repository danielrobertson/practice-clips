"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "light") {
      return <Sun className="h-5 w-5" />
    } else if (theme === "dark") {
      return <Moon className="h-5 w-5" />
    } else {
      // For system theme, show sun if system is light, moon if dark
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      return isSystemDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="h-9 w-9"
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 