"use client"

import { ResponsiveTreeMap } from "@nivo/treemap"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TreeMapData {
  name: string
  value: number
  formattedValue: string
}

interface ValidatorTreemapProps {
  data: TreeMapData[]
  height?: number | string
  className?: string
}

export function ValidatorTreemap({ 
  data, 
  height = "calc(40vh)", 
  className 
}: ValidatorTreemapProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const transformedData = {
    name: "validators",
    color: "transparent",
    children: data,
  }

  return (
    <div 
      className={className}
      style={{ 
        height,
        minHeight: "300px",
        maxHeight: "800px"
      }}
    >
      <TooltipProvider>
        <ResponsiveTreeMap
          data={transformedData}
          identity="name"
          value="value"
          valueFormat=".02s"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          enableLabel={false}
          innerPadding={2}
          nodeComponent={({ node }) => {
            const isRoot = node.id === "validators"
            if (isRoot) return null

            const data = (node.data as unknown) as TreeMapData

            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    transform={`translate(${node.x},${node.y})`}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      width={node.width}
                      height={node.height}
                      fill={node.color}
                      rx={1}
                      style={{ pointerEvents: 'all' }}
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="font-medium">
                    <div className="mb-1">{data.name}</div>
                    <div className="text-sm opacity-90">{data.formattedValue} SHIDO</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          }}
          colors={isDark ? ["#752622", "#fbf0d8", "#FF3333", "#FF0000", "#729ab9"] : ["#752622", "#fbf0d8", "#FF3333", "#FF0000", "#990000", "#729ab9"]}
          animate={true}
          isInteractive={true}
        />
      </TooltipProvider>
    </div>
  )
} 