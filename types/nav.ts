import type { IconType } from "react-icons"
import type { LucideIcon } from "lucide-react"

export type IconComponent = IconType | LucideIcon

export interface NavItem {
  title: string
  url: string
  icon: IconComponent
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
} 