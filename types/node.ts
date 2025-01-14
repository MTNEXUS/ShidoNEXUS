type NodeStatus = "operational" | "degraded" | "down"

interface NodeHealth {
  url: string
  name: string
  status: NodeStatus
  responseTime: number
  blockHeight?: number
  successRate: number
  lastChecked: Date
}

interface NodeConfig {
  url: string
  name: string
} 