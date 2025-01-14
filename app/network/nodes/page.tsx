"use client"

import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const nodes: NodeConfig[] = [
  { url: "https://jsonrpc.shidonexus.com", name: "https://jsonrpc.shidonexus.com" },
  { url: "https://evm.mavnode.io", name: "https://evm.mavnode.io" },
  { url: "https://evm.kenseishido.com", name: "https://evm.kenseishido.com" },
  { url: "https://rpc-nodes.shidoscan.com", name: "https://rpc-nodes.shidoscan.com" },
  { url: "https://rpc-delta-nodes.shidoscan.com", name: "https://rpc-delta-nodes.shidoscan.com" },
]

const columns: ColumnDef<NodeHealth>[] = [
  {
    id: "details",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <div className="text-base font-medium">{row.original.name}</div>
            <Badge
              variant={
                row.original.status === "operational"
                  ? "success"
                  : row.original.status === "degraded"
                  ? "warning"
                  : "destructive"
              }
            >
              {row.original.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <div>Response: {row.original.responseTime}ms</div>
            <div>Success: {row.original.successRate.toFixed(2)}%</div>
            <div>Block: {row.original.blockHeight}</div>
            <div>Updated: {new Date(row.original.lastChecked).toLocaleTimeString()}</div>
          </div>
        </div>
      )
    },
  }
]

async function checkNodeHealth(node: NodeConfig): Promise<NodeHealth> {
  const startTime = performance.now()
  
  try {
    const response = await fetch(node.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
    })

    const endTime = performance.now()
    const responseTime = Math.round(endTime - startTime)

    if (!response.ok) {
      throw new Error("Node not responding")
    }

    const data = await response.json()
    const blockHeight = parseInt(data.result, 16)

    return {
      ...node,
      status: responseTime < 500 ? "operational" : "degraded",
      responseTime,
      blockHeight,
      successRate: 100,
      lastChecked: new Date()
    }
  } catch (error) {
    console.error('Node health check failed:', error);
    return {
      ...node,
      status: "down",
      responseTime: 0,
      successRate: 0,
      lastChecked: new Date()
    }
  }
}

export default function NodesPage() {
  const [nodeHealth, setNodeHealth] = useState<NodeHealth[]>([])
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    async function checkNodes() {
      const results = await Promise.all(nodes.map(checkNodeHealth))
      setNodeHealth(results)
      setLoading(false)
      setCountdown(10)
    }

    checkNodes()
    const checkInterval = setInterval(checkNodes, 10000) // Check every 10 seconds
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 10))
    }, 1000)
    
    return () => {
      clearInterval(checkInterval)
      clearInterval(countdownInterval)
    }
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl relative pb-4 uppercase mb-6">
          Network Nodes
          <span className="absolute bottom-2.5 left-0 w-[2ch] border-b-2 border-sidebar-primary"></span>
        </h1>
        <div className="text-center">Loading node status...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl relative pb-4 uppercase mb-4 md:mb-6">
          Network Nodes
          <span className="absolute bottom-2.5 left-0 w-[2ch] border-b-2 border-sidebar-primary"></span>
        </h1>
        <div className="text-sm text-muted-foreground">
          Next update in {countdown}s
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 mb-4 md:mb-6">
        <Card className="p-2 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Operational Nodes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-lg md:text-2xl font-bold">
              {nodeHealth.filter((n) => n.status === "operational").length}
            </div>
          </CardContent>
        </Card>
        <Card className="p-2 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Avg Response
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-lg md:text-2xl font-bold">
              {Math.round(
                nodeHealth.reduce((acc, n) => acc + n.responseTime, 0) /
                  nodeHealth.length
              )}
              ms
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1 p-2 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Latest Block
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-lg md:text-2xl font-bold">
              {Math.max(...nodeHealth.map((n) => n.blockHeight || 0)).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable 
        columns={columns} 
        data={nodeHealth}
        className="[&_.p-4]:p-3 [&_td]:align-top [&_td]:py-3 [&_th]:text-xs [&_td]:text-sm [&_thead]:hidden"
      />
    </div>
  )
} 