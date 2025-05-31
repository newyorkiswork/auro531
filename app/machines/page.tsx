import { MachineGrid } from '@/components/machine-grid'

export const metadata = {
  title: 'Laundry Machines | AURO Admin',
  description: 'Monitor and manage laundry machine statuses',
}

export default function MachinesPage() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Laundry Machines</h1>
        <p className="text-sm md:text-base text-gray-600">
          Monitor the status of all laundry machines in real-time
        </p>
      </div>
      <MachineGrid />
    </div>
  )
}
