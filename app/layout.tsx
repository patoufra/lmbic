import './globals.css'
import { Inter, Montserrat } from 'next/font/google'
import { theme } from '@/styles/theme'
import { ToastProvider } from '@/components/ui/use-toast'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNavBar } from '@/components/layout/top-nav-bar'
import { FloatingActionButton } from '@/components/layout/floating-action-button'
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from '@/contexts/SidebarContext'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Lmbic Dashboard',
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
        className={`${inter.className} ${montserrat.className} bg-background text-text-primary`}
        style={{ 
          backgroundColor: theme.colors.background,
          color: theme.colors.text.primary,
        }}
      >
        <ToastProvider>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <TopNavBar />
                <main className="flex-1 overflow-auto p-6 transition-all duration-300 mt-16">
                  {children}
                </main>
              </div>
            </div>
            <FloatingActionButton />
            <Toaster />
          </SidebarProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

