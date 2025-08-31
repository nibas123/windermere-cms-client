"use client"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export type Discount = {
  id: string
  code: string
  description: string
  value: string
  type: "percentage" | "fixed"
  expiresAt?: Date | null
  isActive: boolean
}

interface DiscountFormDialogProps {
  isOpen: boolean
  onClose: () => void
  discount?: Discount | null // Optional: for editing existing discount
  onSave: (discount: Discount) => void
}

export function DiscountFormDialog({ isOpen, onClose, discount, onSave }: DiscountFormDialogProps) {
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")
  const [type, setType] = useState<"percentage" | "fixed">("percentage")
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (discount) {
      setCode(discount.code)
      setDescription(discount.description)
      setValue(discount.value)
      setType(discount.type)
      setExpiresAt(discount.expiresAt || null)
      setIsActive(discount.isActive)
    } else {
      // Reset form for new discount
      setCode("")
      setDescription("")
      setValue("")
      setType("percentage")
      setExpiresAt(null)
      setIsActive(true)
    }
  }, [discount])

  const handleSubmit = () => {
    if (!code || !description || !value) {
      // Basic validation
      alert("Please fill in all required fields.")
      return
    }

    const newDiscount: Discount = {
      id: discount?.id || `discount-${Date.now()}`, // Generate new ID if not editing
      code,
      description,
      value,
      type,
      expiresAt,
      isActive,
    }
    onSave(newDiscount)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{discount ? "Edit Discount" : "Create New Discount"}</DialogTitle>
          <DialogDescription>
            {discount ? "Modify the details of this discount." : "Add a new discount code or offer."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">Discount Code</Label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="SUMMER20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="20% off all properties"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as "percentage" | "fixed")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expires At (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !expiresAt && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiresAt ? format(expiresAt, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiresAt || undefined}
                  onSelect={setExpiresAt as (date: Date | undefined) => void}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active</Label>
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="animate-button bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 animate-button">
            {discount ? "Save Changes" : "Create Discount"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
