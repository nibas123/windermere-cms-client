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

  return (
    <div ref={containerRef} className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <Card className="animate-card hover-lift bg-blue-500 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-blue-100 text-sm">Properties for Sale</p>
                <p className="text-2xl lg:text-3xl font-bold">684</p>
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
                <p className="text-green-100 text-sm">Properties for Rent</p>
                <p className="text-2xl lg:text-3xl font-bold">546</p>
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
                <p className="text-orange-100 text-sm">Total Customer</p>
                <p className="text-2xl lg:text-3xl font-bold">3,672</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <div className="w-full h-full bg-orange-400 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-orange-300 rounded-full opacity-50"></div>
                <div className="absolute inset-3 lg:inset-4 bg-white rounded-full opacity-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-card hover-lift bg-gray-600 text-white border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700"></div>
          <CardContent className="p-4 lg:p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="animate-stat">
                <p className="text-gray-300 text-sm">Total City</p>
                <p className="text-2xl lg:text-3xl font-bold">75</p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 animate-float">
                <div className="w-full h-full bg-gray-500 rounded-full opacity-30"></div>
                <div className="absolute inset-2 bg-gray-400 rounded-full opacity-50"></div>
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
              <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <span className="text-xl lg:text-2xl font-bold animate-stat">£678,345</span>
                <span className="text-sm text-gray-500 animate-stat">last month £563,443</span>
                <div className="flex items-center text-green-500 text-sm animate-stat">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  7%
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
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
              <span>06</span>
              <span className="hidden sm:inline">08</span>
              <span>10</span>
              <span className="hidden sm:inline">12</span>
              <span>14</span>
              <span className="hidden sm:inline">16</span>
              <span>18</span>
              <span>20</span>
            </div>
          </CardContent>
        </Card>

        {/* Spendings Chart */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spendings</CardTitle>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do</p>
          </CardHeader>
          <CardContent>
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                {/* Account - 35% (Blue) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray="76.97 219.91"
                  strokeDashoffset="0"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Services - 45% (Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray="98.96 219.91"
                  strokeDashoffset="-76.97"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Restaurant - 12% (Orange) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="12"
                  strokeDasharray="26.39 219.91"
                  strokeDashoffset="-175.93"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Others - 8% (Gray) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="12"
                  strokeDasharray="17.59 219.91"
                  strokeDashoffset="-202.32"
                  className="animate-progress"
                  strokeLinecap="round"
                />
                {/* Center white circle */}
                <circle cx="50" cy="50" r="20" fill="white" />
                {/* Center icon */}
                <circle cx="50" cy="50" r="8" fill="#e5e7eb" />
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { color: "bg-blue-500", label: "Account", percentage: "35%" },
                { color: "bg-green-500", label: "Services", percentage: "45%" },
                { color: "bg-orange-500", label: "Restaurant", percentage: "12%" },
                { color: "bg-gray-400", label: "Others", percentage: "8%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between animate-stat">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.percentage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Product Analytics */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Product Viewed</span>
                  <span className="text-sm text-gray-500">680/days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="animate-progress h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                    style={{ "--progress-width": "75%" } as React.CSSProperties}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Product Listed</span>
                  <span className="text-sm text-gray-500">3,456 Unit</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="animate-progress h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ "--progress-width": "85%" } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Map Location */}
        <Card className="animate-card hover-lift shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Properties Map Location</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: "Europe", units: "653 Unit", progress: 90 },
                { region: "Asia", units: "653 Unit", progress: 85 },
                { region: "Africa", units: "653 Unit", progress: 60 },
                { region: "Australia", units: "653 Unit", progress: 40 },
                { region: "America", units: "653 Unit", progress: 30 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.region}</span>
                    <span className="text-sm font-medium">{item.units}</span>
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
                  <p className="text-xs text-gray-600">Total Sale</p>
                  <p className="text-sm font-bold text-gray-900">2,346 Unit</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Rent</p>
                  <p className="text-sm font-bold text-gray-900">458 Unit</p>
                </div>
              </div>
            </div>

            {/* Percentage Indicator */}
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center text-green-500 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                0.8%
              </div>
              <span className="text-xs text-gray-500">than last week</span>
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
            <CardTitle className="text-lg font-semibold">Customer Review</CardTitle>
            <Button variant="ghost" size="icon" className="animate-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { name: "Bella Smith", time: "20m ago", rating: 4, avatar: "BS" },
                { name: "Samantha William", time: "1h ago", rating: 4, avatar: "SW" },
                { name: "John Doe", time: "2h ago", rating: 5, avatar: "JD" },
              ].map((review, index) => (
                <div key={index} className="flex gap-3 animate-stat">
                  <Avatar className="flex-shrink-0 animate-float">
                    <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.time}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-4 h-4 rounded-sm ${star <= review.rating ? "bg-orange-400" : "bg-gray-200"}`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {index === 0 &&
                        "Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye..."}
                      {index === 1 &&
                        "I viewed a number of properties with Just Property and found them to be professional, efficient, patient, courteous and helpful every time."}
                      {index === 2 &&
                        "Friendly service Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 animate-button shadow-lg">
              See More Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
