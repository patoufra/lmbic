'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { ARScenePreview } from '@/components/ARScenePreview'
import { PatternCreator } from '@/components/PatternCreator'
import { ObjectSegmentation } from '@/components/ObjectSegmentation'
import { useToast } from "@/components/ui/use-toast"

interface ARScene {
  id: string
  name: string
  patterns: Array<{
    id: string
    type: string
    color: string
    size: number
  }>
  segmentationSettings: {
    enabled: boolean
    sensitivity: number
  }
}

export const ARStudio: React.FC = () => {
  const { toast } = useToast()
  const [scenes, setScenes] = useState<ARScene[]>([
    { 
      id: '1', 
      name: 'Desk Workspace', 
      patterns: [
        { id: '1', type: 'grid', color: 'rgba(255, 255, 255, 0.5)', size: 50 },
        { id: '2', type: 'circles', color: 'rgba(0, 255, 255, 0.5)', size: 60 }
      ], 
      segmentationSettings: { enabled: true, sensitivity: 0.7 }
    },
    { 
      id: '2', 
      name: 'Back Wall', 
      patterns: [
        { id: '3', type: 'dots', color: 'rgba(255, 255, 0, 0.5)', size: 30 }
      ], 
      segmentationSettings: { enabled: true, sensitivity: 0.6 }
    },
  ])
  const [selectedScene, setSelectedScene] = useState<ARScene | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const filteredScenes = scenes.filter(scene => 
    scene.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteScene = useCallback((id: string) => {
    setScenes(prevScenes => prevScenes.filter(scene => scene.id !== id))
    if (selectedScene?.id === id) {
      setSelectedScene(null)
    }
    toast({
      title: "Scene Deleted",
      description: "The selected scene has been deleted.",
      variant: "destructive",
    })
  }, [selectedScene, toast])

  const handleUpdateScene = useCallback((updatedScene: ARScene) => {
    setScenes(prevScenes => prevScenes.map(scene => scene.id === updatedScene.id ? updatedScene : scene))
    setSelectedScene(updatedScene)
    toast({
      title: "Scene Updated",
      description: `Scene "${updatedScene.name}" has been updated.`,
    })
  }, [toast])

  const handleSaveScene = useCallback(() => {
    if (selectedScene) {
      // In a real application, you would save the scene to a backend here
      toast({
        title: "Scene Saved",
        description: `Scene "${selectedScene.name}" has been saved.`,
      })
    }
  }, [selectedScene, toast])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  const handleCreateScene = useCallback(() => {
    const newScene: ARScene = {
      id: Date.now().toString(),
      name: `New Scene ${scenes.length + 1}`,
      patterns: [],
      segmentationSettings: { enabled: false, sensitivity: 0.5 }
    }
    setScenes(prevScenes => [...prevScenes, newScene])
    setSelectedScene(newScene)
    toast({
      title: "Scene Created",
      description: `New scene "${newScene.name}" has been created.`,
    })
  }, [scenes.length, toast])

  const renderCardContent = () => {
    if (selectedScene) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4">Edit Scene: {selectedScene.name}</h2>
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="patterns">2D Patterns</TabsTrigger>
              <TabsTrigger value="segmentation">Object Segmentation</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ARScenePreview 
                scene={selectedScene} 
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </TabsContent>
            <TabsContent value="patterns">
              <PatternCreator 
                scene={selectedScene} 
                onUpdate={(updatedPatterns) => handleUpdateScene({...selectedScene, patterns: updatedPatterns})}
              />
            </TabsContent>
            <TabsContent value="segmentation">
              <ObjectSegmentation 
                scene={selectedScene}
                onUpdate={(updatedSettings) => handleUpdateScene({...selectedScene, segmentationSettings: updatedSettings})}
              />
            </TabsContent>
          </Tabs>
        </>
      );
    } else {
      return (
        <>
          <ARScenePreview 
            scene={{ name: 'Live Feed', patterns: [], segmentationSettings: { enabled: false, sensitivity: 0 } }}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
          <Button className="mt-4">
            +New Scene from Live Feed
          </Button>
        </>
      );
    }
  };

  return (
    <div className="h-full">
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          {selectedScene && (
            <Button onClick={handleSaveScene}>
              {/* <Save className="h-4 w-4 mr-2" /> Save Scene */}
            </Button>
          )}
        </div>

        <Card className={`p-4 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          {renderCardContent()}
        </Card>
      </div>
    </div>
  )
}

