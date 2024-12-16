'use client'

import React, { useState, useCallback } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [isFullscreen, setIsFullscreen] = useState(false)

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
          <h2 className="text-2xl font-semibold mb-6">Edit Scene: {selectedScene.name}</h2>
          <Tabs defaultValue="preview" className="space-y-6">
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
          <Button className="mt-6" onClick={handleCreateScene}>
            + New Scene from Live Feed
          </Button>
        </>
      );
    }
  };

  return (
    <div className={`h-full w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''} transition-all duration-300`}>
      <div className={`w-full ${isFullscreen ? 'p-0' : ''}`}>
        <div className={`flex justify-between items-center ${isFullscreen ? 'p-6' : 'mb-6'}`}>
          {selectedScene && (
            <Button onClick={handleSaveScene}>
              Save Scene
            </Button>
          )}
        </div>

        <Card className={`${isFullscreen ? 'rounded-none' : 'p-6'}`}>
          {renderCardContent()}
        </Card>
      </div>
    </div>
  )
}

