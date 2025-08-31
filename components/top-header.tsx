"use client"

import { Search, ShoppingCart, Bell, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react" // Import useState
import { gsap } from "gsap"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Order Page List",
  "/customers": "Customers",
  "/property": "Property Detail",
  "/property/luxury-dream-house": "Luxury Dream House T-001234",
  "/property/modern-apartment": "Modern Apartment Complex",
  "/property/downtown-office": "Downtown Office Building",
  "/property/suburban-home": "Suburban Family Home",
  "/property/waterfront-villa": "Waterfront Villa",
  "/property/city-penthouse": "City Center Penthouse",
  "/reviews": "Reviews",
  "/calendar": "Calendar",
  "/analytics": "Analytics",
  "/messages": "Messages",
  "/settings": "Settings",
}

export function TopHeader() {
  const pathname = usePathname()
  const pageName = pageNames[pathname] || "Dashboard"
  const { user, logout } = useAuth()

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  useEffect(() => {
    // Quick header animation
    gsap.fromTo(
      ".animate-header",
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power1.out",
      },
    )

    // Gentle notification animation
    gsap.to(".animate-notification", {
      opacity: 0.9,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    })

    // Quick search input focus
    const searchInput = document.querySelector(".animate-search")
    if (searchInput) {
      const handleFocus = () => {
        gsap.to(searchInput, {
          y: -1,
          duration: 0.15,
          ease: "power1.out",
        })
      }

      const handleBlur = () => {
        gsap.to(searchInput, {
          y: 0,
          duration: 0.15,
          ease: "power1.out",
        })
      }

      searchInput.addEventListener("focus", handleFocus)
      searchInput.addEventListener("blur", handleBlur)

      return () => {
        searchInput.removeEventListener("focus", handleFocus)
        searchInput.removeEventListener("blur", handleBlur)
      }
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="animate-header h-16 border-b border-gray-200 bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-gray-100 transition-all duration-150" />
        <h1 className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          {pageName}
        </h1>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="animate-search pl-10 w-64 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-150 focus:shadow-md"
          />
        </div>

        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="sm:hidden hover:bg-gray-100 transition-all duration-150">
          <Search className="w-5 h-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-auto p-0 rounded-full flex items-center gap-3 hover:bg-gray-100 transition-all duration-150"
            >
              <Avatar className="w-10 h-10 hover:shadow-md transition-all duration-150 shadow-md">
                {/* user?.avatar ||  */}
                <AvatarImage src={"/placeholder.svg?height=40&width=40"} />
                <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 font-semibold">
                  {user ? getInitials(user.name || "User") : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{user?.role || "Admin"}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
