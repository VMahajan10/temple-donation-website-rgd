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

export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const { itemId } = params

    const itemIndex = items.findIndex((i) => i.id === itemId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    items.splice(itemIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
