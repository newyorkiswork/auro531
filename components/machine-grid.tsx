'use client'

import { useEffect, useState } from 'react'
import { Machine, MachineStatus } from '@/lib/machine-status'
import { MachineStatusIndicator } from './machine-status'
import { supabase } from '@/lib/supabase'
import { startMachineStatusUpdates } from '@/lib/machine-status'

export function MachineGrid() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Start the machine status updates
    const cleanup = startMachineStatusUpdates()

    // Fetch initial machines
    const fetchMachines = async () => {
      try {
        const { data, error } = await supabase
          .from('machines')
          .select('*')
          .order('id')

        if (error) throw error

        setMachines(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch machines')
      } finally {
        setLoading(false)
      }
    }

    fetchMachines()

    // Subscribe to machine updates
    const subscription = supabase
      .channel('machines')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setMachines((current) =>
              current.map((machine) =>
                machine.id === payload.new.id ? payload.new : machine
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      cleanup()
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 rounded-lg p-4 h-32"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-50">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {machines.map((machine) => (
        <div
          key={machine.id}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Machine {machine.id}</h3>
            <MachineStatusIndicator
              status={machine.status}
              lastUpdate={machine.updated_at}
            />
          </div>
          <div className="text-sm text-gray-500">
            <p>Type: {machine.type}</p>
            <p>Location: {machine.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 