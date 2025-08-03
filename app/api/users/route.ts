import { NextResponse } from "next/server"

// Mock users database
const users = [
  {
    id: "1",
    name: "John User",
    email: "user@temple.com",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Admin",
    email: "admin@temple.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Head Admin",
    email: "head@temple.com",
    role: "head_admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Sarah Devotee",
    email: "sarah@temple.com",
    role: "user",
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "5",
    name: "Mike Volunteer",
    email: "mike@temple.com",
    role: "admin",
    createdAt: "2024-01-03T00:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json(users)
}
