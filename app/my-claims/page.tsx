"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface Claim {
  id: string
  itemName: string
  itemDescription: string
  status: "pending" | "approved" | "completed"
  claimedAt: string
  approvedAt?: string
  completedAt?: string
}

export default function MyClaimsPage() {
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

  const getStatusDescription = (claim: Claim) => {
    switch (claim.status) {
      case "pending":
        return "Waiting for admin approval"
      case "approved":
        return `Approved on ${new Date(claim.approvedAt!).toLocaleDateString()}`
      case "completed":
        return `Completed on ${new Date(claim.completedAt!).toLocaleDateString()}`
      default:
        return ""
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Seva Claims</h1>
            <p className="mt-2 text-gray-600">Track the status of your seva contributions to Radha Govind Dham DC.</p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading claims...</p>
            </div>
          ) : claims.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No seva claims yet</h3>
                <p className="text-gray-600">Visit the Seva Items page to make your first contribution!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {claims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{claim.itemName}</CardTitle>
                        <CardDescription className="mt-1">{claim.itemDescription}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Claimed on:</span>
                        <span>{new Date(claim.claimedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span>{getStatusDescription(claim)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
