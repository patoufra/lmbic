import React, { useEffect, useRef, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Camera, Maximize, Minimize } from 'lucide-react'

interface ARScenePreviewProps {
  scene: {
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
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

export const ARScenePreview: React.FC<ARScenePreviewProps> = ({ scene, isFullscreen, onToggleFullscreen }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let animationFrameId: number

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        video.srcObject = stream
        await video.play()
        setIsPlaying(true)
        setIsCameraActive(true)
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    const stopStream = () => {
      const stream = video.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      video.srcObject = null
      setIsPlaying(false)
      setIsCameraActive(false)
    }

    const renderFrame = () => {
      if (!video || !canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      applyAROverlay(ctx, scene)
      animationFrameId = requestAnimationFrame(renderFrame)
    }

    if (isPlaying) {
      if (!isCameraActive) {
        startStream()
      }
      renderFrame()
    } else {
      stopStream()
      cancelAnimationFrame(animationFrameId)
    }

    return () => {
      stopStream()
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, scene, isCameraActive])

  const applyAROverlay = (ctx: CanvasRenderingContext2D, scene: ARScenePreviewProps['scene']) => {
    scene.patterns.forEach(pattern => {
      switch (pattern.type) {
        case 'grid':
          drawGrid(ctx, pattern.color, pattern.size)
          break
        case 'circles':
          drawCircles(ctx, pattern.color, pattern.size)
          break
        case 'dots':
          drawDots(ctx, pattern.color, pattern.size)
          break
      }
    })

    if (scene.segmentationSettings.enabled) {
      applySegmentationOverlay(ctx, scene.segmentationSettings.sensitivity)
    }
  }

  const drawGrid = (ctx: CanvasRenderingContext2D, color: string, size: number) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    const gridSize = size
    for (let x = 0; x < ctx.canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < ctx.canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }
  }

  const drawCircles = (ctx: CanvasRenderingContext2D, color: string, size: number) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    const circleRadius = size / 2
    for (let x = circleRadius; x < ctx.canvas.width; x += size) {
      for (let y = circleRadius; y < ctx.canvas.height; y += size) {
        ctx.beginPath()
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }

  const drawDots = (ctx: CanvasRenderingContext2D, color: string, size: number) => {
    ctx.fillStyle = color
    const dotSize = size / 5
    const spacing = size
    for (let x = spacing; x < ctx.canvas.width; x += spacing) {
      for (let y = spacing; y < ctx.canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const applySegmentationOverlay = (ctx: CanvasRenderingContext2D, sensitivity: number) => {
    ctx.fillStyle = `rgba(255, 0, 0, ${sensitivity * 0.5})`
    ctx.fillRect(100, 100, 200, 200)
  }

  return (
    <Card className={`p-6 ${isFullscreen ? 'fixed inset-0 z-50 flex flex-col justify-center' : ''}`}>
      <h3 className="text-xl font-semibold mb-4">Live Preview: {scene.name}</h3>
      <div className={`relative ${isFullscreen ? 'flex-1' : 'aspect-video'} bg-gray-800 rounded overflow-hidden`}>
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={640} height={360} />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <Button onClick={() => setIsPlaying(!isPlaying)} className="mr-2">
            {isPlaying ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
          </Button>
          <Button onClick={() => setIsCameraActive(!isCameraActive)}>
            <Camera className="mr-2" /> {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </Button>
        </div>
        <Button onClick={onToggleFullscreen}>
          {isFullscreen ? <Minimize className="mr-2" /> : <Maximize className="mr-2" />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>
      <div className="mt-4">
        <p><strong>Active Patterns:</strong> {scene.patterns.map(p => p.type).join(', ') || 'None'}</p>
        <p><strong>Segmentation:</strong> {scene.segmentationSettings.enabled ? 'Enabled' : 'Disabled'}</p>
        {scene.segmentationSettings.enabled && (
          <p><strong>Sensitivity:</strong> {scene.segmentationSettings.sensitivity.toFixed(1)}</p>
        )}
      </div>
    </Card>
  )
}

