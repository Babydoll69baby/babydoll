"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ProfileFormProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              {user.image ? (
                <div className="relative">
                  <img
                    src={user.image || "/placeholder.svg"}
                    alt={user.name || "User"}
                    className="h-24 w-24 rounded-full border-2 border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs"
                    onClick={() =>
                      toast({
                        title: "Info",
                        description: "This feature is not implemented in the demo.",
                      })
                    }
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500"
                disabled
              />
              <p className="text-xs text-gray-400">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter your current password"
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter a new password"
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

