"use client"

import {
  Home,
  Building2,
  Percent,
  Calendar,
  ShoppingCart,
  BarChart3,
  Users,
  MessageSquare,
  Heart,
  Star,
  ChevronDown,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Property, apiClient } from "@/lib/api"

type MainMenuItem = {
  title: string;
  url: string;
  icon: any;
  hasSubmenu?: boolean;
  submenu?: { title: string; url: string }[];
  badge?: string;
};

const mainMenuItems: MainMenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Property",
    url: "/property",
    icon: Building2,
    hasSubmenu: true,
    submenu: [], // This will be populated from database
  },
  {
    title: "Discount", // Renamed from Type
    url: "/discount", // Updated URL
    icon: Percent, // Updated icon
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Bookings",
    url: "/transactions",
    icon: ShoppingCart,
    badge: "27",
  },
  // {
  //   title: "Analytics",
  //   url: "/analytics",
  //   icon: BarChart3,
  // },
]

const otherItems = [
  {
    title: "Visitors",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: Star,
    badge: "24",
  },
  // {
  //   title: "Messages",
  //   url: "/messages",
  //   icon: MessageSquare,
  //   badge: "12",
  // },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewsCount, setReviewsCount] = useState<number>(0)
  const [bookingsCount, setBookingsCount] = useState<number>(0)

  // Fetch properties, reviews count, and bookings count from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedProperties, fetchedComments, fetchedBookingsCount] = await Promise.all([
          apiClient.getProperties(),
          apiClient.getComments({ status: 'PENDING' }),
          apiClient.getEnquiryBookingsCount()
        ])
        setProperties(fetchedProperties)
        setReviewsCount(fetchedComments.length)
        setBookingsCount(fetchedBookingsCount.count)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Refresh reviews count when component becomes visible
  useEffect(() => {
    const refreshCounts = async () => {
      try {
        const [fetchedComments, fetchedBookingsCount] = await Promise.all([
          apiClient.getComments({ status: 'PENDING' }),
          apiClient.getEnquiryBookingsCount()
        ])
        setReviewsCount(fetchedComments.length)
        setBookingsCount(fetchedBookingsCount.count)
      } catch (error) {
        console.error('Failed to refresh counts:', error)
      }
    }

    // Refresh when component mounts and when window gains focus
    const handleFocus = () => {
      refreshCounts()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Update mainMenuItems with dynamic properties and bookings count
  const updatedMainMenuItems = mainMenuItems.map(item => {
    if (item.title === "Property" && item.hasSubmenu) {
      const propertySubmenu = properties.map(property => ({
        title: property.name,
        url: `/property/${property.id}`,
      }))
      
      // Add "View All Properties" at the end
      propertySubmenu.push({
        title: "View All Properties",
        url: "/property",
      })

      return {
        ...item,
        submenu: propertySubmenu,
      }
    }
    if (item.title === "Bookings") {
      return {
        ...item,
        badge: loading ? "..." : bookingsCount.toString(),
      }
    }
    return item
  })

  // Update otherItems with dynamic reviews count
  const updatedOtherItems = otherItems.map(item => {
    if (item.title === "Reviews") {
      return {
        ...item,
        badge: loading ? "..." : reviewsCount.toString(),
        // Badge shows count of pending reviews that need attention
      }
    }
    return item
  })

  useEffect(() => {
    // Quick sidebar items animation
    gsap.fromTo(
      ".animate-sidebar-item",
      {
        opacity: 0,
        x: -15,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: "power1.out",
        stagger: 0.02,
      },
    )

    // Quick logo animation
    gsap.fromTo(
      ".animate-logo",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out",
      },
    )

    // Gentle badge animation
    gsap.to(".animate-badge", {
      opacity: 0.8,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white/95 backdrop-blur-sm h-screen sticky top-0"
      variant="sidebar"
    >
      <SidebarHeader
        className={cn("border-b border-gray-100 transition-all duration-200", isCollapsed ? "p-4" : "p-6")}
      >
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="animate-logo w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <Home className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <h1 className="text-xl font-bold text-gray-900">Windermere</h1>
              <p className="text-sm text-gray-500">Lodges</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("transition-all duration-200", isCollapsed ? "px-2 py-4" : "px-4 py-6")}>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium mb-4 px-2">Main Menu</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {updatedMainMenuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-sidebar-item">
                  {item.hasSubmenu && !isCollapsed ? (
                    <Collapsible defaultOpen={pathname.startsWith(item.url)} className="group/collapsible">
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "w-full transition-all duration-200 h-12 px-3 justify-start rounded-lg hover:shadow-md",
                          pathname.startsWith(item.url)
                            ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <CollapsibleTrigger className="flex items-center gap-3 w-full">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium">{item.title}</span>
                          <ChevronDown className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                      <CollapsibleContent className="transition-all duration-200">
                        <SidebarMenuSub>
                          {loading ? (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton className="text-gray-500">
                                <span className="truncate">Loading properties...</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ) : item.submenu && item.submenu.length > 0 ? (
                            item.submenu.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className={cn(
                                    "transition-all duration-150 hover:bg-teal-50",
                                    pathname === subItem.url &&
                                      "bg-teal-50 text-teal-700 font-medium border-teal-600",
                                    // "bg-teal-50 text-teal-700 font-medium border-r-2 border-teal-600",
                                  )}
                                >
                                  <Link href={subItem.url}>
                                    <span className="truncate">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))
                          ) : (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton className="text-gray-500">
                                <span className="truncate">No properties found</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                      className={cn(
                        "w-full transition-all duration-200 hover:shadow-md",
                        isCollapsed ? "h-10 w-10 p-0 justify-center" : "h-12 px-3 justify-start",
                        "rounded-lg",
                        pathname === item.url || (item.hasSubmenu && pathname.startsWith(item.url))
                          ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "animate-badge ml-auto text-xs px-2 py-1 rounded-full font-medium shadow-sm",
                                  pathname === item.url || (item.hasSubmenu && pathname.startsWith(item.url))
                                    ? "bg-teal-500 text-white"
                                    : "bg-gradient-to-r from-teal-600 to-teal-700 text-white",
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium mb-4 px-2">Others</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {updatedOtherItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-sidebar-item">
                  <SidebarMenuButton
                    asChild
                    tooltip={isCollapsed ? item.title : undefined}
                    className={cn(
                      "w-full transition-all duration-200 hover:shadow-md",
                      isCollapsed ? "h-10 w-10 p-0 justify-center" : "h-12 px-3 justify-start",
                      "rounded-lg",
                      pathname === item.url
                        ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <Link href={item.url} className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "animate-badge ml-auto text-xs px-2 py-1 rounded-full font-medium shadow-sm",
                                pathname === item.url
                                  ? "bg-teal-500 text-white"
                                  : item.title === "Reviews"
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                                    : "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={cn("border-t border-gray-100 transition-all duration-200", isCollapsed ? "p-4" : "p-6")}
      >
        {!isCollapsed && (
          <div className="text-sm text-gray-600 animate-sidebar-item">
            <p className="font-medium pb-1">Windermere Lodges</p>
            <p className="text-xs text-gray-500">© 2025 All Rights Reserved</p>
            {/* <p className="text-xs text-gray-500 mt-2 flex items-center">
              Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> by SolestoneAI
            </p> */}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
