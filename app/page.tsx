"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, TrendingUp, Home, Users, Calendar, Star, CheckCircle, ArrowUp } from "lucide-react"
import { useGSAPAnimations, useHoverAnimations, useButtonAnimations } from "@/hooks/use-gsap-animations"

export default function Dashboard() {
  const containerRef = useGSAPAnimations()
  useHoverAnimations()
  useButtonAnimations()

  // Lodge booking website dashboard data
  const dashboardData = {
    users: {
      total: 4,
      admins: 4,
      visitors: 0
    },
    reviews: {
      total: 1,
      pending: 1,
      approved: 1,
      withRating: 1
    },
    bookings: {
      total: 7,
      pending: 3,
      cancelled: 2,
      confirmed: 2
    },
    enquiries: {
      total: 0
    },
    locations: {
      cities: 1
    },
    properties: {
      total: 3,
      active: 3,
      currency: "GBP",
      inactive: 0
    },
    monthly_revenue: null
  }

  return (
    <div ref={containerRef} className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Stats Cards - Essential Booking Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift bg-emerald-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-emerald-100 text-sm">Available Lodges</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.properties.active}</p>
                <p className="text-emerald-200 text-xs">of {dashboardData.properties.total} total</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Home className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-orange-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-orange-100 text-sm">Total Bookings</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.bookings.total}</p>
                <p className="text-orange-200 text-xs">{dashboardData.bookings.confirmed} confirmed</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-orange-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-yellow-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-yellow-100 text-sm">Pending Bookings</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.bookings.pending}</p>
                <p className="text-yellow-200 text-xs">need attention</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-amber-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-amber-100 text-sm">Guest Reviews</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.reviews.total}</p>
                <p className="text-amber-200 text-xs">{dashboardData.reviews.pending} pending approval</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Star className="w-8 h-8 lg:w-10 lg:h-10 text-amber-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Booking Status Details */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Booking Status</CardTitle>
            <p className="text-sm text-gray-500">Current booking breakdown</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Confirmed Bookings</span>
                <span className="text-sm font-semibold text-green-600">{dashboardData.bookings.confirmed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="animate-progress h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  style={{ "--progress-width": `${(dashboardData.bookings.confirmed / dashboardData.bookings.total) * 100}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Pending Bookings</span>
                <span className="text-sm font-semibold text-yellow-600">{dashboardData.bookings.pending}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="animate-progress h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                  style={{ "--progress-width": `${(dashboardData.bookings.pending / dashboardData.bookings.total) * 100}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Cancelled Bookings</span>
                <span className="text-sm font-semibold text-red-600">{dashboardData.bookings.cancelled}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="animate-progress h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                  style={{ "--progress-width": `${(dashboardData.bookings.cancelled / dashboardData.bookings.total) * 100}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Management */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Review Management</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1 Review Pending</h3>
              <p className="text-gray-500 mb-4">You have a guest review waiting for approval.</p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Review & Approve
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
