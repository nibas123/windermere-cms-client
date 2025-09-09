"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, TrendingUp, Building2, ArrowUp } from "lucide-react"
import { useGSAPAnimations, useHoverAnimations, useButtonAnimations } from "@/hooks/use-gsap-animations"

export default function Dashboard() {
  const containerRef = useGSAPAnimations()
  useHoverAnimations()
  useButtonAnimations()

  // API response data
  const dashboardData = {
    users: {
      total: 4,
      admins: 4,
      visitors: 5
    },
    reviews: {
      total: 4,
      pending: 3,
      approved: 0,
      withRating: 0
    },
    bookings: {
      total: 4,
      pending: 1,
      cancelled: 2,
      confirmed: 1
    },
    enquiries: {
      total: 1
    },
    locations: {
      cities: 1
    },
    properties: {
      total: 3,
      active: 3,
      currency: "GBP",
      inactive: 3
    },
    monthly_revenue: null
  }

  return (
    <div ref={containerRef} className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift bg-blue-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-blue-100 text-sm">Total Properties</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.properties.total}</p>
                <p className="text-blue-200 text-xs">{dashboardData.properties.active} active</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <div className="w-full h-full bg-blue-400 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-blue-300 rounded-full opacity-50"></div>
                <div className="absolute inset-3 lg:inset-4 bg-white rounded-full opacity-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-green-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-green-100 text-sm">Total Users</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.users.total}</p>
                <p className="text-green-200 text-xs">{dashboardData.users.admins} admins</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <div className="w-full h-full bg-green-400 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-green-300 rounded-full opacity-50"></div>
                <div className="absolute inset-3 lg:inset-4 bg-white rounded-full opacity-20"></div>
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
                <div className="w-full h-full bg-orange-400 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-orange-300 rounded-full opacity-50"></div>
                <div className="absolute inset-3 lg:inset-4 bg-white rounded-full opacity-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-purple-600 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-purple-100 text-sm">Total Reviews</p>
                <p className="text-2xl lg:text-3xl font-bold">{dashboardData.reviews.total}</p>
                <p className="text-purple-200 text-xs">{dashboardData.reviews.approved} approved</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <div className="w-full h-full bg-purple-400 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-purple-300 rounded-full opacity-50"></div>
                <div className="absolute inset-3 lg:inset-4 bg-white rounded-full opacity-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <Card className="animate-card hover-lift xl:col-span-2 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
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
                    <span className="text-gray-400 text-lg">No revenue data available</span>
                    <p className="text-sm text-gray-500 mt-2">Revenue tracking will appear here once transactions are recorded</p>
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
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Revenue chart will appear here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Health</CardTitle>
            <p className="text-sm text-gray-500">Current operational status overview</p>
          </CardHeader>
          <CardContent>
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                {/* Properties Status - 100% (All Active) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray="219.91 219.91"
                  strokeDashoffset="0"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Center white circle */}
                <circle cx="50" cy="50" r="20" fill="white" />
                {/* Center checkmark or status indicator */}
                <circle cx="50" cy="50" r="8" fill="#10b981" />
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { 
                  color: "bg-green-500", 
                  label: "Properties", 
                  value: `${dashboardData.properties.active}/${dashboardData.properties.total}`, 
                  status: "All Active" 
                },
                { 
                  color: "bg-blue-500", 
                  label: "Admin Users", 
                  value: `${dashboardData.users.admins}`, 
                  status: "Ready" 
                },
                { 
                  color: "bg-orange-500", 
                  label: "Locations", 
                  value: `${dashboardData.locations.cities}`, 
                  status: "Configured" 
                },
                { 
                  color: "bg-gray-400", 
                  label: "Reviews", 
                  value: `${dashboardData.reviews.total}`, 
                  status: "Awaiting" 
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
        {/* Booking Analytics */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Bookings</span>
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
                  <span className="text-sm text-gray-600">Confirmed Bookings</span>
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
                  <span className="text-sm text-gray-600">Pending Reviews</span>
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

        {/* System Status */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  metric: "Properties", 
                  value: `${dashboardData.properties.active}/${dashboardData.properties.total}`, 
                  status: "Active",
                  progress: dashboardData.properties.total > 0 ? (dashboardData.properties.active / dashboardData.properties.total) * 100 : 0
                },
                { 
                  metric: "Users", 
                  value: `${dashboardData.users.admins}/${dashboardData.users.total}`, 
                  status: "Admins",
                  progress: dashboardData.users.total > 0 ? (dashboardData.users.admins / dashboardData.users.total) * 100 : 0
                },
                { 
                  metric: "Reviews", 
                  value: `${dashboardData.reviews.approved}/${dashboardData.reviews.total}`, 
                  status: "Approved",
                  progress: dashboardData.reviews.total > 0 ? (dashboardData.reviews.approved / dashboardData.reviews.total) * 100 : 0
                },
                { 
                  metric: "Bookings", 
                  value: `${dashboardData.bookings.confirmed}/${dashboardData.bookings.total}`, 
                  status: "Confirmed",
                  progress: dashboardData.bookings.total > 0 ? (dashboardData.bookings.confirmed / dashboardData.bookings.total) * 100 : 0
                },
                { 
                  metric: "Locations", 
                  value: `${dashboardData.locations.cities}`, 
                  status: "Cities",
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
                      className="animate-progress h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                      style={{ "--progress-width": `${item.progress}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview with Area Chart */}
        <Card className="animate-card hover-lift shadow-sm lg:col-span-2 xl:col-span-1 bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Overview</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg bg-blue-50/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Active Properties</p>
                  <p className="text-sm font-bold text-gray-900">{dashboardData.properties.active} Properties</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Users</p>
                  <p className="text-sm font-bold text-gray-900">{dashboardData.users.total} Users</p>
                </div>
              </div>
            </div>

            {/* Percentage Indicator */}
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center text-green-500 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {dashboardData.properties.total > 0 ? '100%' : '0%'}
              </div>
              <span className="text-xs text-gray-500">property activity rate</span>
            </div>

            {/* Area Chart */}
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
                  1,000k
                </text>
                <text x="10" y="60" className="text-xs fill-gray-500">
                  800k
                </text>
                <text x="10" y="100" className="text-xs fill-gray-500">
                  600k
                </text>
                <text x="10" y="140" className="text-xs fill-gray-500">
                  400k
                </text>
                <text x="10" y="180" className="text-xs fill-gray-500">
                  200k
                </text>

                {/* Blue area (Sold) */}
                <path
                  d="M 40 120 Q 80 100 120 110 Q 160 90 200 60 Q 240 80 280 100 Q 320 80 360 90 L 360 180 L 40 180 Z"
                  fill="url(#blueGradient)"
                  className="animate-progress"
                />
                <path
                  d="M 40 120 Q 80 100 120 110 Q 160 90 200 60 Q 240 80 280 100 Q 320 80 360 90"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  className="animate-progress"
                />

                {/* Green area (Rented) */}
                <path
                  d="M 40 160 Q 80 150 120 155 Q 160 145 200 140 Q 240 150 280 145 Q 320 140 360 150 L 360 180 L 40 180 Z"
                  fill="url(#greenGradient)"
                  className="animate-progress"
                />
                <path
                  d="M 40 160 Q 80 150 120 155 Q 160 145 200 140 Q 240 150 280 145 Q 320 140 360 150"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="animate-progress"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Data point */}
                <circle cx="320" cy="80" r="4" fill="#3b82f6" className="animate-float" />

                {/* X-axis labels */}
                <text x="40" y="195" className="text-xs fill-gray-500">
                  April
                </text>
                <text x="80" y="195" className="text-xs fill-gray-500">
                  May
                </text>
                <text x="120" y="195" className="text-xs fill-gray-500">
                  June
                </text>
                <text x="160" y="195" className="text-xs fill-gray-500">
                  July
                </text>
                <text x="200" y="195" className="text-xs fill-gray-500">
                  August
                </text>
                <text x="240" y="195" className="text-xs fill-gray-500">
                  September
                </text>
                <text x="280" y="195" className="text-xs fill-gray-500">
                  October
                </text>
                <text x="320" y="195" className="text-xs fill-gray-500">
                  November
                </text>
              </svg>

              {/* Tooltip */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border animate-stat">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">86 Rented</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">24 Sold</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Reviews */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Customer Reviews</CardTitle>
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
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-500 mb-6">Customer reviews will appear here once properties start receiving feedback.</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>Total Reviews: {dashboardData.reviews.total}</span>
                  <span>•</span>
                  <span>Pending: {dashboardData.reviews.pending}</span>
                  <span>•</span>
                  <span>Approved: {dashboardData.reviews.approved}</span>
                </div>
              </div>
            )}

            <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 animate-button shadow-lg">
              {dashboardData.reviews.total > 0 ? 'See More Reviews' : 'Setup Review System'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
