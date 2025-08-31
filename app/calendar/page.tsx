"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, MoreHorizontal, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type CalendarView = "day" | "week" | "month"

type Event = {
  id: string
  title: string
  time: string
  duration: string
  type: "meeting" | "viewing" | "call" | "inspection"
  location?: string
  attendees?: string[]
  color: string
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Property Viewing - Luxury Apartment",
    time: "09:00",
    duration: "1h",
    type: "viewing",
    location: "TY35 Avenue GG London Center",
    attendees: ["John Doe", "Sarah Wilson"],
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Client Meeting - Investment Discussion",
    time: "11:30",
    duration: "45m",
    type: "meeting",
    location: "Office Conference Room",
    attendees: ["Mike Johnson", "Lisa Chen"],
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Property Inspection",
    time: "14:00",
    duration: "2h",
    type: "inspection",
    location: "5122 Franklin Court, New York",
    attendees: ["Inspector Smith"],
    color: "bg-orange-500",
  },
  {
    id: "4",
    title: "Follow-up Call",
    time: "16:30",
    duration: "30m",
    type: "call",
    attendees: ["Emma Davis"],
    color: "bg-purple-500",
  },
]

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1)

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<CalendarView>("week")
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      ...(currentView === "day" && { day: "numeric" }),
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    switch (currentView) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
    }

    setCurrentDate(newDate)
  }

  const renderDayView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Time Schedule */}
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-[80px_1fr] gap-0">
              {/* Time Column */}
              <div className="border-r border-gray-200">
                {timeSlots.map((time) => (
                  <div key={time} className="h-16 border-b border-gray-100 p-2 text-sm text-gray-500">
                    {time}
                  </div>
                ))}
              </div>

              {/* Events Column */}
              <div className="relative">
                {timeSlots.map((time, index) => (
                  <div key={time} className="h-16 border-b border-gray-100 relative">
                    {sampleEvents
                      .filter((event) => event.time === time)
                      .map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className={cn(
                            "absolute left-2 right-2 rounded-lg p-2 text-white text-sm",
                            event.color,
                            "top-1 h-14",
                          )}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.duration}
                            {event.location && (
                              <>
                                <MapPin className="w-3 h-3 ml-1" />
                                <span className="truncate">{event.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Events Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleEvents.map((event) => (
              <div key={event.id} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                <div className={cn("w-3 h-3 rounded-full mt-1", event.color)}></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {event.time} • {event.duration}
                  </div>
                  {event.attendees && (
                    <div className="flex -space-x-1 mt-1">
                      {event.attendees.slice(0, 3).map((attendee, i) => (
                        <Avatar key={i} className="w-5 h-5 border border-white">
                          <AvatarFallback className="text-xs bg-gray-300">
                            {attendee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Events</span>
              <Badge variant="secondary">4</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Meetings</span>
              <Badge className="bg-green-100 text-green-700">2</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Property Views</span>
              <Badge className="bg-blue-100 text-blue-700">1</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inspections</span>
              <Badge className="bg-orange-100 text-orange-700">1</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderWeekView = () => (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-0">
          {/* Time Column */}
          <div className="border-r border-gray-200">
            <div className="h-12 border-b border-gray-200"></div>
            {timeSlots.map((time) => (
              <div key={time} className="h-16 border-b border-gray-100 p-2 text-sm text-gray-500">
                {time}
              </div>
            ))}
          </div>

          {/* Week Days */}
          {weekDays.map((day, dayIndex) => (
            <div key={day} className="border-r border-gray-200 last:border-r-0">
              {/* Day Header */}
              <div className="h-12 border-b border-gray-200 p-2 text-center">
                <div className="text-sm font-medium">{day}</div>
                <div className="text-xs text-gray-500">{dayIndex + 1}</div>
              </div>

              {/* Time Slots */}
              {timeSlots.map((time) => (
                <div key={time} className="h-16 border-b border-gray-100 relative p-1">
                  {dayIndex === 2 &&
                    sampleEvents
                      .filter((event) => event.time === time)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={cn("absolute inset-1 rounded text-white text-xs p-1", event.color)}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90">{event.duration}</div>
                        </div>
                      ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderMonthView = () => (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {/* Week Day Headers */}
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 35 }, (_, i) => {
            const dayNumber = i - 6 + 1 // Adjust for month start
            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31
            const hasEvents = isCurrentMonth && dayNumber === 15 // Sample: events on 15th

            return (
              <div
                key={i}
                className={cn(
                  "min-h-[100px] p-2 border border-gray-100 rounded-lg",
                  isCurrentMonth ? "bg-white" : "bg-gray-50",
                  hasEvents && "bg-blue-50",
                )}
              >
                {isCurrentMonth && (
                  <>
                    <div className="text-sm font-medium mb-1">{dayNumber}</div>
                    {hasEvents && (
                      <div className="space-y-1">
                        <div className="bg-blue-500 text-white text-xs p-1 rounded truncate">Property Meeting</div>
                        <div className="bg-green-500 text-white text-xs p-1 rounded truncate">Client Call</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="min-w-[200px] text-center">
              <span className="text-lg font-semibold">{formatDate(currentDate)}</span>
            </div>
            <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-200 text-gray-400 rounded-lg p-1">
            {(["day", "week", "month"] as CalendarView[]).map((view) => (
              <Button
                key={view}
                variant={currentView === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(view)}
                className={cn("capitalize", currentView === view && "bg-white text-gray-500 shadow-sm")}
              >
                {view}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="space-y-6">
        {currentView === "day" && renderDayView()}
        {currentView === "week" && renderWeekView()}
        {currentView === "month" && renderMonthView()}
      </div>

      {/* Upcoming Events */}
      {currentView !== "day" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className={cn("w-4 h-4 rounded-full mt-1", event.color)}></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{event.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {event.time} • {event.duration}
                    </div>
                    {event.location && (
                      <div className="text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {event.location}
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="w-3 h-3 text-gray-400" />
                        <div className="flex -space-x-1">
                          {event.attendees.slice(0, 3).map((attendee, i) => (
                            <Avatar key={i} className="w-5 h-5 border border-white">
                              <AvatarFallback className="text-xs bg-gray-300">
                                {attendee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="w-5 h-5 bg-gray-200 rounded-full border border-white flex items-center justify-center text-xs">
                              +{event.attendees.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
