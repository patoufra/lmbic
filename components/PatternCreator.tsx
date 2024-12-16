import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2 } from 'lucide-react'

interface Pattern {
  id: string
  type: string
  color: string
  size: number
}

interface PatternCreatorProps {
  scene: {
    patterns: Pattern[]
  }
  onUpdate: (updatedPatterns: Pattern[]) => void
}

export const PatternCreator: React.FC<PatternCreatorProps> = ({ scene, onUpdate }) => {
  const [newPatternType, setNewPatternType] = useState('grid')
  const [newPatternColor, setNewPatternColor] = useState('#ffffff')
  const [newPatternSize, setNewPatternSize] = useState(50)

  const handleAddPattern = () => {
    const newPattern: Pattern = {
      id: Date.now().toString(),
      type: newPatternType,
      color: newPatternColor,
      size: newPatternSize
    }
    onUpdate([...scene.patterns, newPattern])
  }

  const handleRemovePattern = (id: string) => {
    onUpdate(scene.patterns.filter(p => p.id !== id))
  }

  const handleUpdatePattern = (id: string, updates: Partial<Pattern>) => {
    onUpdate(scene.patterns.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">2D Patterns</h3>
      <div className="space-y-4">
        {scene.patterns.map((pattern) => (
          <div key={pattern.id} className="flex items-center space-x-2 p-2 bg-surface rounded">
            <Select
              value={pattern.type}
              onValueChange={(value) => handleUpdatePattern(pattern.id, { type: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pattern Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="circles">Circles</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="color"
              value={pattern.color}
              onChange={(e) => handleUpdatePattern(pattern.id, { color: e.target.value })}
              className="w-12 h-8 p-0 border-none"
            />
            <Slider
              value={[pattern.size]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value) => handleUpdatePattern(pattern.id, { size: value[0] })}
              className="w-32"
            />
            <Button variant="ghost" size="sm" onClick={() => handleRemovePattern(pattern.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <Select value={newPatternType} onValueChange={setNewPatternType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="New Pattern Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="circles">Circles</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="color"
          value={newPatternColor}
          onChange={(e) => setNewPatternColor(e.target.value)}
          className="w-12 h-8 p-0 border-none"
        />
        <Slider
          value={[newPatternSize]}
          min={10}
          max={100}
          step={1}
          onValueChange={(value) => setNewPatternSize(value[0])}
          className="w-32"
        />
        <Button onClick={handleAddPattern}>
          <Plus className="h-4 w-4 mr-2" /> Add Pattern
        </Button>
      </div>
    </Card>
  )
}

