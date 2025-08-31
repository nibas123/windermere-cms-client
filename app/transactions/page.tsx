"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, MoreHorizontal, Users, Calendar, Loader2, Eye, Edit, Trash2, X } from "lucide-react"
import { useEnquiryBookings, useEnquiryBookingsCount, useDeleteEnquiryBooking, useUpdateEnquiryBooking, useConfirmEnquiryBooking, useCancelEnquiryBooking } from "@/hooks/use-api"
import { EnquiryBooking } from "@/lib/api"
import { toast } from "sonner"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<EnquiryBooking[]>([])
  const [selectedBookings, setSelectedBookings] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<EnquiryBooking | null>(null)
  const [editForm, setEditForm] = useState<Partial<EnquiryBooking>>({})

  // API hooks
  const [bookingsState, bookingsActions] = useEnquiryBookings()
  const [countState, countActions] = useEnquiryBookingsCount()
  const [deleteBookingState, deleteBookingActions] = useDeleteEnquiryBooking()
  const [updateBookingState, updateBookingActions] = useUpdateEnquiryBooking()
  const [confirmBookingState, confirmBookingActions] = useConfirmEnquiryBooking()
  const [cancelBookingState, cancelBookingActions] = useCancelEnquiryBooking()

  // Load bookings and count on component mount
  useEffect(() => {
    loadBookings()
    loadCount()
  }, [statusFilter])

  // Update local state when API data changes
  useEffect(() => {
    if (bookingsState.data) {
      setBookings(bookingsState.data)
    }
  }, [bookingsState.data])

  const loadBookings = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : undefined
      await bookingsActions.execute(params)
    } catch (error) {
      toast.error("Failed to load bookings")
    }
  }

  const loadCount = async () => {
    try {
      await countActions.execute()
    } catch (error) {
      console.error("Failed to load count:", error)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(bookings.map(booking => booking.id))
    } else {
      setSelectedBookings([])
    }
  }

  const handleSelectBooking = (bookingId: string, checked: boolean) => {
    if (checked) {
      setSelectedBookings(prev => [...prev, bookingId])
    } else {
      setSelectedBookings(prev => prev.filter(id => id !== bookingId))
    }
  }

  const handleDeleteBooking = (booking: EnquiryBooking) => {
    setSelectedBooking(booking)
    setDeleteModalOpen(true)
  }

  const confirmDeleteBooking = async () => {
    if (!selectedBooking) return
    
    try {
      await deleteBookingActions.execute(selectedBooking.id)
      toast.success("Booking enquiry deleted successfully!")
      setDeleteModalOpen(false)
      setSelectedBooking(null)
      loadBookings()
      loadCount()
    } catch (error) {
      toast.error("Failed to delete booking enquiry")
    }
  }

  const handleViewBooking = (booking: EnquiryBooking) => {
    setSelectedBooking(booking)
    setViewModalOpen(true)
  }

  const handleEditBooking = (booking: EnquiryBooking) => {
    setSelectedBooking(booking)
    setEditForm({
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      mobile: booking.mobile,
      arrivalDate: booking.arrivalDate,
      departureDate: booking.departureDate,
      adults: booking.adults,
      children: booking.children,
      message: booking.message,
      status: booking.status
    })
    setEditModalOpen(true)
  }

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return
    
    try {
      await updateBookingActions.execute(selectedBooking.id, editForm)
      toast.success("Booking enquiry updated successfully!")
      setEditModalOpen(false)
      setSelectedBooking(null)
      setEditForm({})
      loadBookings()
    } catch (error) {
      toast.error("Failed to update booking enquiry")
    }
  }

  const handleConfirmBooking = async (booking: EnquiryBooking) => {
    setSelectedBooking(booking)
    setConfirmModalOpen(true)
  }

  const handleCancelBooking = async (booking: EnquiryBooking) => {
    setSelectedBooking(booking)
    setCancelModalOpen(true)
  }

  const confirmBookingAction = async () => {
    if (!selectedBooking) return
    
    try {
      await confirmBookingActions.execute(selectedBooking.id)
      toast.success("Booking enquiry confirmed successfully!")
      setConfirmModalOpen(false)
      setSelectedBooking(null)
      loadBookings()
    } catch (error) {
      toast.error("Failed to confirm booking enquiry")
    }
  }

  const cancelBookingAction = async () => {
    if (!selectedBooking) return
    
    try {
      await cancelBookingActions.execute(selectedBooking.id)
      toast.success("Booking enquiry cancelled successfully!")
      setCancelModalOpen(false)
      setSelectedBooking(null)
      loadBookings()
    } catch (error) {
      toast.error("Failed to cancel booking enquiry")
    }
  }

  const closeViewModal = () => {
    setViewModalOpen(false)
    setSelectedBooking(null)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setSelectedBooking(null)
    setEditForm({})
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setSelectedBooking(null)
  }

  const formatDate = (dateString: string) => {
    // Handle both DateTime and YYYY-MM-DD string formats
    if (dateString.includes('T')) {
      // DateTime format
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } else {
      // YYYY-MM-DD format - convert to readable format
      const date = new Date(dateString + 'T00:00:00')
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  }

  const formatPrice = (price: number) => {
    return `£${price.toLocaleString()}`
  }

  const getStatusBadge = (booking: EnquiryBooking) => {
    switch (booking.status) {
      case 'PENDING':
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>
      case 'CONFIRMED':
        return <Badge className="bg-green-500 text-white">Confirmed</Badge>
      case 'CANCELLED':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      booking.firstName.toLowerCase().includes(searchLower) ||
      booking.lastName?.toLowerCase().includes(searchLower) ||
      booking.email.toLowerCase().includes(searchLower) ||
      booking.property?.name.toLowerCase().includes(searchLower) ||
      booking.property?.address.toLowerCase().includes(searchLower)
    
    // Apply status filter
    const matchesStatus = !statusFilter || booking.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  if (bookingsState.loading && bookings.length === 0) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading bookings...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Booking Enquiries</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-80 bg-white border-gray-200" 
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Information Banner */}
      <Card className="bg-teal-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">BOOKING ENQUIRIES</h3>
              <p className="text-teal-100">
                Manage and respond to booking enquiries from visitors. Review details and update status as needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {countState.data?.count || 0}
                </p>
                <p className="text-gray-600">Total Enquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredBookings.length}
                </p>
                <p className="text-gray-600">Filtered Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">
                    <Checkbox 
                      checked={selectedBookings.length === bookings.length && bookings.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-gray-700">Enquiry ID</th>
                  <th className="text-left p-4 font-medium text-gray-700">Date</th>
                  <th className="text-left p-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-700">Property</th>
                  <th className="text-left p-4 font-medium text-gray-700">Arrival</th>
                  <th className="text-left p-4 font-medium text-gray-700">Departure</th>
                  <th className="text-left p-4 font-medium text-gray-700">Guests</th>
                  <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) => handleSelectBooking(booking.id, checked as boolean)}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-900">#{booking.id.slice(0, 8)}</td>
                    <td className="p-4 text-gray-600">{formatDate(booking.createdAt)}</td>
                    <td className="p-4 text-gray-900">
                      {booking.firstName} {booking.lastName}
                    </td>
                    <td className="p-4 text-gray-900">
                      <div>
                        <div className="font-medium">{booking.property?.name || 'Unknown Property'}</div>
                        <div className="text-sm text-gray-500">{booking.property?.address}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{formatDate(booking.arrivalDate)}</td>
                    <td className="p-4 text-gray-600">{formatDate(booking.departureDate)}</td>
                    <td className="p-4 text-gray-900">
                      {booking.adults || 0} adults, {booking.children || 0} children
                    </td>
                    <td className="p-4">
                      {getStatusBadge(booking)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Quick Action Buttons */}
                        {booking.status === 'PENDING' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Confirm Booking"
                              onClick={() => handleConfirmBooking(booking)}
                              disabled={confirmBookingState.loading}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              {confirmBookingState.loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Cancel Booking"
                              onClick={() => handleCancelBooking(booking)}
                              disabled={cancelBookingState.loading}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {cancelBookingState.loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </Button>
                          </>
                        )}
                        
                        {/* Standard Action Buttons */}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="View Details"
                          onClick={() => handleViewBooking(booking)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Edit"
                          onClick={() => handleEditBooking(booking)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Delete"
                          onClick={() => handleDeleteBooking(booking)}
                          disabled={deleteBookingState.loading}
                        >
                          {deleteBookingState.loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredBookings.length === 0 && !bookingsState.loading && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No booking enquiries found.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing {filteredBookings.length} from {countState.data?.count || 0} enquiries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* View Booking Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Booking Enquiry Details
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Enquiry ID</Label>
                  <p className="text-sm">#{selectedBooking.id.slice(0, 8)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Created Date</Label>
                  <p className="text-sm">{formatDate(selectedBooking.createdAt)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">First Name</Label>
                  <p className="text-sm">{selectedBooking.firstName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                  <p className="text-sm">{selectedBooking.lastName || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-sm">{selectedBooking.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Mobile</Label>
                  <p className="text-sm">{selectedBooking.mobile}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Property</Label>
                <p className="text-sm font-medium">{selectedBooking.property?.name || 'Unknown Property'}</p>
                <p className="text-sm text-gray-500">{selectedBooking.property?.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Arrival Date</Label>
                  <p className="text-sm">{selectedBooking.arrivalDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Departure Date</Label>
                  <p className="text-sm">{selectedBooking.departureDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Adults</Label>
                  <p className="text-sm">{selectedBooking.adults || 0}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Children</Label>
                  <p className="text-sm">{selectedBooking.children || 0}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  {getStatusBadge(selectedBooking)}
                </div>
              </div>

              {selectedBooking.message && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Message</Label>
                  <p className="text-sm">{selectedBooking.message}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeViewModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Booking Enquiry
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editForm.firstName || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editForm.lastName || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  value={editForm.mobile || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="arrivalDate">Arrival Date</Label>
                <Input
                  id="arrivalDate"
                  type="date"
                  value={editForm.arrivalDate || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, arrivalDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={editForm.departureDate || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, departureDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adults">Adults</Label>
                <Input
                  id="adults"
                  type="number"
                  min="0"
                  value={editForm.adults || 0}
                  onChange={(e) => setEditForm(prev => ({ ...prev, adults: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="children">Children</Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  value={editForm.children || 0}
                  onChange={(e) => setEditForm(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={editForm.message || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={editForm.status || 'PENDING'}
                onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as 'PENDING' | 'CONFIRMED' | 'CANCELLED' }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateBooking}
              disabled={updateBookingState.loading}
            >
              {updateBookingState.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Booking Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  Are you sure you want to delete this booking enquiry?
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-left">
                  <p className="text-sm font-medium">#{selectedBooking.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.property?.name || 'Unknown Property'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.arrivalDate} - {selectedBooking.departureDate}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedBooking)}
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-2">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteBooking}
              disabled={deleteBookingState.loading}
            >
              {deleteBookingState.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Booking Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Confirm Booking Enquiry
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  Are you sure you want to confirm this booking enquiry?
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-left">
                  <p className="text-sm font-medium">#{selectedBooking.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.property?.name || 'Unknown Property'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.arrivalDate} - {selectedBooking.departureDate}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedBooking)}
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmBookingAction}
              disabled={confirmBookingState.loading}
            >
              {confirmBookingState.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Confirming...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Modal */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Booking Enquiry
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  Are you sure you want to cancel this booking enquiry?
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-left">
                  <p className="text-sm font-medium">#{selectedBooking.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.property?.name || 'Unknown Property'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.arrivalDate} - {selectedBooking.departureDate}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedBooking)}
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-2">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={cancelBookingAction}
              disabled={cancelBookingState.loading}
            >
              {cancelBookingState.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cancelling...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel Booking
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
