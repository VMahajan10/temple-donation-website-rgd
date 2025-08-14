import { NextResponse } from "next/server"

// Mock claims data
const mockClaims = [
  {
    id: "1",
    itemId: "2",
    itemName: "Incense Sticks",
    userId: "1",
    userName: "John User",
    status: "pending",
    claimedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    itemId: "1",
    itemName: "Fresh Flowers for Daily Puja",
    userId: "1",
    userName: "John User",
    status: "approved",
    claimedAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "3",
    itemId: "4",
    itemName: "Fruits for Offering",
    userId: "2",
    userName: "Jane Admin",
    status: "completed",
    claimedAt: "2024-01-05T07:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json(mockClaims)
}
