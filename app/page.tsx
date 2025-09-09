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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift bg-emerald-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-emerald-100 text-sm">Total Lodges</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.properties.total}</p>
                <p className="text-emerald-200 text-xs">{dashboardData.properties.active} available</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Home className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-blue-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-blue-100 text-sm">Total Guests</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.users.total}</p>
                <p className="text-blue-200 text-xs">{dashboardData.users.admins} staff members</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Users className="w-8 h-8 lg:w-10 lg:h-10 text-blue-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-orange-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-orange-100 text-sm">Reservations</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.bookings.total}</p>
                <p className="text-orange-200 text-xs">{dashboardData.bookings.confirmed} confirmed</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-orange-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
                <p className="text-amber-200 text-xs">{dashboardData.reviews.approved} published</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <Star className="w-8 h-8 lg:w-10 lg:h-10 text-amber-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Booking Revenue Chart */}
        <Card className="animate-card hover-lift xl:col-span-2 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Monthly Booking Revenue</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                {dashboardData.monthly_revenue !== null ? (
                  <>
                    <span className="text-xl lg:text-2xl font-bold animate-stat">
                      {dashboardData.properties.currency} {(dashboardData.monthly_revenue as number).toLocaleString()}
                    </span>
                    <div className="flex items-center text-green-500 text-sm animate-stat">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      View Details
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <span className="text-gray-400 text-lg">No booking revenue data yet</span>
                    <p className="text-sm text-gray-500 mt-2">Revenue tracking will appear here once guest bookings start coming in</p>
                  </div>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {dashboardData.monthly_revenue !== null ? (
              <>
                <div className="h-32 lg:h-48 flex items-end justify-between gap-1">
                  {[40, 60, 80, 45, 70, 55, 85, 65, 90, 75, 95, 80, 70, 85, 60].map((height, i) => (
                    <div
                      key={i}
                      className="animate-chart-bar bg-gradient-to-t from-teal-600 to-teal-400 rounded-t flex-1 min-w-[4px] lg:min-w-[8px] shadow-sm"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span className="hidden sm:inline">Feb</span>
                  <span>Mar</span>
                  <span className="hidden sm:inline">Apr</span>
                  <span>May</span>
                  <span className="hidden sm:inline">Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </>
            ) : (
              <div className="h-32 lg:h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Home className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Booking revenue chart will appear here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lodge Availability Overview */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lodge Availability</CardTitle>
            <p className="text-sm text-gray-500">Current occupancy and availability status</p>
          </CardHeader>
          <CardContent>
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                {/* Lodge Availability - 100% (All Available) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray="219.91 219.91"
                  strokeDashoffset="0"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Center white circle */}
                <circle cx="50" cy="50" r="20" fill="white" />
                {/* Center availability indicator */}
                <circle cx="50" cy="50" r="8" fill="#10b981" />
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { 
                  color: "bg-green-500", 
                  label: "Available Lodges", 
                  value: `${dashboardData.properties.active}/${dashboardData.properties.total}`, 
                  status: "Ready for Guests" 
                },
                { 
                  color: "bg-blue-500", 
                  label: "Staff Members", 
                  value: `${dashboardData.users.admins}`, 
                  status: "On Duty" 
                },
                { 
                  color: "bg-orange-500", 
                  label: "Locations", 
                  value: `${dashboardData.locations.cities}`, 
                  status: "Active" 
                },
                { 
                  color: "bg-gray-400", 
                  label: "Guest Reviews", 
                  value: `${dashboardData.reviews.total}`, 
                  status: "Pending" 
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between animate-stat">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.value}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{item.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Reservation Analytics */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Reservation Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Reservations</span>
                  <span className="text-sm text-gray-500">{dashboardData.bookings.total} bookings</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="animate-progress h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    style={{ "--progress-width": `${dashboardData.bookings.total === 0 ? 0 : 100}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Confirmed Stays</span>
                  <span className="text-sm text-gray-500">{dashboardData.bookings.confirmed} confirmed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="animate-progress h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    style={{ "--progress-width": `${dashboardData.bookings.confirmed === 0 ? 0 : 100}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Pending Guest Reviews</span>
                  <span className="text-sm text-gray-500">{dashboardData.reviews.pending} pending</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="animate-progress h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                    style={{ "--progress-width": `${dashboardData.reviews.pending === 0 ? 0 : 100}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lodge Operations Status */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Lodge Operations</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  metric: "Lodges", 
                  value: `${dashboardData.properties.active}/${dashboardData.properties.total}`, 
                  status: "Available",
                  progress: dashboardData.properties.total > 0 ? (dashboardData.properties.active / dashboardData.properties.total) * 100 : 0
                },
                { 
                  metric: "Staff", 
                  value: `${dashboardData.users.admins}/${dashboardData.users.total}`, 
                  status: "Active",
                  progress: dashboardData.users.total > 0 ? (dashboardData.users.admins / dashboardData.users.total) * 100 : 0
                },
                { 
                  metric: "Guest Reviews", 
                  value: `${dashboardData.reviews.approved}/${dashboardData.reviews.total}`, 
                  status: "Published",
                  progress: dashboardData.reviews.total > 0 ? (dashboardData.reviews.approved / dashboardData.reviews.total) * 100 : 0
                },
                { 
                  metric: "Reservations", 
                  value: `${dashboardData.bookings.confirmed}/${dashboardData.bookings.total}`, 
                  status: "Confirmed",
                  progress: dashboardData.bookings.total > 0 ? (dashboardData.bookings.confirmed / dashboardData.bookings.total) * 100 : 0
                },
                { 
                  metric: "Locations", 
                  value: `${dashboardData.locations.cities}`, 
                  status: "Active",
                  progress: 100
                },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.metric}</span>
                    <span className="text-sm font-medium">{item.value} {item.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-1">
                    <div
                      className="animate-progress h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                      style={{ "--progress-width": `${item.progress}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guest Experience Overview */}
        <Card className="animate-card hover-lift shadow-sm lg:col-span-2 xl:col-span-1 bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Guest Experience</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border border-emerald-200 rounded-lg bg-emerald-50/50">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Available Lodges</p>
                  <p className="text-sm font-bold text-gray-900">{dashboardData.properties.active} Lodges</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg bg-blue-50/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Guests</p>
                  <p className="text-sm font-bold text-gray-900">{dashboardData.users.total} Registered</p>
                </div>
              </div>
            </div>

            {/* Occupancy Rate */}
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center text-green-500 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {dashboardData.properties.total > 0 ? '100%' : '0%'}
              </div>
              <span className="text-xs text-gray-500">lodge availability rate</span>
            </div>

            {/* Booking Trends Chart */}
            <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Y-axis labels */}
                <text x="10" y="20" className="text-xs fill-gray-500">
                  50
                </text>
                <text x="10" y="60" className="text-xs fill-gray-500">
                  40
                </text>
                <text x="10" y="100" className="text-xs fill-gray-500">
                  30
                </text>
                <text x="10" y="140" className="text-xs fill-gray-500">
                  20
                </text>
                <text x="10" y="180" className="text-xs fill-gray-500">
                  10
                </text>

                {/* Bookings area (Emerald) */}
                <path
                  d="M 40 120 Q 80 100 120 110 Q 160 90 200 60 Q 240 80 280 100 Q 320 80 360 90 L 360 180 L 40 180 Z"
                  fill="url(#emeraldGradient)"
                  className="animate-progress"
                />
                <path
                  d="M 40 120 Q 80 100 120 110 Q 160 90 200 60 Q 240 80 280 100 Q 320 80 360 90"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="animate-progress"
                />

                {/* Availability area (Blue) */}
                <path
                  d="M 40 160 Q 80 150 120 155 Q 160 145 200 140 Q 240 150 280 145 Q 320 140 360 150 L 360 180 L 40 180 Z"
                  fill="url(#blueGradient)"
                  className="animate-progress"
                />
                <path
                  d="M 40 160 Q 80 150 120 155 Q 160 145 200 140 Q 240 150 280 145 Q 320 140 360 150"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  className="animate-progress"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Data point */}
                <circle cx="320" cy="80" r="4" fill="#10b981" className="animate-float" />

                {/* X-axis labels */}
                <text x="40" y="195" className="text-xs fill-gray-500">
                  Apr
                </text>
                <text x="80" y="195" className="text-xs fill-gray-500">
                  May
                </text>
                <text x="120" y="195" className="text-xs fill-gray-500">
                  Jun
                </text>
                <text x="160" y="195" className="text-xs fill-gray-500">
                  Jul
                </text>
                <text x="200" y="195" className="text-xs fill-gray-500">
                  Aug
                </text>
                <text x="240" y="195" className="text-xs fill-gray-500">
                  Sep
                </text>
                <text x="280" y="195" className="text-xs fill-gray-500">
                  Oct
                </text>
                <text x="320" y="195" className="text-xs fill-gray-500">
                  Nov
                </text>
              </svg>

              {/* Tooltip */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border animate-stat">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Booked</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guest Reviews & Feedback */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Guest Reviews & Feedback</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.reviews.total > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Reviews would be rendered here when available */}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No guest reviews yet</h3>
                <p className="text-gray-500 mb-6">Guest reviews will appear here once lodges start receiving feedback.</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>Total Reviews: {dashboardData.reviews.total}</span>
                  <span>•</span>
                  <span>Pending: {dashboardData.reviews.pending}</span>
                  <span>•</span>
                  <span>Published: {dashboardData.reviews.approved}</span>
                </div>
              </div>
            )}

            <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 animate-button shadow-lg">
              {dashboardData.reviews.total > 0 ? 'View All Guest Reviews' : 'Setup Guest Review System'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
