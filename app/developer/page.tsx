'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Book, Download, PlayCircle } from 'lucide-react'

export default function Developer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Montserrat' }}>Developer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
          <p className="mb-4">Access our comprehensive API documentation to integrate LimbicLight into your projects.</p>
          <Button variant="outline">
            <Book className="mr-2 h-4 w-4" /> View Documentation
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">SDK Downloads</h2>
          <p className="mb-4">Download our SDK for various platforms to start building your LimbicLight-compatible apps.</p>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> iOS SDK
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Android SDK
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Web SDK
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Sample Code</h2>
          <p className="mb-4">Explore example projects and code snippets to jumpstart your development.</p>
          <Button variant="outline">
            <Code className="mr-2 h-4 w-4" /> Browse Samples
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Tutorials</h2>
          <p className="mb-4">Watch video tutorials and follow step-by-step guides to create amazing LimbicLight experiences.</p>
          <Button variant="outline">
            <PlayCircle className="mr-2 h-4 w-4" /> Watch Tutorials
          </Button>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Submit Your App</h2>
        <p className="mb-4">Ready to share your creation with the LimbicLight community? Submit your app for review and publication in our marketplace.</p>
        <Button variant="primary">Start Submission Process</Button>
      </Card>
    </div>
  )
}

