import { BarChart3, Building2, Calendar, Car, Home, Package, Truck, Users, Wrench } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Laundromats",
    url: "/laundromats",
    icon: Building2,
  },
  {
    title: "Laundromats Map",
    url: "/laundromats-map",
    icon: Building2,
  },
  {
    title: "Laundromats Explore",
    url: "/laundromats-explore",
    icon: Building2,
  },
  {
    title: "Machines",
    url: "/machines",
    icon: Wrench,
  },
  {
    title: "Drivers",
    url: "/drivers",
    icon: Truck,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Calendar,
  },
  {
    title: "Supply Orders",
    url: "/orders",
    icon: Package,
  },
  {
    title: "Laundry Products",
    url: "/laundry-products",
    icon: Package,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <Image src="/logo-horizontal.png" alt="Auro Logo" width={120} height={40} priority />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
