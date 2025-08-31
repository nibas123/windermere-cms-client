"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Shield,
  Database,
  Bell,
  Palette,
  Globe,
  Key,
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  CreditCard,
  Zap,
  Cloud,
  Lock,
  Eye,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  FileText,
  Inbox,
  Loader2,
} from "lucide-react"
import { useGSAPAnimations, useHoverAnimations, useButtonAnimations } from "@/hooks/use-gsap-animations"
import { IntegrationConfigDialog } from "@/components/integration-config-dialog"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

type Integration = {
  name: string
  description: string
  status: "connected" | "disconnected"
  icon: React.ElementType
  color: string
}

type Setting = {
  key: string
  value: string
  category: string
  description?: string
}

const initialIntegrations: Integration[] = [
  {
    name: "Stripe",
    description: "Payment processing and billing management",
    status: "connected",
    icon: CreditCard,
    color: "bg-blue-500",
  },
  {
    name: "Zapier",
    description: "Workflow automation and app integrations",
    status: "connected",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    name: "AWS S3",
    description: "Cloud storage for property images and documents",
    status: "connected",
    icon: Cloud,
    color: "bg-yellow-500",
  },
  {
    name: "Google Maps",
    description: "Location services and property mapping",
    status: "connected",
    icon: MapPin,
    color: "bg-green-500",
  },
  {
    name: "Mailchimp",
    description: "Email marketing and customer communications",
    status: "disconnected",
    icon: Mail,
    color: "bg-red-500",
  },
  {
    name: "Twilio",
    description: "SMS notifications and voice communications",
    status: "disconnected",
    icon: Phone,
    color: "bg-purple-500",
  },
  {
    name: "SMTP",
    description: "Outgoing email server configuration",
    status: "disconnected",
    icon: Mail,
    color: "bg-teal-500",
  },
  {
    name: "IMAP",
    description: "Incoming email server configuration",
    status: "disconnected",
    icon: Inbox,
    color: "bg-indigo-500",
  },
]

export default function SettingsPage() {
  const containerRef = useGSAPAnimations()
  useHoverAnimations()
  useButtonAnimations()
  const { toast } = useToast()

  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const allSettings = await apiClient.getSettings()
      const settingsMap: Record<string, string> = {}
      allSettings.forEach(setting => {
        settingsMap[setting.key] = setting.value
      })
      setSettings(settingsMap)
    } catch (error) {
      console.error('Failed to load settings:', error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveAllSettings = async () => {
    try {
      setIsSaving(true)
      const settingsArray = Object.entries(settings).map(([key, value]) => ({ key, value }))
      await apiClient.updateSettings(settingsArray)
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfigureClick = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsConfigDialogOpen(true)
  }

  const handleSaveIntegration = (
    integrationName: string,
    config: Record<string, string>,
    newStatus: "connected" | "disconnected",
  ) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.name === integrationName ? { ...integration, status: newStatus } : integration,
      ),
    )
    // Update the corresponding setting
    const settingKey = `${integrationName.toLowerCase().replace(' ', '_')}_enabled`
    handleSettingChange(settingKey, newStatus === 'connected' ? 'true' : 'false')
    console.log(`Saving config for ${integrationName}:`, config, `New status: ${newStatus}`)
  }

  const handleToggleIntegration = (integrationName: string, newStatus: "connected" | "disconnected") => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.name === integrationName ? { ...integration, status: newStatus } : integration,
      ),
    )
    // Update the corresponding setting
    const settingKey = `${integrationName.toLowerCase().replace(' ', '_')}_enabled`
    handleSettingChange(settingKey, newStatus === 'connected' ? 'true' : 'false')
    console.log(`Toggling ${integrationName} to ${newStatus}`)
  }

  if (isLoading) {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 animate-header">System Settings</h1>
          <p className="text-gray-600 animate-header">Manage your real estate platform configuration</p>
        </div>
        <Button 
          className="bg-teal-600 hover:bg-teal-700 animate-button"
          onClick={handleSaveAllSettings}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 animate-card">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card className="animate-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    value={settings.company_name || ''}
                    onChange={(e) => handleSettingChange('company_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input 
                    id="company-email" 
                    type="email" 
                    value={settings.company_email || ''}
                    onChange={(e) => handleSettingChange('company_email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Company Phone</Label>
                  <Input 
                    id="company-phone" 
                    value={settings.company_phone || ''}
                    onChange={(e) => handleSettingChange('company_phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <Input 
                    id="company-address" 
                    value={settings.company_address || ''}
                    onChange={(e) => handleSettingChange('company_address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform Configuration */}
            <Card className="animate-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Platform Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input 
                    id="platform-name" 
                    value={settings.platform_name || ''}
                    onChange={(e) => handleSettingChange('platform_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select 
                    value={settings.timezone || 'utc-5'}
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                      <SelectItem value="utc-6">UTC-6 (Central Time)</SelectItem>
                      <SelectItem value="utc-7">UTC-7 (Mountain Time)</SelectItem>
                      <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select 
                    value={settings.currency || 'gbp'}
                    onValueChange={(value) => handleSettingChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <Switch 
                    id="maintenance-mode" 
                    checked={settings.maintenance_mode === 'true'}
                    onCheckedChange={(checked) => handleSettingChange('maintenance_mode', checked.toString())}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">User Management</h3>
              <p className="text-gray-600">Manage system users and their permissions</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 animate-button">
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>
          <Card className="animate-card hover-lift">
            <CardContent className="p-6">
              <p className="text-gray-500">User management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="animate-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" className="w-32" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password-policy">Strong Password Policy</Label>
                <Switch id="password-policy" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.name} className="animate-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${integration.color}`}>
                      <integration.icon className="w-6 h-6 text-white" />
                    </div>
                    <Switch
                      checked={integration.status === "connected"}
                      onCheckedChange={(checked) =>
                        handleToggleIntegration(integration.name, checked ? "connected" : "disconnected")
                      }
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={integration.status === "connected" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {integration.status === "connected" ? "Connected" : "Disconnected"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigureClick(integration)}
                    >
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="animate-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="animate-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="google-analytics">Google Analytics</Label>
                <Switch id="google-analytics" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="data-tracking">Data Tracking</Label>
                <Switch id="data-tracking" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <IntegrationConfigDialog
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        integration={selectedIntegration}
        onSave={handleSaveIntegration}
        onToggle={handleToggleIntegration}
      />
    </div>
  )
}
