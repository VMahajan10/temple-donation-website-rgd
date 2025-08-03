import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TempleInfo() {
  return (
    <div className="space-y-8">
      {/* Main Temple Information Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative w-64 h-32 rounded-lg overflow-hidden">
              <Image src="/images/temple-logo.jpeg" alt="Radha Govind Dham DC Logo" fill className="object-contain" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl text-orange-600">श्री राधा गोविंद धाम डीसी</CardTitle>
          <CardDescription className="text-center">Radha Govind Dham DC - A Sacred Place of Devotion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/radha-krishna-deities.jpeg"
                alt="Radha Krishna Deities at Radha Govind Dham DC"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Temple Services</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Daily Bhog Offering</p>
                  <p>• Weekly Satsang Programs</p>
                  <p>• Festival Celebrations</p>
                  <p>• Spiritual Discourses</p>
                  <p>• Community Kirtan Sessions</p>
                  <p>• Bhagavad Gita Study Groups</p>
                  <p>• Youth Programs</p>
                  <p>• Cultural Activities</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 italic">
              "Participate in seva and experience the divine grace of Radha Krishna"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Community and Spiritual Guidance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-orange-600">Our Community</CardTitle>
            <CardDescription>Devotees gathering for prayers and spiritual activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg mb-4">
              <Image
                src="/images/temple-gathering.png"
                alt="Temple community gathering for prayers"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Join our vibrant community of devotees who come together for daily prayers, festivals, and spiritual
              growth. Experience the joy of collective devotion and the warmth of our temple family.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-orange-600">Spiritual Guidance</CardTitle>
            <CardDescription>Learn from experienced spiritual teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg mb-4">
              <Image
                src="/images/spiritual-guru.webp"
                alt="Spiritual guru providing guidance"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Receive wisdom and guidance from our revered spiritual teachers who share the timeless teachings of
              Krishna consciousness and help devotees on their spiritual journey towards self-realization.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
