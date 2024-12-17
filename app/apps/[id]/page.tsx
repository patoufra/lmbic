'use client';

import { useEffect } from 'react';
import { use } from 'react'; // Import React.use
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ARStudio } from '@/components/ARStudio';
import { useSidebar } from '@/contexts/SidebarContext';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AppPage({ params }: PageProps) {
  const { closeSidebar } = useSidebar();

  // Unwrap the params Promise using React.use
  const unwrappedParams = use(params);

  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [closeSidebar]);

  const appName =
    unwrappedParams.id === '1' ? 'AR Studio' : `App ${unwrappedParams.id}`;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{appName}</h1>
        <Link href="/apps" passHref>
          <Button variant="outline">Back to Apps</Button>
        </Link>
      </div>
      {unwrappedParams.id === '1' && <ARStudio />}
      {/* Add conditions for other apps here */}
    </div>
  );
}