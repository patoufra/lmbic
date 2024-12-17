'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Wifi, ArrowRight, Check } from 'lucide-react'

const steps = [
  { 
    title: "Plug in Your Lamp", 
    description: "Plug in your LimbicLight lamp. The lamp will automatically enter pairing mode with a slowly pulsing light."
  },
  { 
    title: "Connect to Lamp's Network", 
    description: "On your device, join the WiFi network named 'LimbicLight-XXXX'. The XXXX will be a unique code for your lamp."
  },
  { 
    title: "Enter Your WiFi Details", 
    description: "Enter the name (SSID) and password of your home WiFi network:"
  },
  { 
    title: "Pairing in Progress", 
    description: "We're now sending your WiFi details to the lamp. This may take a minute..."
  },
  { 
    title: "Pairing Complete", 
    description: "Your LimbicLight lamp is now connected to your home network and ready to use!"
  },
]

export function DevicePairingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [isPairing, setIsPairing] = useState(false)

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 2) {
        // Simulate sending WiFi details to the lamp
        setIsPairing(true)
        await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate a delay
        setIsPairing(false)
      }
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
      setCurrentStep(0)
      setSsid('')
      setPassword('')
    }
  }

  const isNextDisabled = (currentStep === 2 && (!ssid || !password)) || isPairing

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-surface-dark text-text-primary border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-text-primary">Set Up New Device</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-text-primary">{steps[currentStep].title}</h3>
          <p className="text-sm text-text-secondary mb-4">{steps[currentStep].description}</p>

          {currentStep === 2 && (
            <div className="space-y-2">
              <Input
                placeholder="WiFi Network Name (SSID)"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                className="bg-surface text-text-primary border-gray-700"
              />
              <Input
                type="password"
                placeholder="WiFi Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface text-text-primary border-gray-700"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex justify-center items-center h-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex justify-center items-center h-24">
              <Check className="text-primary h-12 w-12" />
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isPairing}
              className="bg-surface hover:bg-surface-dark text-text-primary border-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={isNextDisabled}
              className="bg-primary hover:bg-primary/80 text-background"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Finish'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

