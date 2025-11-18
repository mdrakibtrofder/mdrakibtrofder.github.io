"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "./ui/switch" // Import Switch component

export function ModeToggle() {
  const { theme, setTheme } = useTheme() // Get current theme and setTheme

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme"
      />
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  )
}
