import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DeveloperToolsProps {
  scene: {
    id: string
    name: string
  }
}

export const DeveloperTools: React.FC<DeveloperToolsProps> = ({ scene }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Developer Tools</h3>
      <Tabs defaultValue="sdk">
        <TabsList>
          <TabsTrigger value="sdk">Native SDK</TabsTrigger>
          <TabsTrigger value="unity">Unity Plugin</TabsTrigger>
        </TabsList>
        <TabsContent value="sdk">
          <div className="space-y-4">
            <p>Integrate this scene in your native app using our SDK:</p>
            <pre className="bg-surface p-2 rounded">
              {`
import LimbicLightSDK

let scene = LimbicLightSDK.loadScene("${scene.id}")
scene.activate()
              `.trim()}
            </pre>
            <Button>Download SDK</Button>
          </div>
        </TabsContent>
        <TabsContent value="unity">
          <div className="space-y-4">
            <p>Use this scene in your Unity project:</p>
            <pre className="bg-surface p-2 rounded">
              {`
using LimbicLight.Unity;

public class ARController : MonoBehaviour
{
    void Start()
    {
        LimbicLightManager.LoadScene("${scene.id}");
    }
}
              `.trim()}
            </pre>
            <Button>Download Unity Plugin</Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

