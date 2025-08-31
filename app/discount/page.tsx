"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { useGSAPAnimations, useHoverAnimations, useButtonAnimations } from "@/hooks/use-gsap-animations"
import { DiscountFormDialog, type Discount } from "@/components/discount-form-dialog"
import { format } from "date-fns"

const initialDiscounts: Discount[] = [
  {
    id: "d1",
    code: "SUMMER20",
    description: "20% off all properties",
    value: "20",
    type: "percentage",
    expiresAt: new Date(2025, 7, 31), // August 31, 2025
    isActive: true,
  },
  {
    id: "d2",
    code: "SAVE500",
    description: "£500 off first month's rent",
    value: "500",
    type: "fixed",
    expiresAt: null, // No expiry
    isActive: true,
  },
  {
    id: "d3",
    code: "NEWUSER10",
    description: "10% off for new sign-ups",
    value: "10",
    type: "percentage",
    expiresAt: new Date(2024, 11, 31), // December 31, 2024
    isActive: false,
  },
  {
    id: "d4",
    code: "HOLIDAYDEAL",
    description: "Special holiday discount",
    value: "1000",
    type: "fixed",
    expiresAt: new Date(2025, 0, 15), // January 15, 2025
    isActive: true,
  },
]

export default function DiscountPage() {
  const containerRef = useGSAPAnimations()
  useHoverAnimations()
  useButtonAnimations()

  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null)

  const handleCreateNew = () => {
    setSelectedDiscount(null) // Clear selected discount for new creation
    setIsFormDialogOpen(true)
  }

  const handleEdit = (discount: Discount) => {
    setSelectedDiscount(discount)
    setIsFormDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSaveDiscount = (newDiscount: Discount) => {
    if (selectedDiscount) {
      // Edit existing
      setDiscounts((prev) => prev.map((d) => (d.id === newDiscount.id ? newDiscount : d)))
    } else {
      // Add new
      setDiscounts((prev) => [...prev, newDiscount])
    }
  }

  const handleToggleActive = (id: string) => {
    setDiscounts((prev) => prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d)))
  }

  return (
    <div ref={containerRef} className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 animate-header">Discount Codes & Offers</h1>
          <p className="text-gray-600 animate-header">Manage promotional discounts for your properties.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 animate-button" onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Discount
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search discounts..."
          className="pl-10 w-full sm:w-80 bg-white border-gray-200 animate-card"
        />
      </div>

      <Card className="animate-card hover-lift">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Code</th>
                  <th className="text-left p-4 font-medium text-gray-700">Description</th>
                  <th className="text-left p-4 font-medium text-gray-700">Value</th>
                  <th className="text-left p-4 font-medium text-gray-700">Expires At</th>
                  <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id} className="border-b hover:bg-gray-50 animate-stat">
                    <td className="p-4 font-medium text-gray-900">{discount.code}</td>
                    <td className="p-4 text-gray-600">{discount.description}</td>
                    <td className="p-4 text-gray-900">
                      {discount.type === "fixed" ? "$" : ""}
                      {discount.value}
                      {discount.type === "percentage" ? "%" : ""}
                    </td>
                    <td className="p-4 text-gray-600">
                      {discount.expiresAt ? format(discount.expiresAt, "MMM dd, yyyy") : "N/A"}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={discount.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                      >
                        {discount.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="animate-button"
                          onClick={() => handleEdit(discount)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="animate-button"
                          onClick={() => handleToggleActive(discount.id)}
                        >
                          <MoreHorizontal className="w-4 h-4" /> {/* Using MoreHorizontal for toggle action */}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 animate-button"
                          onClick={() => handleDelete(discount.id)}
                        >
                          <Trash2 className="w-4 h-4" />
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

      {isFormDialogOpen && (
        <DiscountFormDialog
          isOpen={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          discount={selectedDiscount}
          onSave={handleSaveDiscount}
        />
      )}
    </div>
  )
}
