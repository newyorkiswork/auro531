"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WashingMachine } from "lucide-react"
import MachinesTable from "./MachinesTable"
import AddMachineDialog from "./AddMachineDialog"
import { supabase } from "@/lib/supabase"

export const metadata = {
  title: 'Laundry Machines | AURO Admin',
  description: 'Monitor and manage laundry machine statuses',
}

export default function MachinesPage() {
  const [machines, setMachines] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const { data, error } = await supabase.from("machines").select("*")
        if (error) throw error
        setMachines(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch machines")
      } finally {
        setLoading(false)
      }
    }
    fetchMachines()
  }, [])

  // Stats
  const totalMachines = machines.length
  const washerCount = machines.filter((m) => (m.machine_type || "").toLowerCase() === "washer").length
  const dryerCount = machines.filter((m) => (m.machine_type || "").toLowerCase() === "dryer").length
  const activeCount = machines.filter((m) => (m.current_status || m.status || "").toLowerCase() === "active" || (m.current_status || m.status || "").toLowerCase() === "online").length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Laundry Machines</h2>
        <AddMachineDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
            <WashingMachine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMachines}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Washers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{washerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dryers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dryerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Machines</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <MachinesTable machines={machines} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
