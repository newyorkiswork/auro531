import { supabase } from './supabase'

export type MachineStatus = 'idle' | 'in_use' | 'maintenance' | 'out_of_order'

export interface Machine {
  id: number
  type: string
  location: string
  status: MachineStatus
  updated_at: string
}

// Helper function to get a random status
function getRandomStatus(): MachineStatus {
  const statuses: MachineStatus[] = ['idle', 'in_use', 'maintenance', 'out_of_order']
  const weights = [0.6, 0.3, 0.08, 0.02] // 60% idle, 30% in_use, 8% maintenance, 2% out_of_order
  const random = Math.random()
  let sum = 0
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i]
    if (random < sum) return statuses[i]
  }
  return 'idle'
}

// Function to update machine statuses
export async function updateMachineStatuses() {
  try {
    const { data: machines, error } = await supabase
      .from('machines')
      .select('*')

    if (error) throw error

    const updates = machines.map((machine) => ({
      id: machine.id,
      status: getRandomStatus(),
      updated_at: new Date().toISOString(),
    }))

    const { error: updateError } = await supabase
      .from('machines')
      .upsert(updates)

    if (updateError) throw updateError

    console.log('Machine statuses updated successfully')
  } catch (error) {
    console.error('Error updating machine statuses:', error)
  }
}

// Function to start periodic updates
export function startMachineStatusUpdates() {
  // Initial update
  updateMachineStatuses()

  // Set up interval for updates every 45 minutes
  const intervalId = setInterval(updateMachineStatuses, 45 * 60 * 1000)

  // Return cleanup function
  return () => clearInterval(intervalId)
} 