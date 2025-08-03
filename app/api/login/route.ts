import { type NextRequest, NextResponse } from "next/server"

// Mock users database
const users = [
  {
    id: "1",
    name: "John User",
    email: "user@temple.com",
    password: "password",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Admin",
    email: "admin@temple.com",
    password: "password",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Head Admin",
    email: "head@temple.com",
    password: "password",
    role: "head_admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
