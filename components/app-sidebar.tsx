"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { 
  FiTerminal,
  FiBook,
  FiSettings,
  FiTwitter 
} from "react-icons/fi"
import { RiRobot2Line } from "react-icons/ri"
import { FaTelegramPlane } from "react-icons/fa";

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Staking",
      url: "/staking",
      icon: FiTerminal,
      isActive: true,
      items: [
        {
          title: "Info",
          url: "/staking/info",
        },
        {
          title: "ReStake",
          url: "/staking/restake",
        },
        {
          title: "Validators",
          url: "/staking/validators",
        },
      ],
    },
    {
      title: "Network",
      url: "#",
      icon: RiRobot2Line,
      isActive: true,
      items: [
        {
          title: "Nodes",
          url: "/network/nodes",
        },
        {
          title: "Explorer",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: FiBook,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Tools",
      url: "#",
      icon: FiSettings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Twitter",
      url: "#",
      icon: FiTwitter,
    },
    {
      title: "Telegram",
      url: "#",
      icon: FaTelegramPlane,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and first mount
  if (!mounted) {
    return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/nav_logo_light.svg"
                      alt="Shido Logo"
                      width={32}
                      height={32}
                      className="size-8"
                      priority
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">SHIDO NEXUS</span>
                    <span className="truncate text-xs">@shidonexus</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
    )
  }
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/nav_logo_light.svg"
                    alt="Shido Logo"
                    width={32}
                    height={32}
                    className="size-8"
                    priority
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SHIDO NEXUS</span>
                  <span className="truncate text-xs">@shidonexus</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
