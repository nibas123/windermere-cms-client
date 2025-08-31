"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Integration = {
  name: string
  description: string
  status: "connected" | "disconnected"
  icon: React.ElementType
  color: string
}

interface IntegrationConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  integration: Integration | null
  onSave: (integrationName: string, config: Record<string, string>, newStatus: "connected" | "disconnected") => void
  onToggle?: (integrationName: string, newStatus: "connected" | "disconnected") => void
}

export function IntegrationConfigDialog({
  open,
  onOpenChange,
  integration,
  onSave,
  onToggle,
}: IntegrationConfigDialogProps) {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [currentStatus, setCurrentStatus] = useState<"connected" | "disconnected">(
    integration?.status || "disconnected",
  )

  useEffect(() => {
    if (integration) {
      // Initialize config based on integration type (dummy data for now)
      switch (integration.name) {
        case "Stripe":
          setConfig({
            publishableKey: "pk_live_xxxxxxxxxxxxxxxxxxxx",
            secretKey: "sk_live_xxxxxxxxxxxxxxxxxxxx",
            webhookSecret: "whsec_xxxxxxxxxxxxxxxxxxxx",
          })
          break
        case "Zapier":
          setConfig({ apiKey: "zap_xxxxxxxxxxxxxxxxxxxx", webhookUrl: "https://hooks.zapier.com/hooks/catch/..." })
          break
        case "AWS S3":
          setConfig({
            accessKeyId: "AKIAxxxxxxxxxxxx",
            secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            bucketName: "my-hoomee-bucket",
            region: "us-east-1",
          })
          break
        case "Google Maps":
          setConfig({ apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxx" })
          break
        case "Mailchimp":
          setConfig({ apiKey: "mc_xxxxxxxxxxxxxxxxxxxx", audienceId: "xxxxxxxxxx" })
          break
        case "Twilio":
          setConfig({
            accountSid: "ACxxxxxxxxxxxxxxxxxxxx",
            authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            phoneNumber: "+1501712266",
          })
          break
        case "SMTP":
          setConfig({
            host: "smtp.example.com",
            port: "587",
            username: "user@example.com",
            password: "password",
            encryption: "tls",
          })
          break
        case "IMAP":
          setConfig({
            host: "imap.example.com",
            port: "993",
            username: "user@example.com",
            password: "password",
            encryption: "ssl",
          })
          break
        default:
          setConfig({})
      }
      setCurrentStatus(integration.status)
    }
  }, [integration])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setConfig((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setConfig((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    if (integration) {
      onSave(integration.name, config, currentStatus)
      onOpenChange(false)
    }
  }

  const handleDisconnect = () => {
    if (integration && onToggle) {
      onToggle(integration.name, "disconnected")
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!integration) return null

  const renderFields = () => {
    switch (integration.name) {
      case "Stripe":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="publishableKey">Publishable Key</Label>
              <Input id="publishableKey" value={config.publishableKey || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input id="secretKey" type="password" value={config.secretKey || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input id="webhookSecret" type="password" value={config.webhookSecret || ""} onChange={handleChange} />
            </div>
          </>
        )
      case "Zapier":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" value={config.apiKey || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input id="webhookUrl" value={config.webhookUrl || ""} onChange={handleChange} />
            </div>
          </>
        )
      case "AWS S3":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="accessKeyId">Access Key ID</Label>
              <Input id="accessKeyId" value={config.accessKeyId || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretAccessKey">Secret Access Key</Label>
              <Input
                id="secretAccessKey"
                type="password"
                value={config.secretAccessKey || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bucketName">Bucket Name</Label>
              <Input id="bucketName" value={config.bucketName || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input id="region" value={config.region || ""} onChange={handleChange} />
            </div>
          </>
        )
      case "Google Maps":
        return (
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input id="apiKey" value={config.apiKey || ""} onChange={handleChange} />
          </div>
        )
      case "Mailchimp":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" value={config.apiKey || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audienceId">Audience ID</Label>
              <Input id="audienceId" value={config.audienceId || ""} onChange={handleChange} />
            </div>
          </>
        )
      case "Twilio":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="accountSid">Account SID</Label>
              <Input id="accountSid" value={config.accountSid || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authToken">Auth Token</Label>
              <Input id="authToken" type="password" value={config.authToken || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" value={config.phoneNumber || ""} onChange={handleChange} />
            </div>
          </>
        )
      case "SMTP":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input id="host" value={config.host || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input id="port" type="number" value={config.port || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={config.username || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={config.password || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select value={config.encryption || "tls"} onValueChange={(val) => handleSelectChange("encryption", val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "IMAP":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input id="host" value={config.host || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input id="port" type="number" value={config.port || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={config.username || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={config.password || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select value={config.encryption || "ssl"} onValueChange={(val) => handleSelectChange("encryption", val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      default:
        return <p>No specific configuration fields for this integration.</p>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${integration.color} flex items-center justify-center`}>
              <integration.icon className="w-3 h-3 text-white" />
            </div>
            {integration.name} Integration
          </DialogTitle>
          <DialogDescription>{integration.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{renderFields()}</div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          {integration.status === "connected" && onToggle && (
            <Button variant="destructive" onClick={handleDisconnect} className="animate-button">
              Disconnect
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="animate-button bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 animate-button">
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
