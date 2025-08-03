import { type NextRequest, NextResponse } from "next/server"

// Mock items database (same as above)
const items = [
  {
    id: "1",
    name: "Fresh Flowers for Radha Krishna",
    description: "Beautiful fresh flowers for the daily arati of Radha Krishna",
    image: "/placeholder.svg?height=200&width=200&text=Fresh+Flowers",
    status: "available",
    claimedBy: null,
    claimedByName: null,
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
  {
    id: "2",
    name: "Incense for Temple Arati",
    description: "Aromatic incense sticks for morning and evening arati",
    image: "/placeholder.svg?height=200&width=200&text=Incense+Sticks",
    status: "claimed",
    claimedBy: "1",
    claimedByName: "John User",
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
  {
    id: "3",
    name: "Ghee for Temple Lamps",
    description: "Pure ghee for lighting the sacred temple lamps",
    image: "/placeholder.svg?height=200&width=200&text=Ghee+Lamps",
    status: "available",
    claimedBy: null,
    claimedByName: null,
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
  {
    id: "4",
    name: "Fruits for Bhog Offering",
    description: "Fresh seasonal fruits for daily bhog offering to Radha Krishna",
    image: "/placeholder.svg?height=200&width=200&text=Fresh+Fruits",
    status: "completed",
    claimedBy: "2",
    claimedByName: "Jane Admin",
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
  {
    id: "5",
    name: "Rice for Prasadam",
    description: "Quality basmati rice for preparing temple prasadam",
    image: "/placeholder.svg?height=200&width=200&text=Basmati+Rice",
    status: "available",
    claimedBy: null,
    claimedByName: null,
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
  {
    id: "6",
    name: "Milk for Abhishek",
    description: "Pure milk for daily abhishek ceremony of the deities",
    image: "/placeholder.svg?height=200&width=200&text=Pure+Milk",
    status: "available",
    claimedBy: null,
    claimedByName: null,
    imageApproved: true,
    createdBy: "system",
    createdByRole: "system",
  },
]

export async function PUT(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const { approved } = await request.json()
    const { itemId } = params

    const itemIndex = items.findIndex((i) => i.id === itemId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    items[itemIndex] = {
      ...items[itemIndex],
      imageApproved: approved,
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
