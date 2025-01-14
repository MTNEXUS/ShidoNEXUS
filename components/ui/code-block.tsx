import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"

interface CodeBlockProps {
  language?: string
  value: string
  className?: string
}

export function CodeBlock({
  language,
  value,
  className,
  ...props
}: CodeBlockProps) {
  return (
    <div className="relative">
      <pre
        className={cn(
          "mb-4 mt-6 overflow-x-auto rounded-lg bg-primary p-4",
          className
        )}
        {...props}
      >
        <CopyButton
          value={value}
          className="absolute right-4 top-4"
        />
        <code className={cn(
          "relative font-mono text-sm text-primary-foreground",
          language && `language-${language}`
        )}>
          {value}
        </code>
      </pre>
    </div>
  )
} 