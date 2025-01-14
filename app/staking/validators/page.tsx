"use client"

import { useEffect, useState } from "react"
import { QueryClient, setupStakingExtension } from "@cosmjs/stargate"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"

import { DataTable } from "@/components/ui/data-table"
import { ValidatorTreemap } from "@/components/validator-treemap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Validator {
  moniker: string
  tokens: string
  commission: string
  operatorAddress: string
}

interface ValidatorResponse {
  description?: {
    moniker?: string
  }
  tokens?: string
  commission?: {
    commissionRates?: {
      rate?: string
    }
  }
  operatorAddress: string
  status: number
}

const columns: ColumnDef<Validator>[] = [
  {
    accessorKey: "moniker",
    header: ({ column }) => {
      return (
        <div className="flex-1">Validator Name</div>
      )
    },
    cell: ({ row }) => {
      const tokens = Number(row.getValue("tokens"))
      const commission = Number(row.getValue("commission"))
      const formattedTokens = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(tokens / 1e18)
      
      return (
        <div className="flex flex-col py-2">
          <div className="font-medium truncate">{row.getValue("moniker")}</div>
          <div className="md:hidden flex flex-col mt-1 space-y-0.5">
            <div className="text-sm text-muted-foreground">
              {formattedTokens} SHIDO
            </div>
            <div className="text-sm text-muted-foreground">
              Commission: {(commission / 1e16).toFixed(2)}%
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "tokens",
    header: ({ column }) => {
      return (
        <div className="hidden md:block">Total Delegations</div>
      )
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue("tokens"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount / 1e18)
      return (
        <div className="hidden md:block truncate">
          {formatted} SHIDO
        </div>
      )
    },
  },
  {
    accessorKey: "commission",
    header: ({ column }) => {
      return (
        <div className="hidden md:block">Commission</div>
      )
    },
    cell: ({ row }) => {
      const commission = row.getValue("commission")
      const percentage = (Number(commission) / 1e16).toFixed(2)
      return (
        <div className="hidden md:block">
          {percentage}%
        </div>
      )
    },
  },
]

export default function ValidatorsPage() {
  const [validators, setValidators] = useState<Validator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchValidators() {
      try {
        const tmClient = await Tendermint34Client.connect("https://rpc.shidonexus.com")
        const queryClient = QueryClient.withExtensions(tmClient, setupStakingExtension)
        const { validators: validatorList } = await queryClient.staking.validators("BOND_STATUS_BONDED")
        
        const activeValidators = validatorList
          .map((validator: ValidatorResponse) => ({
            moniker: validator.description?.moniker || "Unknown",
            tokens: validator.tokens || "0",
            commission: validator.commission?.commissionRates?.rate || "0",
            operatorAddress: validator.operatorAddress,
          }))
          .sort((a: Validator, b: Validator) => Number(b.tokens) - Number(a.tokens))

        setValidators(activeValidators)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch validators")
        setLoading(false)
      }
    }

    fetchValidators()
  }, [])

  const treemapData = validators.map(validator => ({
    name: validator.moniker,
    value: Number(validator.tokens) / 1e18,
    formattedValue: new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(validator.tokens) / 1e18),
  }))

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl relative pb-4 uppercase mb-6">
          Active Validators
          <span className="absolute bottom-2.5 left-0 w-[50px] border-b-2 border-sidebar-primary"></span>
        </h1>
        <div className="text-center">Loading validators...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl relative pb-4 uppercase mb-6">
          Active Validators
          <span className="absolute bottom-2.5 left-0 w-[50px] border-b-2 border-sidebar-primary"></span>
        </h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <h1 className="text-3xl sm:text-4xl relative pb-4 uppercase mb-6">
        Active Validators
        <span className="absolute bottom-2.5 left-0 w-[50px] border-b-2 border-sidebar-primary"></span>
      </h1>
      
      <div className="grid gap-6 mb-6">
        <Card className="w-full overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle>Validator Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ValidatorTreemap 
              data={treemapData} 
              height="calc(45vh)"
              className="sm:p-4"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle>Validator List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={validators}
            className="[&_table]:border-collapse [&_th]:px-4 [&_td]:px-4 [&_th]:py-3 [&_td]:py-3 [&_th]:font-medium [&_th]:text-muted-foreground"
          />
        </CardContent>
      </Card>
    </div>
  )
}
