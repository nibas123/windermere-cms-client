"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Camera, Save, Loader2 } from "lucide-react"
import { useGSAPAnimations, useHoverAnimations, useButtonAnimations } from "@/hooks/use-gsap-animations"
import { useAuth } from "@/contexts/AuthContext"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function MyAccountPage() {
  const containerRef = useGSAPAnimations()
  useHoverAnimations()
  useButtonAnimations()
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', '']
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(' ') || "",
        email: user.email || "",
        phone: "", // Phone not in current user model
        address: "" // Address not in current user model
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdateProfile = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      await apiClient.updateUserProfile({
        name: fullName,
        email: formData.email
      })
      
      await refreshUser()
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsPasswordLoading(true)
    try {
      await apiClient.changePassword(passwordData.currentPassword, passwordData.newPassword)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
      toast({
        title: "Success",
        description: "Password changed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (!user) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      <h1 className="text-2xl font-bold text-gray-900 animate-header">My Account</h1>
      <p className="text-gray-600 animate-header">Manage your profile and personal settings</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 animate-card hover-lift">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 animate-float">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96"} />
                <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 text-3xl">
                  {getInitials(user.name || "User")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name || "User"}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.role || "Admin"}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 justify-center">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{user.email}</span>
              </div>
              {formData.phone && (
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{formData.phone}</span>
                </div>
              )}
              {formData.address && (
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{formData.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings Form */}
        <Card className="lg:col-span-2 animate-card hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input 
                  id="first-name" 
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input 
                  id="last-name" 
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-email">Email Address</Label>
              <Input 
                id="account-email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-phone">Phone Number</Label>
              <Input 
                id="account-phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-address">Address</Label>
              <Input 
                id="account-address" 
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Admin St, City, Country"
              />
            </div>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 animate-button"
              onClick={handleUpdateProfile}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Password Change Form */}
        <Card className="lg:col-span-2 animate-card hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 animate-button"
              onClick={handleChangePassword}
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
