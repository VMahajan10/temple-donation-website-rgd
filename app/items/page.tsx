"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Item {
  id: string
  name: string
  description: string
  image: string
  status: "available" | "claimed" | "completed"
  claimedBy?: string
}

export default function ItemsPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items")
        if (response.ok) {
          const data = await response.json()
          setItems(data)
        }
      } catch (error) {
        console.error("Error fetching items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleClaim = async (itemId: string) => {
    try {
      const response = await fetch(`/api/claim/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      })

      if (response.ok) {
        toast({
          title: "Seva claim successful",
          description: "Thank you for your generous seva contribution!",
        })

        // Refresh items
        const itemsResponse = await fetch("/api/items")
        if (itemsResponse.ok) {
          const data = await itemsResponse.json()
          setItems(data)
        }
      } else {
        toast({
          title: "Claim failed",
          description: "Unable to claim this item. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error claiming item:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "claimed":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900">Seva Opportunities</h1>
                <p className="mt-2 text-gray-600">
                  Choose seva items to contribute for temple activities and ceremonies at Radha Govind Dham DC.
                </p>
                <p className="mt-2 text-sm text-orange-600 font-medium">
                  "Service to the Lord is the highest form of devotion"
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Join our community in serving the divine through meaningful contributions
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-36 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/temple-gathering.png"
                    alt="Temple community participating in seva"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading items...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {item.status === "available" ? (
                      <Button onClick={() => handleClaim(item.id)} className="w-full">
                        Claim for Seva
                      </Button>
                    ) : item.status === "claimed" && item.claimedBy === user.id ? (
                      <Button variant="outline" className="w-full bg-transparent" disabled>
                        Claimed by You
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full bg-transparent" disabled>
                        Not Available
                      </Button>
                    )}
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
