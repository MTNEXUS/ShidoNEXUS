"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent">
              <span className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="font-semibold">Theme</span>
              <span className="text-xs capitalize">system</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent">
            <span aria-hidden="true">
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="font-semibold">Theme</span>
            <span className="text-xs capitalize">{theme}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 