"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import { TempleInfo } from "@/components/temple-info"

interface Claim {
  id: string
  itemName: string
  status: "pending" | "approved" | "completed"
  claimedAt: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch("/api/my-claims")
        if (response.ok) {
          const data = await response.json()
          setClaims(data)
        }
      } catch (error) {
        console.error("Error fetching claims:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClaims()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 🙏</h1>
                <p className="mt-2 text-gray-600">Thank you for your devotion and seva to Radha Govind Dham DC.</p>
                <p className="mt-2 text-sm text-orange-600 font-medium">
                  "Hare Krishna Hare Krishna, Krishna Krishna Hare Hare"
                </p>
                <p className="mt-1 text-sm text-gray-500">"Hare Rama Hare Rama, Rama Rama Hare Hare"</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/temple-logo.jpeg"
                    alt="Radha Govind Dham DC"
                    fill
                    className="object-contain bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{claims.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {claims.filter((c) => c.status === "pending").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {claims.filter((c) => c.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <TempleInfo />

          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Your latest donation claims</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading claims...</div>
              ) : claims.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No seva claims yet. Visit the Seva Items page to make your first contribution!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {claims.slice(0, 5).map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{claim.itemName}</h3>
                        <p className="text-sm text-gray-500">
                          Claimed on {new Date(claim.claimedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
