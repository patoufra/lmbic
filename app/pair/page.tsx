'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PairDevice() {
  const [deviceCode, setDeviceCode] = useState('')
  const [isPairing, setIsPairing] = useState(false)
  const [pairingStatus, setPairingStatus] = useState('')

  const handlePair = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPairing(true)
    setPairingStatus('Pairing...')
    
    // This is where you'd typically make an API call to your backend
    // For this example, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPairingStatus('Device paired successfully!')
    setIsPairing(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Pair a New Device</h1>
        <form onSubmit={handlePair} className="w-full max-w-xs">
          <input
            type="text"
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
            placeholder="Enter device code"
            className="w-full px-3 py-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            disabled={isPairing}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isPairing ? 'Pairing...' : 'Pair Device'}
          </button>
        </form>
        {pairingStatus && (
          <p className="mt-4 text-green-500">{pairingStatus}</p>
        )}
        <Link href="/" className="mt-6 text-blue-500 hover:text-blue-700">
          Back to Dashboard
        </Link>
      </main>
    </div>
  )
}

