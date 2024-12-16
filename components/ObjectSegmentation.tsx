import React from 'react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface ObjectSegmentationProps {
  scene: {
    segmentationSettings: {
      enabled: boolean
      sensitivity: number
    }
  }
  onUpdate: (updatedSettings: { enabled: boolean; sensitivity: number }) => void
}

export const ObjectSegmentation: React.FC<ObjectSegmentationProps> = ({ scene, onUpdate }) => {
  const handleToggle = (checked: boolean) => {
    onUpdate({ ...scene.segmentationSettings, enabled: checked })
  }

  const handleSensitivityChange = (value: number[]) => {
    onUpdate({ ...scene.segmentationSettings, sensitivity: value[0] })
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Object Segmentation</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="segmentation-toggle" className="text-sm font-medium">
            Enable Segmentation
          </Label>
          <Switch 
            id="segmentation-toggle"
            checked={scene.segmentationSettings.enabled} 
            onCheckedChange={handleToggle}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="sensitivity-slider" className="text-sm font-medium">
              Sensitivity
            </Label>
            <span className="text-sm text-muted-foreground">
              {scene.segmentationSettings.sensitivity.toFixed(1)}
            </span>
          </div>
          <Slider
            id="sensitivity-slider"
            value={[scene.segmentationSettings.sensitivity]}
            onValueChange={handleSensitivityChange}
            min={0}
            max={1}
            step={0.1}
            disabled={!scene.segmentationSettings.enabled}
          />
        </div>
      </div>
    </Card>
  )
}

