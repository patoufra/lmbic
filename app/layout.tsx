import './globals.css'
import { Inter, Montserrat } from 'next/font/google'
import { theme } from '@/styles/theme'
import { ToastProvider } from '@/components/ui/use-toast'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNavBar } from '@/components/layout/top-nav-bar'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { FloatingActionButton } from '@/components/layout/floating-action-button'
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from '@/contexts/SidebarContext'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'LimbicLight Dashboard',
  description: 'Manage your AR-enhanced IoT lamps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} ${montserrat.className}`}
        style={{ 
          backgroundColor: theme.colors.background,
          color: theme.colors.text.primary,
        }}
      >
        <ToastProvider>
          <SidebarProvider>
            <div className="flex flex-col h-screen">
              <TopNavBar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto p-4 md:p-8 relative">
                  <Breadcrumbs />
                  {children}
                  <FloatingActionButton />
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

