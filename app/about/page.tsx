"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <div className="relative w-80 h-40 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/temple-logo.jpeg"
                alt="Radha Govind Dham DC Logo"
                fill
                className="object-contain bg-white"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Radha Govind Dham DC</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A sacred sanctuary dedicated to the divine love of Radha and Krishna, fostering spiritual growth and
              community devotion in Washington, DC.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Our Sacred Deities</CardTitle>
                <CardDescription>The divine forms of Radha and Krishna</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src="/images/radha-krishna-deities.jpeg"
                    alt="Radha Krishna Deities"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600">
                  Our beautiful deities of Radha and Krishna are the heart of our temple. Devotees come from far and
                  wide to have darshan and experience the divine presence that radiates from these sacred forms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Spiritual Guidance</CardTitle>
                <CardDescription>Wisdom from our revered teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image src="/images/spiritual-guru.webp" alt="Spiritual Guru" fill className="object-cover" />
                </div>
                <p className="text-gray-600">
                  Under the guidance of our spiritual teachers, devotees learn the ancient wisdom of Krishna
                  consciousness and develop a deeper understanding of their relationship with the divine.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 text-center">Our Vibrant Community</CardTitle>
              <CardDescription className="text-center">
                Devotees united in love and service to Radha Krishna
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg mb-6">
                <Image
                  src="/images/temple-gathering.png"
                  alt="Temple Community Gathering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Activities</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Daily congregational chanting (Kirtan)</li>
                    <li>• Weekly Bhagavad Gita study groups</li>
                    <li>• Festival celebrations throughout the year</li>
                    <li>• Community service projects</li>
                    <li>• Youth programs and cultural activities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Temple Values</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Devotional service (Bhakti)</li>
                    <li>• Spiritual knowledge (Jnana)</li>
                    <li>• Community harmony (Sangha)</li>
                    <li>• Compassionate living (Ahimsa)</li>
                    <li>• Divine love (Prema)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-orange-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Join Our Sacred Mission</h2>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
              Whether through seva, donations, or simply participating in our programs, every contribution helps us
              serve the divine and spread the message of love and devotion.
            </p>
            <p className="text-sm text-gray-600 italic">
              "In the service of the Lord, every small act becomes a great offering"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
