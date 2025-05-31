import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { NavLink } from "@/components/nav-link"
import { MobileNav } from "@/components/mobile-nav"
import { CartProvider } from "@/contexts/cart-context"
import {
  Home,
  Building2,
  Settings2,
  Truck,
  Users,
  Calendar,
  Package,
  BarChart3,
  Map,
  Search,
  List,
} from "lucide-react"
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auro Platform Admin",
  description: "Admin console for the Auro Platform",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Auro Platform Admin',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
 <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={cn(inter.className, "min-h-full bg-background antialiased")}>
        <CartProvider>
          <div className="flex h-[100dvh] bg-gray-100">
            {/* Sidebar - hidden on mobile */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Auro Logo" width={48} height={48} />
                  <div>
                    <div className="font-bold text-lg leading-tight">Auro</div>
                    <div className="text-xs text-muted-foreground">Admin Console</div>
                  </div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Navigation
                </div>
                <NavLink href="/">
                  <span className="flex items-center gap-3"><Home className="h-5 w-5" />Dashboard</span>
                </NavLink>
                <NavLink href="/laundromats">
                  <span className="flex items-center gap-3"><Building2 className="h-5 w-5" />Laundromats</span>
                </NavLink>
                <NavLink href="/laundromats-map">
                  <span className="flex items-center gap-3"><Map className="h-5 w-5" />Laundromats Map</span>
                </NavLink>
                <NavLink href="/laundromats-explore">
                  <span className="flex items-center gap-3"><Search className="h-5 w-5" />Laundromats Explore</span>
                </NavLink>
                <NavLink href="/participating-laundromats">
                  <span className="flex items-center gap-3"><List className="h-5 w-5" />Participating Laundromats</span>
                </NavLink>
                <NavLink href="/machines">
                  <span className="flex items-center gap-3"><Settings2 className="h-5 w-5" />Machines</span>
                </NavLink>
                <NavLink href="/drivers">
                  <span className="flex items-center gap-3"><Truck className="h-5 w-5" />Drivers</span>
                </NavLink>
                <NavLink href="/users">
                  <span className="flex items-center gap-3"><Users className="h-5 w-5" />Users</span>
                </NavLink>
                <NavLink href="/bookings">
                  <span className="flex items-center gap-3"><Calendar className="h-5 w-5" />Bookings</span>
                </NavLink>
                <NavLink href="/orders">
                  <span className="flex items-center gap-3"><Package className="h-5 w-5" />Orders</span>
                </NavLink>
                <NavLink href="/supply-orders">
                  <span className="flex items-center gap-3"><Package className="h-5 w-5" />Supply Orders</span>
                </NavLink>
                <NavLink href="/laundry-products">
                  <span className="flex items-center gap-3"><Package className="h-5 w-5" />Laundry Products</span>
                </NavLink>
                <NavLink href="/analytics">
                  <span className="flex items-center gap-3"><BarChart3 className="h-5 w-5" />Analytics</span>
                </NavLink>
              </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-[100dvh]">
              {/* Mobile header */}
              <header className="md:hidden bg-white border-b p-4 sticky top-0 z-40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src="/logo-horizontal.png" alt="Auro Logo" width={120} height={40} />
                  </div>
                  <MobileNav />
                </div>
              </header>

              {/* Page content */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6 safe-area-inset-bottom">
                {children}
              </main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
