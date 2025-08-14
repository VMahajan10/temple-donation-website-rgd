import { NextResponse } from "next/server"

// Mock claims data
const mockClaims = [
  {
    id: "1",
    itemName: "Incense for Temple Arati",
    itemDescription: "Aromatic incense sticks for morning and evening arati",
    status: "pending",
    claimedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    itemName: "Fresh Flowers for Radha Krishna",
    itemDescription: "Beautiful fresh flowers for the daily arati of Radha Krishna",
    status: "approved",
    claimedAt: "2024-01-10T08:00:00Z",
    approvedAt: "2024-01-11T09:00:00Z",
  },
  {
    id: "3",
    itemName: "Ghee for Temple Lamps",
    itemDescription: "Pure ghee for lighting the sacred temple lamps",
    status: "completed",
    claimedAt: "2024-01-05T07:00:00Z",
    approvedAt: "2024-01-06T08:00:00Z",
    completedAt: "2024-01-08T18:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json(mockClaims)
}
