import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // In a real app, you would save to database and hash the password
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
