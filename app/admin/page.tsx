"use client"

import type React from "react"

import { useAuth } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Paperclip, X, Check, AlertTriangle, Eye } from "lucide-react"

interface Item {
  id: string
  name: string
  description: string
  image: string
  status: "available" | "claimed" | "completed"
  claimedBy?: string
  claimedByName?: string
  imageApproved?: boolean
  createdBy?: string
  createdByRole?: string
}

interface Claim {
  id: string
  itemId: string
  itemName: string
  userId: string
  userName: string
  status: "pending" | "approved" | "completed"
  claimedAt: string
}

export default function AdminPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    image: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setNewItem({ ...newItem, image: url })
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    setNewItem({ ...newItem, image: "" })
  }

  useEffect(() => {
    if (user?.role !== "admin" && user?.role !== "head_admin") {
      return
    }

    const fetchData = async () => {
      try {
        const [itemsResponse, claimsResponse] = await Promise.all([
          fetch("/api/admin/items"),
          fetch("/api/admin/claims"),
        ])

        if (itemsResponse.ok) {
          const itemsData = await itemsResponse.json()
          setItems(itemsData)
        }

        if (claimsResponse.ok) {
          const claimsData = await claimsResponse.json()
          setClaims(claimsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/admin/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          createdBy: user?.id,
          createdByRole: user?.role,
        }),
      })

      if (response.ok) {
        const message =
          user?.role === "head_admin"
            ? "Seva item added successfully and is now available for claims."
            : "Seva item added successfully. It will be visible to users after Head Admin approval."

        toast({
          title: "Seva item added successfully",
          description: message,
        })

        setNewItem({ name: "", description: "", image: "" })
        setSelectedFile(null)
        setPreviewUrl("")

        // Refresh items
        const itemsResponse = await fetch("/api/admin/items")
        if (itemsResponse.ok) {
          const data = await itemsResponse.json()
          setItems(data)
        }
      } else {
        toast({
          title: "Failed to add item",
          description: "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding item:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleApproveImage = async (itemId: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/admin/items/${itemId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved }),
      })

      if (response.ok) {
        const action = approved ? "approved" : "rejected"
        const visibility = approved ? "visible to users" : "hidden from users"

        toast({
          title: `Image ${action}`,
          description: `The item is now ${visibility}. You can change this decision at any time.`,
        })

        // Refresh items
        const itemsResponse = await fetch("/api/admin/items")
        if (itemsResponse.ok) {
          const data = await itemsResponse.json()
          setItems(data)
        }
      } else {
        toast({
          title: "Failed to update approval",
          description: "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating approval:", error)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/admin/items/${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Item deleted",
          description: "The item has been removed.",
        })

        setItems(items.filter((item) => item.id !== itemId))
      } else {
        toast({
          title: "Failed to delete item",
          description: "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  const handleUpdateClaimStatus = async (claimId: string, status: "approved" | "completed") => {
    try {
      const response = await fetch(`/api/admin/claims/${claimId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Claim updated",
          description: `Claim has been ${status}.`,
        })

        // Refresh claims
        const claimsResponse = await fetch("/api/admin/claims")
        if (claimsResponse.ok) {
          const data = await claimsResponse.json()
          setClaims(data)
        }
      } else {
        toast({
          title: "Failed to update claim",
          description: "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating claim:", error)
    }
  }

  if (!user || (user.role !== "admin" && user.role !== "head_admin")) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "available":
        return "bg-green-100 text-green-800"
      case "claimed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getApprovalBadge = (item: Item) => {
    if (item.imageApproved === false) {
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Pending Approval
        </Badge>
      )
    } else if (item.imageApproved === true) {
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <Check className="h-3 w-3" />
          Approved
        </Badge>
      )
    }
    return null
  }

  const pendingApprovalItems = items.filter((item) => item.imageApproved === false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-gray-600">Manage seva opportunities and claims for Radha Govind Dham DC.</p>
          </div>

          <Tabs defaultValue="items" className="space-y-6">
            <TabsList>
              <TabsTrigger value="items">Manage Items</TabsTrigger>
              <TabsTrigger value="claims">Manage Claims</TabsTrigger>
              {user.role === "head_admin" && (
                <TabsTrigger value="approvals" className="relative">
                  Image Approvals
                  {pendingApprovalItems.length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">{pendingApprovalItems.length}</Badge>
                  )}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Item
                  </CardTitle>
                  <CardDescription>
                    Create a new seva opportunity for devotees to claim.
                    {user.role === "admin" && (
                      <span className="block mt-1 text-orange-600 text-sm">
                        Note: Images require Head Admin approval before being visible to users.
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                          id="name"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          required
                          placeholder="e.g., Flowers for Puja"
                        />
                      </div>
                      <div>
                        <Label htmlFor="image">Item Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              id="image-upload"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("image-upload")?.click()}
                              className="flex items-center gap-2"
                            >
                              <Paperclip className="h-4 w-4" />
                              {selectedFile ? "Change Image" : "Upload Image"}
                            </Button>
                            {selectedFile && (
                              <Button type="button" variant="outline" size="sm" onClick={handleRemoveFile}>
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {selectedFile && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Selected: {selectedFile.name}</span>
                            </div>
                          )}
                          {previewUrl && (
                            <div className="relative w-20 h-20 rounded-md overflow-hidden border">
                              <img
                                src={previewUrl || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        required
                        placeholder="Describe the item and its purpose..."
                      />
                    </div>
                    <Button type="submit">Add Item</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Items</CardTitle>
                  <CardDescription>Manage existing donation items.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading items...</div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                              {getApprovalBadge(item)}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            {item.claimedByName && (
                              <p className="text-sm text-blue-600 mt-1">Claimed by: {item.claimedByName}</p>
                            )}
                            {item.createdByRole === "admin" && item.imageApproved === false && (
                              <p className="text-sm text-orange-600 mt-1">
                                Waiting for Head Admin approval to be visible to users
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {user.role === "head_admin" && (
              <TabsContent value="approvals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Image Approvals ({pendingApprovalItems.length} pending)
                    </CardTitle>
                    <CardDescription>
                      Review and manage image approvals. You can change approval status at any time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pending" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="pending">Pending Approval ({pendingApprovalItems.length})</TabsTrigger>
                        <TabsTrigger value="all">All Items ({items.length})</TabsTrigger>
                      </TabsList>

                      <TabsContent value="pending">
                        {pendingApprovalItems.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">No images pending approval.</div>
                        ) : (
                          <div className="space-y-6">
                            {pendingApprovalItems.map((item) => (
                              <div key={item.id} className="border rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                    <p className="text-xs text-gray-500">Created by: Admin ({item.createdBy})</p>
                                    <div className="mt-2">{getApprovalBadge(item)}</div>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="relative w-full h-48 rounded-md overflow-hidden border">
                                      <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleApproveImage(item.id, true)}
                                        className="flex items-center gap-2"
                                      >
                                        <Check className="h-4 w-4" />
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleApproveImage(item.id, false)}
                                        className="flex items-center gap-2"
                                      >
                                        <X className="h-4 w-4" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="all">
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                  <p className="text-xs text-gray-500 mb-2">
                                    Created by:{" "}
                                    {item.createdByRole === "system" ? "System" : `Admin (${item.createdBy})`}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                    {getApprovalBadge(item)}
                                  </div>
                                </div>
                                <div className="relative w-full h-32 rounded-md overflow-hidden border">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <div className="text-sm font-medium text-gray-700">Approval Actions:</div>
                                  {item.imageApproved === true ? (
                                    <div className="space-y-2">
                                      <div className="text-sm text-green-600 flex items-center gap-1">
                                        <Check className="h-3 w-3" />
                                        Currently Approved (Visible to users)
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleApproveImage(item.id, false)}
                                        className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                                      >
                                        <X className="h-4 w-4" />
                                        Change to Rejected
                                      </Button>
                                    </div>
                                  ) : item.imageApproved === false ? (
                                    <div className="space-y-2">
                                      <div className="text-sm text-red-600 flex items-center gap-1">
                                        <X className="h-3 w-3" />
                                        Currently Rejected (Hidden from users)
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleApproveImage(item.id, true)}
                                        className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
                                      >
                                        <Check className="h-4 w-4" />
                                        Change to Approved
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <div className="text-sm text-gray-600">No approval needed (System item)</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="claims" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Claims</CardTitle>
                  <CardDescription>Review and manage user claims.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading claims...</div>
                  ) : claims.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No claims to review.</div>
                  ) : (
                    <div className="space-y-4">
                      {claims.map((claim) => (
                        <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium">{claim.itemName}</h3>
                              <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Claimed by: {claim.userName}</p>
                            <p className="text-sm text-gray-500">
                              Claimed on: {new Date(claim.claimedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {claim.status === "pending" && (
                              <Button size="sm" onClick={() => handleUpdateClaimStatus(claim.id, "approved")}>
                                Approve
                              </Button>
                            )}
                            {claim.status === "approved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateClaimStatus(claim.id, "completed")}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
