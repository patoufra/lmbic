'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'; // Import React.use
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ColorSlider } from "@/components/ColorSlider"
import { theme } from "@/styles/theme"

interface Params {
  id: string;
}

interface Device {
  id: string;
  name: string;
  status: string;
  firmwareVersion: string;
  latestFirmwareVersion: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}



export default function DeviceSettings({ params }: PageProps) {
  const { toast } = useToast()
  const [device, setDevice] = useState<Device | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Unwrap the params Promise using React.use
  const unwrappedParams = use(params);  // Add this line

  useEffect(() => {
    const fetchDevice = async () => {
      setIsLoading(true)
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDevice({
        id: unwrappedParams.id,
        name: 'Living Room Lamp',
        status: 'online',
        firmwareVersion: '1.2.3',
        latestFirmwareVersion: '1.2.4',
        brightness: 50, // Default brightness
        color: { r: 255, g: 255, b: 255 }, // Default color (white)
        arMode: false, // Default AR Mode
        motionDetection: false, // Default Motion Detection
      })
      setIsLoading(false)
    }
    fetchDevice()
  }, [unwrappedParams.id])

  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSettingChange = (setting: string, value: any) => {
    setDevice((prevDevice) => {
      const safeDevice = prevDevice ?? {
        id: '',
        name: '',
        status: '',
        firmwareVersion: '',
        latestFirmwareVersion: '',
        brightness: 50,
        color: { r: 0, g: 0, b: 0 },
      };
  
      if (setting === 'color') {
        const updatedColor = value && typeof value === 'object'
          ? { r: value.r ?? 0, g: value.g ?? 0, b: value.b ?? 0 }
          : { r: 0, g: 0, b: 0 };
  
        return { ...safeDevice, color: updatedColor };
      }
  
      return { ...safeDevice, [setting]: value };
    });
  
    setHasChanges(true);
  };
  

  const handleSaveChanges = async () => {
    if (device) {
      // Simulating API call to save changes
      await new Promise(resolve => setTimeout(resolve, 1000))
      setHasChanges(false)
      toast({
        title: "Settings saved",
        description: "Your device settings have been updated successfully.",
      })
    }
  }

  const handleFirmwareUpdate = async () => {
    if (device) {
      setIsUpdating(true)
      // Simulating firmware update process
      await new Promise(resolve => setTimeout(resolve, 5000))
      setDevice({
        ...device,
        firmwareVersion: device.latestFirmwareVersion,
      })
      setIsUpdating(false)
      toast({
        title: "Firmware updated",
        description: `Your device firmware has been updated to version ${device.latestFirmwareVersion}.`,
      })
    }
  }


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!device) {
    return <div className="flex justify-center items-center h-screen">Device not found</div>
  }

  const needsUpdate = device.firmwareVersion !== device.latestFirmwareVersion

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: theme.fonts.heading }}>{device.name} Settings</h1>
        <div className="text-right">
          <p className={`font-semibold ${device.status === 'online' ? 'text-status-online' : 'text-status-offline'}`}>
            {device.status === 'online' ? 'Online' : 'Offline'}
          </p>
          <p className="text-sm text-secondary">
            Last seen: {new Date(device.lastSeen).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading }}>Basic Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-1">Name</label>
            <input
              type="text"
              value={device.name}
              onChange={(e) => handleSettingChange('name', e.target.value)}
              className="w-full bg-surface text-primary border border-primary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-1">Brightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={device.brightness}
              onChange={(e) => handleSettingChange('brightness', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-primary">{device.brightness}%</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-1">Color</label>
            <ColorSlider
            value={device?.color ?? { r: 0, g: 0, b: 0 }} // Fallback if device.color is undefined
            onChange={(value) => {
              console.log('ColorSlider value:', value);
              if (value && typeof value === 'object') {
                handleSettingChange('color', value);
              }
            }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-primary">RGB: {device.color.r}, {device.color.g}, {device.color.b}</span>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading }}>Advanced Settings</h2>
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={device.arMode}
                onChange={(e) => handleSettingChange('arMode', e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-primary"
              />
              <span className="ml-2 text-primary">AR Mode</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={device.motionDetection}
                onChange={(e) => handleSettingChange('motionDetection', e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-primary"
              />
              <span className="ml-2 text-primary">Motion Detection</span>
            </label>
          </div>
        </Card>
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading }}>Firmware Information</h2>
          <div className="mb-4">
            <p className="text-sm text-secondary">Current Version: <span className="text-primary">{device.firmwareVersion}</span></p>
            <p className="text-sm text-secondary">Latest Version: <span className="text-primary">{device.latestFirmwareVersion}</span></p>
          </div>
          {needsUpdate && (
            <Button
              onClick={handleFirmwareUpdate}
              disabled={isUpdating}
              variant="primary"
            >
              {isUpdating ? 'Updating...' : 'Update Firmware'}
            </Button>
          )}
          {!needsUpdate && (
            <p className="text-sm text-status-online">Your device is up to date.</p>
          )}
        </Card>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <Link href="/devices" passHref>
          <Button variant="outline">Back to Devices</Button>
        </Link>
        <Button 
          onClick={handleSaveChanges} 
          disabled={!hasChanges}
          variant="primary"
        >
          Save Changes
        </Button>
      </div>
      <Toaster />
    </div>
  )
}

