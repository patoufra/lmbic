import { ARStudio } from '@/components/ARStudio'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ARStudioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AR Studio</h1>
        <Link href="/apps" passHref>
          <Button variant="outline">Back to Apps</Button>
        </Link>
      </div>
      <ARStudio />
    </div>
  )
}

