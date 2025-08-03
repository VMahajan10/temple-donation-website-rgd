import { type NextRequest, NextResponse } from "next/server"

// Mock items database (same as above)
const items = [
  {
    id: "1",
    name: "Fresh Flowers for Daily Puja",
    description: "Beautiful fresh flowers for the morning and evening prayers",
    image: "/placeholder.svg?height=200&width=200",
    status: "available",
    claimedBy: null,
    claimedByName: null,
  },
  {
    id: "2",
    name: "Incense Sticks",
    description: "Aromatic incense sticks for temple ceremonies",
    image: "/placeholder.svg?height=200&width=200",
    status: "claimed",
    claimedBy: "1",
    claimedByName: "John User",
  },
  {
    id: "3",
    name: "Oil for Temple Lamps",
    description: "Pure oil for lighting the sacred lamps",
    image: "/placeholder.svg?height=200&width=200",
    status: "available",
    claimedBy: null,
    claimedByName: null,
  },
  {
    id: "4",
    name: "Fruits for Offering",
    description: "Fresh seasonal fruits for deity offerings",
    image: "/placeholder.svg?height=200&width=200",
    status: "completed",
    claimedBy: "2",
    claimedByName: "Jane Admin",
  },
  {
    id: "5",
    name: "Rice for Prasadam",
    description: "Quality rice for preparing temple prasadam",
    image: "/placeholder.svg?height=200&width=200",
    status: "available",
    claimedBy: null,
    claimedByName: null,
  },
  {
    id: "6",
    name: "Ghee for Aarti",
    description: "Pure ghee for temple aarti and ceremonies",
    image: "/placeholder.svg?height=200&width=200",
    status: "available",
    claimedBy: null,
    claimedByName: null,
  },
]

// Mock claims database
const claims: any[] = [
  {
    id: "1",
    itemId: "2",
    itemName: "Incense Sticks",
    itemDescription: "Aromatic incense sticks for temple ceremonies",
    userId: "1",
    userName: "John User",
    status: "pending",
    claimedAt: "2024-01-15T10:00:00Z",
  },
]

export async function POST(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const { userId } = await request.json()
    const { itemId } = params

    const item = items.find((i) => i.id === itemId)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    if (item.status !== "available") {
      return NextResponse.json({ error: "Item not available" }, { status: 400 })
    }

    // Update item status
    const itemIndex = items.findIndex((i) => i.id === itemId)
    items[itemIndex] = {
      ...item,
      status: "claimed",
      claimedBy: userId,
      claimedByName: "Current User", // In real app, get from user database
    }

    // Create claim record
    const newClaim = {
      id: Date.now().toString(),
      itemId,
      itemName: item.name,
      itemDescription: item.description,
      userId,
      userName: "Current User",
      status: "pending",
      claimedAt: new Date().toISOString(),
    }

    claims.push(newClaim)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
