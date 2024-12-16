import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <nav className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href={href} className="text-primary hover:underline capitalize">
                {segment.replace('-', ' ')}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

